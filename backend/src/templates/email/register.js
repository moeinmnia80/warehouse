import { renderLayout } from "./layout.js";
import { token } from "./token.js";

export function registerTemplate(data = {}) {
  const name = data.name || "there";

  const bodyHtml = `
    <p style="margin:0 0 16px; color:${token.color.txSecondary}; font-size:14px; line-height:1.8; text-align:center;">
      Hi ${name}, welcome to ${token.brand.name}! Your account has been created and is ready to use.
    </p>
    <div style="margin:24px 0; padding:16px; background-color:${token.color.infoTint}; border-radius:8px; font-size:13px; color:${token.color.txSecondary};">
      You can now sign in to your dashboard and start managing your warehouse inventory and shipments.
    </div>
    <hr style="border:none; border-top:1px solid ${token.color.boPrimary}; margin:24px 0;" />
    <p style="margin:0; font-size:12px; color:${token.color.txPlaceholder};">— The ${token.brand.name} Support Team</p>
  `;

  return {
    subject: `Welcome to ${token.brand.name} 🎉`,
    html: renderLayout({
      previewText: "Your account has been created successfully",
      title: `Welcome to ${token.brand.name}`,
      badge: { label: "WELCOME", ...color.badge.success },
      bodyHtml,
    }),
  };
}
