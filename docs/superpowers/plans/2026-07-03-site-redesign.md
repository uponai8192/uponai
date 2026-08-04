# UponAI Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the entire site to the approved blue design system (spec: `docs/superpowers/specs/2026-07-03-site-redesign-design.md`) and rebuild the homepage to the team mockup's structure.

**Architecture:** All site styling flows through CSS custom properties + `theme-*` utility classes in `src/app/globals.css`; swapping token values re-skins every route. The homepage is rebuilt as one server page composed of focused section components under `src/components/home/`, with client components only where there is interactivity (waveform, quiz, tabs, email capture).

**Tech Stack:** Next.js 15.5 (App Router), React 19, Tailwind CSS 4 (via `@tailwindcss/postcss`), `next/font/google`, existing `/api/contact` route (nodemailer + GHL + Turnstile).

## Global Constraints

- Work on branch `feat/site-redesign` (already created from `feat/grace-page`). Never commit the pre-existing modified files `src/app/privacy-policy/page.tsx`, `src/components/ui/CookieConsentManager.tsx`, `src/components/ui/CookieSettingsButton.tsx`, `src/lib/consent.ts` — they are the user's uncommitted work. Stage files explicitly by path; never `git add -A` / `git add .`.
- **No test runner exists** (`package.json` scripts: `dev`, `build`, `start`, `lint` only). The verify cycle for every task is: `npm run lint` → `npm run build` → visual check in the dev preview. Do not add a test framework.
- Palette (from mockup + PDF, exact): primary `#0157A3`, gradient partner `#1668B5`, secondary accent `#2E7CC4`, light band `#E0ECF7`, light border tint `#D1D9E0`, body text `#525155`, headings `#28313D`, page base `#F6FAFE`.
- Light theme is the **default**; dark theme retained via existing `ThemeToggle` (localStorage key `uponai-theme` unchanged).
- Honest claims only: allowed stats are `24/7`, `<2s`, `AI + Human`, route/industry counts. Never emit the mockup's invented `72%` / `28%` / `0.8s` numbers.
- All new animation must be disabled under `@media (prefers-reduced-motion: reduce)`.
- External CTAs: booking = `uponaiBookingUrl` from `src/lib/booking.ts` (open in new tab), contact page = `/contact-us-page`, phone `(888) 787-6624`, email `info@uponai.com`.
- Windows environment; shell commands below are for the POSIX Bash tool. `sed -i` works in Git Bash.

---

### Task 1: Typography — Bricolage Grotesque / Inter / IBM Plex Mono

**Files:**
- Modify: `src/app/layout.tsx` (font imports, `<body>` className)
- Modify: `src/app/globals.css` (base font rules)

**Interfaces:**
- Produces: CSS variables `--font-display`, `--font-body`, `--font-mono` available on `<body>`; global rule that `h1–h4` render in the display face. Later tasks use Tailwind arbitrary syntax `font-[family-name:var(--font-mono)]` for mono accents.

- [ ] **Step 1: Replace the font setup in `src/app/layout.tsx`**

Replace lines 2 and 11:

```tsx
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from 'next/font/google';
```

```tsx
const displayFont = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });
const monoFont = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono' });
```

Replace the `<body>` className (line 110) — swap `spaceGrotesk.className` for the three variables:

```tsx
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} bg-[var(--background)] text-[var(--foreground)] antialiased transition-[background-color,color] duration-300`}>
```

Remove the now-unused `Space_Grotesk` import and `const spaceGrotesk` line.

- [ ] **Step 2: Add base font rules to `src/app/globals.css`**

After the `body { ... }` block, add:

```css
body {
  font-family: var(--font-body), system-ui, sans-serif;
}

h1, h2, h3, h4 {
  font-family: var(--font-display), var(--font-body), system-ui, sans-serif;
  letter-spacing: -0.02em;
}
```

(Add the `font-family` line inside the existing `body` rule rather than duplicating the selector.)

- [ ] **Step 3: Verify**

Run: `npm run lint` → expect: no errors (warnings acceptable if pre-existing).
Run: `npm run build` → expect: exit 0.
Start dev preview, load `/` — headings render in Bricolage Grotesque (visibly rounder, wider than Space Grotesk), body in Inter.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(redesign): swap type stack to Bricolage Grotesque / Inter / IBM Plex Mono"
```

---

### Task 2: Palette tokens + light-first theming

**Files:**
- Modify: `src/app/globals.css` (token blocks, body background, buttons, selection)
- Modify: `src/app/layout.tsx` (default theme = light)

**Interfaces:**
- Produces: same token names as today (`--brand`, `--surface`, `--border`, etc.) with new values, plus new tokens `--brand-2` (gradient partner), `--wash-1`, `--wash-2` (body washes). `theme-primary-button` becomes a blue gradient. All `theme-*` classes keep their names. Token *renames* happen in Task 3, not here.

- [ ] **Step 1: Replace the `:root` block in `globals.css`**

`:root` becomes the LIGHT theme (mockup values):

```css
:root {
  --background: #f6fafe;
  --foreground: #28313d;
  --text-strong: #28313d;
  --text-body: #525155;
  --text-soft: #5e6b7a;
  --text-subtle: #7c8794;
  --surface: rgba(255, 255, 255, 0.85);
  --surface-solid: #ffffff;
  --surface-muted: rgba(255, 255, 255, 0.72);
  --surface-soft: rgba(255, 255, 255, 0.6);
  --surface-inset: #eff5fb;
  --surface-gradient-start: #ffffff;
  --surface-gradient-end: #e9f2fb;
  --header-bg: rgba(252, 251, 255, 0.82);
  --header-strip: rgba(255, 255, 255, 0.58);
  --section-alt: #e0ecf7;
  --border: rgba(1, 87, 163, 0.15);
  --border-strong: rgba(1, 87, 163, 0.28);
  --brand: #0157a3;
  --brand-strong: #01498a;
  --brand-2: #1668b5;
  --brand-green-bg: rgba(1, 87, 163, 0.1);
  --brand-green-border: rgba(1, 87, 163, 0.24);
  --brand-green-text: #0157a3;
  --brand-cool: #2e7cc4;
  --brand-cyan-bg: rgba(46, 124, 196, 0.12);
  --brand-cyan-border: rgba(46, 124, 196, 0.26);
  --brand-cyan-text: #2e7cc4;
  --wash-1: rgba(1, 87, 163, 0.14);
  --wash-2: rgba(1, 87, 163, 0.09);
  --shadow-rgb: 1, 87, 163;
}
```

- [ ] **Step 2: Replace the `html[data-theme='light']` block with a dark block**

Delete the old `html[data-theme='light'] { ... }` token block (lines 38–68) and add:

