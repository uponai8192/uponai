// src/lib/voice/transport.ts
//
// A voice call transport abstracts "how the browser audio reaches the agent".
// Two implementations exist:
//   - retell  : browser WebRTC session to UponAI/Retell (create-web-call). No transfer.
//   - jambonz : browser SIP/WebRTC into Jambonz, entering UponAI as a phone call. Transfer works.
//
// The active transport is chosen by NEXT_PUBLIC_VOICE_TRANSPORT (default 'retell').

export type TransportKind = 'retell' | 'jambonz'

export type TransportEvents = {
  onConnected: () => void
  onEnded: () => void
  onError: (message: string) => void
}

export interface VoiceTransport {
  /** Begin the call. Resolves once dialing has started; connection is signalled via onConnected. */
  start: (events: TransportEvents) => Promise<void>
  /** Hang up. Safe to call multiple times. */
  stop: () => void
}

export function activeTransportKind(): TransportKind {
  return process.env.NEXT_PUBLIC_VOICE_TRANSPORT === 'jambonz' ? 'jambonz' : 'retell'
}
