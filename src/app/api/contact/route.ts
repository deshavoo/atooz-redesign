import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d\s()-]{7,20}$/;
const LIMITS = { name: 120, email: 254, phone: 20, company: 120, message: 3000 };

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const oneLine = (s: string) => s.replace(/[\r\n\u0000-\u001f\u007f]+/g, " ").trim();

const str = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (str(body.website).trim()) return NextResponse.json({ ok: true });

  const data = {
    name: oneLine(str(body.name)),
    email: oneLine(str(body.email)),
    phone: oneLine(str(body.phone)),
    company: oneLine(str(body.company)),
    message: str(body.message).replace(/\u0000/g, "").trim(),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "الاسم مطلوب";
  else if (data.name.length > LIMITS.name) errors.name = "الاسم طويل جدًا";

  if (!data.email) errors.email = "البريد الإلكتروني مطلوب";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = "أدخل بريدًا إلكترونيًا صحيحًا";

  if (!data.phone) errors.phone = "رقم الهاتف مطلوب";
  else if (!PHONE_RE.test(data.phone) || data.phone.length > LIMITS.phone) errors.phone = "أدخل رقم هاتف صحيحًا";

  if (data.company.length > LIMITS.company) errors.company = "اسم الشركة طويل جدًا";

  if (!data.message) errors.message = "الرسالة مطلوبة";
  else if (data.message.length > LIMITS.message) errors.message = "الرسالة طويلة جدًا";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { CONTACT_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  if (!CONTACT_EMAIL || !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    console.error("[contact] Missing SMTP / CONTACT_EMAIL environment variables");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const e = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    company: escapeHtml(data.company || "—"),
    message: escapeHtml(data.message).replace(/\n/g, "<br/>"),
  };

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e7e9ee;color:#7a8190;font-size:13px;width:130px;vertical-align:top">${label}</td>
      <td style="padding:14px 0;border-bottom:1px solid #e7e9ee;color:#0b0b14;font-size:15px">${value}</td>
    </tr>`;

  const html = `
  <div dir="rtl" style="background:#f4f5f8;padding:32px 12px;font-family:Cairo,Tahoma,Arial,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
      <div style="background:#080711;padding:28px 32px">
        <div style="color:#67e8f9;font-size:13px;margin-bottom:6px">A2Z Media Hub</div>
        <div style="color:#ffffff;font-size:22px;font-weight:700">رسالة جديدة من موقع A2Z</div>
      </div>
      <div style="padding:12px 32px 32px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("الاسم", e.name)}
          ${row("البريد الإلكتروني", `<a href="mailto:${e.email}" style="color:#0891b2;text-decoration:none">${e.email}</a>`)}
          ${row("الهاتف", `<span dir="ltr">${e.phone}</span>`)}
          ${row("الشركة", e.company)}
        </table>
        <div style="margin-top:28px;color:#7a8190;font-size:13px">الرسالة</div>
        <div style="margin-top:10px;color:#0b0b14;font-size:15px;line-height:1.9">${e.message}</div>
      </div>
    </div>
  </div>`;

  const text = [
    "رسالة جديدة من موقع A2Z",
    "",
    `الاسم: ${data.name}`,
    `البريد الإلكتروني: ${data.email}`,
    `الهاتف: ${data.phone}`,
    `الشركة: ${data.company || "—"}`,
    "",
    "الرسالة:",
    data.message,
  ].join("\n");

  try {
    const port = Number(SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: CONTACT_EMAIL,
      replyTo: data.email,
      subject: `رسالة جديدة من موقع A2Z — ${data.name}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
