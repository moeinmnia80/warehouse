import { Errors } from "./errors.js";
import { transporter } from "../config/transporter.js";

import { otpTemplate } from "../templates/email/otp.js";
import { loginAlertTemplate } from "../templates/email/login.js";
import { registerTemplate } from "../templates/email/register.js";

import env from "../config/env.js";

export const TEMPLATE_REGISTRY = {
  OTP: otpTemplate,
  REGISTER: registerTemplate,
  LOGIN_ALERT: loginAlertTemplate,
};

export const sendDynamicEmail = async (toEmail, type, data = {}) => {
  if (!toEmail) throw Errors.notFound("Email");

  const buildTemplate = TEMPLATE_REGISTRY[type];
  if (!buildTemplate) throw Errors.badRequest(`Unknown email type "${type}"`);

  const template = buildTemplate(data);

  const mailOptions = {
    from: env.smtpUser,
    to: toEmail,
    subject: template.subject,
    html: template.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error };
  }
};
