import { Router } from "express";

import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  createShippingController,
  getShippingHistory,
} from "./shipping.controller.js";

export const router = Router();

router.get("/", authenticate, getShippingHistory);
router.post("/create", authenticate, createShippingController);
