// src/components/sections/GraceCompanion.tsx
'use client';

import type { DemoState } from './LiveVoiceDemo';

const samplePrompts = [
  'What services do you offer?',
  'What are your hours?',
  'Can I book an appointment?',
  'Can you text me the details?',
  'Transfer me to someone?',
];

const recapItems = [
  'Answered in real time',
  'Offered to book',
  'Ready to route to your team',
];

function QuoteIcon() {
  return (
    <svg className="h-4 w-4 flex-shrink-0 text-[#1e78cc]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A3.67 3.67 0 0 1 9.17 7.5V6h-2zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83H15.5A3.67 3.67 0 0 1 19.17 7.5V6h-2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 flex-shrink-0 text-[#1e78cc]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function GraceCompanion({ demoState }: { demoState: DemoState }) {
  const isCalling = demoState === 'calling';

  if (demoState === 'ended') {
    return (
      <div className="theme-panel flex h-full flex-col rounded-[2rem] p-7 md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e78cc]">Recap</p>
        <h3 className="theme-heading mt-2 text-xl font-semibold">What Grace just did</h3>
        <div className="mt-6 flex flex-col gap-3">
          {recapItems.map((item, i) => (
            <div
              key={item}
              className="theme-card flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ animation: `row-in 0.5s ease-out ${i * 0.1}s both` }}
            >
              <CheckIcon />
              <span className="theme-body text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="theme-subtle mt-auto border-t border-[var(--border)] pt-5 text-xs leading-relaxed">
          That&apos;s a fraction of what she handles on live calls.
        </p>
      </div>
    );
  }

  return (
    <div className="theme-panel flex h-full flex-col rounded-[2rem] p-7 md:p-9">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1e78cc]">
          {isCalling && (
            <span className="h-1.5 w-1.5 rounded-full bg-[#1e78cc]" style={{ animation: 'pulse 1s infinite' }} />
          )}
          {isCalling ? 'Say something' : 'Try asking'}
        </p>
        <svg className="h-4 w-4 theme-subtle" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m-9 6 3.5-2.5A2 2 0 0 1 12.7 17H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v13z" />
        </svg>
      </div>
      <p className="theme-soft mt-2 text-sm">
        {isCalling ? 'Grace is listening - say one of these.' : 'Not sure what to say? Try one of these.'}
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        {samplePrompts.map((prompt, i) => (
          <div
            key={prompt}
            className="theme-card group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 hover:border-[#1e78cc]/40 hover:-translate-y-0.5"
            style={
              isCalling
                ? { animation: `row-pulse 2s ease-in-out ${i * 0.18}s infinite` }
                : { animation: `row-in 0.5s ease-out ${i * 0.08}s both` }
            }
          >
            <QuoteIcon />
            <span className="theme-body text-sm">{prompt}</span>
          </div>
        ))}
      </div>

      <p className="theme-subtle mt-auto border-t border-[var(--border)] pt-5 text-xs leading-relaxed">
        {isCalling
          ? 'She answers in real time, books, and hands off when it matters.'
          : 'Grace replies in real time, books, and hands off when it matters.'}
      </p>
    </div>
  );
}
