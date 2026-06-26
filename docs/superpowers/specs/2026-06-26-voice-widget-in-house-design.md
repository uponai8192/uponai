# Voice Widget In-House Migration

**Date:** 2026-06-26
**Status:** Approved

## Context

The Grace voice widget currently lives in a separate repo (`uponai-voice-intake`) and is embedded on uponai.com via an iframe (`embed.js`). Communication between the homepage demo section (`LiveVoiceDemo`) and the widget requires postMessage across origins — a workaround that adds complexity and latency.

Moving the widget into the main `uponai` repo makes them same-origin, enabling direct React state sharing. `uponai-voice-intake` stays alive to serve `embed.js` for future external embedding use.

## Goals

- Eliminate postMessage/iframe complexity for the on-site widget
- `LiveVoiceDemo` and `WidgetLauncher` share state via React Context
- No behavioral regressions — form, call flow, lead email all work identically
- No env var changes needed (all vars already present in main repo)

## File Structure

### New files in `uponai`

```
src/
  app/
    api/
      retell/
        create-web-call/
          route.ts                        ← copied from uponai-voice-intake
  components/
    widget/
      VoiceWidgetProvider.tsx             ← new: context + provider
      WidgetLauncher.tsx                  ← ported + simplified
      VoiceCallButton.tsx                 ← ported + simplified
      VoiceCallButtonDynamic.tsx          ← ported as-is (SSR guard)
```

### Modified files in `uponai`

- `src/app/layout.tsx` — replace `<Script src="embed.js">` with `<VoiceWidgetProvider>` + `<WidgetLauncher>`
- `src/components/sections/LiveVoiceDemo.tsx` — replace postMessage with context calls

### `uponai-voice-intake`

No changes. Stays deployed at `uponai-voice-intake.vercel.app` serving `embed.js`.

## New Dependencies

```
retell-client-js-sdk   (browser-only, SSR-guarded via dynamic import)
nodemailer
@types/nodemailer
```

## Architecture

### VoiceWidgetContext

```ts
type CallState = 'idle' | 'loading' | 'active' | 'ended' | 'error'

type VoiceWidgetContextValue = {
  widgetOpen: boolean
  callState: CallState
  openWidget: () => void
  closeWidget: () => void
  onCallStateChange: (state: CallState) => void
}
```

`VoiceWidgetProvider` is a client component that holds `widgetOpen` and `callState` in `useState`. It wraps the entire layout so both `WidgetLauncher` and `LiveVoiceDemo` can consume it.

### Data flow

```
LiveVoiceDemo
  "Talk now" click → openWidget()
  reads callState → drives idle/open/calling/ended UI states

VoiceWidgetProvider (source of truth)
  widgetOpen, callState

WidgetLauncher
  reads widgetOpen → shows/hides form
  X button → closeWidget()

VoiceCallButton
  call_started → onCallStateChange('active')
  call_ended  → onCallStateChange('ended')
  loading     → onCallStateChange('loading')
  error       → onCallStateChange('error')
```

### layout.tsx

```tsx
// Before
<Script src="https://uponai-voice-intake.vercel.app/embed.js" strategy="afterInteractive" />

// After
<VoiceWidgetProvider>
  <Nav />
  <main>{children}</main>
  <Footer />
  <CookieConsentManager />
  <WidgetLauncher />
</VoiceWidgetProvider>
```

### WidgetLauncher simplifications

Remove from ported version:
- `postSize()` and the `uponai-widget-resize` postMessage (no parent iframe to resize)
- `useEffect` postMessage listeners for `uponai-widget-open/close`
- Fixed dimensions constants `COLLAPSED`/`OPEN`

Replace with:
- `const { widgetOpen, openWidget, closeWidget } = useVoiceWidget()`
- Render directly into the page DOM at `position: fixed, bottom: 0, right: 0`

### VoiceCallButton simplifications

Remove:
- `window.parent.postMessage({ type: 'uponai-call-started' }, '*')`
- `window.parent.postMessage({ type: 'uponai-call-ended' }, '*')`

Replace with:
- `const { onCallStateChange } = useVoiceWidget()`
- Call `onCallStateChange('active')` / `onCallStateChange('ended')` etc.

### LiveVoiceDemo changes

Remove:
- `useEffect` postMessage listener for `uponai-call-started` / `uponai-call-ended`
- `iframe.contentWindow?.postMessage(...)` calls
- `'open'` state intermediate UI (widget is now in-page; user sees it expand directly)

Replace with:
- `const { callState, openWidget } = useVoiceWidget()`
- "Talk now" → `openWidget()`
- Drive `idle → calling → ended` directly from `callState`

## API Route

`src/app/api/retell/create-web-call/route.ts` — copied verbatim from `uponai-voice-intake`. Uses env vars already present in `.env.local` and `.env.production.local`:

- `UPONAI_API_KEY`
- `UPONAI_AGENT_ID`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

## Verification

1. Dev server starts without errors
2. Homepage loads — floating "Talk to Grace" button appears bottom-right
3. Click "Talk now" in demo section → widget expands (no iframe, direct render)
4. Fill form, submit → call connects (RetellWebClient initializes, audio works)
5. `LiveVoiceDemo` transitions to calling state when `callState === 'active'`
6. End call → `LiveVoiceDemo` transitions to ended state, shows "Book a Demo"
7. X button on widget → widget closes, demo section stays in current state
8. `uponai-voice-intake` embed still works independently (no regression)
9. Lead notification email arrives at configured addresses
