# UponAI Site Redesign — Design Spec

**Date:** 2026-07-03
**Branch:** `feat/site-redesign` (from `feat/grace-page`, carrying Grace features)
**Sources:** `uponai-landing-2.html` mockup (team member), `UponAI - Redesign.pdf` (verified: Coolors palette sheet — `#0157A3`, `#E0ECF7`, `#D1D9E0`, `#525155`, `#28313D` — matches the HTML mockup exactly)

## 1. Context

The current site is a dark-first theme (green `#22c55e` + cyan `#54d2ff`, Space Grotesk) with a shared `Nav`/`Footer`, a light/dark `ThemeToggle`, and ~50 routes (industries, services, cities, blogs). Styling flows through CSS custom properties in `src/app/globals.css` plus `theme-*` utility classes used across 19+ files — that is the leverage point: re-tokenizing restyles the whole site.

The mockup defines a new identity: **light-first, blue-brand** (`#0157A3` primary, near-white blue-tinted background), new type stack (Bricolage Grotesque display / Inter body / IBM Plex Mono accents), and a fully restructured landing page with an interactive qualification tool.

## 2. Goals

- Adopt the mockup's design system site-wide (palette, type, surface treatment).
- Rebuild the homepage to the mockup's section structure with real routes and honest claims.
- Restyle the shared shell (Nav, Footer) to match.
- Keep everything that already works: route structure, Grace page + voice widget, theme toggle, SEO metadata, cookie consent.

**Non-goals (this pass):** rebuilding interior page layouts (they inherit the new tokens), the mockup's "For Business / For Enterprise" audience toggle (no behavior defined — YAGNI), new content pages (playbook PDF, trust pages).

## 3. Approaches considered

1. **Design-system swap + homepage rebuild (chosen).** New tokens in `globals.css`, new fonts, rebuilt homepage, restyled Nav/Footer. Interior pages inherit automatically via `theme-*` classes. Highest leverage, lowest churn, ships as one coherent branch.
2. Full page-by-page rebuild of all ~50 routes. Too large for one spec; interior pages already read fine once tokens change. Can follow as separate passes if wanted.
3. Homepage-only restyle, leave shell/tokens alone. Rejected: homepage would clash with every other page — worst of both worlds.

## 4. Design system

### 4.1 Palette (token values in `globals.css`)

Light theme becomes the **default** (mockup is light-first); dark theme is retained via `ThemeToggle` with a derived navy variant.

| Token role | Light (from mockup) | Dark (derived) |
|---|---|---|
| `--background` | `#F6FAFE` | `#060D18` |
| `--foreground` / `--text-strong` | `#28313D` | `#F2F7FC` |
| `--text-body` | `#525155` | `#C4D2E0` |
| `--text-soft` / `--text-subtle` | `#5E6B7A` / `#7C8794` | `#8FA3B8` / `#6B7E93` |
| `--brand` (primary) | `#0157A3` | `#4DA3E8` |
| `--brand-strong` | `#01498A` | `#6BB5F0` |
| accent (secondary) | `#2E7CC4` | `#5CB8D9` |
| surfaces | white cards on `#E0ECF7` bands | `#0A1526` cards on `rgba(255,255,255,.03)` |
| borders | `rgba(1,87,163,.15/.28)` | `rgba(120,170,220,.14/.22)` |

**Token rename:** `--brand-green-*` → `--brand-primary-*`, `--brand-cyan-*` → `--brand-accent-*` (mechanical grep-replace across the 19 files using them). Hardcoded `#22c55e` / `#54d2ff` hexes sprinkled in pages (hero blobs, industry-grid tints, pill dots) are swept in the same pass.

Body background: swap the green/cyan radial glows + grid lines for the mockup's blue radial washes; keep the `data-theme` mechanism and `uponai-theme` localStorage key unchanged.

### 4.2 Typography

Via `next/font/google` with CSS variables:
- `--font-display`: **Bricolage Grotesque** (600–800) — h1–h4, tight letter-spacing per mockup
- `--font-body`: **Inter** (400–700) — body, buttons
- `--font-mono`: **IBM Plex Mono** (400–600) — eyebrows, stat numerals, pills, fineprint

Space Grotesk removed. Base heading rules move into `globals.css` so interior pages pick up the display face without edits.

### 4.3 Shared primitives

`theme-*` utility classes in `globals.css` keep their names and get new values (cards, panels, pills, buttons). Buttons follow the mockup: primary = blue gradient (`#0157A3 → #1668B5`, white text), ghost = translucent white with blue border-on-hover.

