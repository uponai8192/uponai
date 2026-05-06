import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type DeliveryResult =
  | { ok: true }
  | { ok: false; error: string };

type CaptchaVerificationResult =
  | { ok: true }
  | { ok: false; error: string };

function cleanEnvValue(value?: string) {
  return value?.replaceAll('\\n', '').replaceAll('\n', '').replaceAll('\r', '').trim();
}

function getNotifyEmails() {
  const configuredNotifyEmails = cleanEnvValue(process.env.NOTIFY_EMAILS)
    ?.split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  return configuredNotifyEmails && configuredNotifyEmails.length > 0
    ? configuredNotifyEmails
    : ['jody@uponai.com', 'bill@uponai.com', 'sean@uponai.com'];
}

async function verifyTurnstileToken(token: string, req: Request): Promise<CaptchaVerificationResult> {
  const secret = cleanEnvValue(process.env.TURNSTILE_SECRET_KEY ?? process.env.TURNSTILE_SECRET);
  if (!secret) {
    return {
      ok: false,
      error: 'Captcha is not configured. Add TURNSTILE_SECRET_KEY on the server.',
    };
  }

  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const remoteip = forwardedFor?.split(',')[0]?.trim();
    const payload = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteip) payload.set('remoteip', remoteip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    });

    if (!res.ok) {
      return { ok: false, error: 'Captcha verification request failed.' };
    }

    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      return {
        ok: false,
        error: `Captcha verification failed${data['error-codes']?.length ? `: ${data['error-codes'].join(', ')}` : '.'}`,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Captcha verification failed.',
    };
  }
}

// ── Email transport ───────────────────────────────────────────────────────────
function buildTransport() {
  const host = cleanEnvValue(process.env.SMTP_HOST);
  const user = cleanEnvValue(process.env.SMTP_USER);
  const pass = cleanEnvValue(process.env.SMTP_PASS ?? process.env.SMTP_PASSWORD);
  const port = Number(cleanEnvValue(process.env.SMTP_PORT) ?? '587');
  if (!host || !user || !pass || pass === 'REPLACE_WITH_YOUR_EMAIL_PASSWORD') return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: { rejectUnauthorized: false },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatEmailValue(value?: string) {
  if (!value) return '—';
  return escapeHtml(value).replaceAll('\n', '<br />');
}

function buildQuoteEmailHtml(d: Record<string, string>) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;width:200px;border-top:1px solid #e2e8f0">${escapeHtml(label)}</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0">${formatEmailValue(value)}</td></tr>`
      : '';

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:32px 16px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dbe4ee">
      <div style="background:#2563eb;padding:24px 28px">
        <h2 style="margin:0;color:#ffffff;font-size:20px;line-height:1.3">New UponAI Quote Request</h2>
        <p style="margin:6px 0 0;color:#dbeafe;font-size:14px;line-height:1.5">Submitted via uponai.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#ffffff">
        ${row('Company', d.company)}
        ${row('Name', `${d.firstName} ${d.lastName}`.trim())}
        ${row('Email', d.email)}
        ${row('Phone', d.phone)}
        ${row('Users / Seats', d.seats)}
        ${row('Desk Phones?', d.deskPhones)}
        ${row('Desk Phone Qty', d.deskPhonesQty)}
        ${row('Mobile / Desktop Users', d.mobileUsers)}
        ${row('AI Receptionist?', d.aiReceptionist)}
        ${row('Call Recording?', d.callRecording)}
        ${row('SMS Consent', d.smsConsent === 'true' ? 'Yes ✓' : 'No')}
      </table>
      <div style="padding:20px 24px 24px;background:#ffffff">
        <a href="mailto:${escapeHtml(d.email)}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${escapeHtml(d.firstName || 'contact')}</a>
      </div>
    </div>
  </div>`;
}

function buildContactEmailHtml(d: Record<string, string>) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:32px 16px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dbe4ee">
      <div style="background:#7c3aed;padding:24px 28px">
        <h2 style="margin:0;color:#ffffff;font-size:20px;line-height:1.3">New Contact Us Message</h2>
        <p style="margin:6px 0 0;color:#ede9fe;font-size:14px;line-height:1.5">Submitted via uponai.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#ffffff">
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;width:200px">Name</td><td style="padding:10px 14px;color:#0f172a;font-size:14px">${formatEmailValue(`${d.firstName} ${d.lastName}`.trim())}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0">Email</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0">${formatEmailValue(d.email)}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0">Phone</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0">${formatEmailValue(d.phone)}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0;vertical-align:top">Message</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0;line-height:1.6">${formatEmailValue(d.message)}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0">SMS Consent</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0">${d.smsConsent === 'true' ? 'Yes ✓' : 'No'}</td></tr>
      </table>
      <div style="padding:20px 24px 24px;background:#ffffff">
        <a href="mailto:${escapeHtml(d.email)}" style="display:inline-block;background:#7c3aed;color:#ffffff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${escapeHtml(d.firstName || 'contact')}</a>
      </div>
    </div>
  </div>`;
}

