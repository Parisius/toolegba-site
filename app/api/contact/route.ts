import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getContact, type ContentLang } from "@/lib/content";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL ?? "ecoute@toolegba.com";
// Must be an address on a domain verified in Resend. The default only works for testing.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Toolegba <onboarding@resend.dev>";

const MAX = { short: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance rate limit. It resets on cold starts, so it only
// slows down casual abuse; the honeypot and Resend's own limits do the rest.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const rateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Strips line breaks so user input can never inject headers or extra lines in a subject. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

type Fields = "name" | "company" | "email" | "phone" | "service" | "budget" | "message";

const rows = (labels: Record<Fields, string>, data: Record<Fields, string>) =>
  (Object.keys(labels) as Fields[])
    .filter((key) => data[key])
    .map(
      (key) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(
          labels[key],
        )}</td><td style="padding:6px 0;color:#0f2b2e;white-space:pre-wrap">${escapeHtml(data[key])}</td></tr>`,
    )
    .join("");

const layout = (body: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0f2b2e;max-width:560px">${body}</div>`;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success to bots.
  if (str(body._gotcha, 100)) {
    console.warn("contact: honeypot triggered, submission dropped");
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  const lang: ContentLang = body.lang === "en" ? "en" : "fr";
  const data: Record<Fields, string> = {
    name: str(body.name, MAX.short),
    company: str(body.company, MAX.short),
    email: str(body.email, MAX.short),
    phone: str(body.phone, MAX.short),
    service: str(body.service, MAX.short),
    budget: str(body.budget, MAX.short),
    message: str(body.message, MAX.message),
  };

  if (!data.name || !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { form } = getContact(lang);
  const { mail } = form;
  const resend = new Resend(apiKey);

  // 1. Notification to the team. Reply goes straight to the visitor.
  const notify = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: data.email,
    subject: `${mail.notifySubject} – ${oneLine(data.name)}${data.company ? ` (${oneLine(data.company)})` : ""}`,
    html: layout(`<table style="border-collapse:collapse">${rows(mail.fields, data)}</table>`),
  });

  if (notify.error) {
    console.error("contact: notification failed", notify.error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  // 2. Confirmation to the visitor. The inquiry is already delivered, so a failure here is only logged.
  const confirm = await resend.emails.send({
    from: FROM,
    to: data.email,
    replyTo: TO,
    subject: mail.confirmSubject,
    html: layout(
      `<p>${escapeHtml(mail.greeting.replace("{name}", data.name))}</p>` +
        `<p>${escapeHtml(mail.confirmBody)}</p>` +
        `<p style="margin:24px 0 8px;font-weight:bold">${escapeHtml(mail.recap)}</p>` +
        `<table style="border-collapse:collapse">${rows(mail.fields, data)}</table>` +
        `<p style="margin-top:24px">${escapeHtml(mail.signoff)}<br>${escapeHtml(mail.signature)}</p>`,
    ),
  });

  if (confirm.error) console.error("contact: confirmation failed", confirm.error);

  return NextResponse.json({ ok: true });
}
