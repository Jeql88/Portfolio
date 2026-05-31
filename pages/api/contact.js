import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';
import { profile } from '@/data/profile';

const MAX = { name: 100, email: 100, subject: 150, message: 2000 };

function getClientKey(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const limit = rateLimit('contact:' + getClientKey(req));
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfterSeconds));
    return res
      .status(429)
      .json({ error: `Too many submissions. Try again in ${limit.retryAfterSeconds}s.` });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const {
    name = '',
    email = '',
    subject = '',
    message = '',
    company = '',
    elapsedMs = 0,
  } = req.body || {};

  // Silent spam drops — return 200 so bots don't retry, but never send the email.
  if (String(company).trim() !== '') return res.status(200).json({ ok: true });
  if (Number(elapsedMs) < 2000) return res.status(200).json({ ok: true });

  const trimmed = {
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject).trim(),
    message: String(message).trim(),
  };

  if (!trimmed.name || !trimmed.email || !trimmed.message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!isEmail(trimmed.email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (
    trimmed.name.length > MAX.name ||
    trimmed.email.length > MAX.email ||
    trimmed.subject.length > MAX.subject ||
    trimmed.message.length > MAX.message
  ) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }

  const fromAddress = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';
  const subjectLine = trimmed.subject || `Portfolio contact from ${trimmed.name}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: profile.email,
      replyTo: trimmed.email,
      subject: subjectLine,
      text: `From: ${trimmed.name} <${trimmed.email}>\n\n${trimmed.message}`,
      html: `
        <div style="font-family:sans-serif">
          <p><strong>From:</strong> ${escape(trimmed.name)} &lt;${escape(trimmed.email)}&gt;</p>
          <p><strong>Subject:</strong> ${escape(subjectLine)}</p>
          <hr/>
          <p style="white-space:pre-wrap">${escape(trimmed.message)}</p>
        </div>
      `,
    });
    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Could not send the message. Please try again.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
