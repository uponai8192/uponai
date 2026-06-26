# Voice Widget In-House Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the Grace voice widget from the `uponai-voice-intake` iframe/embed into the main `uponai` repo as a native React component, sharing state with `LiveVoiceDemo` via context.

**Architecture:** `VoiceWidgetProvider` holds `widgetOpen` + `callState`. `WidgetLauncher` renders fixed bottom-right directly in the DOM (no iframe). `LiveVoiceDemo` drives its state machine from `callState` via `useVoiceWidget()`. All postMessage code is deleted.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, `retell-client-js-sdk`, `nodemailer`

## Global Constraints

- All components under `src/components/widget/` are client components (`'use client'`)
- `VoiceCallButton` must never SSR — always imported via `VoiceCallButtonDynamic` (uses `dynamic(..., { ssr: false })`)
- Use existing theme CSS variables (`--brand`, `--border`, etc.) — no hardcoded colors outside the ported widget components
- No new global CSS — widget uses inline styles (matches existing ported code)
- API route env vars: `UPONAI_API_KEY`, `UPONAI_AGENT_ID`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — all already in `.env.local`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/widget/VoiceWidgetProvider.tsx` | Create | Context, provider, `useVoiceWidget` hook |
| `src/components/widget/VoiceCallButton.tsx` | Create (port + simplify) | Form + Retell call flow; calls `onCallStateChange` |
| `src/components/widget/VoiceCallButtonDynamic.tsx` | Create (port as-is) | SSR guard for VoiceCallButton |
| `src/components/widget/WidgetLauncher.tsx` | Create (port + simplify) | Fixed-position floating launcher; reads context |
| `src/app/api/retell/create-web-call/route.ts` | Create (port as-is) | Web call creation + lead email |
| `src/app/layout.tsx` | Modify | Swap `<Script embed.js>` for `<VoiceWidgetProvider>` + `<WidgetLauncher>` |
| `src/components/sections/LiveVoiceDemo.tsx` | Modify | Replace postMessage with `useVoiceWidget()` |

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime deps**

```bash
cd "C:/Users/Melvin/Coding/UponAI/uponai"
npm install retell-client-js-sdk nodemailer
npm install -D @types/nodemailer
```

Expected: packages added to `node_modules`, `package.json` updated.

- [ ] **Step 2: Verify TypeScript resolves the types**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output (or only npm notice lines — no errors).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add retell-client-js-sdk and nodemailer deps"
```

---

### Task 2: Create VoiceWidgetProvider

**Files:**
- Create: `src/components/widget/VoiceWidgetProvider.tsx`

**Interfaces:**
- Produces:
  - `VoiceWidgetProvider({ children }): JSX.Element` — wraps layout
  - `useVoiceWidget(): VoiceWidgetContextValue` — consumed by WidgetLauncher and LiveVoiceDemo
  - `type CallState = 'idle' | 'loading' | 'active' | 'ended' | 'error'`

- [ ] **Step 1: Create the file**

```tsx
// src/components/widget/VoiceWidgetProvider.tsx
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
  const closeWidget = useCallback(() => setWidgetOpen(false), [])
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
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -v "^npm"
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/widget/VoiceWidgetProvider.tsx
git commit -m "feat: add VoiceWidgetProvider context"
```

---

### Task 3: Port API route

**Files:**
- Create: `src/app/api/retell/create-web-call/route.ts`

**Interfaces:**
- Produces: `POST /api/retell/create-web-call` → `{ accessToken: string }` (201) or error JSON

- [ ] **Step 1: Create directory and file**

```bash
mkdir -p "C:/Users/Melvin/Coding/UponAI/uponai/src/app/api/retell/create-web-call"
```

- [ ] **Step 2: Create the route**

