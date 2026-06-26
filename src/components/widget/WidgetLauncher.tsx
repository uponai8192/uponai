'use client'

import { useVoiceWidget } from './VoiceWidgetProvider'
import { VoiceCallButtonDynamic as VoiceCallButton } from './VoiceCallButtonDynamic'

export function WidgetLauncher() {
  const { widgetOpen, openWidget, closeWidget } = useVoiceWidget()

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
        padding: 12,
        boxSizing: 'border-box',
      }}
    >
      {widgetOpen && (
        <div
          style={{
            width: 376,
            maxHeight: 656,
            overflowY: 'auto',
            borderRadius: 16,
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={closeWidget}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid rgba(148,163,184,0.25)',
              background: 'rgba(8,17,31,0.85)',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CloseIcon />
          </button>
          <VoiceCallButton label="Talk to Grace" size="sm" />
        </div>
      )}

      {!widgetOpen && (
        <button
          type="button"
          onClick={openWidget}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            padding: '14px 22px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '0.95rem',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #2563eb 0%, #1188e6 100%)',
            boxShadow: '0 0 32px rgba(37,99,235,0.45), 0 6px 20px rgba(0,0,0,0.35)',
          }}
        >
          <MicIcon />
          Talk to Grace
        </button>
      )}
    </div>
  )
}

function MicIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
