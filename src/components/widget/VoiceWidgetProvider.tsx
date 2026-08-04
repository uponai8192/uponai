'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import { VoiceDemoModalDynamic } from '@/components/widget/VoiceDemoModalDynamic'

export type CallState = 'idle' | 'loading' | 'active' | 'ended' | 'error'

type OpenOptions = { company?: string; vertical?: string }

type VoiceWidgetContextValue = {
  widgetOpen: boolean
  callState: CallState
  prefillCompany: string
  /** Vertical the call was started from, so the server can pick that agent. */
  vertical: string
  /** True once the visitor's details have been accepted for a call this session. */
  leadCaptured: boolean
  openWidget: (options?: OpenOptions) => void
  closeWidget: () => void
  onCallStateChange: (state: CallState) => void
  registerEndCall: (fn: (() => void) | null) => void
  endCall: () => void
  markLeadCaptured: () => void
  registerStartCall: (fn: ((vertical?: string) => void) | null) => void
  /** Start a call straight away, reusing details already given this session. */
  startCallDirect: (vertical?: string) => void
}

const VoiceWidgetContext = createContext<VoiceWidgetContextValue | null>(null)

export function VoiceWidgetProvider({ children }: { children: ReactNode }) {
  const [widgetOpen, setWidgetOpen] = useState(false)
  const [callState, setCallState] = useState<CallState>('idle')
  const [prefillCompany, setPrefillCompany] = useState('')
  const [vertical, setVertical] = useState('')
  const [leadCaptured, setLeadCaptured] = useState(false)
  const endCallRef = useRef<(() => void) | null>(null)
  const startCallRef = useRef<((vertical?: string) => void) | null>(null)

  // Opening always starts from a fresh form. An optional company pre-fills the
  // form (e.g. the "Hear Grace answer for X" builder CTA) so it isn't asked twice.
  // An optional vertical tells the server which trained agent to use.
  const openWidget = useCallback((options?: OpenOptions) => {
    setPrefillCompany(options?.company ?? '')
    setVertical(options?.vertical ?? '')
    setCallState('idle')
    setWidgetOpen(true)
  }, [])
  // Closing only hides the modal - an in-progress call keeps running on the page.
  const closeWidget = useCallback(() => setWidgetOpen(false), [])
  const onCallStateChange = useCallback((state: CallState) => setCallState(state), [])
  const registerEndCall = useCallback((fn: (() => void) | null) => { endCallRef.current = fn }, [])
  const endCall = useCallback(() => { endCallRef.current?.() }, [])
  const markLeadCaptured = useCallback(() => setLeadCaptured(true), [])
  const registerStartCall = useCallback((fn: ((vertical?: string) => void) | null) => { startCallRef.current = fn }, [])

  // Reconnect without reopening the form. The vertical is passed straight to
  // the call so it does not depend on the state update landing first.
  const startCallDirect = useCallback((nextVertical?: string) => {
    setVertical(nextVertical ?? '')
    startCallRef.current?.(nextVertical)
  }, [])

  return (
    <VoiceWidgetContext.Provider value={{ widgetOpen, callState, prefillCompany, vertical, leadCaptured, openWidget, closeWidget, onCallStateChange, registerEndCall, endCall, markLeadCaptured, registerStartCall, startCallDirect }}>
      {children}
      <VoiceDemoModalDynamic />
    </VoiceWidgetContext.Provider>
  )
}

export function useVoiceWidget(): VoiceWidgetContextValue {
  const ctx = useContext(VoiceWidgetContext)
  if (!ctx) throw new Error('useVoiceWidget must be used inside VoiceWidgetProvider')
  return ctx
}
