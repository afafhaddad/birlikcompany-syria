/**
 * Vercel serverless function behind the home page's enquiry form.
 * Sends the enquiry to the company mailbox over SMTP. Needs these environment variables
 * (Vercel → Project → Settings → Environments → Production):
 *   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS, and optionally INQUIRY_TO.
 * Until they are set it answers 503, and the form offers WhatsApp instead.
 */
import nodemailer from 'nodemailer';

type Req = { method?: string; body?: unknown };
type Res = { status(code: number): Res; json(body: unknown): void };

const line = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  let b: Record<string, unknown> = {};
  try {
    b = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}) as Record<string, unknown>;
  } catch {
    return res.status(400).json({ ok: false, error: 'bad_request' });
  }

  // Bots fill the hidden field; pretend it worked
  if (line(b.website, 200)) return res.status(200).json({ ok: true });

  const name = line(b.name, 80);
  const phone = line(b.phone, 40);
  const email = line(b.email, 120);
  const city = line(b.city, 60);
  const interest = line(b.interest, 80);
  const lang = line(b.lang, 4);
  const message = String(b.message ?? '').trim().slice(0, 2000);

  if (name.length < 2 || (!phone && !email) || message.length < 5 || (email && !EMAIL_RE.test(email))) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return res.status(503).json({ ok: false, error: 'not_configured' });

  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `Name / الاسم: ${name}`,
    `Phone / الهاتف: ${phone || '-'}`,
    `Email / الإيميل: ${email || '-'}`,
    `City / المدينة: ${city || '-'}`,
    `Interested in / مهتم بـ: ${interest || '-'}`,
    `Site language: ${lang || '-'}`,
    '',
    message,
  ].join('\n');

  try {
    await transport.sendMail({
      from: `"Birlik website" <${SMTP_USER}>`,
      to: INQUIRY_TO || 'info@birlik-insaat.com',
      replyTo: email || undefined,
      subject: `استفسار من الموقع — ${name}${interest ? ` — ${interest}` : ''}`,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
