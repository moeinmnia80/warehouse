import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  getUserAddressController,
  getUserPaymentMethodController,
} from "./user.controller.js";

export const router = Router();

router.get("/payment", authenticate, getUserPaymentMethodController);
router.get("/address", authenticate, getUserAddressController);
