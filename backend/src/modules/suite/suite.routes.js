import { Router } from "express";
import {
  getSuiteController,
  getImagesController,
  getInvoiceController,
  createSuiteController,
  addPackagePdfController,
  addPackageImagesController,
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
  "/packages/:packageId/invoice/:fileName",
  authenticate,
  getInvoiceController,
);
router.get(
  "/packages/:packageId/images/:fileName",
  authenticate,
  getImagesController,
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
