'use client';

import { useState } from 'react';
import EmailCaptureForm from '@/components/home/EmailCaptureForm';

const questions = [
  {
    label: 'Step 1',
    title: 'How many inbound calls do you get each month?',
    options: ['Under 500', '500–2,000', '2,000–10,000', '10,000+'],
  },
  {
    label: 'Step 2',
    title: "What's your industry?",
    options: ['Healthcare', 'Home Services', 'Legal', 'Other'],
  },
  {
    label: 'Step 3',
    title: 'What happens to calls after hours?',
    options: ['Voicemail', 'Answering service', 'Nothing / missed', 'Staff on-call'],
  },
] as const;

const resultBullets = [
  'An always-on AI voice agent greeting every caller in under 2 seconds.',
  "Intent qualification tuned to your industry's most common requests.",
  'Live routing to the right person — with clean escalation when it matters.',
  'Every outcome logged and CRM-ready, including after-hours calls.',
];

export default function CoverageQuiz() {
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
  const done = answers.filter(Boolean).length;
  const complete = done === 3;

  return (
    <section id="tool" className="scroll-mt-28 px-4 py-20">
      <div className="theme-card-gradient relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--border-strong)] p-7 md:p-10">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
          Free · No account required
        </span>
        <h2 className="theme-heading mb-2 mt-3.5 text-3xl font-bold md:text-4xl">
          See your call coverage gap in 60 seconds
        </h2>
        <p className="theme-soft text-base">
          Answer 3 quick questions. We&apos;ll show the voice workflow that fits your situation.
        </p>

        <div className="mt-6 flex items-center gap-3 text-xs theme-subtle font-[family-name:var(--font-mono)]">
          <span>{done} of 3 complete</span>
          <span className="theme-inset h-[5px] flex-1 overflow-hidden rounded">
            <i
              className="block h-full bg-gradient-to-r from-[var(--brand-cool)] to-[var(--brand)] transition-[width] duration-300"
              style={{ width: `${(done / 3) * 100}%` }}
            />
          </span>
          <span>Private until you share it</span>
        </div>

        {questions.map((q, qi) => (
          <div key={q.label} className="mt-6">
            <span className="theme-subtle text-[11px] uppercase tracking-[0.14em] font-[family-name:var(--font-mono)]">
              {q.label}
            </span>
            <h3 className="theme-heading mb-4 mt-1.5 text-xl font-semibold">{q.title}</h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {q.options.map((opt) => {
                const selected = answers[qi] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((prev) => prev.map((a, i) => (i === qi ? opt : a)))
                    }
                    className={`rounded-xl border px-3 py-4 text-sm font-semibold transition-colors ${
                      selected
                        ? 'border-[var(--brand-cool)] bg-[var(--brand-primary-bg)] text-[var(--brand-cool)]'
                        : 'theme-inset theme-heading border-[var(--border)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {complete ? (
          <div className="theme-inset mt-7 rounded-2xl border border-[var(--brand-cool)] p-6">
            <h3 className="text-[22px] font-bold text-[var(--brand-cool)]">
              Here&apos;s the workflow we&apos;d build for you
            </h3>
            <p className="theme-soft mt-2 text-sm">
              For a {answers[1]?.toLowerCase()} team handling {answers[0]} calls a month with &quot;
              {answers[2]}&quot; after-hours coverage, here&apos;s what we&apos;d deploy:
            </p>
            <ul className="theme-soft mt-3.5 list-disc space-y-1.5 pl-5 text-[14.5px]">
              {resultBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <EmailCaptureForm
              sourceTag="coverage-quiz"
              details={`Call volume: ${answers[0]} | Industry: ${answers[1]} | After hours: ${answers[2]}`}
              buttonLabel="Send my workflow →"
              fineprint="Used only to deliver your results. No spam, unsubscribe anytime."
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
