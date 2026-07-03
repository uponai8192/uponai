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
