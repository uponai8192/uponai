import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const LEAD_EMAIL = 'melvin@uponai.com'

type LeadBody = {
  name: string
  email: string
  company: string
  consentContact: boolean
  consentMarketing?: boolean
  notify?: boolean
}

export async function POST(req: Request) {
  const body = (await req.json()) as LeadBody
  const { name, email, company, consentContact, consentMarketing = false, notify = true } = body

  if (!name || !email || !company || !consentContact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const res = await fetch('https://api.upon-ai.com/api/v2/calls/web', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.UPONAI_API_KEY}`,
    },
    body: JSON.stringify({
      agentId: process.env.UPONAI_AGENT_ID,
      retell_llm_dynamic_variables: { name, company },
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
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    transport.sendMail({
      from: process.env.SMTP_USER,
      to: LEAD_EMAIL,
      subject: `New voice demo lead: ${name} — ${company}`,
      text: `${name} (${email}) from ${company} just started a voice demo on uponai.com.\nMarketing consent: ${consentMarketing ? 'yes' : 'no'}`,
    }).catch((err: unknown) => console.error('[create-web-call] email error', err))
  }

  return NextResponse.json({ accessToken }, { status: 201 })
}
