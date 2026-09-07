import Link from 'next/link';
import { defaultHomeSolutions, type HomeSolutionsContent } from '@/lib/home-content';

// Card icons are design, not copy, so they stay in code and are matched to the
// CMS-managed items by position, the same way Capabilities handles its visuals.
// Keep four items so every card keeps its icon.
const icons = [
  // Microphone: voice systems
  <path
    key="mic"
    d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"
  />,
  // Speech bubble: chatbots
  <path key="chat" d="M20 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3v4l5-4h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" />,
  // Stacked routing lines: UCaaS integrations
  <path key="routes" d="M4 7h16M4 12h11M4 17h6" />,
  // Clock with a return arrow: overflow and after-hours cover
  <path key="overflow" d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1M3 4v4h4M12 8v4.4l3 1.8" />,
];

export default function Solutions({
  content = defaultHomeSolutions,
}: {
  content?: HomeSolutionsContent;
}) {
  return (
    <section id="solutions" className="theme-section-alt border-y border-[var(--border)] px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="sd-cine mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            {content.eyebrow}
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold leading-[1.15] md:text-4xl">
            {content.heading}
          </h2>
          <p className="theme-body mt-3.5 text-[17px]">{content.lede}</p>
        </div>

        <div className="sd-stagger grid gap-5 md:grid-cols-2">
          {content.items.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              className="theme-card group flex flex-col rounded-2xl p-7 transition-transform duration-150 hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="theme-pill-primary grid h-11 w-11 place-items-center rounded-xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[i % icons.length]}
                </svg>
              </span>

              <span className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
                {content.itemKicker}
              </span>
              <h3 className="theme-heading mt-2 text-xl font-bold">{item.title}</h3>
              <p className="theme-body mt-2.5 text-sm leading-relaxed">{item.body}</p>

              <span className="mt-5 text-sm font-semibold text-[var(--brand)] transition-transform duration-150 group-hover:translate-x-0.5">
                {content.ctaLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
