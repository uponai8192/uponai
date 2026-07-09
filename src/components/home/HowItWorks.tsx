'use client';

import { useState } from 'react';

const steps = [
  {
    tab: 'Design',
    heading: 'Map how your calls actually move',
    body: 'We chart your real call journey - greet, capture, qualify, route, escalate, log - so every workflow starts from how your business operates, not a generic bot script.',
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
    body: 'Your agent goes live on the numbers you already use, with a voice and greeting that sound like your team - connected to your telecom and routing rules without operational sprawl.',
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
    body: "Every caller is greeted instantly, understood, and moved toward the right next step - a booking, an answer, or a clean transfer to the person who's the better answer.",
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
    body: 'Every conversation becomes a logged outcome - captured, transcribed, and pushed to the tools your team already uses, with post-call analysis you can act on.',
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
