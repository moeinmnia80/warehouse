import { Router } from "express";
import {
  createSuiteController,
  getSuiteController,
  addPackageImagesController,
  addPackagePdfController,
  downloadInvoiceController,
  getPackageIdImagesController,
} from "./suite.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  uploadPackageImages,
  uploadPackagePdf,
} from "../../middlewares/upload.middleware.js";

export const router = Router();

router.get("/", authenticate, getSuiteController);
router.post("/create", authenticate, createSuiteController);
// route
router.get(
  "/packages/:packageId/invoice/:fileName/download",
  authenticate,
  downloadInvoiceController,
);
router.get(
  "/packages/:packageId/images/:fileName",
  authenticate,
  getPackageIdImagesController,
);
router.post(
  "/packages/:packageId/images",
  authenticate,
  uploadPackageImages,
  addPackageImagesController,
);

router.post(
  "/packages/:packageId/pdf",
  authenticate,
  uploadPackagePdf,
  addPackagePdfController,
);
