'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type CallState = 'idle' | 'loading' | 'active' | 'ended' | 'error'

type VoiceWidgetContextValue = {
  widgetOpen: boolean
  callState: CallState
  openWidget: () => void
  closeWidget: () => void
  onCallStateChange: (state: CallState) => void
}

const VoiceWidgetContext = createContext<VoiceWidgetContextValue | null>(null)

export function VoiceWidgetProvider({ children }: { children: ReactNode }) {
  const [widgetOpen, setWidgetOpen] = useState(false)
  const [callState, setCallState] = useState<CallState>('idle')

  const openWidget = useCallback(() => setWidgetOpen(true), [])
  const closeWidget = useCallback(() => { setWidgetOpen(false); setCallState('idle') }, [])
  const onCallStateChange = useCallback((state: CallState) => setCallState(state), [])

  return (
    <VoiceWidgetContext.Provider value={{ widgetOpen, callState, openWidget, closeWidget, onCallStateChange }}>
      {children}
    </VoiceWidgetContext.Provider>
  )
}

export function useVoiceWidget(): VoiceWidgetContextValue {
  const ctx = useContext(VoiceWidgetContext)
  if (!ctx) throw new Error('useVoiceWidget must be used inside VoiceWidgetProvider')
  return ctx
}
