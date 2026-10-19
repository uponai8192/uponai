'use client';

import Link from 'next/link';
import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import type { HomeSolutionsContent } from '@/lib/home-content';

// The solutions as one centre card that grows out of the page as it scrolls in,
// with a product snippet floating off each corner (see "Solutions stage" in
// globals.css). The card is a manual carousel, one solution per slide; each
// corner snippet belongs to one solution, lights up while that solution is on
// the card, and selects it when clicked.

const SWIPE_PX = 48;

// Card icons are design, not copy, so they stay in code and are matched to the
// CMS-managed items by position, the same way Capabilities handles its visuals.
// Keep four items so every card keeps its icon and its corner snippet.
const icons = [
  // Microphone: voice systems
  <path
    key="mic"
    d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"
  />,
  // Speech bubble: chatbots
  <path key="chat" d="M20 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3v4l5-4h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" />,
  // Stacked routing lines: UCaaS integrations
  <path key="routes" d="M4 7h16M4 12h11M4 17h6" />,
  // Clock with a return arrow: overflow and after-hours cover
  <path key="overflow" d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1M3 4v4h4M12 8v4.4l3 1.8" />,
];

// Deterministic so server and client markup match.
const bars = Array.from({ length: 14 }, (_, i) => ((i * 37) % 110) / 100);

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
      {children}
    </span>
  );
}

function LiveDot() {
  return <span className="animate-brand-pulse h-1.5 w-1.5 rounded-full bg-[#22c55e]" />;
}

// One product snippet per solution, in item order.
function snippet(i: number, active: boolean) {
  switch (i) {
    case 0:
      return (
        <>
          <Kicker>
            <LiveDot /> Live call · 0:42
          </Kicker>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-cool)] text-sm font-bold text-[#ffffff]">
              G
            </span>
            <span className="leading-tight">
              <b className="theme-heading block text-sm">Grace</b>
              <small className="text-[11px] text-[var(--text-subtle)]">Front desk agent</small>
            </span>
          </div>
          <span className="mt-4 flex h-8 items-center gap-[3px]">
            {bars.map((delay, b) => (
              <span
                key={b}
                className={`w-[3px] origin-center rounded-full bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] ${
                  active ? 'animate-wave-bar' : 'h-1/3'
                }`}
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </span>
        </>
      );
    case 1:
      return (
        <>
          <Kicker>Website chat</Kicker>
          <div className="mt-3 flex flex-col gap-2 text-[12.5px] leading-snug">
            <p className="theme-inset self-start rounded-2xl rounded-bl-md px-3 py-2 text-[var(--text-body)]">
              Do you have a tour slot this week?
            </p>
            <p className="self-end rounded-2xl rounded-br-md bg-gradient-to-br from-[var(--brand)] to-[var(--brand-strong)] px-3 py-2 text-[#ffffff]">
              Thursday at 2pm is open. Shall I book it?
            </p>
            <span className="theme-inset flex gap-1 self-start rounded-full px-3 py-2">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={`h-1.5 w-1.5 rounded-full bg-[var(--text-subtle)] ${active ? 'animate-brand-pulse' : ''}`}
                  style={{ animationDelay: `${d * 0.2}s` }}
                />
              ))}
            </span>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <Kicker>Call routing</Kicker>
          <div className="mt-3 flex flex-col gap-2 text-[12.5px]">
            {[
              ['SIP trunk', 'Connected'],
              ['Intent', 'Billing'],
              ['Warm transfer', 'Ext. 204'],
            ].map(([label, value], r) => (
              <span key={label} className="theme-inset flex items-center justify-between gap-3 rounded-xl px-3 py-2">
                <span className="text-[var(--text-soft)]">{label}</span>
                <b className={r === 2 ? 'text-[var(--brand)]' : 'theme-heading'}>{value}</b>
              </span>
            ))}
          </div>
        </>
      );
    default:
      return (
        <>
          <Kicker>After-hours cover</Kicker>
          <p className="mt-2 flex items-baseline gap-2">
            <b className="theme-heading text-3xl font-bold tracking-tight font-[family-name:var(--font-display)]">38</b>
            <span className="text-xs text-[var(--text-soft)]">missed calls recovered</span>
          </p>
          <span className="mt-3 flex h-12 items-end gap-1.5">
            {[0.35, 0.55, 0.4, 0.8, 0.6, 0.95, 0.7].map((h, b) => (
              <span
                key={b}
                className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--brand)] to-[var(--brand-cool)]"
                style={{ height: `${h * 100}%`, opacity: 0.45 + h * 0.55 }}
              />
            ))}
          </span>
          <span className="theme-pill-accent mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold">
            Answered 24/7
          </span>
        </>
      );
  }
}

// Where each snippet sits around the card, and how far it drifts while the
// stage crosses the viewport. Differing drifts give the corners depth. The
// top-right and bottom-left snippets tuck behind the card.
const floats: { position: string; drift: [string, string]; behind?: boolean }[] = [
  { position: 'left-0 top-2 w-48 xl:w-64', drift: ['72px', '-64px'] },
  { position: 'right-0 -top-4 w-48 xl:w-60', drift: ['40px', '-36px'], behind: true },
  { position: 'left-[3%] bottom-0 w-48 xl:w-60', drift: ['52px', '-48px'], behind: true },
  { position: 'right-[1%] bottom-6 w-48 xl:w-64', drift: ['88px', '-80px'] },
];

const sparkles = [
  'left-[18%] top-[12%] h-5 w-5',
  'right-[10%] top-[44%] h-6 w-6',
  'left-[10%] bottom-[30%] h-3.5 w-3.5',
  'right-[28%] bottom-[2%] h-4 w-4',
];

