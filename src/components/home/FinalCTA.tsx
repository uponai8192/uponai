import Link from 'next/link';
import { uponaiBookingUrl } from '@/lib/booking';

export default function FinalCTA() {
  return (
    <section id="final" className="px-4 py-24 text-center">
      <div className="mx-auto max-w-7xl">
        <div className="theme-card-gradient relative overflow-hidden rounded-[26px] px-6 py-16 md:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[40%] -left-[6%] h-[420px] w-[420px]"
            style={{ background: 'radial-gradient(circle, rgba(1,87,163,0.12), transparent 70%)' }}
          />
          <span className="relative inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            Get started
          </span>
          <h2 className="theme-heading relative mx-auto mt-4 max-w-3xl text-3xl font-bold md:text-5xl">
            Build and deploy AI agents across every channel, in minutes, not quarters.
          </h2>
          <p className="theme-body relative mx-auto mt-5 max-w-xl text-lg">
            See how UponAI trains once, deploys everywhere, and gives you real-time visibility into every customer
            conversation.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              Get a demo →
            </a>
            <Link
              href="/contact-us-page"
              className="theme-secondary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
