# Live Voice Demo — Two-Column Companion

**Date:** 2026-06-26
**Status:** Approved

## Context

The Live Voice Demo section (`src/components/sections/LiveVoiceDemo.tsx`) renders a single centered Grace card in a wide section. Next to a dense homepage (hero orchestration panel, stat grids, image mosaics) it reads sparse — one card floating in dead space.

Fix is compositional: a two-column layout. Left keeps the existing Grace call card (idle/calling/ended). Right adds a companion panel that fills the horizontal space and adds "proof it's real" — what a caller can actually say to Grace.

No persona chips (Grace stays one UponAI agent — decided earlier).

## Goals

- Section no longer reads empty on desktop.
- Companion panel adds interaction guidance ("what to say"), useful most during the live call.
- No API/data changes. No change to call logic or `callState` flow.
- Left card logic untouched — low risk.

## Layout

```
┌───────────────────────────── Header (unchanged) ─────────────────────────────┐
│  • Live Voice Demo   "Hear what your AI agent could sound like"   subhead     │
└───────────────────────────────────────────────────────────────────────────────┘

  Desktop: two columns          Mobile: stacked (card first)
  ┌──────────────┬──────────────┐    ┌──────────────┐
  │ Grace card   │ Companion    │    │ Grace card   │
  │ (left)       │ panel (right)│    ├──────────────┤
  └──────────────┴──────────────┘    │ Companion    │
                                      └──────────────┘
```

- Grid: `lg:grid-cols-2`, single column below `lg`. Companion comes after the card in DOM (stacks below on mobile).
- Both columns are equal-height `theme-panel` cards, consistent radius/padding with the existing card.

## Components

### `GraceCompanion` — new file `src/components/sections/GraceCompanion.tsx`

Client component. Props: `{ demoState: 'idle' | 'calling' | 'ended'; elapsed?: number }`.

`DemoState` type is exported from `LiveVoiceDemo.tsx` and imported here (single source of truth).

Renders the right panel, adapting by `demoState`:

**idle** — "Try asking Grace"
- Eyebrow: `TRY ASKING` (green, uppercase, tracked).
- Subhead: "Not sure what to say? Try one of these."
- Five prompt rows (static array), each: quote icon + text, bordered pill row, `theme-card` background.
- Footer line (top border): "Grace replies in real time, books, and hands off when it matters."

**calling** — "Say one of these"
- Eyebrow swaps to `SAY SOMETHING` with a small pulsing green dot.
- Same five rows; rows gently pulse (staggered) to read as live.
- Footer line: "Grace is listening — say one of the above."

**ended** — "What Grace just did"
- Eyebrow: `RECAP`.
- Three check rows (green check icon + label):
  - "Answered in real time"
  - "Offered to book"
  - "Ready to route to your team"
- Footer line: "That's a fraction of what she handles on live calls."

Sample prompts (idle + calling), shared const:
```
'What services do you offer?'
'What are your hours?'
'Can I book an appointment?'
'Can you text me the details?'
'Transfer me to someone?'
```

### `LiveVoiceDemo` — modified

- Wrap the existing state cards (left) and `<GraceCompanion>` (right) in the two-column grid.
- Pass `demoState` and `elapsed` to `GraceCompanion`.
- Left card content (idle/calling/ended) is unchanged.
- `VoiceDemoModalDynamic`, parallax blobs, button rings, timer logic all stay.

## Motion

- Prompt rows: stagger-in on mount (`fade + translateY`, `animation-delay` per index).
- calling state: rows pulse opacity, staggered, infinite.
- Hover on prompt rows (idle): subtle lift + green border.
- Reuse existing keyframes where possible; add `row-in` and reuse `pulse`.
- Respect existing brand palette: `#22c55e` green, `#54d2ff` cyan, `theme-*` utility classes.

## Error Handling

None new — no data fetching or async in the companion. Pure presentational.

## Testing

No test framework in repo. Verify with `npx tsc --noEmit` (clean) and visual check in dev. Acceptance:
1. Desktop: two equal-height columns, no dead space.
2. Mobile: card stacks above companion.
3. idle → calling → ended swaps the right panel content correctly.
4. Prompt rows animate in; calling rows pulse.
5. No regression to call start/end, modal, parallax, button rings.

## File Structure

- Create: `src/components/sections/GraceCompanion.tsx`
- Modify: `src/components/sections/LiveVoiceDemo.tsx` (export `DemoState`, add grid + companion)