```css
html[data-theme='dark'] {
  --background: #060d18;
  --foreground: #f2f7fc;
  --text-strong: #f2f7fc;
  --text-body: #c4d2e0;
  --text-soft: #8fa3b8;
  --text-subtle: #6b7e93;
  --surface: rgba(10, 21, 38, 0.9);
  --surface-solid: #0a1526;
  --surface-muted: rgba(255, 255, 255, 0.035);
  --surface-soft: rgba(255, 255, 255, 0.055);
  --surface-inset: rgba(2, 8, 20, 0.4);
  --surface-gradient-start: #10203a;
  --surface-gradient-end: #091223;
  --header-bg: rgba(6, 13, 24, 0.88);
  --header-strip: rgba(0, 0, 0, 0.22);
  --section-alt: rgba(255, 255, 255, 0.04);
  --border: rgba(120, 170, 220, 0.14);
  --border-strong: rgba(120, 170, 220, 0.24);
  --brand: #4da3e8;
  --brand-strong: #6bb5f0;
  --brand-2: #2e86d9;
  --brand-green-bg: rgba(77, 163, 232, 0.12);
  --brand-green-border: rgba(77, 163, 232, 0.26);
  --brand-green-text: #8ec8f2;
  --brand-cool: #5cb8d9;
  --brand-cyan-bg: rgba(92, 184, 217, 0.1);
  --brand-cyan-border: rgba(92, 184, 217, 0.24);
  --brand-cyan-text: #a5dcef;
  --wash-1: rgba(46, 134, 217, 0.1);
  --wash-2: rgba(77, 163, 232, 0.07);
  --shadow-rgb: 0, 0, 0;
}
```

(`--grid-line`, `--glow-green`, `--glow-cyan`, `--glow-green-soft` are removed in the next step.)

- [ ] **Step 3: Replace the body background + selection**

Replace the `body` background stack (drop grid lines and green glows):

```css
body {
  min-height: 100vh;
  font-family: var(--font-body), system-ui, sans-serif;
  background:
    radial-gradient(1200px 620px at 12% -8%, var(--wash-1), transparent 60%),
    radial-gradient(1000px 560px at 92% -4%, var(--wash-2), transparent 58%),
    var(--background);
  background-attachment: fixed;
  color: var(--foreground);
  transition:
    background-color 250ms ease,
    color 250ms ease;
}
```

Replace `::selection`:

```css
::selection {
  background: rgba(1, 87, 163, 0.28);
  color: var(--text-strong);
}
```

- [ ] **Step 4: Gradient primary button**

Replace `.theme-primary-button` / hover:

```css
  .theme-primary-button {
    background: linear-gradient(120deg, var(--brand), var(--brand-2));
    color: #ffffff;
    box-shadow: 0 10px 26px rgba(1, 87, 163, 0.3);
    transition: transform 150ms ease, box-shadow 200ms ease;
  }

  .theme-primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(1, 87, 163, 0.42);
  }
```

- [ ] **Step 5: Flip the light-compat overrides to key off dark hardcodes under LIGHT default**

The `html[data-theme='light'] .text-white {...}` etc. override block (old lines 212–265) exists because many interior pages hardcode dark-theme classes. Keep the whole block **as-is** (it still keys off `data-theme='light'`, which is now the default, so the remaps apply by default — exactly what we want). No change; just confirm it survived the edits.

- [ ] **Step 6: Default theme = light in `layout.tsx`**

Change `<html lang="en" data-theme="dark" ...>` to `data-theme="light"` and the init script to:

```tsx
const themeInitScript = `(() => {
  try {
    const stored = window.localStorage.getItem('uponai-theme');
    const theme = stored === 'dark' ? 'dark' : 'light';
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  }
})();`;
```

- [ ] **Step 7: Check `ThemeToggle` still works**

Read `src/components/ui/ThemeToggle.tsx`. If it assumes dark default (e.g. initial state `'dark'`), flip the fallback to `'light'`. Keep the `uponai-theme` storage key.

- [ ] **Step 8: Verify**

`npm run lint` → clean. `npm run build` → exit 0.
Preview `/`: page renders light blue-tinted; toggle switches to navy dark and back; refresh preserves choice.

- [ ] **Step 9: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/ui/ThemeToggle.tsx
git commit -m "feat(redesign): blue palette tokens, light-first theming, gradient buttons"
```

---

### Task 3: Token rename + hardcoded green/cyan sweep

**Files:**
- Modify: every file under `src/` matching the patterns below (~19 files incl. `globals.css`, `Nav.tsx`, `Footer.tsx`, `page.tsx`, grace components, blog pages)

**Interfaces:**
- Produces: token names `--brand-primary-{bg,border,text}` and `--brand-accent-{bg,border,text}`; utility classes `theme-pill-primary`, `theme-pill-accent`. All later tasks use THESE names. Old `brand-green-*` / `brand-cyan-*` / `theme-pill-green` / `theme-pill-cyan` names must not survive.
- Hex mapping (single source of truth): `#22c55e → #1e78cc`, `#16a34a → #0157a3`, `#54d2ff → #63ade5`, `rgba(34,197,94,x) → rgba(30,120,204,x)`, `rgba(84,210,255,x) → rgba(99,173,229,x)`.

- [ ] **Step 1: Run the mechanical sweep (Bash tool)**

```bash
cd "C:/Users/Melvin/Coding/UponAI/uponai"
grep -rlE 'brand-green|brand-cyan|theme-pill-green|theme-pill-cyan' src | xargs sed -i \
  -e 's/theme-pill-green/theme-pill-primary/g' \
  -e 's/theme-pill-cyan/theme-pill-accent/g' \
  -e 's/brand-green/brand-primary/g' \
  -e 's/brand-cyan/brand-accent/g'
grep -rliE '22c55e|16a34a|54d2ff|34, ?197, ?94|84, ?210, ?255' src | xargs sed -i \
  -e 's/#22c55e/#1e78cc/gI' \
  -e 's/#16a34a/#0157a3/gI' \
  -e 's/#54d2ff/#63ade5/gI' \
  -e 's/34, \{0,1\}197, \{0,1\}94/30, 120, 204/g' \
  -e 's/84, \{0,1\}210, \{0,1\}255/99, 173, 229/g'
```

- [ ] **Step 2: Verify zero leftovers**

```bash
grep -rniE '22c55e|16a34a|54d2ff|brand-green|brand-cyan|theme-pill-green|theme-pill-cyan|34, ?197, ?94|84, ?210, ?255' src
```
Expected: no output. If `globals.css` compat selectors like `[class*='bg-[#22c55e]']` were rewritten to `bg-[#1e78cc]`, that is correct (the class names in pages were rewritten identically).

- [ ] **Step 3: Verify build + spot-check**

`npm run lint` → clean. `npm run build` → exit 0.
Preview `/`, `/grace`, `/blogs`, one industry page — no green remnants in either theme; pills/buttons read blue.

- [ ] **Step 4: Commit (explicit paths)**

```bash
git status --porcelain src
```
Stage every modified file EXCEPT the four pre-existing user-modified files listed in Global Constraints. If the sweep touched `src/components/ui/CookieConsentManager.tsx` or `src/components/ui/CookieSettingsButton.tsx` or `src/lib/consent.ts` or `src/app/privacy-policy/page.tsx`, stage them anyway ONLY if the diff shows solely the mechanical color replacement — otherwise stop and ask the user. Then:

```bash
git commit -m "refactor(redesign): rename brand tokens to primary/accent, sweep green/cyan hexes to blue"
```

---

### Task 4: Nav + Footer polish

**Files:**
- Modify: `src/components/ui/Nav.tsx` (logo pulse dot)
- Modify: `src/app/globals.css` (pulse keyframes)

