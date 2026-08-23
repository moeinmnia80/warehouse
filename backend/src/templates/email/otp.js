import { token } from "./token.js";
import { renderLayout } from "./layout.js";

export function otpTemplate(data = {}) {
  if (!data.otpCode) throw new Error('otpTemplate: "otpCode" is required.');

  const expiresIn = data.expiresInMinutes || 5;

  const bodyHtml = `
    <p style="margin:0 0 20px; color:${token.color.txPlaceholder}; font-size:13px; text-align:center;">
      This code expires in ${expiresIn} minutes.
    </p>
    <div style="text-align:center; font-size:28px; font-weight:bold; letter-spacing:8px; color:${token.color.txPrimary}; background-color:${token.color.infoTint}; border:1px solid ${token.color.boPrimary}; padding:18px; border-radius:8px; margin:0 0 20px;">
      ${data.otpCode}
    </div>
    <div style="padding:12px 16px; background-color:${token.color.warningTint}; border-radius:8px; font-size:12px; color:${token.color.warning}; text-align:center;">
      Never share this code with anyone.
    </div>
  `;

  return {
    subject: "Your verification code 🔑",
    html: renderLayout({
      previewText: `Your verification code: ${data.otpCode}`,
      title: "Verification Code",
      badge: { label: "VERIFICATION", ...token.color.badge.info },
      bodyHtml,
    }),
  };
}
