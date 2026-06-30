// src/lib/voice/jambonz-transport.ts
//
// Browser SIP/WebRTC client into Jambonz (UponAI's SIP layer). The call enters
// UponAI as an INBOUND PHONE call, so the agent's transfer_call + Extension
// Directory work exactly like a call to the DID — unlike a Retell web call.
//
// Built on jsSIP (jambonz's recommended browser SIP library). jsSIP touches
// `window`/WebRTC, so it is dynamically imported at call time (never on the server).

import type { TransportEvents, VoiceTransport } from './transport'

export type JambonzSessionConfig = {
  /** Secure WebSocket signaling endpoint, e.g. wss://sip.upon-ai.com:8443 */
  wsServer: string
  /** Registering identity, e.g. sip:webdemo@sip.upon-ai.com */
  sipUri: string
  /** SIP digest password for the (restricted, ideally ephemeral) client. */
  sipPassword: string
  /** Destination the web client dials — the same Jambonz app/route the DID uses. */
  target: string
  /** STUN/TURN servers for browser media traversal. */
  iceServers: RTCIceServer[]
}

export function createJambonzTransport(config: JambonzSessionConfig): VoiceTransport {
  // Loosely typed jsSIP handles — @types/jssip lags the runtime in places.
  let ua: { start: () => void; stop: () => void; call: (t: string, o: unknown) => unknown; on: (e: string, cb: (d: unknown) => void) => void } | null = null
  let session: { terminate: () => void; on: (e: string, cb: (d: unknown) => void) => void; connection?: RTCPeerConnection } | null = null
  let audioEl: HTMLAudioElement | null = null
  let stopped = false

  const cleanup = () => {
    try { session?.terminate() } catch { /* already gone */ }
    try { ua?.stop() } catch { /* already gone */ }
    if (audioEl) { audioEl.srcObject = null; audioEl.remove(); audioEl = null }
    session = null
    ua = null
  }

  return {
    async start(events: TransportEvents) {
      const JsSIP = (await import('jssip')).default

      audioEl = document.createElement('audio')
      audioEl.autoplay = true
      audioEl.style.display = 'none'
      document.body.appendChild(audioEl)

      const socket = new JsSIP.WebSocketInterface(config.wsServer)
      const agent = new JsSIP.UA({
        sockets: [socket],
        uri: config.sipUri,
        password: config.sipPassword,
      })
      ua = agent as unknown as typeof ua

      agent.on('registrationFailed', () => {
        if (stopped) return
        events.onError('Could not connect. Please try again.')
        cleanup()
      })

      // Place the call once registered.
      agent.on('registered', () => {
        if (stopped) return
        const s = agent.call(config.target, {
          mediaConstraints: { audio: true, video: false },
          pcConfig: { iceServers: config.iceServers },
        })
        session = s as unknown as typeof session

        // Attach the agent's audio to the hidden <audio> element.
        s.on('peerconnection', (e: unknown) => {
          const pc = (e as { peerconnection: RTCPeerConnection }).peerconnection
          pc.addEventListener('track', (ev: RTCTrackEvent) => {
            if (audioEl && ev.streams[0]) audioEl.srcObject = ev.streams[0]
          })
        })
        s.on('confirmed', () => { if (!stopped) events.onConnected() })
        s.on('ended', () => events.onEnded())
        s.on('failed', () => {
          if (stopped) return
          events.onError('Call failed. Please try again.')
          cleanup()
        })
      })

      agent.start()
    },
    stop() {
      stopped = true
      cleanup()
    },
  }
}
