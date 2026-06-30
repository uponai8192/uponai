import { NextResponse, type NextRequest } from 'next/server'
import { sendLeadNotification } from '@/lib/voice/lead-notification'

// Returns the SIP/WebRTC session config the browser needs to register with
// Jambonz and dial Grace. The call enters UponAI as a phone call, so transfer
// + the Extension Directory work (unlike a Retell web call).
//
// SECURITY: the SIP credential below is handed to the browser, so anyone can
// extract it. The env client MUST be a restricted Jambonz user that can ONLY
// reach the demo app/target and is rate-limited. Production hardening: mint a
// short-lived per-session credential via the Jambonz provisioning API here
// instead of returning a static one.  TODO(jambonz-creds).

type LeadBody = {
  name: string
  email: string
  company: string
  consentContact: boolean
  consentMarketing?: boolean
  notify?: boolean
}

function iceServers(): RTCIceServer[] {
  const servers: RTCIceServer[] = [{ urls: 'stun:stun.l.google.com:19302' }]
  if (process.env.JAMBONZ_TURN_URL) {
    servers.push({
      urls: process.env.JAMBONZ_TURN_URL,
      username: process.env.JAMBONZ_TURN_USERNAME,
      credential: process.env.JAMBONZ_TURN_CREDENTIAL,
    })
  }
  return servers
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LeadBody
  const { name, email, company, consentContact, consentMarketing = false, notify = true } = body

  if (!name?.trim() || !email?.trim() || !company?.trim() || !consentContact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { JAMBONZ_WS_SERVER, JAMBONZ_SIP_URI, JAMBONZ_SIP_PASSWORD, JAMBONZ_DIAL_TARGET } = process.env
  if (!JAMBONZ_WS_SERVER || !JAMBONZ_SIP_URI || !JAMBONZ_SIP_PASSWORD || !JAMBONZ_DIAL_TARGET) {
    console.error('[jambonz-session] missing JAMBONZ_* env — credentials not configured yet')
    return NextResponse.json({ error: 'Voice service not configured' }, { status: 503 })
  }

  if (notify) {
    sendLeadNotification({ name, email, company, consentContact, consentMarketing })
  }

  return NextResponse.json(
    {
      wsServer: JAMBONZ_WS_SERVER,
      sipUri: JAMBONZ_SIP_URI,
      sipPassword: JAMBONZ_SIP_PASSWORD,
      target: JAMBONZ_DIAL_TARGET,
      iceServers: iceServers(),
    },
    { status: 201 },
  )
}
