# Dedicated Grace Page (`/grace`)

**Date:** 2026-07-01
**Status:** Approved

## Context

Stakeholders want a dedicated, shareable page about Grace (UponAI's AI voice agent)
— what it does, its functionality, use cases — that a rep can open live in a client
session to **test/demo it**, or send as a link. Approach: **bespoke page** (like the
homepage), demo-forward but balanced with story, reusing the existing Talk-to-Grace
demo, theme, nav, and footer.

Content is grounded in Grace's actual agent spec (capabilities, offerings, booking
flow, transfer protocol, FAQs), rendered in the site's brand voice ("UponAI"/"Grace",
not the phonetic "Upon-A-I").

## Constraint: web-demo transfer

The current web demo (Retell) **cannot transfer** (Jambonz WebRTC not yet exposed —
see docs/jambonz-webrtc-setup-for-ops.md). Transfer works on the phone line only.
So the page **describes** routing/transfer as a real capability, but does **not** pitch
it as something the live web demo completes, and the "Try asking" prompts avoid
"transfer me." Upgrade the copy once Jambonz is live.

## Route & SEO

- Route: `src/app/grace/page.tsx` → `/grace`.
- `metadata`: title "Meet Grace — UponAI's AI Voice Agent", description, canonical
  `https://uponai.com/grace`.
- Nav/Footer/VoiceWidgetProvider come from the root layout automatically.

## Section stack (top → bottom)

1. **Hero (demo-forward)** — eyebrow "UponAI Voice Agent", H1 "Meet Grace", one-line
   description, capability chips, primary **Talk to Grace** (opens demo) + secondary
   **Book a Demo** (booking URL). Ambient Grace avatar/glow.
2. **Live demo** — reuse `LiveVoiceDemo` (two-column Grace card + "try asking"
   companion; idle→calling→ended; End call). Grace-specific header via new optional
   props.
3. **Capabilities grid** (6): answers questions · books appointments & demos · routes
   & transfers (warm, voicemail/message fallback) · 24/7 & multilingual · logs to CRM
   · outbound calling.
4. **How it works** (4 steps): greets & understands → answers or qualifies → books or
   routes → logs & hands off with context.
5. **What Grace handles + "Try asking"** — offerings (AI phone agents, CRM integration,
   custom AI, outbound) + sample spoken prompts ("What can Grace do?", "Can I book a
   demo?", "Which CRMs do you integrate with?", "What are your hours?").
6. **Use cases by industry** — grid linking existing industry pages
   (`uponaiIndustriesMenu`).
7. **Proof & trust** — built on UponAI · CRM integrations (Salesforce, HubSpot, Zoho,
   n8n, Zapier) · 24/7 multilingual · POPIA/security note · stat tiles.
8. **FAQ** — how it works (NLP), integration requirements, retraining/updates via the
   UponAI dashboard, languages, human handoff, payment terms.
9. **Final CTA** — "Ready to put Grace on your lines?" → Book a Demo + Talk to Grace.

## Files

- **Create** `src/app/grace/page.tsx` — server component; content arrays inlined (as
  the homepage does). Renders sections; imports `LiveVoiceDemo`, `GraceTalkButton`,
  `uponaiIndustriesMenu`, `uponaiBookingUrl`.
- **Create** `src/components/grace/GraceTalkButton.tsx` — `'use client'`; calls
  `useVoiceWidget().openWidget()`. Props: `label?`, `variant?: 'primary' | 'secondary'`,
  `className?`.
- **Modify** `src/components/sections/LiveVoiceDemo.tsx` — add optional
  `heading?` / `subheading?` props (default to current homepage strings) so `/grace`
  can reframe the demo block without duplicated copy. Homepage usage unchanged.

## Reuse

Theme classes (`theme-panel`, `theme-card`, `theme-heading`, `theme-body`,
`theme-pill-green`, buttons); `LiveVoiceDemo` + `VoiceDemoModal` (shared provider in
layout — one modal instance serves both hero CTA and demo section); `uponaiIndustriesMenu`;
`uponaiBookingUrl`.

## Testing / acceptance

No test framework — verify `npx tsc --noEmit` clean and `next build` green.
1. `/grace` renders with Nav/Footer, all 9 sections, correct theme in light + dark.
2. Hero **Talk to Grace** and the demo section both open the working modal; call
   connects (Retell), idle→calling→ended on the page.
3. Industry cards link to the right existing pages.
4. No mention/implication that the live web demo transfers.
5. Homepage `LiveVoiceDemo` unchanged (default props).

## Branch

`feat/grace-page` off production (`deploy/vercel-sync-2026-04-29`). Ships independently.
