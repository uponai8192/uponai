// src/lib/voice/retell-transport.ts
//
// Browser WebRTC session against UponAI/Retell. This is the current default path.
// Note: UponAI web calls do NOT support call transfer (platform limitation).

import { RetellWebClient } from 'retell-client-js-sdk'
import type { TransportEvents, VoiceTransport } from './transport'

export function createRetellTransport(accessToken: string): VoiceTransport {
  let client: RetellWebClient | null = null

  return {
    async start(events: TransportEvents) {
      const c = new RetellWebClient()
      client = c
      c.on('call_started', () => events.onConnected())
      c.on('call_ended', () => events.onEnded())
      c.on('error', (err: unknown) => {
        console.error('[retell-transport]', err)
        c.stopCall()
        events.onError('Call failed. Please try again.')
      })
      await c.startCall({ accessToken })
    },
    stop() {
      client?.stopCall()
    },
  }
}
