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

// --- Spam detection ---

const SPAM_KEYWORDS = [
  "seo",
  "search engine optimization",
  "backlink",
  "link building",
  "page rank",
  "pagerank",
  "google ranking",
  "web traffic",
  "digital marketing",
  "social media marketing",
  "guaranteed results",
  "first page of google",
  "increase your traffic",
  "boost your website",
  "free consultation",
  "marketing agency",
  "lead generation",
  "email blast",
  "bulk email",
  "mass email",
  "web design services",
  "web development services",
  "app development",
  "offshore development",
  "virtual assistant",
  "outsourcing",
  "crypto",
  "bitcoin",
  "forex",
  "nigerian",
  "inheritance",
  "lottery",
  "click here",
  "act now",
  "limited time",
  "domain authority",
  "da 50",
  "da 60",
  "guest post",
  "sponsored post",
  "paid article",
  "content marketing",
  "influencer marketing",
];

// URL patterns: more than 2 URLs in the message is suspicious
const URL_REGEX = /https?:\/\/[^\s]+/gi;
const EXCESSIVE_URL_COUNT = 2;

// Minimum time in ms between form load and submit (bots are instant)
const MIN_SUBMIT_TIME_MS = 3000;

function isSpam(body: ContactFormData & { _hp?: string; _t?: string }): {
  spam: boolean;
  reason?: string;
} {
  // 1. Honeypot: if the hidden field has any value, it's a bot
  if (body._hp) {
    return { spam: true, reason: "honeypot" };
  }

  // 2. Timing: if submitted faster than a human could fill the form
  if (body._t) {
    const loadTime = parseInt(body._t, 10);
    if (!isNaN(loadTime) && Date.now() - loadTime < MIN_SUBMIT_TIME_MS) {
      return { spam: true, reason: "timing" };
    }
  }

  // 3. Content: check the message + name + email for spam keywords
  const textToCheck = [
    body.message,
    body.firstName,
    body.lastName,
    body.email,
    body.propertyLocation || "",
  ]
    .join(" ")
    .toLowerCase();

  for (const keyword of SPAM_KEYWORDS) {
    if (textToCheck.includes(keyword)) {
      return { spam: true, reason: `keyword: ${keyword}` };
    }
  }

  // 4. Excessive URLs in the message
  const urls = body.message.match(URL_REGEX);
  if (urls && urls.length > EXCESSIVE_URL_COUNT) {
    return { spam: true, reason: "excessive-urls" };
  }

  // 5. Message is mostly non-ASCII (cyrillic spam, etc.)
  const nonAscii = body.message.replace(/[\x20-\x7E\n\r\t]/g, "").length;
  if (nonAscii > body.message.length * 0.3 && body.message.length > 20) {
    return { spam: true, reason: "non-ascii" };
  }

  return { spam: false };
}

// Basic HTML escaping to prevent XSS in the email
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
    const body = await request.json();

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email || !body.propertyType || !body.loanAmount || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Spam check — silently reject (return 200 so bots think it worked)
    const spamCheck = isSpam(body);
    if (spamCheck.spam) {
      console.log(`Spam blocked [${spamCheck.reason}]: ${body.email}`);
      return NextResponse.json({ success: true });
    }

    // Sanitize all fields for email HTML
    const safe = {
      firstName: esc(body.firstName),
      lastName: esc(body.lastName),
      email: esc(body.email),
      phone: body.phone ? esc(body.phone) : "",
      propertyType: esc(body.propertyType),
      loanAmount: esc(body.loanAmount),
      dealType: body.dealType ? esc(body.dealType) : "",
      propertyLocation: body.propertyLocation
        ? esc(body.propertyLocation)
        : "",
      message: esc(body.message),
    };

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
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${safe.firstName} ${safe.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${safe.email}" style="color: #7c9a5e;">${safe.email}</a></td>
            </tr>
            ${safe.phone ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${safe.phone}" style="color: #7c9a5e;">${safe.phone}</a></td>
            </tr>
            ` : ""}
          </table>

          <h2 style="font-size: 16px; color: #1a2332; border-bottom: 2px solid #7c9a5e; padding-bottom: 8px;">Deal Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px; font-size: 14px;">Property Type</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${safe.propertyType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Loan Amount</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${safe.loanAmount}</td>
            </tr>
            ${safe.dealType ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Financing Type</td>
              <td style="padding: 8px 0; font-size: 14px;">${safe.dealType}</td>
            </tr>
            ` : ""}
            ${safe.propertyLocation ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Location</td>
              <td style="padding: 8px 0; font-size: 14px;">${safe.propertyLocation}</td>
            </tr>
            ` : ""}
          </table>

          <h2 style="font-size: 16px; color: #1a2332; border-bottom: 2px solid #7c9a5e; padding-bottom: 8px;">Deal Description</h2>
          <div style="background-color: #f9f8f6; padding: 16px; border-radius: 4px; margin-top: 12px;">
            <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safe.message}</p>
          </div>
        </div>

        <div style="background-color: #f9f8f6; padding: 16px 32px; text-align: center;">
          <p style="font-size: 12px; color: #999; margin: 0;">
            Sage Creek Group LLC &bull; Coeur d&rsquo;Alene, Idaho &bull; <a href="https://www.sagecreekgroup.com" style="color: #7c9a5e;">sagecreekgroup.com</a>
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
