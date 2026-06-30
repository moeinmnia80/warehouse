import express from "express";
import helmet from "helmet";
import cors from "cors";

import corsOption from "./config/cors.js";

const app = express();

app.use(helmet());
app.use(cors(corsOption));
app.use(express.json({ limit: "1mg" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set("X-Request-Id", crypto.randomUUID());
  next();
});

// Routes

app.use((req, res) => {
  res.status(404).json("Route Not Found !!");
});

export default app;
