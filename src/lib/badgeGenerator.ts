import QRCode from "qrcode";
import path from "path";
import fs from "fs";

export interface BadgeAttendee {
  fullName: string;
  companyName: string;
  designation?: string;
  city?: string;
  state?: string;
  country?: string;
  type: "visitor" | "stall";
  registrationCode: string;
  mobileNumber?: string;
  email: string;
}

/**
 * Generate a unique, professional registration code.
 * Example: IMD27-VIS-9SA4B8 or IMD27-EXH-3R7K21
 */
export function generateRegistrationCode(type: "visitor" | "stall"): string {
  const prefix = type === "visitor" ? "IMD27-VIS" : "IMD27-EXH";
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${randomPart}`;
}

/**
 * Generate a PNG Buffer of the QR Code encoding attendee pass verification payload.
 */
export async function generateQRCodeBuffer(payload: string): Promise<Buffer> {
  return QRCode.toBuffer(payload, {
    width: 320,
    margin: 2,
    errorCorrectionLevel: "M",
    color: {
      dark: "#0a110d",
      light: "#ffffff",
    },
  });
}

/**
 * Generate a Base64 Data URL for the QR Code.
 */
export async function generateQRCodeDataURL(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    width: 320,
    margin: 2,
    errorCorrectionLevel: "M",
    color: {
      dark: "#0a110d",
      light: "#ffffff",
    },
  });
}

/**
 * Create the QR code verification payload (readable by any smartphone scanner).
 */
export function createVerificationPayload(attendee: BadgeAttendee): string {
  const category = attendee.type === "visitor" ? "VISITOR" : "EXHIBITOR";

  return `EVENT: INDIA MUSHROOM DAYS 2027 & SHROOM CONNECT
CODE: ${attendee.registrationCode}
NAME: ${attendee.fullName}
ORG: ${attendee.companyName}
ROLE: ${attendee.designation || "Delegate"}
CATEGORY: ${category}
VENUE: New Delhi, India
DATES: 19-21 February 2027
STATUS: CONFIRMED
VERIFICATION: OFFICIAL SECRETIARAT PASS`;
}

/**
 * Generate the Complete Confirmation Email HTML containing the M-Badge card.
 */
export function generateConfirmationEmailHtml(
  attendee: BadgeAttendee,
  qrCid: string = "cid:badge-qrcode",
  logoCid: string = "cid:imdlogo"
): { html: string; text: string; subject: string } {
  const isVisitor = attendee.type === "visitor";
  const categoryTitle = isVisitor ? "Visitor" : "Exhibitor";
  const badgeCategoryLabel = isVisitor ? "VISITOR" : "EXHIBITOR";
  const categoryColor = isVisitor ? "#004aab" : "#ea580c";
  const headerBgColor = isVisitor ? "#0c140f" : "#1a2820";

  const subject = isVisitor
    ? `Your Official M-Badge & Registration Confirmation: India Mushroom Days 2027 [${attendee.registrationCode}]`
    : `Your Exhibitor M-Badge & Booth Registration Confirmation: India Mushroom Days 2027 [${attendee.registrationCode}]`;

  const text = `
Dear ${attendee.fullName},

We are pleased to confirm your registration for India Mushroom Days 2027 & Shroom Connect under the ${categoryTitle} Category. The event will be held from 19th to 21st Feb-2027 at New Delhi, India.

The Exhibition & Visiting timings are 10.00 A.M. to 6.00 P.M.
Your Unique Registration code: ${attendee.registrationCode}

Attached is your M-badge for the event.

Please present this M-badge and your Government ID / Business Card at the entrance upon your arrival.

Important: Please do not share this QR code with anyone.

Let's build together the future of India's Mushroom Industry!

Thank You

Team India Mushroom Days 2027
Secretariat Email: reachout@mushex.in | Helpline: +91 88601 15588
  `.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your M-Badge &bull; India Mushroom Days 2027</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f3ee;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #f4f3ee;">
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2ded5;" cellpadding="0" cellspacing="0">
          
          <!-- Top Brand Header Banner -->
          <tr>
            <td style="background-color: #0c140f; padding: 22px 30px; text-align: center; border-bottom: 3px solid #ff9f43;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <img src="${logoCid}" alt="India Mushroom Days 2027" width="160" style="display: block; max-width: 160px; height: auto; margin: 0 auto 8px auto;" />
                    <div style="color: #ff9f43; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">
                      Asia's Premier Edible &amp; Medicinal Mushroom Summit
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 32px 30px 20px 30px; font-size: 15px; line-height: 1.65; color: #2c322e;">
              <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0c140f;">
                Dear <strong>${attendee.fullName}</strong>,
              </p>
              <p style="margin: 0 0 16px 0;">
                We are pleased to confirm your registration for <strong>India Mushroom Days 2027 &amp; Shroom Connect</strong> under the <strong>${categoryTitle} Category</strong>. The event will be held from <strong>19th to 21st Feb-2027</strong> at <strong>New Delhi, India</strong>.
              </p>
              
              <!-- Quick Info Callout -->
              <table role="presentation" width="100%" style="background-color: #faf8f2; border: 1px solid #e7e2d4; border-radius: 10px; margin: 18px 0 22px 0;" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 14px 18px;">
                    <div style="font-size: 13.5px; color: #374151; margin-bottom: 6px;">
                      🕒 <strong>Exhibition &amp; Visiting Timings:</strong> 10.00 A.M. to 6.00 P.M.
                    </div>
                    <div style="font-size: 13.5px; color: #374151;">
                      🎫 <strong>Your Unique Registration Code:</strong> <span style="font-family: monospace; font-weight: 800; color: #004aab; font-size: 14.5px; background: #e0edff; padding: 2px 7px; border-radius: 4px;">${attendee.registrationCode}</span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 8px 0; font-weight: 600; color: #0c140f;">
                Attached is your official M-badge for the event:
              </p>
            </td>
          </tr>

          <!-- ==================== OFFICIAL M-BADGE CARD ==================== -->
          <tr>
            <td align="center" style="padding: 0 24px 30px 24px;">
              <table role="presentation" width="100%" style="max-width: 360px; background-color: #ffffff; border: 3px solid #0c140f; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 36px rgba(12,20,15,0.18); margin: 0 auto;" cellpadding="0" cellspacing="0">
                
                <!-- Badge Top Strip: Institutional Recognition -->
                <tr>
                  <td style="background: linear-gradient(135deg, #f8f6f0 0%, #ede8dc 100%); padding: 10px 14px; border-bottom: 2px solid #0c140f;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 9px; color: #5a655c; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      <tr>
                        <td width="33%" align="left" style="color: #6b7280;">Supported By<br><strong style="color: #111827; font-size: 9.5px;">Agro Ministry</strong></td>
                        <td width="34%" align="center" style="color: #6b7280;">Secretariat<br><strong style="color: #111827; font-size: 9.5px;">IMD &amp; Connect</strong></td>
                        <td width="33%" align="right" style="color: #6b7280;">Host City<br><strong style="color: #111827; font-size: 9.5px;">New Delhi</strong></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Badge Brand Header -->
                <tr>
                  <td align="center" style="padding: 20px 18px 12px 18px; text-align: center; background-color: #ffffff;">
                    <img src="${logoCid}" alt="India Mushroom Days 2027" width="135" style="display: block; margin: 0 auto 10px auto; max-width: 135px; height: auto;" />
                    
                    <div style="font-size: 19px; font-weight: 900; color: #0c140f; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.15; font-family: 'Plus Jakarta Sans', Arial, sans-serif;">
                      INDIA MUSHROOM DAYS
                    </div>
                    <div style="font-size: 16px; font-weight: 900; color: #ff9f43; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">
                      2027
                    </div>
                    <div style="font-size: 11px; font-weight: 700; color: #004aab; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">
                      Shroom Connect B2B Conclave
                    </div>
                  </td>
                </tr>

                <!-- Attendee Highlight -->
                <tr>
                  <td align="center" style="padding: 10px 20px 14px 20px; text-align: center;">
                    <div style="border-top: 1px solid #f0eee6; padding-top: 14px;">
                      <div style="font-size: 21px; font-weight: 900; color: ${categoryColor}; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.25;">
                        ${attendee.fullName}
                      </div>
                      <div style="font-size: 13px; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 6px; line-height: 1.35;">
                        ${attendee.companyName}
                      </div>
                      ${
                        attendee.designation
                          ? `<div style="font-size: 11.5px; color: #6b7280; font-weight: 600; margin-top: 3px;">${attendee.designation}</div>`
                          : ""
                      }
                      ${
                        attendee.city && attendee.state
                          ? `<div style="font-size: 11px; color: #9ca3af; font-weight: 500; margin-top: 2px;">📍 ${attendee.city}, ${attendee.state}</div>`
                          : ""
                      }
                    </div>
                  </td>
                </tr>

                <!-- Center QR Code Box -->
                <tr>
                  <td align="center" style="padding: 6px 20px 12px 20px;">
                    <div style="display: inline-block; background-color: #ffffff; padding: 12px; border-radius: 14px; border: 2px solid #0c140f; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
                      <img src="${qrCid}" alt="Entry QR Code" width="180" height="180" style="display: block; width: 180px; height: 180px; margin: 0 auto;" />
                    </div>
                    
                    <!-- Registration Code string directly under QR -->
                    <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 14px; font-weight: 800; color: #0c140f; letter-spacing: 2px; margin-top: 8px;">
                      ${attendee.registrationCode}
                    </div>
                  </td>
                </tr>

                <!-- Event Dates, Venue & Hours -->
                <tr>
                  <td align="center" style="padding: 4px 20px 16px 20px; text-align: center;">
                    <div style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.3;">
                      19 – 21 February, 2027
                    </div>
                    <div style="font-size: 13.5px; font-weight: 700; color: #4b5563; margin-top: 2px;">
                      New Delhi, India
                    </div>
                    <div style="font-size: 12px; font-weight: 600; color: #6b7280; margin-top: 3px;">
                      Visiting Hours: 10:00 AM – 6:00 PM
                    </div>
                  </td>
                </tr>

                <!-- Bottom Solid Category Ribbon -->
                <tr>
                  <td style="background-color: ${categoryColor}; color: #ffffff; text-align: center; padding: 15px 16px; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; border-top: 3px solid #0c140f;">
                    ${badgeCategoryLabel}
                  </td>
                </tr>

              </table>
            </td>
          </tr>
          <!-- ==================== END M-BADGE CARD ==================== -->

          <!-- Entry Instructions & Notes -->
          <tr>
            <td style="padding: 0 30px 24px 30px; font-size: 14px; line-height: 1.6; color: #374151;">
              <div style="background-color: #fef8ee; border-left: 4px solid #ff9f43; padding: 12px 16px; border-radius: 6px; margin-bottom: 18px;">
                <p style="margin: 0; font-size: 13.5px; color: #92400e;">
                  📌 <strong>Arrival Instruction:</strong> Please present this M-badge (on your smartphone or printed) along with a valid Government Photo ID / Business Card at the reception counter for express entry wristband / lanyard issuance.
                </p>
              </div>

              <p style="margin: 0 0 12px 0; font-size: 13px; color: #dc2626; font-weight: 600;">
                ⚠️ Important: Please do not share this QR code with anyone.
              </p>

              <p style="margin: 0 0 18px 0; font-size: 15px; font-weight: 700; color: #0c140f;">
                Let's build together the future of India's Mushroom Industry!
              </p>

              <p style="margin: 0; font-size: 14px; color: #4b5563;">
                Thank You,<br>
                <strong style="color: #0c140f;">Team India Mushroom Days 2027</strong><br>
                <span style="font-size: 12.5px; color: #6b7280;">Organizing Secretariat &amp; Delegate Affairs</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf9f5; border-top: 1px solid #eeebe2; padding: 18px 30px; text-align: center; font-size: 12px; color: #78817a;">
              <div>
                <strong>India Mushroom Days 2027 &bull; Shroom Connect B2B Conclave</strong>
              </div>
              <div style="margin-top: 4px;">
                Official Inquiries: <a href="mailto:reachout@mushex.in" style="color: #004aab; text-decoration: none; font-weight: 600;">reachout@mushex.in</a> &bull; Secretariat Helpline: <strong>+91 88601 15588</strong>
              </div>
              <div style="margin-top: 4px; font-size: 11px; color: #a1a8a3;">
                New Delhi, India &bull; 19–20–21 February 2027
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { html, text, subject };
}

/**
 * Generate a Standalone Self-Contained Mobile Badge HTML file for download / attachment.
 */
export function generateStandaloneBadgeHtml(
  attendee: BadgeAttendee,
  qrBase64: string,
  logoBase64?: string
): string {
  const isVisitor = attendee.type === "visitor";
  const badgeCategoryLabel = isVisitor ? "VISITOR" : "EXHIBITOR";
  const categoryColor = isVisitor ? "#004aab" : "#ea580c";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMD 2027 M-Badge &bull; ${attendee.fullName}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0c140f;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 12px;
      color: #111;
    }
    .badge-card {
      width: 100%;
      max-width: 380px;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border: 3px solid #0c140f;
      text-align: center;
    }
    .top-strip {
      background: #f8f6f0;
      padding: 10px 16px;
      border-bottom: 2px solid #0c140f;
      display: flex;
      justify-content: space-between;
      font-size: 9.5px;
      color: #6b7280;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .top-strip strong { color: #111827; display: block; font-size: 10px; margin-top: 1px; }
    .brand-header {
      padding: 22px 20px 14px 20px;
    }
    .brand-title {
      font-size: 21px;
      font-weight: 900;
      color: #0c140f;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.15;
    }
    .brand-year {
      font-size: 18px;
      font-weight: 900;
      color: #ff9f43;
      letter-spacing: 1.5px;
    }
    .brand-sub {
      font-size: 11.5px;
      font-weight: 800;
      color: #004aab;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 4px;
    }
    .attendee-box {
      padding: 14px 20px;
      border-top: 1px solid #f0eee6;
      border-bottom: 1px solid #f0eee6;
      background: #faf9f5;
    }
    .attendee-name {
      font-size: 23px;
      font-weight: 900;
      color: ${categoryColor};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.2;
    }
    .attendee-company {
      font-size: 14px;
      font-weight: 800;
      color: #111827;
      text-transform: uppercase;
      margin-top: 5px;
      letter-spacing: 0.6px;
    }
    .attendee-role {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      margin-top: 3px;
    }
    .qr-container {
      padding: 16px 20px 10px 20px;
    }
    .qr-frame {
      display: inline-block;
      padding: 12px;
      background: #ffffff;
      border: 2px solid #0c140f;
      border-radius: 16px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }
    .qr-frame img {
      display: block;
      width: 190px;
      height: 190px;
    }
    .reg-code {
      font-family: monospace;
      font-size: 15px;
      font-weight: 800;
      color: #0c140f;
      letter-spacing: 2px;
      margin-top: 10px;
    }
    .event-info {
      padding: 8px 20px 16px 20px;
      font-size: 14px;
      color: #374151;
    }
    .event-dates { font-weight: 800; font-size: 15px; color: #111827; }
    .event-venue { font-weight: 700; color: #4b5563; margin-top: 2px; }
    .event-hours { font-size: 12.5px; font-weight: 600; color: #6b7280; margin-top: 2px; }
    .category-ribbon {
      background: ${categoryColor};
      color: #ffffff;
      padding: 16px 14px;
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 3px;
      text-transform: uppercase;
      border-top: 3px solid #0c140f;
    }
    .actions-bar {
      margin-top: 20px;
      display: flex;
      gap: 12px;
    }
    .btn {
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-print {
      background: #ff9f43;
      color: #ffffff;
    }
    .btn-print:hover { background: #f28822; }
    @media print {
      body { background: #ffffff; padding: 0; }
      .actions-bar { display: none !important; }
      .badge-card { box-shadow: none; border: 1px solid #ccc; max-width: 420px; }
    }
  </style>
</head>
<body>
  <div class="badge-card">
    <div class="top-strip">
      <div>Supported By<br><strong>Agro Ministry</strong></div>
      <div>Secretariat<br><strong>IMD &amp; Connect</strong></div>
      <div>Host City<br><strong>New Delhi</strong></div>
    </div>

    <div class="brand-header">
      <div class="brand-title">India Mushroom Days</div>
      <div class="brand-year">2027</div>
      <div class="brand-sub">Shroom Connect B2B Conclave</div>
    </div>

    <div class="attendee-box">
      <div class="attendee-name">${attendee.fullName}</div>
      <div class="attendee-company">${attendee.companyName}</div>
      ${attendee.designation ? `<div class="attendee-role">${attendee.designation}</div>` : ""}
      ${attendee.city ? `<div class="attendee-role" style="font-size: 11px;">📍 ${attendee.city}, ${attendee.state || "India"}</div>` : ""}
    </div>

    <div class="qr-container">
      <div class="qr-frame">
        <img src="${qrBase64}" alt="Entry QR Code" />
      </div>
      <div class="reg-code">${attendee.registrationCode}</div>
    </div>

    <div class="event-info">
      <div class="event-dates">19 – 21 February, 2027</div>
      <div class="event-venue">New Delhi, India</div>
      <div class="event-hours">Visiting Hours: 10:00 AM – 6:00 PM</div>
    </div>

    <div class="category-ribbon">
      ${badgeCategoryLabel}
    </div>
  </div>

  <div class="actions-bar">
    <button class="btn btn-print" onclick="window.print()">🖨️ Print / Save Pass PDF</button>
  </div>
</body>
</html>`;
}
