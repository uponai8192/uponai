'use client';

import { useMemo } from 'react';
import { useVoiceWidget } from '@/components/widget/VoiceWidgetProvider';
import type { VerticalAgent } from '@/lib/vertical-agents';

const micPath =
  'M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z';

export default function VerticalVoiceAgentCard({ agent }: { agent: VerticalAgent }) {
  const { openWidget } = useVoiceWidget();

  // Deterministic so server and client markup match.
  const bars = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        height: 26 + ((i * 47) % 62),
        delay: ((i * 31) % 105) / 100,
      })),
    [],
  );

  return (
    <div className="theme-panel relative overflow-hidden rounded-[28px] p-7 md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(420px 260px at 50% -10%, var(--wash-1), transparent 70%), radial-gradient(320px 240px at 110% 100%, var(--wash-2), transparent 70%)',
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="theme-pill-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] font-[family-name:var(--font-mono)]">
            <span className="animate-brand-pulse inline-flex h-1.5 w-1.5 rounded-full bg-current" />
            {agent.demo ? 'Live demo' : 'Live'}
          </span>
          <span className="theme-subtle text-[10.5px] uppercase tracking-[0.18em] font-[family-name:var(--font-mono)]">
            AI voice agent
          </span>
        </div>

        <div className="relative mx-auto mt-8 grid h-28 w-28 place-items-center">
          <span
            aria-hidden
            className="animate-agent-halo absolute inset-0 rounded-full border border-[var(--brand)]"
          />
          <span
            aria-hidden
            className="animate-agent-halo absolute inset-0 rounded-full border border-[var(--brand)]"
            style={{ animationDelay: '1.4s' }}
          />
          {/* Arbitrary hex rather than `text-white`: a legacy light-theme rule in
              globals.css remaps `.text-white` to the dark heading colour. */}
          <span
            className="relative grid h-24 w-24 place-items-center rounded-full text-[34px] font-extrabold text-[#ffffff] shadow-[0_16px_36px_rgba(1,87,163,0.32)]"
            style={{ background: 'linear-gradient(150deg, var(--brand), var(--brand-2))' }}
          >
            <span className="font-[family-name:var(--font-display)] leading-none">
              {agent.name.charAt(0)}
            </span>
            <span
              aria-hidden
              className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border-[3px] border-[var(--surface-solid)] bg-[var(--brand-cool)]"
            />
          </span>
        </div>

        <div aria-hidden className="mx-auto mt-5 flex h-8 w-44 items-end justify-center gap-[3px]">
          {bars.map((bar, i) => (
            <span
              key={i}
              className="animate-wave-bar w-[3px] flex-none rounded-full bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] opacity-80"
              style={{ height: `${bar.height}%`, animationDelay: `${bar.delay}s` }}
            />
          ))}
        </div>

        <div className="mt-5 text-center">
          <h3 className="theme-heading text-[28px] font-bold leading-none">{agent.name}</h3>
          <p className="theme-subtle mt-2.5 text-[10.5px] uppercase tracking-[0.18em] font-[family-name:var(--font-mono)]">
            UponAI agent · {agent.contextLabel}
          </p>
          <p className="theme-soft mx-auto mt-4 max-w-sm text-sm leading-6">{agent.blurb}</p>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {agent.chips.map((chip) => (
            <span
              key={chip}
              className="theme-card-soft theme-body rounded-full border border-[var(--border)] px-3 py-1.5 text-[11.5px]"
            >
              {chip}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => openWidget({ vertical: agent.key })}
          className="theme-primary-button group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-[15px] font-bold"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d={micPath} />
          </svg>
          Talk to {agent.name}
        </button>

        <p className="theme-subtle mt-3.5 text-center text-[10.5px] leading-4 font-[family-name:var(--font-mono)]">
          {agent.demo
            ? 'Showcase agent, scoped to the workflows above. Runs in your browser.'
            : 'Runs in your browser. No download.'}
        </p>
      </div>
    </div>
  );
}