**Interfaces:**
- Produces: `@keyframes brand-pulse` + `.animate-brand-pulse` utility in `globals.css` (reused by Hero's live tag in Task 5).

- [ ] **Step 1: Add keyframes to `globals.css`** (top level, after the `@layer components` block)

```css
@keyframes brand-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.7); }
}

.animate-brand-pulse {
  animation: brand-pulse 2.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-brand-pulse { animation: none; }
}
```

- [ ] **Step 2: Add the pulsing dot next to the logo in `Nav.tsx`**

Find the logo `<Link href="/">` (contains the `/logo.png` `Image`). Immediately before the `Image`, inside the link, add:

```tsx
<span aria-hidden className="animate-brand-pulse mr-2 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand)] shadow-[0_0_10px_var(--brand)]" />
```

(If the logo link's layout breaks — it uses a `relative` sized div — wrap link contents in `inline-flex items-center` instead. Judgement call; keep the dot subtle.)

- [ ] **Step 3: Footer check (no code expected)**

Footer styles entirely via `theme-*` classes + tokens (verified in exploration) — confirm in preview that footer band reads as the light `#E0ECF7`-tinted `--section-alt`, headings mono-ish per new type, links legible in both themes. Only fix concrete contrast issues found.

- [ ] **Step 4: Verify + commit**

`npm run lint`, `npm run build`, preview both themes.

```bash
git add src/components/ui/Nav.tsx src/app/globals.css
git commit -m "feat(redesign): nav logo pulse dot, shared brand-pulse animation"
```

---

### Task 5: Hero + OrchestrationPanel

**Files:**
- Create: `src/components/home/Hero.tsx` (server)
- Create: `src/components/home/OrchestrationPanel.tsx` (client)
- Modify: `src/app/globals.css` (waveform keyframes)

**Interfaces:**
- Consumes: `uponaiBookingUrl` from `@/lib/booking`; `.animate-brand-pulse` from Task 4.
- Produces: `<Hero />` (no props), `<OrchestrationPanel />` (no props). Task 11 imports `Hero` only.

- [ ] **Step 1: Waveform keyframes in `globals.css`** (next to `brand-pulse`)

```css
@keyframes wave-bar {
  0%, 100% { height: 14%; }
  50% { height: 100%; }
}

.animate-wave-bar {
  animation: wave-bar 1.1s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-wave-bar { animation: none; height: 40% !important; }
}
```

- [ ] **Step 2: Create `src/components/home/OrchestrationPanel.tsx`**

```tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

const captions = [
  'Listening for caller intent…',
  'Detected: appointment booking',
  'Matching to healthcare path…',
  'Booked · syncing to CRM…',
  'Escalation on standby ✓',
];

const routeRows = [
  { k: 'Incoming intent', v: 'Appointment booking', pill: null },
  { k: 'Detected path', v: 'Healthcare · Scheduling', pill: 'accent' },
  { k: 'Outcome', v: 'Booked & synced to CRM', pill: 'primary' },
  { k: 'Escalation', v: 'Standing by', pill: 'neutral' },
] as const;

const stats = [
  { b: '24/7', s: 'Coverage' },
  { b: '<2s', s: 'First response' },
  { b: '9', s: 'Live routes' },
];

export default function OrchestrationPanel() {
  const bars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        delay: ((i * 37) % 110) / 100,
        height: 14 + ((i * 53) % 70),
      })),
    [],
  );
  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCaptionIndex((i) => (i + 1) % captions.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden className="theme-panel relative rounded-[22px] p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="theme-soft text-[11px] uppercase tracking-[0.18em] font-[family-name:var(--font-mono)]">
          Voice Orchestration · Live
        </span>
        <span className="flex items-center gap-2 text-[11px] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
          <span className="animate-brand-pulse inline-flex h-2 w-2 rounded-full bg-[var(--brand-cool)]" />
          Active session
        </span>
      </div>

      <div className="mb-2 flex h-16 items-center gap-[3px] px-1">
        {bars.map((bar, i) => (
          <span
            key={i}
            className="animate-wave-bar flex-1 rounded-[3px] bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] opacity-85"
            style={{ animationDelay: `${bar.delay}s`, height: `${bar.height}%` }}
          />
        ))}
      </div>
      <p className="mb-4 min-h-4 text-xs theme-soft font-[family-name:var(--font-mono)]">{captions[captionIndex]}</p>

      <div className="theme-inset rounded-[14px] px-4 py-1">
        {routeRows.map((row) => (
          <div
            key={row.k}
            className="flex items-center justify-between border-b border-[var(--border)] py-3 text-sm last:border-b-0"
          >
            <span className="theme-subtle text-[11px] uppercase tracking-[0.08em] font-[family-name:var(--font-mono)]">
              {row.k}
            </span>
            {row.pill === null ? (
              <span className="theme-heading font-semibold">{row.v}</span>
            ) : (
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-[family-name:var(--font-mono)] ${
                  row.pill === 'primary'
                    ? 'theme-pill-primary'
                    : row.pill === 'accent'
                      ? 'theme-pill-accent'
                      : 'theme-card-soft theme-soft'
                }`}
              >
                {row.v}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div key={s.s} className="theme-inset rounded-xl p-3">
            <b className="theme-heading block text-lg font-[family-name:var(--font-mono)]">{s.b}</b>
            <small className="theme-subtle text-[10.5px] tracking-[0.04em]">{s.s}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/home/Hero.tsx`**

```tsx
import OrchestrationPanel from '@/components/home/OrchestrationPanel';
import { uponaiBookingUrl } from '@/lib/booking';

const chips = [
  'Inbound call qualification',
  'Appointment & intake workflows',
  'Overflow & after-hours routing',
  'CRM-ready lead capture',
  'Industry-specific voice paths',
  'Human handoff when needed',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-14 md:pb-16 md:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[620px] w-[620px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--wash-1), var(--wash-2) 45%, transparent 70%)' }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            <span className="animate-brand-pulse inline-flex h-[7px] w-[7px] rounded-full bg-[var(--brand-cool)] shadow-[0_0_12px_var(--brand-cool)]" />
            AI-Powered Voice Intelligence
          </span>
          <h1 className="theme-heading mt-6 text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Answer Every Call.
            <span className="block bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] bg-clip-text text-transparent">
              Capture Every Lead.
            </span>
          </h1>
          <p className="theme-body mt-6 max-w-xl text-lg leading-8">
            UponAI builds phone and chat workflows that qualify intent, book appointments, and route live
            conversations — escalating to your team only when a person is the better answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              Get a Demo →
            </a>
            <a
              href="#tool"
              className="theme-secondary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              See it in 60 seconds
            </a>
          </div>
          <p className="theme-subtle mt-5 flex items-center gap-2 text-[12.5px] font-[family-name:var(--font-mono)]">
            <b className="font-medium text-[var(--brand-cool)]">No setup fees</b>
            · Live in days, not months · Human handoff built in
          </p>
          <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {chips.map((chip) => (
              <li key={chip} className="theme-body flex items-center gap-2.5 text-sm">
                <span
                  aria-hidden
                  className="h-4 w-4 flex-none rounded-[5px] bg-gradient-to-br from-[var(--brand-cool)] to-[var(--brand)] opacity-85"
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>
        <OrchestrationPanel />
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Temporary render check**

Temporarily render `<Hero />` at the top of `src/app/page.tsx` (above the existing hero) to preview. Verify: waveform animates, caption rotates, both themes legible, mobile 375px stacks cleanly. **Remove the temporary import/render after checking** (final assembly is Task 11).

- [ ] **Step 5: Verify + commit**

`npm run lint`, `npm run build`.

```bash
git add src/components/home/Hero.tsx src/components/home/OrchestrationPanel.tsx src/app/globals.css
git commit -m "feat(redesign): hero with live orchestration panel"
```

---

### Task 6: PersonaCarousel + Marquee

**Files:**
- Create: `src/components/home/PersonaCarousel.tsx` (server)
- Create: `src/components/home/Marquee.tsx` (server)
- Modify: `src/app/globals.css` (marquee keyframes)

**Interfaces:**
- Consumes: `getFeaturedCities` from `@/lib/voice-ai-industries` (returns array with `{ name }` or strings — read the module first and adapt; Footer calls `getFeaturedCities(12)`).
- Produces: `<PersonaCarousel />`, `<Marquee />` (no props).

- [ ] **Step 1: Marquee keyframes in `globals.css`**

```css
@keyframes marquee-scroll {
  to { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee-scroll 34s linear infinite;
}

.marquee-mask:hover .animate-marquee {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee { animation: none; }
}
```

- [ ] **Step 2: Create `src/components/home/PersonaCarousel.tsx`**

```tsx
import Link from 'next/link';

const personas = [
  { icon: '🩺', title: 'Healthcare Front Desk', body: 'Schedule, reschedule, and triage patient calls while protecting staff from phone overload.', href: '/voice-ai-for-healthcare-page' },
  { icon: '🏠', title: 'Home Services Dispatch', body: 'Capture service requests, qualify urgency, and route to the right crew without missed jobs.', href: '/voice-ai-for-home-services-page' },
  { icon: '⚖️', title: 'Legal Intake', body: 'Screen new matters, gather case details, and hand qualified leads straight to your team.', href: '/voice-ai-for-legal-services' },
  { icon: '🏘️', title: 'Real Estate Team', body: 'Answer listing inquiries instantly, book showings, and never let a lead go to voicemail.', href: '/voice-ai-real-estate' },
  { icon: '🦷', title: 'Dental Office', body: 'Fill the schedule, confirm visits, and cut no-shows with proactive appointment logic.', href: '/voice-ai-for-dental-offices' },
  { icon: '🍽️', title: 'Restaurant Line', body: 'Take reservations and answer the basics so the phone stops pulling staff off the floor.', href: '/for-restaurant-page' },
];

export default function PersonaCarousel() {
  return (
    <section id="what" className="pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Who We Build For
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">
            Voice workflows shaped around your front line
          </h2>
          <p className="theme-soft mt-3 text-lg">
            Pick the operating environment that matches yours. Every path is tuned to how those calls actually
            move — from first ring to logged outcome.
          </p>
        </div>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {personas.map((p, i) => (
          <Link
            key={p.title}
            href={p.href}
            className="theme-card flex min-h-[210px] w-[260px] flex-none snap-start flex-col justify-between rounded-[18px] p-5 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--brand-cool)]"
          >
            <span className="theme-subtle text-[11px] font-[family-name:var(--font-mono)]">
              Path {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="mb-4 mt-2 grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand-primary-bg)] text-[22px]">
                {p.icon}
              </div>
              <h3 className="theme-heading text-[19px] font-semibold">{p.title}</h3>
              <p className="theme-soft mt-2 text-[13.5px]">{p.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/home/Marquee.tsx`**

Read `src/lib/voice-ai-industries.ts` first to get `getFeaturedCities`'s exact return shape, then:

```tsx
import { uponaiIndustriesMenu } from '@/lib/uponai-pages';
import { getFeaturedCities } from '@/lib/voice-ai-industries';

export default function Marquee() {
  const industries = uponaiIndustriesMenu.map((i) => i.label);
  const cities = getFeaturedCities(8).map((c) => (typeof c === 'string' ? c : c.name)); // adapt to actual shape
  const items = [...industries, ...cities];

  return (
    <div className="theme-section-alt border-y border-[var(--border)] py-10">
      <p className="theme-subtle mb-6 text-center text-[11px] uppercase tracking-[0.24em] font-[family-name:var(--font-mono)]">
        Deployed across industries & markets
      </p>
      <div className="marquee-mask flex overflow-hidden [mask:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="animate-marquee flex flex-none gap-3.5 pr-3.5">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="theme-soft whitespace-nowrap rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-[family-name:var(--font-mono)]"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify + commit**

Temp-render both in `page.tsx`, preview (carousel snaps, marquee loops seamlessly, pauses on hover, static under reduced motion), remove temp render. `npm run lint`, `npm run build`.

```bash
git add src/components/home/PersonaCarousel.tsx src/components/home/Marquee.tsx src/app/globals.css
git commit -m "feat(redesign): persona carousel and industries marquee"
```

---

### Task 7: `lead` formType in /api/contact + shared EmailCaptureForm

**Files:**
- Modify: `src/app/api/contact/route.ts`
- Create: `src/components/home/EmailCaptureForm.tsx` (client)

**Interfaces:**
- Produces API contract: `POST /api/contact` with body `{ formType: 'lead', email: string, sourceTag: string, details: string, captchaToken: string }` → `{ success: true }` or `{ error: string }` (400/502). GHL tags: `['website-lead', sourceTag]`.
- Produces component: `<EmailCaptureForm sourceTag="coverage-quiz" details={string} buttonLabel="Send my workflow →" fineprint?: string />`. Used by Tasks 8 and 10.

- [ ] **Step 1: Add the `lead` branch to `route.ts`**

In `POST`, after the `download` branch (before the `firstName` check), add:

```ts
    if (formType === 'lead') {
      const { email, sourceTag, details } = body;

      if (!email || !sourceTag) {
        return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
      }

      const ghlResult = await pushToGHL(
        {
          email,
          source: 'UponAI Website Lead Capture',
          tags: ['website-lead', String(sourceTag)],
        },
        [{ key: 'lead_details', field_value: String(details ?? '') }],
      );

      const emailResult = await sendNotification(
        `🎯 New Website Lead (${sourceTag})`,
        buildLeadEmailHtml({ email: String(email), sourceTag: String(sourceTag), details: String(details ?? '') }),
        String(email),
      );

      if (!emailResult.ok) {
        return NextResponse.json({ error: `Lead captured, but email alert failed: ${emailResult.error}` }, { status: 502 });
      }

      if (!ghlResult.ok) {
        console.warn('Lead saved without GHL sync:', ghlResult.error);
      }

      return NextResponse.json({ success: true });
    }
```

And add next to the other `build*EmailHtml` helpers:

```ts
function buildLeadEmailHtml(d: Record<string, string>) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:32px 16px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dbe4ee">
      <div style="background:#0157a3;padding:24px 28px">
        <h2 style="margin:0;color:#ffffff;font-size:20px;line-height:1.3">New Website Lead</h2>
        <p style="margin:6px 0 0;color:#dbeafe;font-size:14px;line-height:1.5">Submitted via uponai.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#ffffff">
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;width:200px">Email</td><td style="padding:10px 14px;color:#0f172a;font-size:14px">${formatEmailValue(d.email)}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0">Source</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0">${formatEmailValue(d.sourceTag)}</td></tr>
        <tr><td style="padding:10px 14px;color:#475569;font-size:14px;font-weight:600;border-top:1px solid #e2e8f0;vertical-align:top">Details</td><td style="padding:10px 14px;color:#0f172a;font-size:14px;border-top:1px solid #e2e8f0;line-height:1.6">${formatEmailValue(d.details)}</td></tr>
      </table>
      <div style="padding:20px 24px 24px;background:#ffffff">
        <a href="mailto:${escapeHtml(d.email)}" style="display:inline-block;background:#0157a3;color:#ffffff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Reply</a>
      </div>
    </div>
  </div>`;
}
```

- [ ] **Step 2: Create `src/components/home/EmailCaptureForm.tsx`**

```tsx
'use client';

import { useCallback, useState } from 'react';
import TurnstileField from '@/components/ui/TurnstileField';

type Props = {
  sourceTag: string;
  details: string;
  buttonLabel: string;
  fineprint?: string;
};

export default function EmailCaptureForm({ sourceTag, details, buttonLabel, fineprint }: Props) {
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const onTokenChange = useCallback((token: string) => setCaptchaToken(token), []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'lead', email, sourceTag, details, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'sent') {
    return (
      <p className="theme-pill-primary mt-5 inline-flex rounded-xl px-4 py-3 text-sm font-semibold">
        ✓ Sent — check your inbox shortly.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-5">
      <div className="flex flex-wrap gap-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Work email"
          className="theme-inset theme-heading min-w-[220px] flex-1 rounded-xl border border-[var(--border-strong)] px-4 py-3.5 text-[15px] placeholder:text-[var(--text-subtle)]"
        />
        <button
          type="submit"
          disabled={status === 'sending' || !captchaToken}
          className="theme-primary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : buttonLabel}
        </button>
      </div>
      <div className="mt-3">
        <TurnstileField onTokenChange={onTokenChange} />
      </div>
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      {fineprint ? (
        <p className="theme-subtle mt-3 text-[11px] font-[family-name:var(--font-mono)]">{fineprint}</p>
      ) : null}
    </form>
  );
}
```

- [ ] **Step 3: Verify**

`npm run lint`, `npm run build`. API branch testable only with SMTP/Turnstile env configured — verify at minimum: POST without captcha returns 400 (`curl -s -X POST localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"formType":"lead","email":"a@b.c"}'` → `{"error":"Captcha verification is required."}`).

- [ ] **Step 4: Commit**

```bash
git add src/app/api/contact/route.ts src/components/home/EmailCaptureForm.tsx
git commit -m "feat(redesign): lead formType in contact API + shared email capture form"
```

---

### Task 8: CoverageQuiz (interactive tool)

**Files:**
- Create: `src/components/home/CoverageQuiz.tsx` (client)

**Interfaces:**
- Consumes: `<EmailCaptureForm />` from Task 7.
- Produces: `<CoverageQuiz />` (no props); section has `id="tool"` (Hero's "See it in 60 seconds" anchors here).

- [ ] **Step 1: Create `src/components/home/CoverageQuiz.tsx`**

```tsx
'use client';

import { useState } from 'react';
import EmailCaptureForm from '@/components/home/EmailCaptureForm';

const questions = [
  {
    label: 'Step 1',
    title: 'How many inbound calls do you get each month?',
    options: ['Under 500', '500–2,000', '2,000–10,000', '10,000+'],
  },
  {
    label: 'Step 2',
    title: "What's your industry?",
    options: ['Healthcare', 'Home Services', 'Legal', 'Other'],
  },
  {
    label: 'Step 3',
    title: 'What happens to calls after hours?',
    options: ['Voicemail', 'Answering service', 'Nothing / missed', 'Staff on-call'],
  },
] as const;

const resultBullets = [
  'An always-on AI voice agent greeting every caller in under 2 seconds.',
  "Intent qualification tuned to your industry's most common requests.",
  'Live routing to the right person — with clean escalation when it matters.',
  'Every outcome logged and CRM-ready, including after-hours calls.',
];

export default function CoverageQuiz() {
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
  const done = answers.filter(Boolean).length;
  const complete = done === 3;

  return (
    <section id="tool" className="scroll-mt-28 px-4 py-20">
      <div className="theme-card-gradient relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--border-strong)] p-7 md:p-10">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
          Free · No account required
        </span>
        <h2 className="theme-heading mb-2 mt-3.5 text-3xl font-bold md:text-4xl">
          See your call coverage gap in 60 seconds
        </h2>
        <p className="theme-soft text-base">
          Answer 3 quick questions. We&apos;ll show the voice workflow that fits your situation.
        </p>

        <div className="mt-6 flex items-center gap-3 text-xs theme-subtle font-[family-name:var(--font-mono)]">
          <span>{done} of 3 complete</span>
          <span className="theme-inset h-[5px] flex-1 overflow-hidden rounded">
            <i
              className="block h-full bg-gradient-to-r from-[var(--brand-cool)] to-[var(--brand)] transition-[width] duration-300"
              style={{ width: `${(done / 3) * 100}%` }}
            />
          </span>
          <span>Private until you share it</span>
        </div>

        {questions.map((q, qi) => (
          <div key={q.label} className="mt-6">
            <span className="theme-subtle text-[11px] uppercase tracking-[0.14em] font-[family-name:var(--font-mono)]">
              {q.label}
            </span>
            <h3 className="theme-heading mb-4 mt-1.5 text-xl font-semibold">{q.title}</h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {q.options.map((opt) => {
                const selected = answers[qi] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((prev) => prev.map((a, i) => (i === qi ? opt : a)))
                    }
                    className={`rounded-xl border px-3 py-4 text-sm font-semibold transition-colors ${
                      selected
                        ? 'border-[var(--brand-cool)] bg-[var(--brand-primary-bg)] text-[var(--brand-cool)]'
                        : 'theme-inset theme-heading border-[var(--border)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {complete ? (
          <div className="theme-inset mt-7 rounded-2xl border border-[var(--brand-cool)] p-6">
            <h3 className="text-[22px] font-bold text-[var(--brand-cool)]">
              Here&apos;s the workflow we&apos;d build for you
            </h3>
            <p className="theme-soft mt-2 text-sm">
              For a {answers[1]?.toLowerCase()} team handling {answers[0]} calls a month with &quot;
              {answers[2]}&quot; after-hours coverage, here&apos;s what we&apos;d deploy:
            </p>
            <ul className="theme-soft mt-3.5 list-disc space-y-1.5 pl-5 text-[14.5px]">
              {resultBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <EmailCaptureForm
              sourceTag="coverage-quiz"
              details={`Call volume: ${answers[0]} | Industry: ${answers[1]} | After hours: ${answers[2]}`}
              buttonLabel="Send my workflow →"
              fineprint="Used only to deliver your results. No spam, unsubscribe anytime."
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Temp-render, preview: answering all 3 reveals result card with interpolated summary; progress bar fills; captcha renders; submit disabled until captcha token. Remove temp render. `npm run lint`, `npm run build`.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CoverageQuiz.tsx
git commit -m "feat(redesign): interactive coverage-gap quiz wired to lead capture"
```

---

### Task 9: CapabilityShowcase + HowItWorks

**Files:**
- Create: `src/components/home/CapabilityShowcase.tsx` (server)
- Create: `src/components/home/HowItWorks.tsx` (client)

**Interfaces:**
- Consumes: `GraceTalkButton` from `@/components/grace/GraceTalkButton` (props: `label?`, `variant?: 'primary' | 'secondary'`, `className?`; requires `VoiceWidgetProvider`, already in layout).
- Produces: `<CapabilityShowcase />`, `<HowItWorks />` (no props).

- [ ] **Step 1: Create `src/components/home/CapabilityShowcase.tsx`**

```tsx
import GraceTalkButton from '@/components/grace/GraceTalkButton';

const capabilities = [
  'Qualify inbound intent', 'Book & reschedule', 'Answer FAQs', 'Route to the right person',
  'Escalate to a human', 'After-hours coverage', 'Capture & sync leads', 'Overflow handling',
];

const bigStats = [
  { b: '24/7', s: 'Always-on coverage' },
  { b: '<2s', s: 'First response' },
  { b: 'AI+Human', s: 'Handoff by design' },
  { b: '9+', s: 'Industry routes' },
];

const transcript = [
  { who: 'Caller', ai: false, text: 'Hi, I need to move my appointment to next week.' },
  { who: 'UponAI Agent', ai: true, text: 'Of course. I can see your Tuesday 2:00 PM visit. Would Wednesday at 10:00 or Thursday at 3:00 work better?' },
  { who: 'Caller', ai: false, text: 'Thursday at 3 is perfect.' },
  { who: 'UponAI Agent', ai: true, text: "Done — you're confirmed for Thursday at 3:00 PM. I've sent a text confirmation and updated your chart." },
];

export default function CapabilityShowcase() {
  return (
    <section id="showcase" className="px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Powered by UponAI Voice
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">
            Every call contains an opportunity. Our agents catch each one.
          </h2>
          <p className="theme-soft mt-3.5 text-lg">
            One conversational engine greets callers, understands intent, answers common questions, books time,
            and routes live — then logs the outcome where your team already works.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {capabilities.map((cap) => (
              <span key={cap} className="theme-card theme-body rounded-[10px] px-3.5 py-2.5 text-[13.5px]">
                <span className="text-[var(--brand-cool)]">◗ </span>
                {cap}
              </span>
            ))}
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {bigStats.map((s) => (
              <div key={s.s}>
                <b className="block text-3xl leading-none text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">{s.b}</b>
                <small className="theme-subtle text-xs">{s.s}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="theme-panel rounded-[20px] p-5">
          <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] theme-soft font-[family-name:var(--font-mono)]">
            <span>Live call · Healthcare</span>
            <span className="flex items-center gap-2 text-[var(--brand-cool)]">
              <span className="animate-brand-pulse inline-flex h-[7px] w-[7px] rounded-full bg-[var(--brand-cool)]" />
              Live
            </span>
          </div>
          {transcript.map((msg, i) => (
            <div key={i} className={`mb-3.5 max-w-[85%] ${msg.ai ? '' : 'ml-auto text-right'}`}>
              <p className="theme-subtle mb-1 text-[10.5px] tracking-[0.06em] font-[family-name:var(--font-mono)]">{msg.who}</p>
              <div
                className={`rounded-[14px] px-3.5 py-3 text-left text-sm leading-relaxed ${
                  msg.ai
                    ? 'rounded-tl-[4px] border border-[var(--brand-primary-border)] bg-[var(--brand-primary-bg)] theme-heading'
                    : 'theme-inset rounded-tr-[4px] border border-[var(--border)] theme-body'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div className="theme-pill-primary rounded-[14px] px-3.5 py-3 text-xs font-[family-name:var(--font-mono)]">
            ✓ Appointment updated · Synced to CRM · No staff needed
          </div>
          <div className="mt-5 text-center">
            <GraceTalkButton label="Talk to Grace live" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/home/HowItWorks.tsx`**

```tsx
'use client';

import { useState } from 'react';

const steps = [
  {
    tab: 'Design',
    heading: 'Map how your calls actually move',
    body: 'We chart your real call journey — greet, capture, qualify, route, escalate, log — so every workflow starts from how your business operates, not a generic bot script.',
    bullets: ['Call-flow mapping session', 'Industry-specific intent paths', 'Escalation rules you control'],
    visual: [
      { n: '01', l: 'Greet & identify caller', t: 'auto' },
      { n: '02', l: 'Capture intent', t: 'NLU' },
      { n: '03', l: 'Qualify & branch', t: 'logic' },
      { n: '04', l: 'Route or escalate', t: 'live' },
    ],
  },
  {
    tab: 'Deploy',
    heading: 'Launch a branded voice agent',
    body: 'Your agent goes live on the numbers you already use, with a voice and greeting that sound like your team — connected to your telecom and routing rules without operational sprawl.',
    bullets: ['Works with your existing numbers', 'UCaaS & telephony integrations', 'Live in days, not months'],
    visual: [
      { n: '◗', l: 'Connected to your phone system', t: 'UCaaS' },
      { n: '◗', l: 'Branded greeting & voice', t: 'custom' },
      { n: '◗', l: 'Transfer paths configured', t: 'ready' },
    ],
  },
  {
    tab: 'Route',
    heading: 'Qualify, answer, and route live calls',
    body: "Every caller is greeted instantly, understood, and moved toward the right next step — a booking, an answer, or a clean transfer to the person who's the better answer.",
    bullets: ['Sub-2-second first response', 'Answers common questions on its own', 'Human handoff kept available'],
    visual: [
      { n: '→', l: 'Intent understood', t: 'instant' },
      { n: '→', l: 'Resolved by agent', t: 'auto' },
      { n: '→', l: 'Escalated when needed', t: 'human' },
    ],
  },
  {
    tab: 'Analyze',
    heading: 'Track outcomes and sync to your CRM',
    body: 'Every conversation becomes a logged outcome — captured, transcribed, and pushed to the tools your team already uses, with post-call analysis you can act on.',
    bullets: ['Post-call analysis & transcripts', 'CRM-ready lead capture', 'Coverage & outcome reporting'],
    visual: [
      { n: '✓', l: 'Call transcribed & tagged', t: 'done' },
      { n: '✓', l: 'Lead synced to CRM', t: 'auto' },
      { n: '✓', l: 'Outcome added to report', t: 'live' },
    ],
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="theme-section-alt border-y border-[var(--border)] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            How UponAI Works
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">From call map to measured outcome</h2>
          <p className="theme-soft mt-3 text-lg">
            Four guided steps take you from how your calls move today to a live, tracked voice workflow.
          </p>
        </div>

        <div className="mb-9 mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="How it works steps">
          {steps.map((s, i) => (
            <button
              key={s.tab}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                i === active
                  ? 'border-[var(--brand-cool)] bg-[var(--surface-solid)] theme-heading'
                  : 'theme-card-soft theme-soft border-[var(--border)]'
              }`}
            >
              <span
                className={`text-xs font-[family-name:var(--font-mono)] ${i === active ? 'text-[var(--brand-cool)]' : 'theme-subtle'}`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.tab}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
              Step {String(active + 1).padStart(2, '0')} · {step.tab}
            </span>
            <h3 className="theme-heading mt-3.5 text-2xl font-bold md:text-[32px]">{step.heading}</h3>
            <p className="theme-soft my-4 text-base leading-7">{step.body}</p>
            <ul>
              {step.bullets.map((b) => (
                <li
                  key={b}
                  className="theme-body flex items-center gap-3 border-b border-[var(--border)] py-2.5 text-[14.5px] last:border-b-0"
                >
                  <span
                    aria-hidden
                    className="h-[18px] w-[18px] flex-none rounded-md border border-[var(--brand-cool)] bg-[var(--brand-primary-bg)]"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="theme-card-gradient flex min-h-[280px] flex-col justify-center gap-3.5 rounded-[20px] border border-[var(--border-strong)] p-6">
            {step.visual.map((row) => (
              <div key={row.l} className="theme-inset flex items-center gap-3 rounded-xl border border-[var(--border)] p-3.5">
                <span className="text-xs text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">{row.n}</span>
                <span className="theme-soft text-[13.5px]">{row.l}</span>
                <span className="theme-subtle ml-auto text-[11px] font-[family-name:var(--font-mono)]">{row.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + commit**

Temp-render, preview (tabs switch panels, Grace button opens the voice modal, both themes), remove temp render. `npm run lint`, `npm run build`.

```bash
git add src/components/home/CapabilityShowcase.tsx src/components/home/HowItWorks.tsx
git commit -m "feat(redesign): capability showcase with live transcript + how-it-works tabs"
```

---

### Task 10: Static sections — SuccessStats, IndustryGrid, FitCards, GetStarted, PlaybookCapture

**Files:**
- Create: `src/components/home/SuccessStats.tsx`
- Create: `src/components/home/IndustryGrid.tsx`
- Create: `src/components/home/FitCards.tsx`
- Create: `src/components/home/GetStarted.tsx`
- Create: `src/components/home/PlaybookCapture.tsx`

**Interfaces:**
- Consumes: `uponaiIndustriesMenu` from `@/lib/uponai-pages`, `uponaiBookingUrl` from `@/lib/booking`, `<EmailCaptureForm />` from Task 7.
- Produces: five prop-less section components for Task 11.

- [ ] **Step 1: `SuccessStats.tsx`**

```tsx
const cards = [
  {
    eyebrow: 'Coverage', stat: '24/7', title: 'Never miss another call',
    items: ['Always-on voice coverage on every line', 'After-hours calls answered, not lost', 'Overflow handled during surge periods'],
  },
  {
    eyebrow: 'Speed', stat: '<2s', title: 'Respond before callers hang up',
    items: ['Instant greeting on the first ring', 'Fast intent understanding', 'Faster qualification, fewer drop-offs'],
  },
  {
    eyebrow: 'Handoff', stat: '0', title: 'Zero dead ends for prospects',
    items: ['Clean transfer when a person is better', 'Full context passed to your team', 'Every outcome logged and synced'],
  },
];

export default function SuccessStats() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            What Success Looks Like
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Know exactly how you win with UponAI</h2>
          <p className="theme-soft mt-3 text-lg">
            Real operational improvements — whether you&apos;re replacing an answering service or giving your team
            overflow coverage.
          </p>
        </div>
        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.eyebrow} className="theme-card rounded-[20px] p-7 transition-colors hover:border-[var(--border-strong)]">
              <span className="theme-subtle text-[11px] uppercase tracking-[0.14em] font-[family-name:var(--font-mono)]">
                {card.eyebrow}
              </span>
              <div className="my-3 bg-gradient-to-r from-[var(--brand-cool)] to-[var(--brand)] bg-clip-text text-5xl font-semibold leading-none text-transparent font-[family-name:var(--font-mono)]">
                {card.stat}
              </div>
              <h3 className="theme-heading text-xl font-semibold">{card.title}</h3>
              <ul className="mt-4 space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="theme-soft relative pl-5 text-[13.5px]">
                    <span className="absolute left-0 text-[var(--brand-cool)]">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `IndustryGrid.tsx`**

```tsx
import Link from 'next/link';
import { uponaiIndustriesMenu } from '@/lib/uponai-pages';

export default function IndustryGrid() {
  return (
    <section id="industries" className="theme-section-alt border-y border-[var(--border)] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Tailored To Your World
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">
            Voice AI built for real operating environments
          </h2>
          <p className="theme-soft mt-3 text-lg">
            Each path is a productized voice experience — tuned to the calls, questions, and handoffs that define
            your industry.
          </p>
        </div>
        <div className="mt-11 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {uponaiIndustriesMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="theme-card group flex items-center justify-between rounded-[14px] p-5 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-cool)] hover:bg-[var(--surface-solid)]"
            >
              <span className="theme-heading text-base font-semibold">{item.label}</span>
              <span className="text-[var(--brand-cool)] opacity-60 transition-opacity group-hover:opacity-100 font-[family-name:var(--font-mono)]">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `FitCards.tsx`**

```tsx
const cards = [
  {
    tag: 'Replace',
    title: 'You WITHOUT an in-house call team',
    body: 'Give every caller a fast, professional experience without hiring a front desk or paying for a traditional answering service that just takes messages.',
    items: [
      'Tired of voicemail and missed after-hours calls',
      'Paying for an answering service that only takes messages',
      'Want appointments booked, not just logged',
      'Need coverage every hour without more headcount',
      'Want leads captured and synced automatically',
    ],
    note: 'Human handoff is still available — route to your mobile anytime.',
  },
  {
    tag: 'Augment',
    title: 'You WITH an existing team',
    body: 'Bring UponAI in as overflow and after-hours backup so your people handle the conversations that need a human — and nothing else slips through.',
    items: [
      'Staff pulled off work by a ringing phone',
      'Calls dropped during surges and busy periods',
      'Want qualified calls only reaching your team',
      'Need clean escalation with full context',
      'Want every outcome tracked and reported',
    ],
    note: 'Your team stays in control — you set exactly when a person takes over.',
  },
];

export default function FitCards() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            The Right Fit
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Is UponAI right for you?</h2>
          <p className="theme-soft mt-3 text-lg">
            Built for teams that want faster call handling and cleaner conversations — whether AI handles the whole
            line or backs up the people you already have.
          </p>
        </div>
        <div className="mt-11 grid gap-5 lg:grid-cols-2">
          {cards.map((card) => (
            <div key={card.tag} className="theme-card rounded-[20px] p-8">
              <span className="mb-4 inline-block rounded-full border border-[var(--brand-primary-border)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
                {card.tag}
              </span>
              <h3 className="theme-heading text-[22px] font-semibold leading-tight">{card.title}</h3>
              <p className="theme-soft my-3 text-[14.5px]">{card.body}</p>
              <ul>
                {card.items.map((item) => (
                  <li key={item} className="theme-soft flex items-start gap-3 border-t border-[var(--border)] py-2.5 text-sm">
                    <span className="flex-none font-bold text-[var(--brand-cool)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="theme-subtle mt-4 border-t border-dashed border-[var(--border-strong)] pt-4 text-[11.5px] font-[family-name:var(--font-mono)]">
                {card.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `GetStarted.tsx`**

```tsx
import { uponaiBookingUrl } from '@/lib/booking';

const items = [
  { main: 'Your main phone number(s)', sub: 'Works with your existing lines', tag: 'Required', req: true },
  { main: 'Your most common call types', sub: 'We turn them into voice paths', tag: 'Required', req: true },
  { main: 'Your CRM or scheduling tool', sub: 'Speeds up lead sync & booking', tag: 'Optional', req: false },
  { main: 'Nothing else', sub: 'No downloads, no spreadsheets', tag: "That's it", req: false },
];

export default function GetStarted() {
  return (
    <section className="theme-section-alt border-y border-[var(--border)] px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-11 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            What You Need To Get Started
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Either path, same simple setup</h2>
          <p className="theme-soft my-5 text-base">
            No software to install, no scripts to write from scratch. Bring what you have — we map the rest with
            you.
          </p>
          <a
            href={uponaiBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="theme-primary-button inline-flex rounded-xl px-6 py-3.5 text-[15px] font-semibold"
          >
            Get a Demo · ~30 min →
          </a>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.main} className="theme-card flex items-center justify-between gap-4 rounded-[14px] px-5 py-4">
              <div>
                <p className="theme-heading text-[15px] font-semibold">{item.main}</p>
                <p className="theme-subtle mt-0.5 text-[12.5px]">{item.sub}</p>
              </div>
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[10.5px] font-[family-name:var(--font-mono)] ${
                  item.req ? 'theme-pill-accent' : 'theme-pill-primary'
                }`}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `PlaybookCapture.tsx`**

```tsx
import EmailCaptureForm from '@/components/home/EmailCaptureForm';

export default function PlaybookCapture() {
  return (
    <section id="guide" className="px-4 py-20">
      <div className="theme-card-gradient relative mx-auto grid max-w-6xl items-center gap-11 overflow-hidden rounded-[26px] border border-[var(--border-strong)] p-8 md:p-12 lg:grid-cols-2">
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Free Playbook
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Unlock the AI Voice Playbook</h2>
          <p className="theme-soft mt-3.5">
            A practical guide to mapping call flows, qualifying inbound intent, and designing clean human handoff —
            built for operations leaders across healthcare, legal, home services, and more.
          </p>
          <EmailCaptureForm
            sourceTag="voice-playbook"
            details="Requested the AI Voice Playbook from the homepage."
            buttonLabel="Send it to my inbox"
            fineprint="By entering your email you agree to our privacy policy."
          />
        </div>
        <div className="theme-inset relative z-10 rounded-2xl border border-[var(--border)] p-6">
          <span className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            2026 Edition
          </span>
          <h4 className="theme-heading my-3 text-2xl font-bold leading-tight">The AI Voice Playbook</h4>
          <div className="grid gap-2">
            <i className="block h-2 rounded bg-[var(--border-strong)]" />
            <i className="block h-2 w-4/5 rounded bg-[var(--border-strong)]" />
            <i className="block h-2 w-3/5 rounded bg-[var(--border-strong)]" />
          </div>
          <div aria-hidden className="mt-5 flex h-10 items-end gap-[3px]">
            {[40, 65, 30, 80, 55, 70, 45, 90, 35, 60, 75, 50, 85, 40, 65, 55].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] opacity-70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Verify + commit**

Temp-render all five, preview both themes + mobile, remove temp render. `npm run lint`, `npm run build`.

```bash
git add src/components/home/SuccessStats.tsx src/components/home/IndustryGrid.tsx src/components/home/FitCards.tsx src/components/home/GetStarted.tsx src/components/home/PlaybookCapture.tsx
git commit -m "feat(redesign): success stats, industry grid, fit cards, get-started, playbook capture"
```

---

### Task 11: Assemble the new homepage

**Files:**
- Modify: `src/app/page.tsx` (full replacement of the component body; keep `metadata`)

**Interfaces:**
- Consumes: every component from Tasks 5–10, plus existing `Testimonials`, `CTASection`.

- [ ] **Step 1: Replace `src/app/page.tsx`**

Keep the existing `metadata` export verbatim. Replace everything else with:

```tsx
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import PersonaCarousel from '@/components/home/PersonaCarousel';
import Marquee from '@/components/home/Marquee';
import CoverageQuiz from '@/components/home/CoverageQuiz';
import CapabilityShowcase from '@/components/home/CapabilityShowcase';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessStats from '@/components/home/SuccessStats';
import IndustryGrid from '@/components/home/IndustryGrid';
import FitCards from '@/components/home/FitCards';
import GetStarted from '@/components/home/GetStarted';
import PlaybookCapture from '@/components/home/PlaybookCapture';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'AI Voice Systems For Modern Customer Conversations',
  description:
    'UponAI builds AI voice agents, AI chatbots, and conversation workflows for businesses that need faster call handling, better qualification, and cleaner escalation.',
  alternates: { canonical: 'https://uponai.com' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PersonaCarousel />
      <Marquee />
      <CoverageQuiz />
      <CapabilityShowcase />
      <HowItWorks />
      <SuccessStats />
      <IndustryGrid />
      <FitCards />
      <GetStarted />
      <PlaybookCapture />
      <Testimonials />
      <CTASection />
    </>
  );
}
```

The old homepage's `LiveVoiceDemo` import disappears here by design (spec §5) — `/grace` keeps its own. If removing it orphans the shared voice-modal host, check `VoiceWidgetProvider`/`LiveVoiceDemo` coupling: `GraceTalkButton` comment says "modal itself is rendered once by `<LiveVoiceDemo>`". **If true, the modal must be hosted elsewhere** — read `src/components/widget/VoiceWidgetProvider.tsx`; if the provider itself renders the modal, nothing to do; if only `LiveVoiceDemo` renders it, move the modal render into `VoiceWidgetProvider` (single host in layout) so `GraceTalkButton` works on the homepage without `LiveVoiceDemo`. This is the one open integration risk in the plan — resolve it by reading the two files before editing.

- [ ] **Step 2: Verify full page**

`npm run lint`, `npm run build`. Preview `/`: all 13 sections render in order; `#tool` anchor from hero scrolls to quiz; Grace button opens modal and a web call can start; both themes; 375px/768px/1280px.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx src/components/widget/VoiceWidgetProvider.tsx src/components/sections/LiveVoiceDemo.tsx
git commit -m "feat(redesign): assemble new homepage from redesigned sections"
```

(Stage the widget files only if Step 1's modal-host check changed them.)

---

### Task 12: Site-wide QA sweep + final verification

**Files:**
- Modify: whatever the sweep flags (expect small contrast fixes in industry/blog/grace pages)

- [ ] **Step 1: Route sweep, both themes**

Preview each of: `/`, `/grace`, `/voice-ai-for-healthcare-page`, `/voice-ai-for-healthcare-page/new-york` (any generated city), `/services/ai-voice-agents`, `/services`, `/blogs`, `/contact-us-page`, `/quote`, `/trust-center`, `/privacy-policy`. In each: toggle light/dark, check headings/pills/buttons legible, no leftover green, no white-on-white or navy-on-navy.

- [ ] **Step 2: Fix what's found**

Contrast fixes use tokens, never new hardcoded hexes. Keep diffs minimal — this task is repair, not redesign.

- [ ] **Step 3: Final verification**

`npm run lint` → clean. `npm run build` → exit 0 (all static routes generate). Quiz flow end-to-end in preview (3 answers → result → captcha → submit → success or the expected configured-env error surfaced inline). Marquee static under emulated `prefers-reduced-motion`.

- [ ] **Step 4: Commit**

```bash
git add <explicit fixed files>
git commit -m "fix(redesign): interior page contrast + QA sweep fixes"
```

---

## Self-Review Notes

- **Spec coverage:** §4 palette/typography → Tasks 1–3; §5 homepage rows 1–13 → Tasks 5, 6, 8, 9, 10, 11 (row 12 Testimonials + row 13 CTASection reused in Task 11); §6 shell → Task 4 (+ Task 3 sweep covers Nav/Footer colors); §7 interior QA → Task 12; §8 error handling → Tasks 7–8 (inline errors, reduced-motion in every animation step); §9 verification → every task's verify step + Task 12.
- **Known judgement points, called out in-task:** `getFeaturedCities` return shape (Task 6), logo-dot layout (Task 4), voice-modal host coupling (Task 11).
- Spec's `LiveVoiceDemo` removal is implemented in Task 11 with the modal-host risk explicitly flagged.
