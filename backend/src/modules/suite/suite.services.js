import { Errors } from "../../utils/errors.js";
import { findPackageOrThrow } from "./suite.utils.js";
import {
  getPublicFileUrl,
  processAndUploadFiles,
} from "../../utils/uploadSupabase.js";

import {
  updateSuite,
  createNewSuite,
  findSuiteByUserId,
  addImagesToPackage,
  addInvoicesToPackage,
} from "./suite.repository.js";

import {
  BUCKET_NAME,
  MAX_IMAGES_PER_PACKAGE,
  MAX_INVOICES_PER_PACKAGE,
} from "../../constants/suite.constants.js";

export const getSuiteData = async (req) => {
  const { id } = req.user;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit =
    req.query.limit === "all" ? req.query.limit : Number(req.query.limit) || 5;

  let existingSuite = await findSuiteByUserId(id, page, limit);
  if (!existingSuite) existingSuite = await createSuite(req.user);

  if (limit === "all") {
    return {
      status: "success",
      message: "suite fetched",
      data: {
        ...existingSuite,
      },
    };
  }
  const {
    suite: { packages, id: suiteId, name, zonePrefix },
    pagination,
  } = existingSuite;

  return {
    status: "success",
    message: "suite fetched",
    data: {
      id: suiteId,
      userId: id,
      name,
      zonePrefix,
      packages,
      pagination,
    },
  };
};

export const createSuite = async ({ id, suiteName }) => {
  const existingSuite = await findSuiteByUserId(id);
  if (existingSuite)
    throw Errors.conflict("A suite is available with this ID.");

  const newSuite = {
    userId: id,
    name: suiteName ?? `new-${Date.now()}`,
  };
  const suite = await createNewSuite(newSuite);
  if (!suite) throw Errors.internal("Error occurred while creating suite");

  return { status: "success", message: "suite created", data: suite };
};

export const addPackageImages = async (req) => {
  const { id: userId } = req.user;
  const { packageId } = req.params;
  const files = req.files || [];

  const { suite, pkg } = await findPackageOrThrow(userId, packageId);

  const currentCount = pkg.images?.length || 0;
  if (currentCount + files.length > MAX_IMAGES_PER_PACKAGE) {
    throw Errors.badRequest(
      `This package already has ${currentCount} image(s). Max ${MAX_IMAGES_PER_PACKAGE} allowed — you can add ${MAX_IMAGES_PER_PACKAGE - currentCount} more.`,
    );
  }

  const incomingNames = files.map((f) => f.originalname.trim().toLowerCase());

  const hasInBatchDuplicates =
    new Set(incomingNames).size !== incomingNames.length;
  if (hasInBatchDuplicates) throw Errors.badRequest("This Files already exist");

  const isDuplicate = pkg.images?.some((img) =>
    incomingNames.includes(img.name.trim().toLowerCase()),
  );
  if (isDuplicate) throw Errors.conflict("This Files already exist");

  const newData = await processAndUploadFiles(files, "images", packageId);

  const imagesToSave = newData.map((file) => ({
    url: file.url,
    name: file.originalname || file.name,
    size: file.size,
    type: file.mimetype || file.type,
  }));

  await addImagesToPackage(packageId, imagesToSave);

  pkg.images = [...(pkg.images || []), ...imagesToSave];

  return { status: "success", message: "images uploaded", data: pkg.images };
};

export const addPackagePdf = async (req) => {
  const { id: userId } = req.user;
  const { packageId } = req.params;
  const files = req.files || [];

  const { suite, pkg } = await findPackageOrThrow(userId, packageId);

  const currentCount = pkg.invoices?.length || 0;
  if (currentCount + files.length > MAX_INVOICES_PER_PACKAGE) {
    throw Errors.badRequest(
      `This package already has ${currentCount} invoice(s). Max ${MAX_INVOICES_PER_PACKAGE} allowed — you can add ${MAX_INVOICES_PER_PACKAGE - currentCount} more.`,
    );
  }

  const incomingNames = files.map((f) => f.originalname.trim().toLowerCase());

  const hasInBatchDuplicates =
    new Set(incomingNames).size !== incomingNames.length;
  if (hasInBatchDuplicates) throw Errors.badRequest("This Files already exist");

  const isDuplicate = pkg.invoices?.some((inv) =>
    incomingNames.includes(inv.name.trim().toLowerCase()),
  );
  if (isDuplicate) throw Errors.conflict("This Files already exist");

  const newData = await processAndUploadFiles(files, "invoices", packageId);

  const invoicesToSave = newData.map((file) => ({
    url: file.path,
    name: file.originalname || file.name,
    size: file.size,
    type: file.mimetype || file.type,
  }));

  await addInvoicesToPackage(packageId, invoicesToSave);
  return { status: "success", message: "pdf uploaded", data: newData };
};

export const getFiles = async (req) => {
  const { id: userId } = req.user;
  const { packageId, fileName } = req.params;

  if (!fileName || fileName === "undefined") {
    throw Errors.badRequest("File name parameter is required");
  }

  const type = req.originalUrl.includes("invoice") ? "invoices" : "images";

  const { pkg } = await findPackageOrThrow(userId, packageId);

  const fileRecord = pkg[type]?.find(
    (file) =>
      file.name?.toLowerCase().includes(fileName.toLowerCase()) ||
      file.url?.toLowerCase().includes(fileName.toLowerCase()),
  );

  if (!fileRecord) {
    throw Errors.notFound(`${type} with name or ID '${fileName}' not found`);
  }

  const fullPublicUrl = getPublicFileUrl(fileRecord.url);

  return { fileUrl: fullPublicUrl, downloadName: fileRecord.name };
};
