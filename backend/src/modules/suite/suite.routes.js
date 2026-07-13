import { Router } from "express";
import {
  createSuiteController,
  getSuiteController,
} from "./suite.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

export const router = Router();

router.get("/", authenticate, getSuiteController);
router.post("/create", authenticate, createSuiteController);
router.post("/remove", authenticate, (req, res) => {});
