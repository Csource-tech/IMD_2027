import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { saveLead } from "@/lib/leadsStore";
import {
  generateRegistrationCode,
  generateQRCodeBuffer,
  createVerificationPayload,
  generateConfirmationEmailHtml,
  generateStandaloneBadgeHtml,
  BadgeAttendee,
} from "@/lib/badgeGenerator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      firstName,
      lastName,
      designation,
      companyName,
      address,
      country,
      state,
      city,
      postalCode,
      mobileNumber,
      email,
    } = body;

    // Validate required fields
    if (
      !title ||
      !firstName ||
      !lastName ||
      !designation ||
      !companyName ||
      !country ||
      !state ||
      !city ||
      !mobileNumber ||
      !email
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Strict validation
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanedMobile = String(mobileNumber).replace(/\D/g, "");
    if (cleanedMobile.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (postalCode && !/^\d{6}$/.test(String(postalCode).trim())) {
      return NextResponse.json(
        { error: "Postal code must be a 6-digit number." },
        { status: 400 }
      );
    }

    const fullName = `${title} ${firstName} ${lastName}`.trim();
    const registrationCode = generateRegistrationCode("visitor");

    // Save lead to Admin Leads Store
    try {
      await saveLead("visitor", {
        registrationCode,
        title,
        firstName,
        lastName,
        fullName,
        designation,
        companyName,
        address: address || "",
        country,
        state,
        city,
        postalCode: postalCode || "",
        mobileNumber: cleanedMobile,
        email,
      });
    } catch (storeErr) {
      console.error("Failed to save visitor lead to store:", storeErr);
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER || "mushroomexchangeindia@gmail.com";
    const pass = process.env.SMTP_PASS || "lyxddnjhycdkoiwx";
    const toEmail = process.env.TO_EMAIL || "mushroomexchangeindia@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || `"India Mushroom Days 2027" <${user}>`;

    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const formattedTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 1. Admin notification email
    const adminMailOptions = {
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[IMD 2027 Visitor Pass - ${registrationCode}] ${fullName} - ${companyName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f6f5f0; margin: 0; padding: 20px; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ded8; padding: 32px; border-radius: 6px; }
            .badge { display: inline-block; background: #004aab; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
            .reg-box { background: #e0edff; border: 1px solid #b9d5ff; padding: 12px 16px; border-radius: 6px; margin: 16px 0; }
            .header { border-bottom: 2px solid #004aab; padding-bottom: 16px; margin-bottom: 24px; }
            .header h2 { margin: 8px 0 0; color: #111; font-size: 22px; }
            .field-row { display: flex; border-bottom: 1px solid #f0eee9; padding: 10px 0; }
            .field-label { width: 180px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #777; }
            .field-value { flex: 1; font-size: 14px; color: #111; font-weight: 600; }
            .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">Visitor Pass Registration</span>
              <h2>India Mushroom Days 2027 (IMD 2027)</h2>
              <p style="margin: 4px 0 0; color: #666; font-size: 13px;">Received: ${formattedTime}</p>
            </div>

            <div class="reg-box">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #004aab;">Issued Registration Code</div>
              <div style="font-size: 18px; font-weight: 800; font-family: monospace; color: #0f172a;">${registrationCode}</div>
              <div style="font-size: 12px; color: #555; margin-top: 2px;">Category: <strong>Visitor</strong></div>
            </div>

            <div class="field-row">
              <div class="field-label">Full Name</div>
              <div class="field-value">${fullName}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Designation / Role</div>
              <div class="field-value">${designation}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Company / Farm</div>
              <div class="field-value">${companyName}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #2546e5;">${email}</a></div>
            </div>

            <div class="field-row">
              <div class="field-label">Mobile Number</div>
              <div class="field-value"><a href="tel:${cleanedMobile}" style="color: #2546e5;">+91 ${cleanedMobile}</a></div>
            </div>

            <div class="field-row">
              <div class="field-label">Address</div>
              <div class="field-value">${address || "N/A"}</div>
            </div>

            <div class="field-row">
              <div class="field-label">City, State, Country</div>
              <div class="field-value">${city}, ${state}, ${country}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Postal Code</div>
              <div class="field-value">${postalCode || "N/A"}</div>
            </div>

            <div class="footer">
              This visitor registration was submitted via the official India Mushroom Days 2027 website.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Generate M-Badge and Confirmation Email for the Visitor
    try {
      const attendee: BadgeAttendee = {
        fullName,
        companyName,
        designation,
        city,
        state,
        country,
        type: "visitor",
        registrationCode,
        mobileNumber: cleanedMobile,
        email,
      };

      // Create QR code buffer and payload
      const qrPayload = createVerificationPayload(attendee);
      const qrBuffer = await generateQRCodeBuffer(qrPayload);
      const qrBase64 = `data:image/png;base64,${qrBuffer.toString("base64")}`;

      // Generate customized M-Badge email and standalone pass HTML
      const { html: visitorEmailHtml, text: visitorEmailText, subject: visitorEmailSubject } =
        generateConfirmationEmailHtml(attendee, "cid:badge-qrcode", "cid:imdlogo");

      const standaloneBadgeHtml = generateStandaloneBadgeHtml(attendee, qrBase64);

      // Prepare attachments with inline CID references
      const logoPath = path.join(process.cwd(), "public", "reallogo.png");
      const attachments: any[] = [
        {
          filename: "badge-qrcode.png",
          content: qrBuffer,
          cid: "badge-qrcode",
        },
        {
          filename: `IMD2027-MBadge-${registrationCode}.html`,
          content: Buffer.from(standaloneBadgeHtml, "utf-8"),
          contentType: "text/html",
        },
      ];

      if (fs.existsSync(logoPath)) {
        attachments.push({
          filename: "logo.png",
          path: logoPath,
          cid: "imdlogo",
        });
      }

      const visitorMailOptions = {
        from: fromEmail,
        to: email,
        subject: visitorEmailSubject,
        text: visitorEmailText,
        html: visitorEmailHtml,
        attachments,
      };

      await transporter.sendMail(visitorMailOptions);
    } catch (confirmErr) {
      console.error("Visitor M-Badge confirmation email send error:", confirmErr);
    }

    return NextResponse.json({
      success: true,
      message: "Visitor pass registered successfully! M-badge sent to email.",
      registrationCode,
    });
  } catch (error: any) {
    console.error("Error in /api/visitor-register:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process registration." },
      { status: 500 }
    );
  }
}
