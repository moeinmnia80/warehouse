import fs from "fs";
import path from "path";
import chalk from "chalk";

let logStream;
if (!isProduction) {
  const LOG_DIR = path.join(process.cwd(), "logs");
  const LOG_FILE = path.join(LOG_DIR, "access.log");

  const ensureLogDir = () => {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  };

  ensureLogDir();

  logStream = fs.createWriteStream(LOG_FILE, { flags: "a" });
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

    const consoleMsg = `[${new Date().toISOString()}] [${req.id || "N/A"}] ${req.method} ${req.url} - ${statusColor(statusCode)} - ${duration}ms`;

    const fileMsg = `[${new Date().toISOString()}] [${req.id || "N/A"}] ${req.method} ${req.url} - ${statusCode} - ${duration}ms\n`;

    console.log(consoleMsg);

    !isProduction && logStream.write(fileMsg);
  });

  next();
}
