import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { Errors } from "../utils/errors.js";

const makeStorage = () =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const { packageId } = req.params;
      const dir = path.join(process.cwd(), "uploads", "packages", packageId);
      fs.mkdirSync(dir, { recursive: true }); // creates the per-package folder if missing
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  });

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

// SUITE: up to 5 images per package
export const uploadPackageImages = multer({
  storage: makeStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 },
}).array("images", 5);

// SUITE: pdf(s) per package
export const uploadPackagePdf = multer({
  storage: makeStorage(),
  fileFilter: pdfFileFilter,
  limits: { fileSize: 10 * 1024 * 1024, files: 3 },
}).array("packagePdf", 3);

// SHIPPING: 1 pdf invoice, admin uploads it
export const uploadInvoicePdf = multer({
  storage: makeStorage(),
  fileFilter: pdfFileFilter,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
}).single("invoice");
