import { Router } from "express";
import { authorize } from "../../middlewares/auth.middleware.js";
import { uploadInvoicePdf } from "../../middlewares/upload.middleware.js";
import {
  createShippingController,
  getShippingHistory,
  addInvoiceController,
  downloadInvoiceController,
} from "./shipping.controller.js";

export const router = Router();

router.get("/", getShippingHistory);
router.post("/create", createShippingController);

router.post(
  "/:shipmentId/invoice",
  authorize,
  uploadInvoicePdf,
  addInvoiceController,
);
router.get("/:shipmentId/invoice/download", downloadInvoiceController);
