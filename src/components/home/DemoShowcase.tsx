import { uponaiBookingUrl } from '@/lib/booking';
import { defaultHomeDemo, type HomeDemoContent } from '@/lib/home-content';
import DemoVideo from './DemoVideo';

// "See it in action": the walkthrough video on a stacked pair of brand cards,
// with the pitch and a single demo CTA beside it. The back card is taller and
// narrower and sits off to the right, so the front card, which holds the
// video, reads as lifted off it. Stacks text-first on phones.
export default function DemoShowcase({ content = defaultHomeDemo }: { content?: HomeDemoContent }) {
  return (
    <section id="demo" className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div className="sd-pop relative order-2 py-[9%] lg:order-1">
          <div
            aria-hidden
            className="absolute inset-y-0 left-[22%] right-[3%] rounded-[28px] bg-gradient-to-br from-[var(--brand-cool)] to-[var(--brand)]"
          />
          <div className="relative mr-[9%] rounded-[24px] bg-gradient-to-br from-[var(--brand)] to-[#033f78] p-[4.5%] shadow-[0_30px_60px_-30px_rgba(1,40,90,0.6)] ring-1 ring-white/10">
            <DemoVideo />
          </div>
        </div>

        <div className="sd-rise order-1 lg:order-2">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            {content.eyebrow}
          </span>
          <h2 className="theme-heading mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {content.heading}
          </h2>
          <p className="theme-body mt-6 max-w-lg text-lg leading-relaxed">{content.body}</p>
          <a
            href={uponaiBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="theme-primary-button group mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold"
          >
            {content.ctaLabel}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
