import env from "../../config/env.js";
import { Errors } from "../../utils/errors.js";
import { findPackageOrThrow } from "./suite.utils.js";
import { processAndUploadFiles } from "../../utils/uploadSupabase.js";

import {
  updateSuite,
  createNewSuite,
  findSuiteByUserId,
} from "./suite.repository.js";

import {
  MAX_IMAGES_PER_PACKAGE,
  MAX_INVOICES_PER_PACKAGE,
} from "../../constants/suite.constants.js";

export const getSuiteData = async (req) => {
  const { id } = req.user;
  let existingSuite = await findSuiteByUserId(id);
  if (!existingSuite) existingSuite = createSuite(req.user);

  const { packages, id: suiteId } = existingSuite;
  return {
    status: "success",
    message: "suite fetched",
    data: { id: suiteId, userId: id, packages },
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

  env.dbUniqueId += 1;
  return { status: "success", message: "suite created", data: suite };
};

export const addPackageImages = async (req) => {
  const { id: userId } = req.user;
  const { packageId } = req.params;
  const files = req.files;

  const { suite, pkg } = await findPackageOrThrow(userId, packageId);

  const currentCount = pkg.images?.length || 0;
  if (currentCount + files.length > MAX_IMAGES_PER_PACKAGE) {
    throw Errors.badRequest(
      `This package already has ${currentCount} image(s). Max ${MAX_IMAGES_PER_PACKAGE} allowed — you can add ${MAX_IMAGES_PER_PACKAGE - currentCount} more.`,
    );
  }

  const incomingNames = files.map((f) => f.originalname.trim().toLowerCase());
  const isDuplicate = pkg.images?.some((img) =>
    incomingNames.includes(img.name.trim().toLowerCase()),
  );
  if (isDuplicate) throw Errors.conflict("This Files already exist");

  const newData = await processAndUploadFiles(files, "images", packageId);

  pkg.images = [...(pkg.images || []), ...newData];
  updateSuite(suite);

  return { status: "success", message: "images uploaded", data: pkg.images };
};

export const addPackagePdf = async (req) => {
  const { id: userId } = req.user;
  const { packageId } = req.params;
  const files = req.files;

  const { suite, pkg } = await findPackageOrThrow(userId, packageId);

  const currentCount = pkg.invoices?.length || 0;
  if (currentCount + files.length > MAX_INVOICES_PER_PACKAGE) {
    throw Errors.badRequest(
      `This package already has ${currentCount} invoice(s). Max ${MAX_INVOICES_PER_PACKAGE} allowed — you can add ${MAX_INVOICES_PER_PACKAGE - currentCount} more.`,
    );
  }

  const incomingNames = files.map((f) => f.originalname.trim().toLowerCase());
  const isDuplicate = pkg.invoices?.some((inv) =>
    incomingNames.includes(inv.name.trim().toLowerCase()),
  );
  if (isDuplicate) throw Errors.conflict("This Files already exist");

  const newData = await processAndUploadFiles(files, "invoices", packageId);

  pkg.invoices = [...(pkg.invoices || []), ...newData];
  updateSuite(suite);

  return { status: "success", message: "pdf uploaded", data: newData };
};

export const getFiles = async (req) => {
  const { id: userId } = req.user;
  const { packageId, fileName } = req.params;
  const type = req.originalUrl.includes("invoice") ? "invoices" : "images";

  const { pkg } = await findPackageOrThrow(userId, packageId);

  const fileRecord = pkg[type].find((file) => file.name.includes(fileName));
  if (!fileRecord) throw Errors.notFound(type);

  return { fileUrl: fileRecord.url, downloadName: fileRecord.name };
};
