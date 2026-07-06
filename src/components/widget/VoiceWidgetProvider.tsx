'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import { VoiceDemoModalDynamic } from '@/components/widget/VoiceDemoModalDynamic'

export type CallState = 'idle' | 'loading' | 'active' | 'ended' | 'error'

type OpenOptions = { company?: string }

type VoiceWidgetContextValue = {
  widgetOpen: boolean
  callState: CallState
  prefillCompany: string
  openWidget: (options?: OpenOptions) => void
  closeWidget: () => void
  onCallStateChange: (state: CallState) => void
  registerEndCall: (fn: (() => void) | null) => void
  endCall: () => void
}

const VoiceWidgetContext = createContext<VoiceWidgetContextValue | null>(null)

export function VoiceWidgetProvider({ children }: { children: ReactNode }) {
  const [widgetOpen, setWidgetOpen] = useState(false)
  const [callState, setCallState] = useState<CallState>('idle')
  const [prefillCompany, setPrefillCompany] = useState('')
  const endCallRef = useRef<(() => void) | null>(null)

  // Opening always starts from a fresh form. An optional company pre-fills the
  // form (e.g. the "Hear Grace answer for X" builder CTA) so it isn't asked twice.
  const openWidget = useCallback((options?: OpenOptions) => {
    setPrefillCompany(options?.company ?? '')
    setCallState('idle')
    setWidgetOpen(true)
  }, [])
  // Closing only hides the modal — an in-progress call keeps running on the page.
  const closeWidget = useCallback(() => setWidgetOpen(false), [])
  const onCallStateChange = useCallback((state: CallState) => setCallState(state), [])
  const registerEndCall = useCallback((fn: (() => void) | null) => { endCallRef.current = fn }, [])
  const endCall = useCallback(() => { endCallRef.current?.() }, [])

  return (
    <VoiceWidgetContext.Provider value={{ widgetOpen, callState, prefillCompany, openWidget, closeWidget, onCallStateChange, registerEndCall, endCall }}>
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
