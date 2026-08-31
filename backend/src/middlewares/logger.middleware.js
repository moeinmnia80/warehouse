import fs from "fs";
import path from "path";
import chalk from "chalk";

import env from "../config/env.js";

const isProduction = env.nodeEnv === "production";

let logStream = null;

if (!isProduction) {
  try {
    const LOG_DIR = path.join(process.cwd(), "logs");
    const LOG_FILE = path.join(LOG_DIR, "access.log");

    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    logStream = fs.createWriteStream(LOG_FILE, { flags: "a" });
  } catch (err) {
    console.error("Failed to setup local log file:", err);
  }
}

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    let statusColor = chalk.green;
    if (statusCode >= 500) statusColor = chalk.red;
    else if (statusCode >= 400) statusColor = chalk.yellow;
    else if (statusCode >= 300) statusColor = chalk.cyan;

    const consoleMsg = `[${new Date().toISOString()}] [${
      req.id || "N/A"
    }] ${req.method} ${req.originalUrl} - ${statusColor(statusCode)} - ${duration}ms`;

    const fileMsg = `[${new Date().toISOString()}] [${
      req.id || "N/A"
    }] ${req.method} ${req.originalUrl} - ${statusCode} - ${duration}ms \n`;

    console.log(consoleMsg);

    if (!isProduction && logStream) {
      logStream.write(fileMsg);
    }
  });

  next();
}
