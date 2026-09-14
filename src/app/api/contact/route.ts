import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveLead } from "@/lib/leadsStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, inquiryTopic, message } = body;

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All required fields must be provided." },
        { status: 400 }
      );
    }

    // Save lead to Admin Leads Store
    try {
      await saveLead("contact", {
        fullName,
        email,
        phone,
        inquiryTopic: inquiryTopic || "General Inquiry",
        message,
      });
    } catch (storeErr) {
      console.error("Failed to save contact lead to store:", storeErr);
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER || "mushroomexchangeindia@gmail.com";
    const pass = process.env.SMTP_PASS || "lyxddnjhycdkoiwx";
    const toEmail = process.env.TO_EMAIL || "mushroomexchangeindia@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || `"India Mushroom Days 2027" <${user}>`;
    const sendConfirmation = process.env.SEND_DELEGATE_CONFIRMATION === "true";

    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const formattedTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 1. Notification Email to the Secretariat / Admin
    const adminMailOptions = {
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[IMD 2027 Inquiry] ${inquiryTopic || "General Inquiry"} - ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f6f5f0; margin: 0; padding: 20px; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ded8; padding: 32px; border-radius: 4px; }
            .header { border-bottom: 2px solid #f28822; padding-bottom: 16px; margin-bottom: 24px; }
            .header h2 { margin: 0; color: #111; font-size: 22px; }
            .header p { margin: 4px 0 0; color: #f28822; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
            .field-group { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f0eee9; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 4px; }
            .value { font-size: 15px; color: #111; font-weight: 600; }
            .value a { color: #f28822; text-decoration: none; }
            .message-box { background: #faf9f6; border-left: 4px solid #f28822; padding: 16px; margin-top: 20px; white-space: pre-wrap; font-size: 14px; color: #333; }
            .footer { margin-top: 28px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Website Inquiry Submission</h2>
              <p>India Mushroom Days 2027 (IMD 2027)</p>
            </div>

            <div class="field-group">
              <div class="label">Full Name</div>
              <div class="value">${fullName}</div>
            </div>

            <div class="field-group">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>

            <div class="field-group">
              <div class="label">Phone / WhatsApp</div>
              <div class="value"><a href="tel:${phone}">${phone}</a></div>
            </div>

            <div class="field-group">
              <div class="label">Inquiry Topic</div>
              <div class="value">${inquiryTopic || "General Inquiry"}</div>
            </div>

            <div class="field-group">
              <div class="label">Submission Date &amp; Time (IST)</div>
              <div class="value" style="font-weight: 400; color: #555;">${formattedTime}</div>
            </div>

            <div class="label">Message</div>
            <div class="message-box">${message}</div>

            <div class="footer">
              This message was sent from the India Mushroom Days 2027 official website contact form.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Optional Confirmation Email to the Delegate / Sender
    if (sendConfirmation && email) {
      try {
        const delegateMailOptions = {
          from: fromEmail,
          to: email,
          subject: `Inquiry Received - India Mushroom Days 2027 (IMD 2027)`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f6f5f0; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0ded8; padding: 32px; }
                .header { border-bottom: 2px solid #f28822; padding-bottom: 16px; margin-bottom: 20px; }
                .header h2 { margin: 0; color: #111; font-size: 20px; }
                .info-box { background: #faf9f6; border: 1px solid #e6e3da; padding: 18px; margin: 20px 0; font-size: 14px; }
                .footer { font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>India Mushroom Days 2027 (IMD 2027)</h2>
                  <div style="font-size: 12px; color: #f28822; font-weight: 700; text-transform: uppercase;">Official Secretariat</div>
                </div>

                <p>Dear <strong>${fullName}</strong>,</p>

                <p>
                  Thank you for contacting the secretariat of <strong>India Mushroom Days 2027 (IMD 2027)</strong>. We have received your inquiry regarding <strong>${inquiryTopic || "General Inquiry"}</strong>.
                </p>

                <p>
                  Our secretariat team is reviewing your requirements and will respond within <strong>4–6 business hours</strong>.
                </p>

                <div class="info-box">
                  <div style="font-weight: 700; color: #111; margin-bottom: 8px;">Event &amp; Secretariat Details:</div>
                  <div><strong>Dates:</strong> 19-20-21 February 2027</div>
                  <div><strong>Venue:</strong> New Delhi, India</div>
                  <div><strong>Official Email:</strong> reachout@mushex.in</div>
                  <div><strong>Helplines &amp; WhatsApp:</strong> +91 98107 26996 / +91 98117 75443 / +91 88601 15588</div>
                  <div><strong>Working Hours:</strong> Monday to Saturday: 09:00 AM – 06:00 PM IST</div>
                </div>

                <p style="font-size: 13px; color: #555;">
                  We look forward to welcoming you to India's premier international edible fungi expo.
                </p>

                <div class="footer">
                  Warm regards,<br>
                  <strong>Organizing Secretariat &amp; Committee</strong><br>
                  India Mushroom Days 2027 (IMD 2027)
                </div>
              </div>
            </body>
            </html>
          `,
        };
        await transporter.sendMail(delegateMailOptions);
      } catch (confirmError) {
        console.error("Failed to send delegate confirmation email:", confirmError);
        // Do not fail the whole request if delegate confirmation fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully to the secretariat.",
    });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      {
        error: "Failed to dispatch email. Please verify SMTP server settings or try again later.",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
