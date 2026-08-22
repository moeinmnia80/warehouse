import path from "path";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";

import env from "./config/env.js";
import corsOption from "./config/cors.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { appLimiter } from "./middlewares/limiter.middleware.js";
import { requestId } from "./middlewares/requestId.middleware.js";
import { requestLogger } from "./middlewares/logger.middleware.js";

import { router as authRouter } from "./modules/auth/auth.routes.js";
import { router as userRouter } from "./modules/user/user.routes.js";
import { router as suiteRouter } from "./modules/suite/suite.routes.js";
import { router as shippingRouter } from "./modules/shipping/shipping.routes.js";

const app = express();

app.use(helmet());
app.use(cors(corsOption));
app.use(appLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.cookieKey));

app.use(requestId);
app.use(requestLogger);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// ───── Routes ──────────────────────────────────────────
app.use("/auth", authenticate, authRouter);
app.use("/user", authenticate, userRouter);
app.use("/my-suite", authenticate, suiteRouter);
app.use("/shipping", authenticate, shippingRouter);
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
