import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getChatConfig } from "@/lib/chat-config";
import { chatLog } from "@/lib/chat-logger";
import {
  getPresetLabel,
  isValidPresetId,
  presetRequiresCustomDetails,
} from "@/lib/inquiry-presets";
import { insertInquiry, isChatDbAvailable } from "@/lib/chat-db";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

type Body = {
  presetId?: string;
  details?: string;
  name?: string;
  email?: string;
  company?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { maxDetailsLength, notificationEmail, resendFrom, sendVisitorConfirmation } =
    getChatConfig();
  const presetId = (body.presetId ?? "").trim();
  const details = (body.details ?? "").trim();
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const company = (body.company ?? "").trim() || "—";

  if (!isValidPresetId(presetId)) {
    return NextResponse.json(
      { error: "Please choose a request type." },
      { status: 400 }
    );
  }

  if (details.length > maxDetailsLength) {
    return NextResponse.json(
      { error: `Details are too long (max ${maxDetailsLength} characters).` },
      { status: 400 }
    );
  }

  if (presetRequiresCustomDetails(presetId) && !details) {
    return NextResponse.json(
      { error: "Please include a short description of your request." },
      { status: 400 }
    );
  }

  if (name.length < 1 || name.length > 200) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (company.length > 200) {
    return NextResponse.json(
      { error: "Company name is too long." },
      { status: 400 }
    );
  }

  const label = getPresetLabel(presetId);
  const inquiryText = [
    `Request type: ${label}`,
    details ? `Details:\n${details}` : "Details: (none provided)",
  ].join("\n\n");

  if (isChatDbAvailable()) {
    const rec = await insertInquiry({
      name,
      email,
      company,
      inquiry_summary: inquiryText,
    });
    if (!rec) {
      chatLog.warn("Could not store inquiry in database (email still sent if configured).");
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const isDev = process.env.NODE_ENV === "development";
  if (!resendKey) {
    if (isDev) {
      chatLog.info("inquiry (dev, no Resend key)", {
        to: notificationEmail,
        name,
        email,
        company,
        preset: label,
        details: details || "(empty)",
      });
      return NextResponse.json({
        success: true,
        devLogged: true,
        message: "Request logged in the server console (add RESEND_API_KEY to email).",
      });
    }
    chatLog.error("RESEND_API_KEY missing in production", undefined);
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 503 }
    );
  }

  if (!notificationEmail) {
    return NextResponse.json(
      { error: "Notification address is not configured." },
      { status: 503 }
    );
  }

  const subject = `Website inquiry: ${label}`;
  const textBody = `Request type: ${label}

Name: ${name}
Email: ${email}
Company: ${company}

${details ? `Details:\n${details}` : "No extra details were added."}
`;

  const resend = new Resend(resendKey);
  const brand = process.env.CHAT_BRAND_NAME || "Zaman’s portfolio";

  try {
    const { error: ownerError } = await resend.emails.send({
      from: resendFrom,
      to: [notificationEmail],
      replyTo: email,
      subject,
      text: textBody,
      html: `<h2>Website inquiry</h2>
<p><strong>Request type:</strong> ${escapeHtml(label)}</p>
<p><strong>Name:</strong> ${escapeHtml(name)}<br/>
<strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(
        email
      )}</a><br/>
<strong>Company:</strong> ${escapeHtml(company)}</p>
<h3>Details</h3>
<pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;">${escapeHtml(
        details || "—"
      )}</pre>`,
    });

    if (ownerError) {
      chatLog.error("Resend error (owner)", ownerError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again or email directly." },
        { status: 502 }
      );
    }

    if (sendVisitorConfirmation) {
      const confirmSubject = "We received your request";
      const confirmText = `Hi ${name},

This confirms your request was submitted. We have your message and will follow up as soon as we can (using ${email}).

Request type: ${label}
${details ? `What you added:\n${details}\n` : ""}You can reply to this email if you need to add anything.

— ${brand}`;

      const confirmHtml = `<p>Hi ${escapeHtml(name)},</p>
<p>Your request was <strong>submitted</strong>. We have your message and will follow up as soon as we can. We&rsquo;ll use: ${escapeHtml(
        email
      )}.</p>
<p><strong>Request type:</strong> ${escapeHtml(label)}</p>
${
  details
    ? `<h3>What you added</h3><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;">${escapeHtml(
        details
      )}</pre>`
    : ""
}
<p style="color:#666;font-size:14px">You can reply to this email to add more.</p>
<p>— ${escapeHtml(brand)}</p>`;

      const { error: confirmError } = await resend.emails.send({
        from: resendFrom,
        to: [email],
        replyTo: notificationEmail,
        subject: confirmSubject,
        text: confirmText,
        html: confirmHtml,
      });

      if (confirmError) {
        chatLog.error("Resend error (visitor confirmation)", confirmError, {
          to: email,
        });
        return NextResponse.json({
          success: true,
          confirmationSent: false,
          message:
            "Your request was received, but a confirmation could not be sent to your address. The team can still contact you on the email you provided.",
        });
      }
    }
  } catch (e) {
    chatLog.error("Resend throw", e);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or email directly." },
      { status: 502 }
    );
  }

  chatLog.info("inquiry emailed to you", {
    notificationEmail,
    visitorConfirmation: sendVisitorConfirmation,
    preset: presetId,
  });
  return NextResponse.json({
    success: true,
    confirmationSent: sendVisitorConfirmation,
  });
}
