'use client';

import { useEffect, useMemo, useState } from 'react';
import { uponaiBookingUrl } from '@/lib/booking';

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

export default function PlatformHero() {
  const [activeTab, setActiveTab] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);

  // Deterministic bar heights/delays so server and client markup match (no hydration mismatch).
  const bars = useMemo(
    () =>
      Array.from({ length: WAVE_BAR_COUNT }, (_, i) => ({
        height: 18 + ((i * 37) % 70),
        delay: ((i * 53) % 110) / 100,
      })),
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
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        {/* Left column */}
        <div>
          <span className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="animate-brand-pulse inline-flex h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            The AI Agent Platform for Enterprise
          </span>
          <h1 className="theme-heading mt-5 text-5xl font-extrabold leading-[1.04] md:text-6xl">
            Build AI agents once.
            <span className="block bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)] bg-clip-text text-transparent">
              Deploy them everywhere.
            </span>
          </h1>
          <p className="theme-body mt-6 max-w-xl text-lg leading-8">
            UponAI is the all-in-one platform for enterprise teams to train, test, and deploy AI agents across
            phone, chat, and web, augmenting your workforce with visibility, speed, and scale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              Get a demo →
            </a>
            <button
              type="button"
              onClick={scrollToSolution}
              className="theme-secondary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              ▶ Watch 2-min overview
            </button>
          </div>
          <p className="theme-subtle mt-5 text-[12.5px] font-[family-name:var(--font-mono)]">
            <b className="font-medium text-[var(--brand)]">First agent live in 10 minutes</b>
            {' · No-code builder · Works with your existing stack'}
          </p>
        </div>

        {/* Right column: Agent Console (decorative) */}
        <div
          aria-hidden
          className="theme-panel rounded-[22px] p-5"
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
                    height: `${bar.height}%`,
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
