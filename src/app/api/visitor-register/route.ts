import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const fullName = `${title} ${firstName} ${lastName}`.trim();

    // 1. Admin notification email
    const adminMailOptions = {
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[IMD 2027 Visitor Pass Registration] ${fullName} - ${companyName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f6f5f0; margin: 0; padding: 20px; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ded8; padding: 32px; border-radius: 6px; }
            .badge { display: inline-block; background: #84c52c; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
            .header { border-bottom: 2px solid #84c52c; padding-bottom: 16px; margin-bottom: 24px; }
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
              <div class="field-value"><a href="tel:${mobileNumber}" style="color: #2546e5;">${mobileNumber}</a></div>
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

    // 2. Confirmation email to visitor
    try {
      const visitorMailOptions = {
        from: fromEmail,
        to: email,
        subject: `Thank you for Registering! We will contact you soon - India Mushroom Days 2027`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f6f5f0; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ded8; padding: 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              .header { border-bottom: 2px solid #34a853; padding-bottom: 16px; margin-bottom: 20px; }
              .thank-you-banner { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px 18px; border-radius: 4px; margin: 18px 0; }
              .thank-you-banner h3 { margin: 0 0 6px 0; color: #15803d; font-size: 16px; }
              .thank-you-banner p { margin: 0; color: #166534; font-size: 13.5px; }
              .details-box { background: #fafafa; border: 1px solid #eaeaea; padding: 18px; border-radius: 6px; margin: 20px 0; }
              .field-row { display: flex; border-bottom: 1px solid #eee; padding: 8px 0; font-size: 13.5px; }
              .field-row:last-child { border-bottom: none; }
              .field-label { width: 140px; color: #777; font-weight: 600; }
              .field-val { flex: 1; color: #222; font-weight: 500; }
              .footer { font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0; color: #111; font-size: 22px;">India Mushroom Days 2027</h2>
                <div style="color: #34a853; font-weight: bold; font-size: 13px; text-transform: uppercase; margin-top: 4px;">Visitor Registration Confirmation</div>
              </div>

              <p style="font-size: 15px;">Dear <strong>${fullName}</strong>,</p>

              <div class="thank-you-banner">
                <h3>Thank you for registering!</h3>
                <p>We have received your registration details. Our team will contact you soon with entry details, event schedule, and visitor updates.</p>
              </div>

              <p style="font-size: 14px; color: #444;">
                Here is a summary of the registration details you provided:
              </p>

              <div class="details-box">
                <div class="field-row">
                  <div class="field-label">Name:</div>
                  <div class="field-val">${fullName}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Company / Farm:</div>
                  <div class="field-val">${companyName}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Designation / Role:</div>
                  <div class="field-val">${designation}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Mobile Number:</div>
                  <div class="field-val">+91 ${mobileNumber}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Email Address:</div>
                  <div class="field-val">${email}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">City, State:</div>
                  <div class="field-val">${city}, ${state}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Event Dates:</div>
                  <div class="field-val">19 - 21 February 2027</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Venue:</div>
                  <div class="field-val">Delhi, India</div>
                </div>
              </div>

              <p style="font-size: 13.5px; color: #555;">
                If you have any urgent queries, please feel free to reach out to us at <a href="mailto:reachout@mushex.in" style="color: #34a853; font-weight: 600;">reachout@mushex.in</a>.
              </p>

              <div class="footer">
                <strong>Organizing Secretariat &bull; India Mushroom Days 2027</strong><br>
                Official Email: reachout@mushex.in &bull; Delhi, India
              </div>
            </div>
          </body>
          </html>
        `,
      };
      await transporter.sendMail(visitorMailOptions);
    } catch (confirmErr) {
      console.error("Visitor confirmation email send error:", confirmErr);
    }

    return NextResponse.json({
      success: true,
      message: "Visitor pass registered successfully!",
    });
  } catch (error: any) {
    console.error("Error in /api/visitor-register:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process registration." },
      { status: 500 }
    );
  }
}
