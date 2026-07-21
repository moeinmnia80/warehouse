import fs from "fs";
import path from "path";
import env from "../../config/env.js";
import { Errors } from "../../utils/errors.js";
import {
  createNewSuite,
  findSuiteByUserId,
  updateSuite,
} from "./suite.repository.js";

// for pdf and  image
const UPLOADS_ROOT = path.join(process.cwd(), "uploads");
const toRelativePath = (absolutePath) =>
  path.relative(UPLOADS_ROOT, absolutePath).replace(/\\/g, "/");
// for check existing count file
const MAX_IMAGES_PER_PACKAGE = 5;
const MAX_INVOICES_PER_PACKAGE = 3;
// cleans up files multer already wrote to disk if we're about to reject the request
const deleteUploadedFiles = (files) => {
  files.forEach((f) => {
    fs.unlink(f.path, (err) => {
      if (err)
        console.error("Failed to clean up rejected upload:", f.path, err);
    });
  });
};

export const getSuiteData = (req) => {
  const { id } = req.user;
  const existingSuite = findSuiteByUserId(id);
  if (!existingSuite) throw Errors.notFound("Suite");
  const { packages, id: suiteId } = existingSuite;
  return {
    status: "success",
    message: "suite fetched",
    data: { id: suiteId, userId: id, packages },
  };
};

export const createSuite = ({ id }) => {
  const existingSuite = findSuiteByUserId(id);
  if (existingSuite)
    throw Errors.conflict("A suite is available with this ID.");

  const newSuite = { id: "XC" + env.dbUniqueId, userId: id, packages: [] };
  const suite = createNewSuite(newSuite);
  if (!suite) throw Errors.internal("Error occurred while creating suite");

  env.dbUniqueId = env.dbUniqueId + 1;
  return { status: "success", message: "suite created", data: suite };
};

export const addPackageImages = (req) => {
  const { id: userId } = req.user;
  const { packageId } = req.params;
  const suite = findSuiteByUserId(userId);
  if (!suite) {
    deleteUploadedFiles(req.files);
    throw Errors.notFound("Suite");
  }

  const pkg = suite.packages.find((p) => p.packageId === packageId);
  if (!pkg) {
    deleteUploadedFiles(req.files);
    throw Errors.notFound("Package not found in your suite");
  }

  const currentCount = pkg.images?.length || 0;
  const incomingCount = req.files.length;
  if (currentCount + incomingCount > MAX_IMAGES_PER_PACKAGE) {
    deleteUploadedFiles(req.files); // don't leave orphaned files on disk
    throw Errors.badRequest(
      `This package already has ${currentCount} image(s). Max ${MAX_IMAGES_PER_PACKAGE} allowed — you can add ${MAX_IMAGES_PER_PACKAGE - currentCount} more.`,
    );
  }
  const fileName = req.files.map((f) => f.originalname.trim().toLowerCase());
  const files = pkg.invoices.some((p) =>
    fileName.includes((p.originalname || p.name || "").trim().toLowerCase()),
  );

  if (files) {
    deleteUploadedFiles(req.files);
    throw Errors.conflict("This Files already exist");
  }
  const imagePaths = req.files.map((f) => toRelativePath(f.path));
  const newData = req.files.map((f) => ({
    id: crypto.randomUUID(),
    url: toRelativePath(f.path),
    name: Buffer.from(f.originalname, "latin1").toString("utf8"),
    size: f.size,
    type: f.originalname.split(".")[1],
  }));
  pkg.images = [...(pkg.images || []), ...newData];
  updateSuite(suite);
  return { status: "success", message: "images uploaded", data: pkg.images };
};

export const addPackagePdf = (req) => {
  const { id: userId } = req.user;
  const { packageId } = req.params;
  const suite = findSuiteByUserId(userId);
  if (!suite) {
    deleteUploadedFiles(req.files);
    throw Errors.notFound("Suite");
  }

  const pkg = suite.packages.find((p) => p.packageId === packageId);
  if (!pkg) {
    deleteUploadedFiles(req.files);
    throw Errors.notFound("Package not found in your suite");
  }
  const fileName = req.files.map((f) => f.originalname.trim().toLowerCase());
  const files = pkg.invoices.some((p) =>
    fileName.includes((p.originalname || p.name || "").trim().toLowerCase()),
  );

  if (files) {
    deleteUploadedFiles(req.files);
    throw Errors.conflict("This Files already exist");
  }
  const currentCount = pkg.invoices?.length || 0;
  const incomingCount = req.files.length;
  if (currentCount + incomingCount > MAX_INVOICES_PER_PACKAGE) {
    deleteUploadedFiles(req.files);
    throw Errors.badRequest(
      `This package already has ${currentCount} invoice(s). Max ${MAX_INVOICES_PER_PACKAGE} allowed — you can add ${MAX_INVOICES_PER_PACKAGE - currentCount} more.`,
    );
  }

  const filePaths = req.files.map((f) => toRelativePath(f.path));
  const newData = req.files.map((f) => ({
    id: crypto.randomUUID(),
    url: toRelativePath(f.path),
    name: Buffer.from(f.originalname, "latin1").toString("utf8"),
    size: f.size,
    type: f.originalname.split(".")[1],
  }));

  pkg.invoices = [...(pkg.invoices || []), ...newData];
  updateSuite(suite);
  return { status: "success", message: "pdf uploaded", data: newData };
};
export const getFiles = (req) => {
  const { id: userId } = req.user;
  const { packageId, fileName } = req.params;
  const type = req.originalUrl.includes("invoice") ? "invoices" : "images";
  const suite = findSuiteByUserId(userId);
  if (!suite) throw Errors.notFound("Suite");

  const pkg = suite.packages.find((p) => p.packageId === packageId);
  if (!pkg) throw Errors.notFound("Package not found in your suite");

  const relativePath = pkg[type].find((file) => file.name.includes(fileName));
  if (!relativePath) throw Errors.notFound(type);

  const fullPath = path.join(UPLOADS_ROOT, relativePath.url);
  if (!fs.existsSync(fullPath)) throw Errors.notFound("File missing on disk");

  return { fullPath, downloadName: `${relativePath.name}` };
};
