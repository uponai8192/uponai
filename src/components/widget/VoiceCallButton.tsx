'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { RetellWebClient } from 'retell-client-js-sdk'
import { useVoiceWidget, type CallState } from './VoiceWidgetProvider'

type LeadData = {
  name: string
  email: string
  company: string
  consentContact: boolean
  consentMarketing: boolean
}

type Props = {
  label?: string
  size?: 'sm' | 'lg'
}

export function VoiceCallButton({ label = 'Talk to Grace', size = 'lg' }: Props) {
  const { onCallStateChange } = useVoiceWidget()
  const [state, setState] = useState<CallState>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [lead, setLead] = useState<LeadData>({
    name: '', email: '', company: '', consentContact: false, consentMarketing: false,
  })
  const clientRef = useRef<RetellWebClient | null>(null)

  useEffect(() => {
    return () => { clientRef.current?.stopCall() }
  }, [])

  const startCall = async (notify: boolean) => {
    setState('loading')
    onCallStateChange('loading')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/retell/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, notify }),
      })
      if (!res.ok) throw new Error('Failed to create call')
      const { accessToken } = (await res.json()) as { accessToken: string }

      const client = new RetellWebClient()
      clientRef.current = client

      client.on('call_started', () => {
        setState('active')
        onCallStateChange('active')
      })
      client.on('call_ended', () => {
        setState('ended')
        onCallStateChange('ended')
      })
      client.on('error', (err: unknown) => {
        console.error('[VoiceCallButton] SDK error', err)
        client.stopCall()
        setState('error')
        onCallStateChange('error')
        setErrorMsg('Call error. Please try again.')
      })

      await client.startCall({ accessToken })
    } catch (err) {
      console.error('[VoiceCallButton]', err)
      setState('error')
      onCallStateChange('error')
      setErrorMsg('Could not connect. Please try again.')
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void startCall(true)
  }

  const handleStop = () => { clientRef.current?.stopCall() }
  const handleTalkAgain = () => { void startCall(false) }
  const handleRetry = () => { setState('idle'); onCallStateChange('idle'); setErrorMsg(null) }

  const isLg = size === 'lg'
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: isLg ? '10px 14px' : '8px 12px',
    fontSize: isLg ? '0.9rem' : '0.8rem',
    backgroundColor: 'rgba(8,17,31,0.8)',
    border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: 8,
    color: '#f8fafc',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  if (state === 'idle' || state === 'loading') {
    if (state === 'loading') {
      return (
        <div
          className="inline-flex items-center gap-3 rounded-full font-medium"
          style={{
            padding: isLg ? '14px 28px' : '10px 20px',
            fontSize: isLg ? '1rem' : '0.875rem',
            color: '#94a3b8',
            backgroundColor: 'rgba(16,32,54,0.8)',
            border: '1px solid rgba(148,163,184,0.18)',
          }}
        >
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          Connecting…
        </div>
      )
    }

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: isLg ? 420 : 320,
          backgroundColor: 'rgba(16,32,54,0.9)',
          border: '1px solid rgba(148,163,184,0.12)',
          borderRadius: 16,
          padding: isLg ? '28px 24px' : '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: isLg ? 14 : 10,
        }}
      >
        <p style={{ color: '#cbd5e1', fontSize: isLg ? '0.9rem' : '0.8rem', margin: 0 }}>
          Just a few details before we connect you.
        </p>
        <input required type="text" placeholder="Your name" value={lead.name}
          onChange={e => setLead(p => ({ ...p, name: e.target.value }))}
          style={inputStyle} autoComplete="name" />
        <input required type="email" placeholder="Email address" value={lead.email}
          onChange={e => setLead(p => ({ ...p, email: e.target.value }))}
          style={inputStyle} autoComplete="email" />
        <input required type="text" placeholder="Company name" value={lead.company}
          onChange={e => setLead(p => ({ ...p, company: e.target.value }))}
          style={inputStyle} autoComplete="organization" />
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
          <input required type="checkbox" checked={lead.consentContact}
            onChange={e => setLead(p => ({ ...p, consentContact: e.target.checked }))}
            style={{ marginTop: 2, accentColor: '#2563eb', flexShrink: 0 }} />
          <span style={{ color: '#94a3b8', fontSize: isLg ? '0.8rem' : '0.72rem', lineHeight: 1.4 }}>
            I consent to UponAI contacting me regarding my enquiry.{' '}
            <span style={{ color: '#f87171' }}>*</span>
          </span>
        </label>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={lead.consentMarketing}
            onChange={e => setLead(p => ({ ...p, consentMarketing: e.target.checked }))}
            style={{ marginTop: 2, accentColor: '#2563eb', flexShrink: 0 }} />
          <span style={{ color: '#94a3b8', fontSize: isLg ? '0.8rem' : '0.72rem', lineHeight: 1.4 }}>
            I agree to receive newsletters and promotional communications from UponAI.
          </span>
        </label>
        <p style={{ color: '#64748b', fontSize: isLg ? '0.72rem' : '0.65rem', margin: 0, lineHeight: 1.4 }}>
          Your information is handled in accordance with POPIA.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1188e6 100%)',
            color: '#ffffff',
            padding: isLg ? '13px 24px' : '10px 18px',
            fontSize: isLg ? '0.95rem' : '0.82rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 24px rgba(37,99,235,0.4)',
            marginTop: 4,
          }}
        >
          <MicIcon size={isLg ? 18 : 15} />
          {label}
          <ArrowRight size={isLg ? 15 : 13} />
        </button>
      </form>
    )
  }

  if (state === 'active') {
    return (
      <div className="inline-flex items-center gap-4 rounded-full"
        style={{
          padding: isLg ? '12px 20px 12px 24px' : '8px 14px 8px 18px',
          backgroundColor: 'rgba(16,32,54,0.9)',
          border: '1px solid rgba(239,68,68,0.35)',
          boxShadow: '0 0 24px rgba(239,68,68,0.15)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#f87171' }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#ef4444' }} />
          </span>
          <span className="font-semibold tracking-wide" style={{ color: '#f87171', fontSize: isLg ? '0.875rem' : '0.75rem' }}>LIVE</span>
        </div>
        <SoundWave />
        <button type="button" onClick={handleStop}
          className="rounded-full font-semibold transition-opacity hover:opacity-80"
          style={{
            padding: isLg ? '6px 16px' : '4px 12px',
            fontSize: isLg ? '0.875rem' : '0.75rem',
            backgroundColor: 'rgba(239,68,68,0.18)',
            color: '#f87171',
            border: '1px solid rgba(239,68,68,0.35)',
          }}
        >
          End Call
        </button>
      </div>
    )
  }

  if (state === 'ended') {
    return (
      <div className="inline-flex items-center gap-3 rounded-full"
        style={{
          padding: isLg ? '12px 16px 12px 24px' : '8px 12px 8px 18px',
          backgroundColor: 'rgba(52,211,153,0.08)',
          border: '1px solid rgba(52,211,153,0.25)',
        }}
      >
        <span className="inline-flex items-center gap-2 font-medium" style={{ color: '#34d399', fontSize: isLg ? '1rem' : '0.875rem' }}>
          <CheckIcon size={isLg ? 18 : 14} />
          Call ended
        </span>
        <button type="button" onClick={handleTalkAgain}
          className="rounded-full font-semibold transition-opacity hover:opacity-80"
          style={{
            padding: isLg ? '6px 16px' : '4px 12px',
            fontSize: isLg ? '0.875rem' : '0.75rem',
            backgroundColor: 'rgba(37,99,235,0.2)',
            color: '#60a5fa',
            border: '1px solid rgba(37,99,235,0.35)',
          }}
        >
          Talk again
        </button>
      </div>
    )
  }

  // error
  return (
    <div className="inline-flex items-center gap-3 rounded-full"
      style={{
        padding: isLg ? '12px 20px 12px 24px' : '8px 14px 8px 18px',
        backgroundColor: 'rgba(16,32,54,0.8)',
        border: '1px solid rgba(239,68,68,0.3)',
      }}
    >
      <span style={{ color: '#f87171', fontSize: isLg ? '0.875rem' : '0.75rem' }}>{errorMsg}</span>
      <button type="button" onClick={handleRetry}
        className="rounded-full font-semibold transition-opacity hover:opacity-80"
        style={{
          padding: isLg ? '6px 16px' : '4px 12px',
          fontSize: isLg ? '0.875rem' : '0.75rem',
          backgroundColor: 'rgba(37,99,235,0.2)',
          color: '#60a5fa',
          border: '1px solid rgba(37,99,235,0.35)',
        }}
      >
        Try again
      </button>
    </div>
  )
}

function MicIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function SoundWave() {
  return (
    <div className="flex items-center gap-[3px]" aria-hidden="true">
      {[3, 5, 7, 5, 3, 4, 6].map((h, i) => (
        <span key={i} className="rounded-full animate-pulse"
          style={{ width: 3, height: h * 2, backgroundColor: '#f87171', animationDelay: `${i * 80}ms`, opacity: 0.7 }} />
      ))}
    </div>
  )
}