## 5. Homepage rebuild (`src/app/page.tsx`)

New section components under `src/components/home/`, one file per section. Static sections are server components; only interactive ones are `'use client'`.

| # | Section | Notes |
|---|---|---|
| 1 | **Hero** | H1 "Answer Every Call. Capture Every Lead." + lede, CTAs: *Get a Demo* → `uponaiBookingUrl`, *See it in 60 seconds* → `#tool`. Six capability chips. Right: **orchestration panel** — animated waveform + rotating caption (client), route card, 3 stats (24/7, <2s, live routes). |
| 2 | **PersonaCarousel** | 6 horizontally-scrolling persona cards (healthcare, home services, legal, real estate, dental, restaurant) linking to the matching industry routes from `uponaiIndustriesMenu`. CSS scroll-snap, no JS. |
| 3 | **Marquee** | Industry + city chips, CSS keyframe loop, paused on hover, disabled under `prefers-reduced-motion`. Cities from `getFeaturedCities`. |
| 4 | **CoverageQuiz** (`#tool`) | Client component. 3 questions (call volume / industry / after-hours), progress bar, result card with tailored summary + email capture posting to existing `/api/contact` (tagged as quiz lead). |
| 5 | **CapabilityShowcase** | Capability chip list + big stats; right side: transcript preview card. `GraceTalkButton` embedded here — "Talk to Grace live" replaces the mockup's static Recording tag. |
| 6 | **HowItWorks** | 4 tabs (Design / Deploy / Route / Analyze), client component, panel per tab as in mockup. |
| 7 | **SuccessStats** | 3 cards (Coverage 24/7, Speed <2s, Handoff 0 dead ends). **Honest claims only** — mockup's invented "72% resolved / 0.8s" numbers are dropped. |
| 8 | **IndustryGrid** | `uponaiIndustriesMenu` → real links, mockup's tile style. |
| 9 | **FitCards** | "Without a call team / With an existing team" two-column comparison. |
| 10 | **GetStarted** | Requirements checklist (required/optional tags) + demo CTA. |
| 11 | **PlaybookCapture** | Email gate styled per mockup; reuses the existing `ResourceDownloadGate`/`/api/contact` machinery. If no playbook asset exists yet, CTA delivers via contact follow-up. |
| 12 | **Testimonials** (kept) | Existing component, restyled by tokens. Not in mockup but real social proof — kept before final CTA. |
| 13 | **FinalCTA** | Restyled `CTASection`: *Get a Demo* → booking URL, *Contact Us* → `/contact-us-page`. |

`LiveVoiceDemo` on the homepage is superseded by the Grace talk entry point in §5.5; the `/grace` page keeps its full experience.

## 6. Shell

- **Nav:** restyle to new tokens (light sticky header, blur). Keep existing dropdown structure, links, `ThemeToggle`, and mobile menu. Add pulsing brand dot next to logo per mockup.
- **Footer:** keep existing link/columns structure and city links; restyle to the light `#E0ECF7` band, mono column headings, contact line `(888) 787-6624 · info@uponai.com`.

## 7. Interior pages

No layout changes. After the token swap: a visual QA sweep across representative routes (`/grace`, one industry page, one city page, `/services/*`, `/blogs`, `/contact-us-page`, `/privacy-policy`) for contrast regressions and leftover hardcoded green/cyan. Fix in place.

## 8. Error handling & edge cases

- Quiz/email posts reuse `/api/contact` validation + Turnstile behavior; failure shows inline error, never blocks navigation.
- All animation (waveform, marquee, pulse) behind `prefers-reduced-motion`.
- Dark theme is a first-class variant — every new section must pass contrast in both themes.
- Fonts self-hosted through `next/font` (no external `<link>`s, no CLS).

## 9. Verification

- `npm run lint` and `npm run build` clean.
- Preview both themes, mobile (375px) / tablet / desktop; check quiz flow end-to-end (3 answers → result → email post).
- Lighthouse sanity on homepage (no LCP regression from fonts/animations).

## 10. Open items

1. ~~PDF unverified~~ — resolved: PDF is a Coolors palette sheet matching the HTML mockup; no additional direction.
2. Playbook asset (the "AI Voice Playbook") doesn't exist — capture works without it; asset is a content task.
3. Follow-up passes (separate specs if desired): interior page layout refresh, `/grace` visual alignment tweaks.
