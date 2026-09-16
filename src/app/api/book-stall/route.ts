import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveLead } from "@/lib/leadsStore";

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

    // Save lead to Admin Leads Store
    try {
      await saveLead("stall", {
        name,
        companyName,
        exhibitorCategory,
        position,
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
      subject: `[IMD 2027 Stall Booking Request] ${companyName} (${requiredStallSpace}) - ${name}`,
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
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #ff9f43;">Requested Stall Space</div>
              <div style="font-size: 18px; font-weight: 800; color: #111;">${requiredStallSpace}</div>
              <div style="font-size: 12px; color: #555; margin-top: 4px;">Preferred Contact: <strong>${contactPreference}</strong></div>
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
              <div class="field-value"><a href="tel:${phone}" style="color: #ff9f43;">${phone}</a></div>
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
              This stall booking request was submitted via the official India Mushroom Days 2027 website.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Confirmation email to exhibitor
    try {
      const exhibitorMailOptions = {
        from: fromEmail,
        to: email,
        subject: `Thank you for your Stall Booking Request! We will contact you soon - India Mushroom Days 2027`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f6f5f0; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ded8; padding: 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              .header { border-bottom: 2px solid #ff9f43; padding-bottom: 16px; margin-bottom: 20px; }
              .thank-you-banner { background: #fff7ed; border-left: 4px solid #f97316; padding: 14px 18px; border-radius: 4px; margin: 18px 0; }
              .thank-you-banner h3 { margin: 0 0 6px 0; color: #c2410c; font-size: 16px; }
              .thank-you-banner p { margin: 0; color: #9a3412; font-size: 13.5px; }
              .details-box { background: #fafafa; border: 1px solid #eaeaea; padding: 18px; border-radius: 6px; margin: 20px 0; }
              .field-row { display: flex; border-bottom: 1px solid #eee; padding: 8px 0; font-size: 13.5px; }
              .field-row:last-child { border-bottom: none; }
              .field-label { width: 160px; color: #777; font-weight: 600; }
              .field-val { flex: 1; color: #222; font-weight: 500; }
              .footer { font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0; color: #111; font-size: 22px;">India Mushroom Days 2027</h2>
                <div style="color: #ff9f43; font-weight: bold; font-size: 13px; text-transform: uppercase; margin-top: 4px;">Exhibitor Stall Booking Application</div>
              </div>

              <p style="font-size: 15px;">Dear <strong>${name}</strong>,</p>

              <div class="thank-you-banner">
                <h3>Thank you for your stall booking request!</h3>
                <p>We have successfully received your booking request for <strong>${companyName}</strong>. Our exhibition management team will contact you soon via <strong>${contactPreference}</strong> with the stall layout floor plan, booth packages, and space allocation details.</p>
              </div>

              <p style="font-size: 14px; color: #444;">
                Here is a summary of the booking details you submitted:
              </p>

              <div class="details-box">
                <div class="field-row">
                  <div class="field-label">Contact Person:</div>
                  <div class="field-val">${name}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Company Name:</div>
                  <div class="field-val">${companyName}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Position / Role:</div>
                  <div class="field-val">${position}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Category:</div>
                  <div class="field-val">${exhibitorCategory}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Required Space:</div>
                  <div class="field-val"><strong>${requiredStallSpace}</strong></div>
                </div>
                <div class="field-row">
                  <div class="field-label">Preferred Contact:</div>
                  <div class="field-val">${contactPreference}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Phone Number:</div>
                  <div class="field-val">+91 ${phone}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Email Address:</div>
                  <div class="field-val">${email}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Address & City:</div>
                  <div class="field-val">${address}, ${city} – ${pinCode} (${country})</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Event Dates:</div>
                  <div class="field-val">19 - 21 February 2027</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Venue:</div>
                  <div class="field-val">New Delhi, India</div>
                </div>
              </div>

              <p style="font-size: 13.5px; color: #555;">
                For immediate space reservation assistance, you can also reach us directly at <a href="mailto:reachout@mushex.in" style="color: #ff9f43; font-weight: 600;">reachout@mushex.in</a> or call our helpline at <strong>+91 98107 26996</strong>.
              </p>

              <div class="footer">
                <strong>Exhibitor Secretariat &bull; India Mushroom Days 2027</strong><br>
                Official Email: reachout@mushex.in &bull; Helpline: +91 98107 26996 &bull; New Delhi, India
              </div>
            </div>
          </body>
          </html>
        `,
      };
      await transporter.sendMail(exhibitorMailOptions);
    } catch (confirmErr) {
      console.error("Exhibitor confirmation email send error:", confirmErr);
    }

    return NextResponse.json({
      success: true,
      message: "Stall booking request received successfully!",
    });
  } catch (error: any) {
    console.error("Error in /api/book-stall:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process stall booking request." },
      { status: 500 }
    );
  }
}
