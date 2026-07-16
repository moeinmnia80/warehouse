import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { uploadInvoicePdf } from "../../middlewares/upload.middleware.js";
import {
  createShippingController,
  getShippingHistory,
  addInvoiceController,
  downloadInvoiceController,
} from "./shipping.controller.js";

export const router = Router();

router.get("/", authenticate, getShippingHistory);
router.post("/create", authenticate, createShippingController);

router.post(
  "/:shipmentId/invoice",
  authenticate,
  authorize,
  uploadInvoicePdf,
  addInvoiceController,
);
router.get(
  "/:shipmentId/invoice/download",
  authenticate,
  downloadInvoiceController,
);
