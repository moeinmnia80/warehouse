import express from "express";
import helmet from "helmet";
import cors from "cors";

import corsOption from "./config/cors.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import { router as authRouter } from "./modules/auth/auth.routes.js";

const app = express();

app.use(helmet());
app.use(cors(corsOption));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set("X-Request-Id", crypto.randomUUID());
  next();
});

// ───── Routes ──────────────────────────────────────────
app.use("/auth", authRouter);
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
