import nodemailer from "nodemailer";

import env from "./env.js";

export const transporter = nodemailer.createTransport({
  host: env.smtpHost || "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});
export async function verifyTransporter() {
  await transporter.verify();
}
