import { uponaiBookingUrl } from '@/lib/booking';

const steps = [
  {
    n: '01',
    title: 'Train',
    body: 'Point the agent at your knowledge base, scripts, and FAQs using the training interface. No code, no scripting language.',
    time: '~10 minutes',
  },
  {
    n: '02',
    title: 'Deploy',
    body: 'Publish the same agent to phone, web chat, and WhatsApp under your own branding, numbers, and domain.',
    time: '1 click',
  },
  {
    n: '03',
    title: 'Analyze',
    body: 'Watch transcripts, insights, and captured leads flow in real time, then retrain to improve.',
    time: 'Continuous',
  },
];

export default function HowItWorksSteps() {
  return (
    <section id="how" className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            How it works
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">How it works in 3 steps</h2>
          <p className="theme-body mt-3.5 text-[17px]">
            From knowledge base to a live, measured agent across every channel.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="text-center">
              <div className="mx-auto mb-5 grid h-[68px] w-[68px] place-items-center rounded-full border-2 border-[var(--brand)] bg-[var(--surface-solid)] text-lg font-semibold text-[var(--brand)] shadow-[0_0_0_8px_rgba(1,87,163,0.07)] font-[family-name:var(--font-mono)]">
                {step.n}
              </div>
              <h3 className="theme-heading text-xl font-bold">{step.title}</h3>
              <p className="theme-body mx-auto mt-2.5 max-w-xs px-2 text-sm">{step.body}</p>
              <span className="mt-3 inline-block rounded-full bg-[rgba(1,87,163,0.08)] px-3 py-1 text-[11px] text-[var(--brand)] font-[family-name:var(--font-mono)]">
                {step.time}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a
            href={uponaiBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="theme-primary-button inline-flex rounded-xl px-6 py-3.5 text-[15px] font-semibold"
          >
            Build your first agent →
          </a>
        </div>
      </div>
    </section>
  );
}
