import { token } from "./token.js";

export function renderLayout({ previewText = "", title, badge, bodyHtml }) {
  const badgeRowHtml = badge
    ? `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td></td>
            <td align="right" style="padding-bottom:16px;">
              <span style="display:inline-block; padding:3px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.4px; color:${badge.text}; background-color:${badge.bg}; border:1px solid ${badge.border};">
                ${badge.label}
              </span>
            </td>
          </tr>
        </table>`
    : "";

  return `
        <!DOCTYPE html>
        <html dir="ltr" lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${token.brand.name}</title>
          </head>
          <body style="margin:0; padding:0; background-color:${token.color.bSecondary}; font-family:${token.font};">
            <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
              ${previewText}
            </div>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${token.color.bSecondary}; padding:32px 16px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" style="max-width:520px;" cellpadding="0" cellspacing="0">

                    <tr>
                      <td style="padding-bottom:24px;" align="center">
                        <div style="font-size:22px; font-weight:800; letter-spacing:0.5px; color:${token.color.txPrimary}; font-family:${token.font};">
                          ${token.brand.name}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="background-color:${token.color.bPrimary}; border:1px solid ${token.color.boPrimary}; border-radius:12px; padding:32px;">
                        ${badgeRowHtml}
                        <h2 style="margin:0 0 16px; color:${token.color.txPrimary}; font-size:20px; text-align:center;">${title}</h2>
                        ${bodyHtml}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:24px;" align="center">
                        <div style="font-size:12px; color:${token.color.txPlaceholder}; line-height:1.6;">
                          This is an automated email from ${token.brand.name}.<br />
                          © ${new Date().getFullYear()} ${token.brand.name}. All rights reserved.
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
    `;
}
