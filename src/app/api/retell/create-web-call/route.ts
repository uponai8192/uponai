import { NextResponse, type NextRequest } from 'next/server'
import { sendLeadNotification } from '@/lib/voice/lead-notification'

type LeadBody = {
  name: string
  email: string
  company: string
  consentContact: boolean
  consentMarketing?: boolean
  notify?: boolean
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LeadBody
  const { name, email, company, consentContact, consentMarketing = false, notify = true } = body

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
      agentId: process.env.UPONAI_AGENT_ID,
      retell_llm_dynamic_variables: { name: name.trim(), company: company.trim() },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[create-web-call] UponAI API error', res.status, text)
    return NextResponse.json({ error: 'Failed to create call' }, { status: 502 })
  }

  const { accessToken } = (await res.json()) as { accessToken: string }

  if (notify) {
    sendLeadNotification({ name, email, company, consentContact, consentMarketing })
  }

  return NextResponse.json({ accessToken }, { status: 201 })
}
