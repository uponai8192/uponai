import OrchestrationPanel from '@/components/home/OrchestrationPanel';
import { uponaiBookingUrl } from '@/lib/booking';

const chips = [
  'Inbound call qualification',
  'Appointment & intake workflows',
  'Overflow & after-hours routing',
  'CRM-ready lead capture',
  'Industry-specific voice paths',
  'Human handoff when needed',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-14 md:pb-16 md:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[620px] w-[620px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--wash-1), var(--wash-2) 45%, transparent 70%)' }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            <span className="animate-brand-pulse inline-flex h-[7px] w-[7px] rounded-full bg-[var(--brand-cool)] shadow-[0_0_12px_var(--brand-cool)]" />
            AI-Powered Voice Intelligence
          </span>
          <h1 className="theme-heading mt-6 text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Answer Every Call.
            <span className="block bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] bg-clip-text text-transparent">
              Capture Every Lead.
            </span>
          </h1>
          <p className="theme-body mt-6 max-w-xl text-lg leading-8">
            UponAI builds phone and chat workflows that qualify intent, book appointments, and route live
            conversations - escalating to your team only when a person is the better answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              Get a Demo →
            </a>
            <a
              href="#tool"
              className="theme-secondary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              See it in 60 seconds
            </a>
          </div>
          <p className="theme-subtle mt-5 flex items-center gap-2 text-[12.5px] font-[family-name:var(--font-mono)]">
            <b className="font-medium text-[var(--brand-cool)]">No setup fees</b>
            · Live in days, not months · Human handoff built in
          </p>
          <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {chips.map((chip) => (
              <li key={chip} className="theme-body flex items-center gap-2.5 text-sm">
                <span
                  aria-hidden
                  className="h-4 w-4 flex-none rounded-[5px] bg-gradient-to-br from-[var(--brand-cool)] to-[var(--brand)] opacity-85"
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>
        <OrchestrationPanel />
      </div>
    </section>
  );
}
