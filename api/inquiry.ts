/**
 * Vercel serverless function behind the home page's enquiry form.
 *
 * Preferred: Microsoft Graph (the company mailbox is on Microsoft 365). Needs, in Vercel →
 * Settings → Environment Variables (Production):
 *   MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET  — from an app registered in Microsoft Entra
 *     with the application permission Mail.Send (admin consent granted)
 *   MAIL_FROM (optional, default info@birlik-insaat.com) — the mailbox that sends
 *   INQUIRY_TO (optional, default info@birlik-insaat.com) — where enquiries arrive
 *
 * Fallback: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (password sign-in; Microsoft is retiring it).
 * With neither configured it answers 503, and the form offers WhatsApp instead.
 */
import nodemailer from 'nodemailer';

type Req = { method?: string; body?: unknown };
type Res = { status(code: number): Res; json(body: unknown): void };

const line = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DEFAULT_BOX = 'info@birlik-insaat.com';

async function sendWithGraph(opts: { subject: string; text: string; replyTo?: string }) {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MAIL_FROM, INQUIRY_TO } = process.env;
  const tokenRes = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(MS_TENANT_ID!)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: MS_CLIENT_ID!,
      client_secret: MS_CLIENT_SECRET!,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });
  const token = (await tokenRes.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!token.access_token) throw new Error(`token: ${token.error} ${String(token.error_description || '').slice(0, 300)}`);

  const from = MAIL_FROM || DEFAULT_BOX;
  const sendRes = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: {
        subject: opts.subject,
        body: { contentType: 'Text', content: opts.text },
        toRecipients: [{ emailAddress: { address: INQUIRY_TO || DEFAULT_BOX } }],
        ...(opts.replyTo ? { replyTo: [{ emailAddress: { address: opts.replyTo } }] } : {}),
      },
      saveToSentItems: false,
    }),
  });
  if (sendRes.status !== 202) throw new Error(`sendMail ${sendRes.status}: ${(await sendRes.text()).slice(0, 300)}`);
}

async function sendWithSmtp(opts: { subject: string; text: string; replyTo?: string }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_TO } = process.env;
  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  await transport.sendMail({
    from: `"Birlik website" <${SMTP_USER}>`,
    to: INQUIRY_TO || DEFAULT_BOX,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
}

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

  const env = process.env;
  const graph = !!(env.MS_TENANT_ID && env.MS_CLIENT_ID && env.MS_CLIENT_SECRET);
  const smtp = !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
  if (!graph && !smtp) return res.status(503).json({ ok: false, error: 'not_configured' });

  const mail = {
    subject: `استفسار من الموقع — ${name}${interest ? ` — ${interest}` : ''}`,
    replyTo: email || undefined,
    text: [
      `Name / الاسم: ${name}`,
      `Phone / الهاتف: ${phone || '-'}`,
      `Email / الإيميل: ${email || '-'}`,
      `City / المدينة: ${city || '-'}`,
      `Interested in / مهتم بـ: ${interest || '-'}`,
      `Site language: ${lang || '-'}`,
      '',
      message,
    ].join('\n'),
  };

  try {
    if (graph) await sendWithGraph(mail);
    else await sendWithSmtp(mail);
    return res.status(200).json({ ok: true });
  } catch (err) {
    // Shows in Vercel → Logs; never includes passwords or secrets
    console.error(`[inquiry] ${graph ? 'graph' : 'smtp'} send failed:`, err instanceof Error ? err.message : String(err));
    return res.status(502).json({ ok: false, error: 'send_failed', via: graph ? 'graph' : 'smtp' });
  }
}