```ts
// src/app/api/retell/create-web-call/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const LEAD_EMAIL = 'melvin@uponai.com'

type LeadBody = {
  name: string
  email: string
  company: string
  consentContact: boolean
  notify?: boolean
}

export async function POST(req: Request) {
  const body = (await req.json()) as LeadBody
  const { name, email, company, consentContact, notify = true } = body

  if (!name || !email || !company || !consentContact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const res = await fetch('https://api.upon-ai.com/api/v2/calls/web', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.UPONAI_API_KEY}`,
    },
    body: JSON.stringify({
      agentId: process.env.UPONAI_AGENT_ID,
      retell_llm_dynamic_variables: { name, company },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[create-web-call] UponAI API error', res.status, text)
    return NextResponse.json({ error: 'Failed to create call' }, { status: 502 })
  }

  const { accessToken } = (await res.json()) as { accessToken: string }

  if (notify && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    transport.sendMail({
      from: process.env.SMTP_USER,
      to: LEAD_EMAIL,
      subject: `New voice demo lead: ${name} — ${company}`,
      html: `<p><strong>${name}</strong> (${email}) from <strong>${company}</strong> just started a voice demo on uponai.com.</p>`,
    }).catch((err: unknown) => console.error('[create-web-call] email error', err))
  }

  return NextResponse.json({ accessToken }, { status: 201 })
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -v "^npm"
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/retell/create-web-call/route.ts
git commit -m "feat: port create-web-call API route"
```

---

### Task 4: Port VoiceCallButton

**Files:**
- Create: `src/components/widget/VoiceCallButton.tsx`
- Create: `src/components/widget/VoiceCallButtonDynamic.tsx`

**Interfaces:**
- Consumes: `useVoiceWidget()` → `onCallStateChange`
- Produces: `VoiceCallButton({ label?, size? })` — exported named export
- Produces: `VoiceCallButtonDynamic` — SSR-safe default export from Dynamic file

- [ ] **Step 1: Create VoiceCallButton.tsx**

This is the ported version with `window.parent.postMessage` replaced by `onCallStateChange` from context.

```tsx
// src/components/widget/VoiceCallButton.tsx
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
```

- [ ] **Step 2: Create VoiceCallButtonDynamic.tsx**

```tsx
// src/components/widget/VoiceCallButtonDynamic.tsx
'use client'
import dynamic from 'next/dynamic'

export const VoiceCallButtonDynamic = dynamic(
  () => import('./VoiceCallButton').then(m => ({ default: m.VoiceCallButton })),
  { ssr: false }
)
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -v "^npm"
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/components/widget/VoiceCallButton.tsx src/components/widget/VoiceCallButtonDynamic.tsx
git commit -m "feat: port VoiceCallButton with context integration"
```

---

### Task 5: Port WidgetLauncher

**Files:**
- Create: `src/components/widget/WidgetLauncher.tsx`

**Interfaces:**
- Consumes: `useVoiceWidget()` → `widgetOpen`, `openWidget`, `closeWidget`
- Consumes: `VoiceCallButtonDynamic` from `./VoiceCallButtonDynamic`
- Produces: `WidgetLauncher()` — renders fixed bottom-right launcher, no props needed

- [ ] **Step 1: Create WidgetLauncher.tsx**

All `postSize` / postMessage / COLLAPSED / OPEN dimension logic removed. `open` state sourced from context.

```tsx
// src/components/widget/WidgetLauncher.tsx
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
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -v "^npm"
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/widget/WidgetLauncher.tsx
git commit -m "feat: port WidgetLauncher as native React component"
```

---

### Task 6: Update layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `VoiceWidgetProvider` from `@/components/widget/VoiceWidgetProvider`
- Consumes: `WidgetLauncher` from `@/components/widget/WidgetLauncher`

- [ ] **Step 1: Update imports**

Add these two imports after the existing component imports:

```tsx
import { VoiceWidgetProvider } from '@/components/widget/VoiceWidgetProvider'
import { WidgetLauncher } from '@/components/widget/WidgetLauncher'
```

- [ ] **Step 2: Replace body content**

Replace the entire `<body>` block:

```tsx
// Before
<body className={`${spaceGrotesk.className} bg-[var(--background)] text-[var(--foreground)] antialiased transition-[background-color,color] duration-300`}>
  <Nav />
  <main className="pt-20 sm:pt-24 md:pt-32">{children}</main>
  <Footer />
  <CookieConsentManager />
  <Script
    src="https://uponai-voice-intake.vercel.app/embed.js"
    strategy="afterInteractive"
  />
</body>

// After
<body className={`${spaceGrotesk.className} bg-[var(--background)] text-[var(--foreground)] antialiased transition-[background-color,color] duration-300`}>
  <VoiceWidgetProvider>
    <Nav />
    <main className="pt-20 sm:pt-24 md:pt-32">{children}</main>
    <Footer />
    <CookieConsentManager />
    <WidgetLauncher />
  </VoiceWidgetProvider>
</body>
```

Also remove the `Script` import from `next/script` if it's no longer used elsewhere in the file.

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -v "^npm"
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: replace embed.js script with in-house VoiceWidgetProvider + WidgetLauncher"
```

---

### Task 7: Update LiveVoiceDemo

**Files:**
- Modify: `src/components/sections/LiveVoiceDemo.tsx`

**Interfaces:**
- Consumes: `useVoiceWidget()` → `callState`, `openWidget`
- Removes: all `postMessage` logic, `'open'` intermediate state, `window.UponAIVoice` global type

- [ ] **Step 1: Replace the full file**

```tsx
// src/components/sections/LiveVoiceDemo.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { uponaiBookingUrl } from '@/lib/booking';
import { useVoiceWidget } from '@/components/widget/VoiceWidgetProvider';

type DemoState = 'idle' | 'calling' | 'ended';

const waveHeights = [38, 62, 80, 52, 90, 68, 44, 84, 58, 74, 48, 86, 60, 70, 46];

function GraceAvatar({ pulsing = false }: { pulsing?: boolean }) {
  return (
    <div className="relative">
      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#22c55e] to-[#54d2ff] flex items-center justify-center shadow-[0_0_24px_rgba(34,197,94,0.3)]">
        <span className="text-2xl font-bold text-white select-none">G</span>
      </div>
      {pulsing ? (
        <div
          className="absolute inset-0 rounded-full border-2 border-[#22c55e]/60"
          style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}
        />
      ) : (
        <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--surface)] bg-[#22c55e]" />
      )}
    </div>
  );
}

export default function LiveVoiceDemo() {
  const { callState, openWidget } = useVoiceWidget();
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync widget call state → demo section state
  useEffect(() => {
    if (callState === 'active') {
      setDemoState('calling');
      setElapsed(0);
    } else if (callState === 'ended') {
      setDemoState('ended');
    } else if (callState === 'idle') {
      // only reset to idle if user explicitly resets via "Talk again"
    }
  }, [callState]);

  // Timer
  useEffect(() => {
    if (demoState === 'calling') {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [demoState]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleReset = () => {
    setDemoState('idle');
    setElapsed(0);
  };

  return (
    <section className="relative overflow-hidden px-4 py-20">
      <style>{`
        @keyframes voice-bar {
          0% { transform: scaleY(0.2); opacity: 0.6; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-16 h-72 w-72 rounded-full bg-[#22c55e]/10 blur-3xl" />
        <div className="absolute right-[8%] bottom-16 h-80 w-80 rounded-full bg-[#54d2ff]/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="theme-pill-green inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]">
          <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.8)]" style={{ animation: 'pulse 2s infinite' }} />
          Live Voice Demo
        </div>
        <h2 className="theme-heading mt-6 text-4xl font-bold leading-tight md:text-5xl">
          Hear what your AI agent<br />could sound like
        </h2>
        <p className="theme-soft mt-4 text-lg">Talk to Grace, then build yours.</p>
      </div>

      {/* Demo panel */}
      <div className="relative mx-auto mt-12 max-w-xl">

        {/* ── IDLE ── */}
        {demoState === 'idle' && (
          <div className="theme-panel rounded-[2rem] p-7 md:p-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <GraceAvatar />
              <div>
                <p className="theme-subtle text-xs uppercase tracking-[0.24em]">UponAI Agent</p>
                <h3 className="theme-heading mt-1.5 text-2xl font-semibold">Grace</h3>
                <p className="theme-body mx-auto mt-2 max-w-sm text-sm leading-relaxed">
                  Grace is an AI voice agent built on UponAI. She handles inbound calls, answers questions, books appointments, and transfers to your team when it matters.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Answers Questions', 'Books Appointments', 'Transfers Calls'].map((tag) => (
                  <span key={tag} className="theme-card rounded-full px-3 py-1 text-xs theme-body">{tag}</span>
                ))}
              </div>
              <button
                onClick={openWidget}
                className="mt-3 flex items-center gap-3 rounded-full bg-[#22c55e] px-8 py-4 text-base font-bold text-white shadow-[0_0_28px_rgba(34,197,94,0.35)] transition-all duration-200 hover:bg-[#16a34a] hover:shadow-[0_0_36px_rgba(34,197,94,0.5)] active:scale-95"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z" />
                </svg>
                Talk now
              </button>
            </div>
          </div>
        )}

        {/* ── CALLING ── */}
        {demoState === 'calling' && (
          <div className="theme-panel rounded-[2rem] p-7 md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="theme-pill-green flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'pulse 1s infinite' }} />
                Speaking…
              </div>
              <span className="theme-subtle font-mono text-sm">{formatTime(elapsed)}</span>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex w-full items-center gap-5">
                <GraceAvatar pulsing />
                <div className="flex h-16 flex-1 items-end gap-1">
                  {waveHeights.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${i % 2 === 0 ? 'bg-[#22c55e]' : 'bg-[#54d2ff]'}`}
                      style={{
                        height: `${h}%`,
                        transformOrigin: 'bottom',
                        animation: `voice-bar ${0.45 + (i % 5) * 0.12}s ease-in-out ${i * 0.055}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="theme-subtle text-xs uppercase tracking-[0.24em]">Grace · UponAI Agent</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Answers Questions', 'Books Appointments', 'Transfers Calls'].map((tag) => (
                  <span key={tag} className="theme-card rounded-full px-3 py-1 text-xs theme-body">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ENDED ── */}
        {demoState === 'ended' && (
          <div className="theme-panel rounded-[2rem] p-7 text-center md:p-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--brand-green-border)] bg-[var(--brand-green-bg)]">
              <svg className="h-8 w-8 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="theme-heading text-2xl font-bold">Call ended.</h3>
            <p className="theme-soft mt-1 text-sm">Hope that felt real. Here&apos;s what just happened.</p>
            <div className="theme-card mt-6 divide-y divide-[var(--border)] rounded-2xl text-left">
              {[
                { label: 'Agent', value: 'Grace' },
                { label: 'Built by', value: 'UponAI' },
                { label: 'Duration', value: formatTime(elapsed) },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-5 py-3">
                  <span className="theme-soft text-sm">{row.label}</span>
                  <span className="theme-heading text-sm font-semibold">{row.value}</span>
                </div>
              ))}
            </div>
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full rounded-full bg-[#22c55e] py-4 text-center text-base font-bold text-white shadow-[0_0_24px_rgba(34,197,94,0.3)] transition-all hover:bg-[#16a34a] hover:shadow-[0_0_32px_rgba(34,197,94,0.45)]"
            >
              Book a Demo
            </a>
            <button onClick={handleReset} className="theme-link-muted mt-4 text-sm font-medium underline underline-offset-2">
              Talk again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -v "^npm"
```

Expected: no output.

- [ ] **Step 3: Start dev server and verify**

```bash
npm run dev
```

Checklist:
- [ ] Homepage loads, "Talk to Grace" floating button visible bottom-right
- [ ] Demo section shows Grace card + "Talk now" button
- [ ] Click "Talk now" → widget expands bottom-right (form appears)
- [ ] Fill form + submit → call connects, demo section transitions to "calling" (waveform + timer)
- [ ] End call from widget → demo section transitions to "ended" with summary + "Book a Demo"
- [ ] "Talk again" → resets demo section to idle
- [ ] No console errors

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/LiveVoiceDemo.tsx
git commit -m "feat: wire LiveVoiceDemo to VoiceWidgetContext, remove postMessage"
```

---

## Self-Review

**Spec coverage:**
- ✅ VoiceWidgetProvider with `widgetOpen`, `callState`, `openWidget`, `closeWidget`, `onCallStateChange`
- ✅ WidgetLauncher ported + simplified (postMessage/postSize removed)
- ✅ VoiceCallButton ported + simplified (window.parent.postMessage removed, context used)
- ✅ API route ported
- ✅ layout.tsx updated
- ✅ LiveVoiceDemo postMessage replaced with context
- ✅ `uponai-voice-intake` untouched
- ✅ All env vars already present — no env work needed
- ✅ SSR guard maintained via VoiceCallButtonDynamic

**Placeholder scan:** None found. All steps contain full code.

**Type consistency:**
- `CallState` defined in `VoiceWidgetProvider.tsx`, imported by `VoiceCallButton.tsx` ✅
- `useVoiceWidget()` exported from `VoiceWidgetProvider.tsx`, consumed by `WidgetLauncher`, `VoiceCallButton`, `LiveVoiceDemo` ✅
- `onCallStateChange` signature: `(state: CallState) => void` consistent across all tasks ✅
