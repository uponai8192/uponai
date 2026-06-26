'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'

export type CallState = 'idle' | 'loading' | 'active' | 'ended' | 'error'

type VoiceWidgetContextValue = {
  widgetOpen: boolean
  callState: CallState
  openWidget: () => void
  closeWidget: () => void
  onCallStateChange: (state: CallState) => void
  registerEndCall: (fn: (() => void) | null) => void
  endCall: () => void
}

const VoiceWidgetContext = createContext<VoiceWidgetContextValue | null>(null)

export function VoiceWidgetProvider({ children }: { children: ReactNode }) {
  const [widgetOpen, setWidgetOpen] = useState(false)
  const [callState, setCallState] = useState<CallState>('idle')
  const endCallRef = useRef<(() => void) | null>(null)

  // Opening always starts from a fresh form.
  const openWidget = useCallback(() => { setCallState('idle'); setWidgetOpen(true) }, [])
  // Closing only hides the modal — an in-progress call keeps running on the page.
  const closeWidget = useCallback(() => setWidgetOpen(false), [])
  const onCallStateChange = useCallback((state: CallState) => setCallState(state), [])
  const registerEndCall = useCallback((fn: (() => void) | null) => { endCallRef.current = fn }, [])
  const endCall = useCallback(() => { endCallRef.current?.() }, [])

  return (
    <VoiceWidgetContext.Provider value={{ widgetOpen, callState, openWidget, closeWidget, onCallStateChange, registerEndCall, endCall }}>
      {children}
    </VoiceWidgetContext.Provider>
  )
}

export function useVoiceWidget(): VoiceWidgetContextValue {
  const ctx = useContext(VoiceWidgetContext)
  if (!ctx) throw new Error('useVoiceWidget must be used inside VoiceWidgetProvider')
  return ctx
}
