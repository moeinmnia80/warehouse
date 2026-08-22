import { Router } from "express";
import {
  getSuiteController,
  getImagesController,
  getInvoiceController,
  createSuiteController,
  addPackagePdfController,
  addPackageImagesController,
} from "./suite.controller.js";
import {
  uploadPackageImages,
  uploadPackagePdf,
} from "../../middlewares/upload.middleware.js";

export const router = Router();

router.get("/", getSuiteController);
router.post("/create", createSuiteController);
// route
router.get("/packages/:packageId/invoice/:fileName", getInvoiceController);
router.get("/packages/:packageId/images/:fileName", getImagesController);
router.post(
  "/packages/:packageId/images",
  uploadPackageImages,
  addPackageImagesController,
);
router.post(
  "/packages/:packageId/pdf",
  uploadPackagePdf,
  addPackagePdfController,
);
