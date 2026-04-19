import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const NOTIFY_EMAILS = ['jody@my-voip.com', 'Denise@my-voip.com'];

// ── Email transport ───────────────────────────────────────────────────────────
function buildTransport() {
  const host = process.env.SMTP_HOST;
  const pass = process.env.SMTP_PASS;
  if (!host || !pass || pass === 'REPLACE_WITH_YOUR_EMAIL_PASSWORD') return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass,
    },
    tls: { rejectUnauthorized: false },
  });
}

function buildQuoteEmailHtml(d: Record<string, string>) {
  const row = (label: string, value: string) =>
    value ? `<tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px;width:200px">${label}</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${value}</td></tr>` : '';

  return `
  <div style="font-family:sans-serif;background:#0f172a;padding:32px">
    <div style="max-width:600px;margin:0 auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155">
      <div style="background:#2563eb;padding:24px 28px">
        <h2 style="margin:0;color:#fff;font-size:20px">🚀 New UponAI Quote Request</h2>
        <p style="margin:4px 0 0;color:#bfdbfe;font-size:14px">Submitted via uponai.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:16px">
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
      <div style="padding:16px 24px 24px">
        <a href="mailto:${d.email}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${d.firstName}</a>
      </div>
    </div>
  </div>`;
}

function buildContactEmailHtml(d: Record<string, string>) {
  return `
  <div style="font-family:sans-serif;background:#0f172a;padding:32px">
    <div style="max-width:600px;margin:0 auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155">
      <div style="background:#7c3aed;padding:24px 28px">
        <h2 style="margin:0;color:#fff;font-size:20px">💬 New Contact Us Message</h2>
        <p style="margin:4px 0 0;color:#ddd6fe;font-size:14px">Submitted via uponai.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:16px">
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px;width:200px">Name</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.firstName} ${d.lastName}</td></tr>
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px">Email</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.email}</td></tr>
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px">Phone</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.phone || '—'}</td></tr>
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px;vertical-align:top">Message</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.message || '—'}</td></tr>
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px">SMS Consent</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.smsConsent === 'true' ? 'Yes ✓' : 'No'}</td></tr>
      </table>
      <div style="padding:16px 24px 24px">
        <a href="mailto:${d.email}" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${d.firstName}</a>
      </div>
    </div>
  </div>`;
}

function buildDownloadEmailHtml(d: Record<string, string>) {
  return `
  <div style="font-family:sans-serif;background:#0f172a;padding:32px">
    <div style="max-width:600px;margin:0 auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155">
      <div style="background:#2563eb;padding:24px 28px">
        <h2 style="margin:0;color:#fff;font-size:20px">📥 New Resource Download</h2>
        <p style="margin:4px 0 0;color:#bfdbfe;font-size:14px">Submitted via uponai.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:16px">
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px;width:200px">Email</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.email}</td></tr>
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px">Resource</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.resourceTitle}</td></tr>
        <tr><td style="padding:6px 12px;color:#94a3b8;font-size:14px">Slug</td><td style="padding:6px 12px;color:#f1f5f9;font-size:14px">${d.resourceSlug}</td></tr>
      </table>
      <div style="padding:16px 24px 24px">
        <a href="${d.downloadUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Open PDF</a>
      </div>
    </div>
  </div>`;
}

async function sendNotification(subject: string, html: string) {
  const transport = buildTransport();
  if (!transport) {
    console.log('📧 SMTP not configured — skipping email notification. Add SMTP_* vars to .env.local');
    return;
  }
  try {
    await transport.sendMail({
      from: `"UponAI Website" <${process.env.SMTP_USER}>`,
      to: NOTIFY_EMAILS.join(', '),
      subject,
      html,
    });
  } catch (err) {
    // Log but don't fail the submission if email bounces
    console.error('Email notification failed:', err);
  }
}

// ── GHL helper ────────────────────────────────────────────────────────────────
async function pushToGHL(contact: Record<string, unknown>, customFields: { key: string; field_value: string }[]) {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || apiKey.startsWith('YOUR_')) return;

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
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formType = 'contact' } = body;

    if (formType === 'download') {
      const { email, resourceSlug, resourceTitle, downloadUrl } = body;

      if (!email || !resourceSlug || !resourceTitle || !downloadUrl) {
        return NextResponse.json({ error: 'Email and resource details are required.' }, { status: 400 });
      }

      await pushToGHL(
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

      await sendNotification(
        `📥 Resource Download: ${resourceTitle}`,
        buildDownloadEmailHtml({
          email: String(email),
          resourceSlug: String(resourceSlug),
          resourceTitle: String(resourceTitle),
          downloadUrl: String(downloadUrl),
        }),
      );

      return NextResponse.json({ success: true });
    }

    if (!body.firstName || !body.email) {
      return NextResponse.json({ error: 'First name and email are required.' }, { status: 400 });
    }

    if (formType === 'quote') {
      // ── VoIP Quote ──────────────────────────────────────────────────────────
      const {
        firstName, lastName, email, phone, company,
        seats, deskPhones, deskPhonesQty, mobileUsers,
        aiReceptionist, callRecording, smsConsent,
      } = body;

      await pushToGHL(
        { firstName, lastName, email, phone, companyName: company, source: 'UponAI Website Quote', tags: ['voip-quote', 'website-lead'] },
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

      await sendNotification(
        `🚀 New UponAI Quote: ${firstName} ${lastName} — ${company || 'No Company'}`,
        buildQuoteEmailHtml({ firstName, lastName, email, phone, company, seats, deskPhones, deskPhonesQty, mobileUsers, aiReceptionist, callRecording, smsConsent: String(smsConsent) }),
      );
    } else {
      // ── Contact Us ──────────────────────────────────────────────────────────
      const { firstName, lastName, email, phone, message, smsConsent } = body;

      await pushToGHL(
        { firstName, lastName, email, phone, source: 'UponAI Website Contact', tags: ['contact-us', 'website-lead'] },
        [
          { key: 'message', field_value: message ?? '' },
          { key: 'sms_consent', field_value: smsConsent ? 'Yes' : 'No' },
        ],
      );

      await sendNotification(
        `💬 New Contact Us: ${firstName} ${lastName}`,
        buildContactEmailHtml({ firstName, lastName, email, phone, message, smsConsent: String(smsConsent) }),
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
