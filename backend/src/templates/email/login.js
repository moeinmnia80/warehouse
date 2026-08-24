import { token } from "./token.js";
import { renderLayout } from "./layout.js";

export function loginAlertTemplate(data = {}) {
  if (!data.name) throw new Error('loginAlertTemplate: "name" is required.');

  const date = data.date || new Date().toLocaleString("en-US");

  const bodyHtml = `
    <p style="margin:0 0 16px; color:${token.color.txSecondary}; font-size:14px; line-height:1.8; text-align:center;">
      Hi ${data.name}, we noticed a new sign-in to your account.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px; color:${token.color.txPrimary}; margin:16px 0; border:1px solid ${token.color.boPrimary}; border-radius:8px;">
      <tr>
        <td style="padding:10px 14px; color:${token.color.txPlaceholder}; border-bottom:1px solid ${token.color.boPrimary};">Time</td>
        <td style="padding:10px 14px; text-align:right; border-bottom:1px solid ${token.color.boPrimary};">${date}</td>
      </tr>
      ${data.device ? `<tr><td style="padding:10px 14px; color:${token.color.txPlaceholder}; border-bottom:1px solid ${token.color.boPrimary};">Device</td><td style="padding:10px 14px; text-align:right; border-bottom:1px solid ${token.color.boPrimary};">${data.device}</td></tr>` : ""}
      ${data.location ? `<tr><td style="padding:10px 14px; color:${token.color.txPlaceholder};">Approx. location</td><td style="padding:10px 14px; text-align:right;">${data.location}</td></tr>` : ""}
    </table>
    <div style="margin:24px 0; padding:16px; background-color:${token.color.errorTint}; border-radius:8px; font-size:13px; color:${token.color.error};">
      If this wasn't you, change your password immediately and contact support.
    </div>
  `;

  return {
    subject: "Security alert: new sign-in to your account 🔐",
    html: renderLayout({
      previewText: "A new sign-in to your account was detected",
      title: "New Sign-in Detected",
      badge: { label: "SECURITY", ...token.color.badge.error },
      bodyHtml,
    }),
  };
}
