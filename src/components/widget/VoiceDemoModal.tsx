'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { RetellWebClient } from 'retell-client-js-sdk'
import { useVoiceWidget } from './VoiceWidgetProvider'

type LeadData = {
  name: string
  email: string
  company: string
  consentContact: boolean
  consentMarketing: boolean
}

type Phase = 'form' | 'loading' | 'error'

export function VoiceDemoModal() {
  const { widgetOpen, closeWidget, onCallStateChange, registerEndCall } = useVoiceWidget()
  const [phase, setPhase] = useState<Phase>('form')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [lead, setLead] = useState<LeadData>({
    name: '', email: '', company: '', consentContact: false, consentMarketing: false,
  })
  const clientRef = useRef<RetellWebClient | null>(null)

  useEffect(() => () => { clientRef.current?.stopCall() }, [])

  // Reset to a fresh form each time the modal opens.
  // Cannot be done by remounting on widgetOpen: closeWidget() fires on 'call_started' to
  // hand the live call to the page, so an unmount would run the cleanup below and stop
  // the active call. Mirroring the open flag here costs one extra render per open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- remount-on-open would kill the live call, see above
    if (widgetOpen) { setPhase('form'); setErrorMsg(null) }
  }, [widgetOpen])

  const startCall = async () => {
    setPhase('loading')
    setErrorMsg(null)
    onCallStateChange('loading')
    try {
      const res = await fetch('/api/retell/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, notify: true }),
      })
      if (!res.ok) throw new Error('Failed to create call')
      const { accessToken } = (await res.json()) as { accessToken: string }

      const client = new RetellWebClient()
      clientRef.current = client

      client.on('call_started', () => {
        onCallStateChange('active')
        registerEndCall(() => client.stopCall())
        closeWidget() // hand the live call off to the page
      })
      client.on('call_ended', () => {
        onCallStateChange('ended')
        registerEndCall(null)
        clientRef.current = null
      })
      client.on('error', (err: unknown) => {
        console.error('[VoiceDemoModal]', err)
        client.stopCall()
        registerEndCall(null)
        clientRef.current = null
        onCallStateChange('error')
        setPhase('error')
        setErrorMsg('Call failed. Please try again.')
      })

      await client.startCall({ accessToken })
    } catch (err) {
      console.error('[VoiceDemoModal]', err)
      onCallStateChange('error')
      setPhase('error')
      setErrorMsg('Could not connect. Please try again.')
    }
  }

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); void startCall() }
  const handleRetry = () => { setPhase('form'); setErrorMsg(null); onCallStateChange('idle') }

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
      onClick={closeWidget}
    >
      <style>{`
        @keyframes modal-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
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
        {(phase === 'form' || phase === 'loading') && (
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
                disabled={phase === 'loading'}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  boxShadow: '0 0 28px rgba(34,197,94,0.28)',
                }}
              >
                {phase === 'loading' ? (
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

        {/* ── ERROR ── */}
        {phase === 'error' && (
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
