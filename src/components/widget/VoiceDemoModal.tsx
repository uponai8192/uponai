'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { RetellWebClient } from 'retell-client-js-sdk'
import { useVoiceWidget, type CallState } from './VoiceWidgetProvider'
import { uponaiBookingUrl } from '@/lib/booking'

type LeadData = {
  name: string
  email: string
  company: string
  consentContact: boolean
  consentMarketing: boolean
}

const WAVE_HEIGHTS = [35, 65, 85, 50, 95, 70, 45, 88, 55, 78, 42, 90, 60, 72, 38]

export function VoiceDemoModal() {
  const { widgetOpen, closeWidget, onCallStateChange } = useVoiceWidget()
  const [callState, setCallState] = useState<CallState>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [lead, setLead] = useState<LeadData>({
    name: '', email: '', company: '', consentContact: false, consentMarketing: false,
  })
  const clientRef = useRef<RetellWebClient | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => {
    clientRef.current?.stopCall()
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (callState === 'active') {
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [callState])

  // Reset form state when modal reopens
  useEffect(() => {
    if (widgetOpen && (callState === 'ended' || callState === 'error')) {
      // keep ended/error visible — user can explicitly reset
    }
    if (!widgetOpen) {
      setCallState('idle')
      setErrorMsg(null)
    }
  }, [widgetOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const syncState = (s: CallState) => {
    setCallState(s)
    onCallStateChange(s)
  }

  const startCall = async (notify: boolean) => {
    syncState('loading')
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

      client.on('call_started', () => syncState('active'))
      client.on('call_ended', () => syncState('ended'))
      client.on('error', (err: unknown) => {
        console.error('[VoiceDemoModal]', err)
        client.stopCall()
        syncState('error')
        setErrorMsg('Call failed. Please try again.')
      })

      await client.startCall({ accessToken })
    } catch (err) {
      console.error('[VoiceDemoModal]', err)
      syncState('error')
      setErrorMsg('Could not connect. Please try again.')
    }
  }

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); void startCall(true) }
  const handleStop = () => clientRef.current?.stopCall()
  const handleTalkAgain = () => void startCall(false)
  const handleRetry = () => { syncState('idle'); setErrorMsg(null) }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(34,197,94,0.45)'
    e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.08)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(148,163,184,0.15)'
    e.target.style.boxShadow = 'none'
  }

  if (!widgetOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
      onClick={callState !== 'active' ? closeWidget : undefined}
    >
      <style>{`
        @keyframes modal-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes wave-modal {
          0%   { transform: scaleY(0.15); opacity: 0.4; }
          100% { transform: scaleY(1);    opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(34,197,94,0.3); }
          50%       { box-shadow: 0 0 60px rgba(34,197,94,0.55); }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Talk to Grace"
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          animation: 'modal-slide-up 0.26s cubic-bezier(0.16,1,0.3,1) forwards',
          background: 'rgba(6,13,26,0.98)',
          border: '1px solid rgba(34,197,94,0.14)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.6), 0 48px 96px rgba(0,0,0,0.7), 0 0 80px rgba(34,197,94,0.07)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── FORM / LOADING ── */}
        {(callState === 'idle' || callState === 'loading') && (
          <>
            {/* Header */}
            <div
              className="px-7 pt-7 pb-5 flex items-center gap-4"
              style={{ borderBottom: '1px solid rgba(148,163,184,0.07)' }}
            >
              <div className="relative flex-shrink-0">
                <div className="h-[52px] w-[52px] rounded-full bg-gradient-to-br from-[#22c55e] to-[#54d2ff] flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.28)]">
                  <span className="text-xl font-bold text-white select-none">G</span>
                </div>
                <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-[#22c55e] border-2 border-[rgba(6,13,26,1)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: '#22c55e' }}>UponAI Agent</p>
                <h2 className="text-lg font-bold leading-tight" style={{ color: '#f1f5f9' }}>Talk to Grace</h2>
                <p className="text-xs mt-0.5" style={{ color: '#475569' }}>AI voice · Available now</p>
              </div>
              <button
                type="button"
                onClick={closeWidget}
                aria-label="Close"
                className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
                style={{ border: '1px solid rgba(148,163,184,0.12)', color: '#475569' }}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
              <p className="text-sm" style={{ color: '#64748b' }}>
                Quick details before we connect you.
              </p>

              <div className="flex flex-col gap-3">
                {([
                  { key: 'name',    label: 'Your name',      type: 'text',  autocomplete: 'name',         placeholder: 'Alex Johnson' },
                  { key: 'email',   label: 'Email address',  type: 'email', autocomplete: 'email',        placeholder: 'alex@company.com' },
                  { key: 'company', label: 'Company',        type: 'text',  autocomplete: 'organization', placeholder: 'Acme Inc.' },
                ] as const).map(({ key, label, type, autocomplete, placeholder }) => (
                  <div key={key}>
                    <label htmlFor={`vdm-${key}`} className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>
                      {label}
                    </label>
                    <input
                      id={`vdm-${key}`}
                      required
                      type={type}
                      placeholder={placeholder}
                      value={lead[key]}
                      onChange={e => setLead(p => ({ ...p, [key]: e.target.value }))}
                      autoComplete={autocomplete}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(148,163,184,0.15)',
                        color: '#f1f5f9',
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    id="vdm-consent-contact"
                    required
                    type="checkbox"
                    checked={lead.consentContact}
                    onChange={e => setLead(p => ({ ...p, consentContact: e.target.checked }))}
                    className="mt-0.5 flex-shrink-0"
                    style={{ accentColor: '#22c55e' }}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: '#475569' }}>
                    I consent to UponAI contacting me regarding my enquiry.{' '}
                    <span style={{ color: '#f87171' }}>*</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    id="vdm-consent-marketing"
                    type="checkbox"
                    checked={lead.consentMarketing}
                    onChange={e => setLead(p => ({ ...p, consentMarketing: e.target.checked }))}
                    className="mt-0.5 flex-shrink-0"
                    style={{ accentColor: '#22c55e' }}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: '#475569' }}>
                    I agree to receive newsletters and marketing from UponAI.
                  </span>
                </label>
              </div>

              <p className="text-[11px]" style={{ color: '#334155' }}>
                Handled in accordance with POPIA.
              </p>

              <button
                type="submit"
                disabled={callState === 'loading'}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  boxShadow: '0 0 28px rgba(34,197,94,0.28)',
                }}
              >
                {callState === 'loading' ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Connecting…
                  </>
                ) : (
                  <>
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                    Start call with Grace
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* ── ACTIVE CALL ── */}
        {callState === 'active' && (
          <div>
            {/* Hero header */}
            <div
              className="relative px-7 pt-10 pb-8 text-center overflow-hidden"
              style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.1) 0%, transparent 100%)' }}
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)' }} />

              <div className="relative inline-block mb-5">
                <div
                  className="h-24 w-24 rounded-full bg-gradient-to-br from-[#22c55e] to-[#54d2ff] flex items-center justify-center mx-auto"
                  style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
                >
                  <span className="text-3xl font-bold text-white select-none">G</span>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#22c55e]/40" style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
                <div className="absolute inset-[-10px] rounded-full border border-[#22c55e]/12" style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite 0.35s' }} />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-2" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#22c55e' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#22c55e' }}>Speaking</span>
              </div>

              <p className="text-sm" style={{ color: '#64748b' }}>Grace · UponAI Agent</p>
            </div>

            {/* Waveform */}
            <div className="flex h-12 items-end justify-center gap-[3px] px-8 pb-2">
              {WAVE_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={`rounded-full flex-1 max-w-[7px] ${i % 2 === 0 ? 'bg-[#22c55e]' : 'bg-[#54d2ff]'}`}
                  style={{
                    height: `${h}%`,
                    transformOrigin: 'bottom',
                    animation: `wave-modal ${0.45 + (i % 5) * 0.12}s ease-in-out ${i * 0.055}s infinite alternate`,
                  }}
                />
              ))}
            </div>

            {/* Timer + End button */}
            <div className="flex items-center justify-between px-7 py-5" style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}>
              <span className="font-mono text-base" style={{ color: '#475569' }}>{formatTime(elapsed)}</span>
              <button
                type="button"
                onClick={handleStop}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-80 active:scale-[0.97]"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#f87171',
                }}
              >
                <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="5" y="5" width="14" height="14" rx="2" />
                </svg>
                End call
              </button>
            </div>
          </div>
        )}

        {/* ── ENDED ── */}
        {callState === 'ended' && (
          <div className="px-7 py-8">
            <button
              type="button"
              onClick={closeWidget}
              aria-label="Close"
              className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ border: '1px solid rgba(148,163,184,0.12)', color: '#475569' }}
            >
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-7">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-4" style={{ background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.22)' }}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-1" style={{ color: '#f1f5f9' }}>Call ended</h2>
              <p className="text-sm" style={{ color: '#475569' }}>Hope that felt real. Here's what happened.</p>
            </div>

            <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
              {[
                { label: 'Agent',    value: 'Grace' },
                { label: 'Built by', value: 'UponAI' },
                { label: 'Duration', value: formatTime(elapsed) },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    borderTop: i > 0 ? '1px solid rgba(148,163,184,0.06)' : 'none',
                  }}
                >
                  <span className="text-sm" style={{ color: '#475569' }}>{row.label}</span>
                  <span className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-xl py-3.5 text-center text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  boxShadow: '0 0 24px rgba(34,197,94,0.22)',
                }}
              >
                Book a Demo
              </a>
              <button
                type="button"
                onClick={handleTalkAgain}
                className="w-full rounded-xl py-3 text-sm font-medium transition-all hover:bg-white/5"
                style={{ color: '#475569', border: '1px solid rgba(148,163,184,0.1)' }}
              >
                Talk again
              </button>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {callState === 'error' && (
          <div className="px-7 py-10 text-center">
            <button
              type="button"
              onClick={closeWidget}
              aria-label="Close"
              className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ border: '1px solid rgba(148,163,184,0.12)', color: '#475569' }}
            >
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
            <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>{errorMsg}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-xl px-8 py-3 text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
