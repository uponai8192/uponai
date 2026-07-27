import { NextResponse, type NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { verticalAgentKeys } from '@/lib/vertical-agents'

const LEAD_EMAIL = 'melvin@uponai.com'

type LeadBody = {
  name: string
  email: string
  company: string
  consentContact: boolean
  consentMarketing?: boolean
  notify?: boolean
  vertical?: string
}

/**
 * Resolve which agent answers this call. The client only ever sends a vertical
 * key, never an agent id, and the key must be one we published - so a caller
 * cannot point the widget at an arbitrary agent. Any vertical without its own
 * configured agent falls back to the default website agent.
 */
function resolveAgentId(vertical?: string): string | undefined {
  const key = vertical?.trim()
  if (key && verticalAgentKeys.includes(key)) {
    const envName = `UPONAI_AGENT_ID_${key.toUpperCase().replace(/-/g, '_')}`
    const scoped = process.env[envName]?.trim()
    if (scoped) return scoped
  }
  return process.env.UPONAI_AGENT_ID
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LeadBody
  const { name, email, company, consentContact, consentMarketing = false, notify = true, vertical } = body

  if (!name?.trim() || !email?.trim() || !company?.trim() || !consentContact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const res = await fetch('https://api.upon-ai.com/api/v2/calls/web', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.UPONAI_API_KEY}`,
    },
    body: JSON.stringify({
      agentId: resolveAgentId(vertical),
      retell_llm_dynamic_variables: { name: name.trim(), company: company.trim() },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[create-web-call] UponAI API error', res.status, text)
    return NextResponse.json({ error: 'Failed to create call' }, { status: 502 })
  }

  const { accessToken } = (await res.json()) as { accessToken: string }

  if (notify && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    transport.sendMail({
      from: `UponAI Widget <${process.env.SMTP_USER}>`,
      to: LEAD_EMAIL,
      subject: `New voice demo lead: ${name} (${company})`,
      html: leadEmail({ name, email, company, consentContact, consentMarketing }),
    }).catch((err: unknown) => console.error('[create-web-call] email error', err))
  }

  return NextResponse.json({ accessToken }, { status: 201 })
}

function leadEmail(lead: Required<Pick<LeadBody, 'name' | 'email' | 'company' | 'consentContact' | 'consentMarketing'>>): string {
  const ts = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg', dateStyle: 'full', timeStyle: 'short' })

  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 24px;border-bottom:1px solid #1a2d47;width:38%">
        <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">${label}</span>
      </td>
      <td style="padding:14px 24px;border-bottom:1px solid #1a2d47">
        <span style="font-family:Arial,sans-serif;font-size:14px;color:#f8fafc">${value}</span>
      </td>
    </tr>`

  const badge = (granted: boolean) => granted
    ? `<span style="display:inline-block;background:#052e16;border:1px solid #166534;border-radius:20px;padding:3px 10px;font-size:12px;color:#4ade80;font-family:Arial,sans-serif">&#10003;&nbsp; Granted</span>`
    : `<span style="display:inline-block;background:#1c0a0a;border:1px solid #7f1d1d;border-radius:20px;padding:3px 10px;font-size:12px;color:#f87171;font-family:Arial,sans-serif">&#10005;&nbsp; Not granted</span>`

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#060e1a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060e1a">
  <tr><td style="padding:32px 16px" align="center">
  <div style="max-width:480px;margin:0 auto">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 0 20px 0" align="center">
        <span style="font-family:Arial,sans-serif;font-size:22px;font-weight:900;letter-spacing:-0.02em">
          <span style="color:#2070d8">Upon</span><span style="color:#38b848">AI</span>
        </span>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background-color:#1d4ed8;border-radius:10px 10px 0 0;padding:24px 20px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top">
              <p style="margin:0 0 3px 0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6)">New inbound lead</p>
              <p style="margin:0;font-family:Arial,sans-serif;font-size:20px;font-weight:800;color:#ffffff">${escHtml(lead.name)}</p>
              <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.72)">${escHtml(lead.company)}</p>
            </td>
            <td style="vertical-align:top;text-align:right;white-space:nowrap;padding-left:12px">
              <span style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.28);border-radius:20px;padding:4px 12px;font-family:Arial,sans-serif;font-size:11px;font-weight:600;color:#ffffff">&#9679; Voice Demo</span>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d1e35;border:1px solid #1a2d47;border-top:none">
      ${detailRow('Name', escHtml(lead.name))}
      ${detailRow('Email', `<a href="mailto:${escHtml(lead.email)}" style="color:#38bdf8;text-decoration:none">${escHtml(lead.email)}</a>`)}
      ${detailRow('Company', escHtml(lead.company))}
      ${detailRow('Contact consent', badge(lead.consentContact))}
      ${detailRow('Marketing consent', badge(lead.consentMarketing))}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background-color:#091526;border:1px solid #1a2d47;border-top:none;border-radius:0 0 10px 10px;padding:14px 20px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td><p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#475569">Submitted ${ts}</p></td>
            <td style="text-align:right"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#334155">Data handled per POPIA</p></td>
          </tr>
        </table>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:20px 0 0 0" align="center">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#1e3a5f">UponAI &mdash; uponai.com</p>
      </td></tr>
    </table>

  </div>
  </td></tr>
</table>
</body>
</html>`
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
