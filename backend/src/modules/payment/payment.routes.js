import { Router } from "express";

import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  prepareAddCardController,
  saveCardToDatabaseController,
  handleStripeWebhookController,
  processPaymentCheckoutController,
} from "./payment.controller.js";

export const router = Router();

router.post("/prepare-add-card", authenticate, prepareAddCardController);
router.post("/save-card", authenticate, saveCardToDatabaseController);
router.post("/checkout", authenticate, processPaymentCheckoutController);
router.post("/webhooks", handleStripeWebhookController);
