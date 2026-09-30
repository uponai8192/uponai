'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { uponaiBookingUrl } from '@/lib/booking';
import { defaultHomeHero, type HomeHeroContent } from '@/lib/home-content';

const channelTabs = ['PHONE', 'WEB CHAT', 'WHATSAPP'];

const captions = [
  'Listening for caller intent',
  'Detected: appointment booking',
  'Same agent handling web chat',
  'Transcript synced, lead captured',
  'Escalation standing by',
];

const consoleRows = [
  { k: 'Detected intent', v: 'Appointment booking', gray: false },
  { k: 'Deployed on', v: '3 channels', gray: false },
  { k: 'Human escalation', v: 'Standing by', gray: true },
];

const WAVE_BAR_COUNT = 38;

function scrollToSolution() {
  document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
}

export default function PlatformHero({ content = defaultHomeHero }: { content?: HomeHeroContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);

  // Deterministic delays so server and client markup match (no hydration
  // mismatch). The stagger is what makes the row read as a wave; every bar
  // covers the same scale range, so only the offset varies.
  // Tolerates stray or doubled spaces from a CMS editor: empty words would
  // otherwise render blank spans and push the accent's delay out.
  const words = useMemo(() => content.headline.split(/\s+/).filter(Boolean), [content.headline]);

  const bars = useMemo(
    () => Array.from({ length: WAVE_BAR_COUNT }, (_, i) => ({ delay: ((i * 53) % 110) / 100 })),
    [],
  );

  useEffect(() => {
    const tabTimer = setInterval(() => {
      setActiveTab((i) => (i + 1) % channelTabs.length);
    }, 2400);
    const capTimer = setInterval(() => {
      setCaptionIndex((i) => (i + 1) % captions.length);
    }, 2400);
    return () => {
      clearInterval(tabTimer);
      clearInterval(capTimer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-16 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[640px] w-[640px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--wash-1), var(--wash-2) 48%, transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-7xl">
        {/* Centred tagline and calls to action */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Entrance: the plain words rise in one by one, then the accent
              lands as a unit, draws its waveform underline and keeps a slow
              shine running (globals.css, "Hero headline"). The accent stays
              one span so the gradient runs unbroken across it. */}
          <h1 className="theme-heading text-5xl font-extrabold leading-[1.04] md:text-6xl">
            {words.map((word, i) => (
              <span key={i}>
                <span className="hero-word" style={{ '--i': i } as CSSProperties}>
                  {word}
                </span>{' '}
              </span>
            ))}
            <span
              className="hero-word hero-accent relative"
              style={{ '--i': words.length } as CSSProperties}
            >
              <span className="hero-shine">{content.headlineAccent}</span>
              <svg
                aria-hidden
                viewBox="0 0 400 16"
                preserveAspectRatio="none"
                className="hero-wave pointer-events-none absolute -bottom-2 left-0 h-3 w-full md:-bottom-3"
                fill="none"
              >
                <path
                  pathLength={1}
                  d="M2 8 C 22 8 22 3 32 3 S 42 13 52 13 S 62 2 72 2 S 82 14 92 14 S 102 4 112 4 S 122 11 132 11 S 142 6 152 6 S 162 9 172 9 C 190 9 210 8 230 8 C 250 8 252 5 262 5 S 272 12 282 12 S 292 3 302 3 S 312 13 322 13 S 332 5 342 5 S 352 10 362 10 S 380 8 398 8"
                />
              </svg>
            </span>
          </h1>
          <div className="hero-fade mt-8 flex flex-wrap justify-center gap-3" style={{ '--delay': '0.75s' } as CSSProperties}>
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              {content.primaryCtaLabel}
            </a>
            <button
              type="button"
              onClick={scrollToSolution}
              className="theme-secondary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              {content.secondaryCtaLabel}
            </button>
          </div>
          <p
            className="hero-fade theme-subtle mt-5 text-[12.5px] font-[family-name:var(--font-mono)]"
            style={{ '--delay': '0.9s' } as CSSProperties}
          >
            <b className="font-medium text-[var(--brand)]">{content.footnoteStrong}</b>
            {content.footnoteRest}
          </p>
        </div>

        {/* Agent Console (decorative), sized to sit under the tagline block
            rather than spanning the full container. */}
        <div
          aria-hidden
          className="mx-auto mt-14 max-w-xl theme-panel rounded-[22px] p-5"
          style={{ background: 'linear-gradient(160deg, var(--surface-gradient-start), var(--surface-gradient-end))' }}
        >
          <div className="mb-3.5 flex items-center justify-between">
            <span className="theme-body text-[11px] uppercase tracking-[0.16em] font-[family-name:var(--font-mono)]">
              Agent Console · Multi-channel
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--brand)] font-[family-name:var(--font-mono)]">
              <i className="animate-brand-pulse h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
              Live
            </span>
          </div>

          <div className="mb-3.5 flex gap-1.5">
            {channelTabs.map((tab, i) => (
              <span
                key={tab}
                className={`flex-1 rounded-lg border px-1 py-1.5 text-center text-[10.5px] tracking-[0.06em] font-[family-name:var(--font-mono)] transition-colors ${
                  i === activeTab
                    ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
                    : 'border-[var(--border)] bg-[var(--surface-solid)] text-[var(--text-subtle)]'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="relative">
            <div className="flex h-[58px] items-center gap-[3px] px-0.5">
              {bars.map((bar, i) => (
                <span
                  key={i}
                  className="animate-wave-bar flex-1 rounded-[3px] opacity-90"
                  style={{
                    animationDelay: `${bar.delay}s`,
                    background: 'linear-gradient(180deg, var(--brand), #8FBBE4)',
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={scrollToSolution}
              className="theme-menu absolute left-1/2 top-[44%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full pl-1 text-[15px] text-[var(--brand)] transition-transform hover:scale-110"
            >
              ▶
            </button>
          </div>

          <div className="my-3.5 min-h-4 text-xs text-[var(--text-body)] font-[family-name:var(--font-mono)]">
            {captions[captionIndex]}
          </div>

          {consoleRows.map((row) => (
            <div
              key={row.k}
              className="theme-card mb-2 flex items-center justify-between rounded-[11px] px-3.5 py-2.5 text-[13px] last:mb-0"
            >
              <span className="text-[10.5px] uppercase tracking-[0.06em] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
                {row.k}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10.5px] font-[family-name:var(--font-mono)] ${
                  row.gray
                    ? 'bg-[rgba(82,81,85,0.12)] text-[var(--text-body)]'
                    : 'bg-[rgba(1,87,163,0.1)] text-[var(--brand)]'
                }`}
              >
                {row.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
