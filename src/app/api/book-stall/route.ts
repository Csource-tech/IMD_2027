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
      name,
      companyName,
      exhibitorCategory,
      position,
      email,
      phone,
      address,
      country,
      city,
      pinCode,
      contactPreference,
      requiredStallSpace,
    } = body;

    // Validate required fields
    if (
      !name ||
      !companyName ||
      !exhibitorCategory ||
      !position ||
      !email ||
      !phone ||
      !address ||
      !country ||
      !city ||
      !pinCode ||
      !contactPreference ||
      !requiredStallSpace
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Strict regex validation
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanedPhone = String(phone).replace(/\D/g, "");
    if (cleanedPhone.length < 10 || cleanedPhone.length > 13) {
      return NextResponse.json(
        { error: "Please enter a valid phone number (at least 10 digits)." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(String(pinCode).trim())) {
      return NextResponse.json(
        { error: "PIN code must be a 6-digit number." },
        { status: 400 }
      );
    }

    const registrationCode = generateRegistrationCode("stall");

    // Save lead to Admin Leads Store
    try {
      await saveLead("stall", {
        registrationCode,
        name,
        fullName: name,
        companyName,
        exhibitorCategory,
        position,
        designation: position,
        email,
        phone: cleanedPhone,
        address,
        country,
        city,
        pinCode,
        contactPreference,
        requiredStallSpace,
      });
    } catch (storeErr) {
      console.error("Failed to save stall booking lead to store:", storeErr);
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
      subject: `[IMD 2027 Booth Booking - ${registrationCode}] ${companyName} (${requiredStallSpace}) - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f6f5f0; margin: 0; padding: 20px; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ded8; padding: 32px; border-radius: 6px; }
            .badge { display: inline-block; background: #ff9f43; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
            .header { border-bottom: 2px solid #ff9f43; padding-bottom: 16px; margin-bottom: 24px; }
            .header h2 { margin: 8px 0 0; color: #111; font-size: 22px; }
            .field-row { display: flex; border-bottom: 1px solid #f0eee9; padding: 10px 0; }
            .field-label { width: 180px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #777; }
            .field-value { flex: 1; font-size: 14px; color: #111; font-weight: 600; }
            .highlight-box { background: #fff8f0; border-left: 4px solid #ff9f43; padding: 14px; margin: 16px 0; }
            .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">Exhibitor Stall Space Booking</span>
              <h2>India Mushroom Days 2027 (IMD 2027)</h2>
              <p style="margin: 4px 0 0; color: #666; font-size: 13px;">Received: ${formattedTime}</p>
            </div>

            <div class="highlight-box">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #ff9f43;">Issued Registration Code</div>
              <div style="font-size: 18px; font-weight: 800; font-family: monospace; color: #111;">${registrationCode}</div>
              <div style="font-size: 12px; color: #555; margin-top: 4px;">Space: <strong>${requiredStallSpace}</strong> &bull; Preferred Contact: <strong>${contactPreference}</strong></div>
            </div>

            <div class="field-row">
              <div class="field-label">Contact Person</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Company Name</div>
              <div class="field-value">${companyName}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Exhibitor Category</div>
              <div class="field-value">${exhibitorCategory}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Position / Role</div>
              <div class="field-value">${position}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #ff9f43;">${email}</a></div>
            </div>

            <div class="field-row">
              <div class="field-label">Phone Number</div>
              <div class="field-value"><a href="tel:${cleanedPhone}" style="color: #ff9f43;">+91 ${cleanedPhone}</a></div>
            </div>

            <div class="field-row">
              <div class="field-label">Address</div>
              <div class="field-value">${address}</div>
            </div>

            <div class="field-row">
              <div class="field-label">City, PIN Code</div>
              <div class="field-value">${city} – ${pinCode}</div>
            </div>

            <div class="field-row">
              <div class="field-label">Country</div>
              <div class="field-value">${country}</div>
            </div>

            <div class="footer">
              This booth booking request was submitted via the official India Mushroom Days 2027 website.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Generate Exhibitor M-Badge and Confirmation Email for the Applicant
    try {
      const attendee: BadgeAttendee = {
        fullName: name,
        companyName,
        designation: position,
        city,
        country,
        type: "stall",
        registrationCode,
        mobileNumber: cleanedPhone,
        email,
      };

      // Create QR code buffer and payload
      const qrPayload = createVerificationPayload(attendee);
      const qrBuffer = await generateQRCodeBuffer(qrPayload);
      const qrBase64 = `data:image/png;base64,${qrBuffer.toString("base64")}`;

      // Generate customized M-Badge email and standalone pass HTML
      const { html: exhibitorEmailHtml, text: exhibitorEmailText, subject: exhibitorEmailSubject } =
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
          filename: `IMD2027-ExhibitorBadge-${registrationCode}.html`,
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

      const exhibitorMailOptions = {
        from: fromEmail,
        to: email,
        subject: exhibitorEmailSubject,
        text: exhibitorEmailText,
        html: exhibitorEmailHtml,
        attachments,
      };

      await transporter.sendMail(exhibitorMailOptions);
    } catch (confirmErr) {
      console.error("Exhibitor M-Badge confirmation email send error:", confirmErr);
    }

    return NextResponse.json({
      success: true,
      message: "Booth booking request received successfully! M-badge sent to email.",
      registrationCode,
    });
  } catch (error: any) {
    console.error("Error in /api/book-stall:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process booth booking request." },
      { status: 500 }
    );
  }
}
