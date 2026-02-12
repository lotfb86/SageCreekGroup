import { Resend } from "resend";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Lazy-initialize Resend so builds succeed without the env var
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not configured");
    _resend = new Resend(key);
  }
  return _resend;
}

// Recipient for all deal submissions
const RECIPIENT_EMAIL = "Tim@SageCreekGroup.com";
const FROM_EMAIL = "deals@sagecreekgroup.com";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  propertyType: string;
  loanAmount: string;
  dealType?: string;
  propertyLocation?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email || !body.propertyType || !body.loanAmount || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build the email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #1a2332; padding: 24px 32px;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0;">New Deal Submission</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 8px 0 0;">via sagecreekgroup.com</p>
        </div>

        <div style="padding: 32px; background-color: #ffffff;">
          <h2 style="font-size: 16px; color: #1a2332; border-bottom: 2px solid #7c9a5e; padding-bottom: 8px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px; font-size: 14px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${body.firstName} ${body.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${body.email}" style="color: #7c9a5e;">${body.email}</a></td>
            </tr>
            ${body.phone ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${body.phone}" style="color: #7c9a5e;">${body.phone}</a></td>
            </tr>
            ` : ""}
          </table>

          <h2 style="font-size: 16px; color: #1a2332; border-bottom: 2px solid #7c9a5e; padding-bottom: 8px;">Deal Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px; font-size: 14px;">Property Type</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${body.propertyType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Loan Amount</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${body.loanAmount}</td>
            </tr>
            ${body.dealType ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Financing Type</td>
              <td style="padding: 8px 0; font-size: 14px;">${body.dealType}</td>
            </tr>
            ` : ""}
            ${body.propertyLocation ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Location</td>
              <td style="padding: 8px 0; font-size: 14px;">${body.propertyLocation}</td>
            </tr>
            ` : ""}
          </table>

          <h2 style="font-size: 16px; color: #1a2332; border-bottom: 2px solid #7c9a5e; padding-bottom: 8px;">Deal Description</h2>
          <div style="background-color: #f9f8f6; padding: 16px; border-radius: 4px; margin-top: 12px;">
            <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${body.message}</p>
          </div>
        </div>

        <div style="background-color: #f9f8f6; padding: 16px 32px; text-align: center;">
          <p style="font-size: 12px; color: #999; margin: 0;">
            Sage Creek Group LLC &bull; Coeur d'Alene, Idaho &bull; <a href="https://www.sagecreekgroup.com" style="color: #7c9a5e;">sagecreekgroup.com</a>
          </p>
        </div>
      </div>
    `;

    // Plain text version
    const emailText = `
New Deal Submission — sagecreekgroup.com

CONTACT INFORMATION
Name: ${body.firstName} ${body.lastName}
Email: ${body.email}
${body.phone ? `Phone: ${body.phone}` : ""}

DEAL DETAILS
Property Type: ${body.propertyType}
Loan Amount: ${body.loanAmount}
${body.dealType ? `Financing Type: ${body.dealType}` : ""}
${body.propertyLocation ? `Location: ${body.propertyLocation}` : ""}

DEAL DESCRIPTION
${body.message}

---
Sage Creek Group LLC | sagecreekgroup.com
    `.trim();

    const resend = getResend();

    const { error } = await resend.emails.send({
      from: `Sage Creek Group <${FROM_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: body.email,
      subject: `New Deal: ${body.propertyType} — ${body.loanAmount} | ${body.firstName} ${body.lastName}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
