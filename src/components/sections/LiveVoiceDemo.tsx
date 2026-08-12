// src/components/sections/LiveVoiceDemo.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { uponaiBookingUrl } from '@/lib/booking';
import { useVoiceWidget } from '@/components/widget/VoiceWidgetProvider';
import { VoiceDemoModalDynamic } from '@/components/widget/VoiceDemoModalDynamic';
import GraceCompanion from './GraceCompanion';

export type DemoState = 'idle' | 'calling' | 'ended';

const waveHeights = [38, 62, 80, 52, 90, 68, 44, 84, 58, 74, 48, 86, 60, 70, 46];

function GraceAvatar({ pulsing = false }: { pulsing?: boolean }) {
  return (
    <div className="relative">
      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#22c55e] to-[#54d2ff] flex items-center justify-center shadow-[0_0_24px_rgba(34,197,94,0.3)]">
        <span className="text-2xl font-bold text-white select-none">G</span>
      </div>
      {pulsing ? (
        <div
          className="absolute inset-0 rounded-full border-2 border-[#22c55e]/60"
          style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}
        />
      ) : (
        <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--surface)] bg-[#22c55e]" />
      )}
    </div>
  );
}

export default function LiveVoiceDemo() {
  const { callState, openWidget, endCall } = useVoiceWidget();
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync widget call state → demo section state.
  // The widget is an external system (Retell client in the provider), so this section
  // mirrors its state rather than deriving it: 'Talk again' resets to idle locally and
  // must survive callState staying 'ended'. Costs one extra render per call transition.
  useEffect(() => {
    if (callState === 'active') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mirroring external widget state, see above
      setDemoState('calling');
      setElapsed(0);
    } else if (callState === 'ended') {
      setDemoState('ended');
    } else if (callState === 'idle') {
      // only reset to idle if user explicitly resets via "Talk again"
    }
  }, [callState]);

  // Timer
  useEffect(() => {
    if (demoState === 'calling') {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [demoState]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleReset = () => {
    setDemoState('idle');
    setElapsed(0);
  };

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  return (
    <section className="relative overflow-hidden px-4 py-20" onMouseMove={handleMouseMove} onMouseLeave={() => setMouse({ x: 0, y: 0 })}>
      <style>{`
        @keyframes voice-bar {
          0% { transform: scaleY(0.2); opacity: 0.6; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes btn-ring {
          0%   { transform: scale(1);    opacity: 0.55; }
          100% { transform: scale(1.75); opacity: 0; }
        }
        @keyframes btn-glow {
          0%, 100% { box-shadow: 0 0 28px rgba(34,197,94,0.35), 0 0 0 0 rgba(34,197,94,0.25); }
          50%       { box-shadow: 0 0 40px rgba(34,197,94,0.55), 0 0 0 8px rgba(34,197,94,0.08); }
        }
        @keyframes float-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(24px, -18px) scale(1.08); }
          66%       { transform: translate(-16px, 12px) scale(0.95); }
        }
        @keyframes row-in {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes row-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; border-color: rgba(34,197,94,0.4); }
        }
      `}</style>

      {/* Background glows — parallax on mouse */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-16" style={{ transform: `translate(${mouse.x * 160}px, ${mouse.y * 110}px)`, transition: 'transform 0.6s cubic-bezier(0.25,0.1,0.25,1)' }}>
          <div className="h-72 w-72 rounded-full bg-[#22c55e]/10 blur-3xl" style={{ animation: 'float-blob 12s ease-in-out infinite' }} />
        </div>
        <div className="absolute right-[8%] bottom-16" style={{ transform: `translate(${mouse.x * -130}px, ${mouse.y * -90}px)`, transition: 'transform 0.7s cubic-bezier(0.25,0.1,0.25,1)' }}>
          <div className="h-80 w-80 rounded-full bg-[#54d2ff]/10 blur-3xl" style={{ animation: 'float-blob 16s ease-in-out infinite 4s' }} />
        </div>
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2" style={{ transform: `translate(calc(-50% + ${mouse.x * 80}px), ${mouse.y * 130}px)`, transition: 'transform 0.9s cubic-bezier(0.25,0.1,0.25,1)' }}>
          <div className="h-60 w-60 rounded-full bg-[#22c55e]/6 blur-3xl" style={{ animation: 'float-blob 20s ease-in-out infinite 8s' }} />
        </div>
      </div>

      {/* Header */}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="theme-pill-green inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]">
          <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.8)]" style={{ animation: 'pulse 2s infinite' }} />
          Live Voice Demo
        </div>
        <h2 className="theme-heading mt-6 text-4xl font-bold leading-tight md:text-5xl">
          Hear what your AI agent<br />could sound like
        </h2>
        <p className="theme-soft mt-4 text-lg">Talk to Grace, then build yours.</p>
      </div>

      {/* Demo panel — two columns: Grace card + companion */}
      <div className="relative mx-auto mt-12 grid max-w-4xl items-stretch gap-6 lg:grid-cols-2">

        {/* Left column — Grace state card */}
        <div className="flex flex-col">

        {/* ── IDLE ── */}
        {demoState === 'idle' && (
          <div className="theme-panel flex h-full flex-col justify-center rounded-[2rem] p-7 md:p-10 shadow-[0_0_0_1px_rgba(34,197,94,0.08),0_0_60px_rgba(34,197,94,0.06)]">
            <div className="flex flex-col items-center gap-4 text-center">
              <GraceAvatar />
              <div>
                <p className="theme-subtle text-xs uppercase tracking-[0.24em]">UponAI Agent</p>
                <h3 className="theme-heading mt-1.5 text-2xl font-semibold">Grace</h3>
                <p className="theme-body mx-auto mt-2 max-w-sm text-sm leading-relaxed">
                  Grace is an AI voice agent built on UponAI. She handles inbound calls, answers questions, books appointments, and transfers to your team when it matters.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Answers Questions', 'Books Appointments', 'Transfers Calls'].map((tag) => (
                  <span key={tag} className="theme-card rounded-full px-3 py-1 text-xs theme-body">{tag}</span>
                ))}
              </div>
              <div className="relative mt-3 inline-flex">
                {/* Pulse rings */}
                <span className="absolute inset-0 rounded-full bg-[#22c55e]/30" style={{ animation: 'btn-ring 2s ease-out infinite' }} aria-hidden="true" />
                <span className="absolute inset-0 rounded-full bg-[#22c55e]/20" style={{ animation: 'btn-ring 2s ease-out infinite 0.6s' }} aria-hidden="true" />
                <button
                  onClick={openWidget}
                  className="relative flex items-center gap-3 rounded-full bg-[#22c55e] px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-[#16a34a] active:scale-95"
                  style={{ animation: 'btn-glow 2.5s ease-in-out infinite' }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z" />
                  </svg>
                  Talk now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CALLING ── */}
        {demoState === 'calling' && (
          <div className="theme-panel flex h-full flex-col justify-center rounded-[2rem] p-7 md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="theme-pill-green flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'pulse 1s infinite' }} />
                Speaking…
              </div>
              <span className="theme-subtle font-mono text-sm">{formatTime(elapsed)}</span>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex w-full items-center gap-5">
                <GraceAvatar pulsing />
                <div className="flex h-16 flex-1 items-end gap-1">
                  {waveHeights.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${i % 2 === 0 ? 'bg-[#22c55e]' : 'bg-[#54d2ff]'}`}
                      style={{
                        height: `${h}%`,
                        transformOrigin: 'bottom',
                        animation: `voice-bar ${0.45 + (i % 5) * 0.12}s ease-in-out ${i * 0.055}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="theme-subtle text-xs uppercase tracking-[0.24em]">Grace · UponAI Agent</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Answers Questions', 'Books Appointments', 'Transfers Calls'].map((tag) => (
                  <span key={tag} className="theme-card rounded-full px-3 py-1 text-xs theme-body">{tag}</span>
                ))}
              </div>
              <button
                onClick={endCall}
                className="mt-2 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#f87171] transition-all hover:bg-[#ef4444]/10 active:scale-95"
                style={{ border: '1px solid rgba(239,68,68,0.3)' }}
              >
                <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="5" y="5" width="14" height="14" rx="2" />
                </svg>
                End call
              </button>
            </div>
          </div>
        )}

        {/* ── ENDED ── */}
        {demoState === 'ended' && (
          <div className="theme-panel flex h-full flex-col justify-center rounded-[2rem] p-7 text-center md:p-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--brand-green-border)] bg-[var(--brand-green-bg)]">
              <svg className="h-8 w-8 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="theme-heading text-2xl font-bold">Call ended.</h3>
            <p className="theme-soft mt-1 text-sm">Hope that felt real. Here&apos;s what just happened.</p>
            <div className="theme-card mt-6 divide-y divide-[var(--border)] rounded-2xl text-left">
              {[
                { label: 'Agent', value: 'Grace' },
                { label: 'Built by', value: 'UponAI' },
                { label: 'Duration', value: formatTime(elapsed) },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-5 py-3">
                  <span className="theme-soft text-sm">{row.label}</span>
                  <span className="theme-heading text-sm font-semibold">{row.value}</span>
                </div>
              ))}
            </div>
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full rounded-full bg-[#22c55e] py-4 text-center text-base font-bold text-white shadow-[0_0_24px_rgba(34,197,94,0.3)] transition-all hover:bg-[#16a34a] hover:shadow-[0_0_32px_rgba(34,197,94,0.45)]"
            >
              Book a Demo
            </a>
            <button onClick={handleReset} className="theme-link-muted mt-4 text-sm font-medium underline underline-offset-2">
              Talk again
            </button>
          </div>
        )}
        </div>

        {/* Right column — companion */}
        <GraceCompanion demoState={demoState} />
      </div>

      <VoiceDemoModalDynamic />
    </section>
  );
}
