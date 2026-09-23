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
import { router as paymentRouter } from "./modules/payment/payment.routes.js";
import { router as shippingRouter } from "./modules/shipping/shipping.routes.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use((req, res, next) => {
  const allowedOrigins = [
    env.clientUrl,
    "https://warehouse-markist.vercel.app",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(appLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.cookieKey));

app.use(requestId);
app.use(requestLogger);

// ───── Routes ──────────────────────────────────────────
app.use("/auth", authRouter);
app.use("/user", authenticate, userRouter);
app.use("/my-suite", authenticate, suiteRouter);
app.use("/payment", paymentRouter);
app.use("/shipping", authenticate, shippingRouter);

app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server is running correctly" });
});

// ───── 404 ─────────────────────────────────────────────
app.use(notFound);

// ── Error handler ──────────────────────────────────────
app.use(errorHandler);

// ── uncaughtException  ─────────────────────────────────
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

export default app;