export default function SolutionsStage({
  items,
  itemKicker,
  ctaLabel,
}: Pick<HomeSolutionsContent, 'items' | 'itemKicker' | 'ctaLabel'>) {
  const count = items.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [rawIndex, setIndex] = useState(0);

  if (count === 0) return null;

  // A CMS revalidation can shrink the list while the page is open.
  const index = Math.min(rawIndex, count - 1);

  const go = (next: number) => setIndex(((next % count) + count) % count);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // The outgoing slide turns inert, which would drop focus to <body> and lose
  // the keyboard user's place, so focus moves to the carousel first.
  const keepFocus = () => {
    if (document.activeElement?.closest('[aria-roledescription="slide"]')) {
      rootRef.current?.focus({ preventScroll: true });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      keepFocus();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      keepFocus();
      prev();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') swipeStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (delta <= -SWIPE_PX) next();
    else if (delta >= SWIPE_PX) prev();
  };

  const arrow = (dir: 'prev' | 'next', className: string) => (
    <button
      type="button"
      onClick={dir === 'prev' ? prev : next}
      aria-label={dir === 'prev' ? 'Previous solution' : 'Next solution'}
      className={`theme-secondary-button h-11 w-11 place-items-center rounded-full text-[var(--brand)] ${className}`}
    >
      <span aria-hidden>{dir === 'prev' ? '←' : '→'}</span>
    </button>
  );

  return (
    <div className="sol-stage relative mx-auto max-w-6xl lg:py-24">
      {/* Corner snippets, desktop only: on narrower screens they would sit on
          top of the card text. */}
      {items.slice(0, floats.length).map((item, i) => {
        const float = floats[i];
        const isActive = i === index;
        return (
          <div
            key={i}
            aria-hidden
            data-active={isActive}
            className={`sol-float absolute hidden lg:block ${float.position} ${float.behind ? 'z-0' : 'z-20'}`}
            style={{ '--drift-from': float.drift[0], '--drift-to': float.drift[1] } as CSSProperties}
          >
            <button
              type="button"
              tabIndex={-1}
              onClick={() => go(i)}
              className="sol-float-card block w-full rounded-[20px] border border-[var(--border)] bg-[var(--surface-solid)] p-4 text-left"
            >
              {snippet(i, isActive)}
            </button>
          </div>
        );
      })}

      {sparkles.map((position, s) => (
        <svg
          key={s}
          aria-hidden
          viewBox="0 0 24 24"
          className={`sol-sparkle pointer-events-none absolute hidden text-[var(--brand-cool)] lg:block ${position}`}
          style={{ animationDelay: `${s * 0.8}s` }}
          fill="currentColor"
        >
          <path d="M12 0c.7 6.4 5.6 11.3 12 12-6.4.7-11.3 5.6-12 12-.7-6.4-5.6-11.3-12-12C6.4 11.3 11.3 6.4 12 0Z" />
        </svg>
      ))}

      {/* The card. It scales as a whole, so the slides, arrows and dots inside
          grow with it. */}
      <div
        ref={rootRef}
        tabIndex={-1}
        role="region"
        aria-roledescription="carousel"
        aria-label="UponAI solutions"
        onKeyDown={onKeyDown}
        className="sol-card relative z-10 mx-auto max-w-3xl rounded-[28px] border border-[var(--border-strong)] bg-[var(--surface-solid)] shadow-[0_30px_80px_rgba(var(--shadow-rgb),0.16)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
      >
        <div
          className="grid touch-pan-y overflow-hidden rounded-[28px]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          {items.map((item, i) => {
            const isActive = i === index;
            const state = isActive ? 'active' : (i - index + count) % count <= count / 2 ? 'after' : 'before';
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!isActive}
                inert={!isActive}
                data-state={state}
                // Shares the customer stories' slide transition (.story-slide).
                className="story-slide col-start-1 row-start-1 flex flex-col items-center px-6 pb-24 pt-12 text-center sm:px-10 md:px-24 md:pb-24 md:pt-16"
              >
                <span aria-hidden className="theme-pill-primary grid h-12 w-12 place-items-center rounded-2xl">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[i % icons.length]}
                  </svg>
                </span>
                <span className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
                  {itemKicker} {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <h3 className="theme-heading mt-3 text-3xl font-bold leading-[1.1] md:text-[2.6rem]">{item.title}</h3>
                <p className="theme-body mt-4 max-w-md text-[15px] leading-relaxed md:text-base">{item.body}</p>
                <Link
                  href={item.href}
                  className="theme-primary-button mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
                >
                  {ctaLabel}
                </Link>
              </div>
            );
          })}
        </div>

        {count > 1 ? (
          <>
            {arrow('prev', 'absolute left-5 top-1/2 hidden -translate-y-1/2 md:grid')}
            {arrow('next', 'absolute right-5 top-1/2 hidden -translate-y-1/2 md:grid')}

            <div className="absolute inset-x-0 bottom-7 flex items-center justify-center gap-3">
              {arrow('prev', 'grid md:hidden')}
              <div className="flex items-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Solution ${i + 1}: ${item.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    className="group grid h-6 place-items-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ${
                        i === index
                          ? 'w-10 bg-[var(--brand)]'
                          : 'w-4 bg-[var(--border-strong)] group-hover:bg-[var(--text-subtle)]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {arrow('next', 'grid md:hidden')}
            </div>
          </>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Solution ${index + 1} of ${count}: ${items[index].title}`}
      </p>
    </div>
  );
}
