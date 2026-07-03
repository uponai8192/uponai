import { uponaiIndustriesMenu } from '@/lib/uponai-pages';
import { getFeaturedCities } from '@/lib/voice-ai-industries';

export default function Marquee() {
  const industries = uponaiIndustriesMenu.map((i) => i.label);
  const cities = getFeaturedCities(8).map((c) => c.name);
  const items = [...industries, ...cities];

  return (
    <div className="theme-section-alt border-y border-[var(--border)] py-10">
      <p className="theme-subtle mb-6 text-center text-[11px] uppercase tracking-[0.24em] font-[family-name:var(--font-mono)]">
        Deployed across industries & markets
      </p>
      <div className="marquee-mask flex overflow-hidden [mask:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="animate-marquee flex flex-none gap-3.5 pr-3.5">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="theme-soft whitespace-nowrap rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-[family-name:var(--font-mono)]"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