function buildDownloadEmailHtml(d: Record<string, string>) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:32px 16px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dbe4ee">
      <div style="background:#2563eb;padding:24px 28px">
        <h2 style="margin:0;color:#ffffff;font-size:20px;line-height:1.3">New Resource Download</h2>
        <p style="margin:6px 0 0;color:#dbeafe;font-size:14px;line-height:1.5">Submitted via uponai.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#ffffff">
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;width:200px">Email</td><td style="padding:10px 14px;color:#0f172a;font-size:14px">${formatEmailValue(d.email)}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0">Resource</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0">${formatEmailValue(d.resourceTitle)}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0">Slug</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0">${formatEmailValue(d.resourceSlug)}</td></tr>
      </table>
      <div style="padding:20px 24px 24px;background:#ffffff">
        <a href="${escapeHtml(d.downloadUrl)}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Open PDF</a>
      </div>
    </div>
  </div>`;
}

async function sendNotification(subject: string, html: string, replyTo?: string) {
  const transport = buildTransport();
  if (!transport) {
    return {
      ok: false,
      error: 'SMTP is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD.',
    } satisfies DeliveryResult;
  }

  try {
    await transport.sendMail({
      from: `"UponAI Website" <${cleanEnvValue(process.env.SMTP_USER)}>`,
      to: getNotifyEmails().join(', '),
      replyTo,
      subject,
      html,
    });
    return { ok: true } satisfies DeliveryResult;
  } catch (error) {
    console.error('Email notification failed:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown email error',
    } satisfies DeliveryResult;
  }
}

// ── GHL helper ────────────────────────────────────────────────────────────────
async function pushToGHL(contact: Record<string, unknown>, customFields: { key: string; field_value: string }[]) {
  const apiKey = cleanEnvValue(process.env.GHL_API_KEY);
  const locationId = cleanEnvValue(process.env.GHL_LOCATION_ID);
  if (!apiKey || apiKey.startsWith('YOUR_')) {
    return { ok: false, error: 'GHL is not configured.' } satisfies DeliveryResult;
  }

  try {
    const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({ ...contact, locationId, customFields }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('GHL API error:', res.status, err);
      return { ok: false, error: `GHL API error ${res.status}: ${err}` } satisfies DeliveryResult;
    }

    return { ok: true } satisfies DeliveryResult;
  } catch (error) {
    console.error('GHL request failed:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown GHL error',
    } satisfies DeliveryResult;
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formType = 'contact' } = body;
    const captchaToken =
      typeof body.captchaToken === 'string' ? body.captchaToken.trim() : '';

    if (!captchaToken) {
      return NextResponse.json({ error: 'Captcha verification is required.' }, { status: 400 });
    }

    const captchaResult = await verifyTurnstileToken(captchaToken, req);
    if (!captchaResult.ok) {
      return NextResponse.json({ error: captchaResult.error }, { status: 400 });
    }

    if (formType === 'download') {
      const { email, resourceSlug, resourceTitle, downloadUrl } = body;

      if (!email || !resourceSlug || !resourceTitle || !downloadUrl) {
        return NextResponse.json({ error: 'Email and resource details are required.' }, { status: 400 });
      }

      const ghlResult = await pushToGHL(
        {
          email,
          source: 'UponAI Resource Download',
          tags: ['resource-download', String(resourceSlug), 'website-lead'],
        },
        [
          { key: 'resource_slug', field_value: String(resourceSlug) },
          { key: 'resource_title', field_value: String(resourceTitle) },
          { key: 'download_url', field_value: String(downloadUrl) },
        ],
      );

      const emailResult = await sendNotification(
        `📥 Resource Download: ${resourceTitle}`,
        buildDownloadEmailHtml({
          email: String(email),
          resourceSlug: String(resourceSlug),
          resourceTitle: String(resourceTitle),
          downloadUrl: String(downloadUrl),
        }),
        String(email),
      );

      if (!emailResult.ok) {
        return NextResponse.json({ error: `Download captured, but email alert failed: ${emailResult.error}` }, { status: 502 });
      }

      if (!ghlResult.ok) {
        console.warn('Resource download saved without GHL sync:', ghlResult.error);
      }

      return NextResponse.json({ success: true });
    }

    if (!body.firstName || !body.email) {
      return NextResponse.json({ error: 'First name and email are required.' }, { status: 400 });
    }

    if (formType === 'quote') {
      // ── Consultation Request ────────────────────────────────────────────────
      const {
        firstName, lastName, email, phone, company,
        seats, deskPhones, deskPhonesQty, mobileUsers,
        aiReceptionist, callRecording, smsConsent,
      } = body;

      const ghlResult = await pushToGHL(
        { firstName, lastName, email, phone, companyName: company, source: 'UponAI Website Consultation', tags: ['consultation-request', 'website-lead'] },
        [
          { key: 'seats_needed', field_value: seats ?? '' },
          { key: 'desk_phones', field_value: deskPhones ?? '' },
          { key: 'desk_phones_qty', field_value: deskPhonesQty ?? '' },
          { key: 'mobile_users', field_value: mobileUsers ?? '' },
          { key: 'ai_receptionist', field_value: aiReceptionist ?? '' },
          { key: 'call_recording', field_value: callRecording ?? '' },
          { key: 'sms_consent', field_value: smsConsent ? 'Yes' : 'No' },
        ],
      );

      const emailResult = await sendNotification(
        `🚀 New UponAI Consultation Request: ${firstName} ${lastName} — ${company || 'No Company'}`,
        buildQuoteEmailHtml({ firstName, lastName, email, phone, company, seats, deskPhones, deskPhonesQty, mobileUsers, aiReceptionist, callRecording, smsConsent: String(smsConsent) }),
        email,
      );

      if (!emailResult.ok) {
        return NextResponse.json({ error: `We couldn't deliver your consultation alert: ${emailResult.error}` }, { status: 502 });
      }

      if (!ghlResult.ok) {
        console.warn('Consultation saved without GHL sync:', ghlResult.error);
      }
    } else {
      // ── Contact Us ──────────────────────────────────────────────────────────
      const { firstName, lastName, email, phone, message, smsConsent } = body;

      const ghlResult = await pushToGHL(
        { firstName, lastName, email, phone, source: 'UponAI Website Contact', tags: ['contact-us', 'website-lead'] },
        [
          { key: 'message', field_value: message ?? '' },
          { key: 'sms_consent', field_value: smsConsent ? 'Yes' : 'No' },
        ],
      );

      const emailResult = await sendNotification(
        `💬 New Contact Us: ${firstName} ${lastName}`,
        buildContactEmailHtml({ firstName, lastName, email, phone, message, smsConsent: String(smsConsent) }),
        email,
      );

      if (!emailResult.ok) {
        return NextResponse.json({ error: `We couldn't deliver your contact request alert: ${emailResult.error}` }, { status: 502 });
      }

      if (!ghlResult.ok) {
        console.warn('Contact saved without GHL sync:', ghlResult.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
