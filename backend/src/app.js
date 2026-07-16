import path from "path";
import cors from "cors";
import helmet from "helmet";
import express from "express";

import corsOption from "./config/cors.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import { router as authRouter } from "./modules/auth/auth.routes.js";
import { router as suiteRouter } from "./modules/suite/suite.routes.js";
import { router as shippingRouter } from "./modules/shipping/shipping.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";

const app = express();

app.use(helmet());
app.use(cors(corsOption));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set("X-Request-Id", crypto.randomUUID());
  next();
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// ───── Routes ──────────────────────────────────────────
app.use("/auth", authRouter);
app.use("/my-suite", suiteRouter);
app.use("/shipping", shippingRouter);
// ───── 404 ─────────────────────────────────────────────
app.use(notFound);
// ── Error handler ──────────────────────────────────────
app.use(errorHandler);
// ── uncaughtException  ─────────────────────────────────
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});
export default app;
