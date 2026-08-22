import multer from "multer";

import { Errors } from "../utils/errors.js";

const makeStorage = () => multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    return cb(Errors.badRequest("Only JPEG, PNG, or WEBP images are allowed"));
  }
  cb(null, true);
};

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(Errors.badRequest("Only PDF files are allowed"));
  }
  cb(null, true);
};

export const uploadPackageImages = multer({
  storage: makeStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 },
}).array("images", 5);

export const uploadPackagePdf = multer({
  storage: makeStorage(),
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1024 * 1024, files: 3 },
}).array("packagePdf", 3);

export const uploadInvoicePdf = multer({
  storage: makeStorage(),
  fileFilter: pdfFileFilter,
  limits: { fileSize: 1024 * 1024, files: 1 },
}).single("invoice");
