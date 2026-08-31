import { catchAsync } from "../../utils/async.js";
import {
  prepareAddCard,
  processPaymentCheckout,
  saveCardToDatabase,
} from "./payment.services.js";

export const prepareAddCardController = catchAsync(async (req, res) => {
  const result = await prepareAddCard(req);
  res.status(201).json(result);
});

export const saveCardToDatabaseController = catchAsync(async (req, res) => {
  const result = await saveCardToDatabase(req);
  res.status(200).json(result);
});

export const processPaymentCheckoutController = catchAsync(async (req, res) => {
  const result = await processPaymentCheckout(req);
  res.status(200).json(result);
});

export const handleStripeWebhookController = catchAsync(async (req, res) => {
  const result = await processStripeWebhook(req);
  res.status(200).json(result);
});
