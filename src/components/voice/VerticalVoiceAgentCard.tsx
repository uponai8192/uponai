'use client';

import { useEffect, useMemo, useState } from 'react';
import AgentAvatar from '@/components/voice/AgentAvatar';
import { useVoiceWidget } from '@/components/widget/VoiceWidgetProvider';
import { uponaiBookingUrl } from '@/lib/booking';
import type { VerticalAgent } from '@/lib/vertical-agents';

const micPath =
  'M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function VerticalVoiceAgentCard({ agent }: { agent: VerticalAgent }) {
  const { callState, leadCaptured, openWidget, endCall, startCallDirect } = useVoiceWidget();
  const [elapsed, setElapsed] = useState(0);

  // Once the visitor has given their details this session, reconnect straight
  // away instead of sending them back through the form.
  const startTalking = () =>
    leadCaptured ? startCallDirect(agent.key) : openWidget({ vertical: agent.key });

  const onCall = callState === 'active';
  const connecting = callState === 'loading';
  const ended = callState === 'ended';

  // Reset the timer as the call starts. Derived during render (React's
  // "previous value" pattern) rather than in an effect, matching LiveVoiceDemo.
  const [prevCallState, setPrevCallState] = useState(callState);
  if (callState !== prevCallState) {
    setPrevCallState(callState);
    if (callState === 'active') setElapsed(0);
  }

  // Tick only while the call is live.
  useEffect(() => {
    if (callState !== 'active') return;
    const id = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(id);
  }, [callState]);

  // Deterministic so server and client markup match. Every bar covers the same
  // scale range, so only the stagger varies.
  const bars = useMemo(
    () => Array.from({ length: 15 }, (_, i) => ({ delay: ((i * 31) % 105) / 100 })),
    [],
  );

  const statusLabel = onCall
    ? `On call · ${formatTime(elapsed)}`
    : connecting
      ? 'Connecting'
      : ended
        ? 'Call ended'
        : agent.demo
          ? 'Live demo'
          : 'Live';

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
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] font-[family-name:var(--font-mono)] ${
              onCall ? 'theme-pill-accent' : 'theme-pill-primary'
            }`}
            aria-live="polite"
          >
            <span
              className={`inline-flex h-1.5 w-1.5 rounded-full bg-current ${onCall || connecting ? 'animate-brand-pulse' : ''}`}
            />
            {statusLabel}
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
            style={{ animationDelay: onCall ? '0.7s' : '1.4s' }}
          />
          <span className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full shadow-[0_16px_36px_rgba(1,87,163,0.32)]">
            <AgentAvatar agentKey={agent.key} name={agent.name} size={96} priority />
          </span>
          <span
            aria-hidden
            className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border-[3px] border-[var(--surface-solid)] bg-[var(--brand-cool)]"
          />
        </div>

        <div aria-hidden className="mx-auto mt-5 flex h-8 w-44 items-end justify-center gap-[3px]">
          {bars.map((bar, i) => (
            <span
              key={i}
              className={`w-[3px] flex-none origin-bottom rounded-full bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] ${
                onCall ? 'animate-wave-bar opacity-100' : 'animate-wave-bar opacity-80'
              }`}
              style={{
                animationDelay: `${bar.delay}s`,
                animationDuration: onCall ? '0.7s' : undefined,
              }}
            />
          ))}
        </div>

        <div className="mt-5 text-center">
          <h3 className="theme-heading text-[28px] font-bold leading-none">{agent.name}</h3>
          <p className="theme-subtle mt-2.5 text-[10.5px] uppercase tracking-[0.18em] font-[family-name:var(--font-mono)]">
            UponAI agent · {agent.contextLabel}
          </p>

          {onCall ? (
            <p className="theme-soft mx-auto mt-4 max-w-sm text-sm leading-6">
              You are speaking with {agent.name}. Ask about any of the workflows below.
            </p>
          ) : ended ? (
            <p className="theme-soft mx-auto mt-4 max-w-sm text-sm leading-6">
              Call ended after {formatTime(elapsed)}. Want to see this running on your own lines?
            </p>
          ) : (
            <p className="theme-soft mx-auto mt-4 max-w-sm text-sm leading-6">{agent.blurb}</p>
          )}
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

        {onCall ? (
          <button
            type="button"
            onClick={endCall}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#ef4444]/40 bg-[#ef4444]/10 py-4 text-[15px] font-bold text-[#dc2626] transition-colors hover:bg-[#ef4444]/16"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="5" y="5" width="14" height="14" rx="2" />
            </svg>
            End call
          </button>
        ) : ended ? (
          <div className="mt-7 grid gap-2.5">
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button flex w-full items-center justify-center rounded-2xl py-4 text-[15px] font-bold"
            >
              Book a demo
            </a>
            <button
              type="button"
              onClick={startTalking}
              className="theme-secondary-button w-full rounded-2xl py-3.5 text-sm font-semibold"
            >
              Talk to {agent.name} again
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startTalking}
            disabled={connecting}
            className="theme-primary-button group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-[15px] font-bold disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d={micPath} />
            </svg>
            {connecting ? 'Connecting…' : `Talk to ${agent.name}`}
          </button>
        )}

        <p className="theme-subtle mt-3.5 text-center text-[10.5px] leading-4 font-[family-name:var(--font-mono)]">
          {agent.demo
            ? 'Showcase agent, scoped to the workflows above. Runs in your browser.'
            : 'Runs in your browser. No download.'}
        </p>
      </div>
    </div>
  );
}
