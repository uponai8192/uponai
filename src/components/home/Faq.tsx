import { defaultHomeFaq, type HomeFaqContent } from '@/lib/home-content';

// Native details/summary rather than React state: the answers stay in the
// markup for crawlers, keyboard and screen reader behaviour comes for free,
// and the homepage does not pick up another client component for this.
export default function Faq({ content = defaultHomeFaq }: { content?: HomeFaqContent }) {
  return (
    <section id="faq" className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="sd-cine mx-auto mb-11 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            {content.eyebrow}
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">{content.heading}</h2>
        </div>

        <div className="sd-stagger mx-auto max-w-3xl">
          {content.items.map((item) => (
            <details key={item.question} className="border-b border-[var(--border)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                <span className="theme-heading text-[17px] font-semibold md:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="faq-toggle grid h-[26px] w-[26px] flex-none place-items-center rounded-full border border-[var(--border-strong)] text-[var(--brand)]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="theme-body pb-6 pr-9 text-[15px] leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
