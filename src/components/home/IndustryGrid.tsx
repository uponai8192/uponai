import Link from 'next/link';
import { uponaiIndustriesMenu } from '@/lib/uponai-pages';

export default function IndustryGrid() {
  return (
    <section id="industries" className="theme-section-alt border-y border-[var(--border)] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Tailored To Your World
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">
            Voice AI built for real operating environments
          </h2>
          <p className="theme-soft mt-3 text-lg">
            Each path is a productized voice experience - tuned to the calls, questions, and handoffs that define
            your industry.
          </p>
        </div>
        <div className="mt-11 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {uponaiIndustriesMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="theme-card group flex items-center justify-between rounded-[14px] p-5 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-cool)] hover:bg-[var(--surface-solid)]"
            >
              <span className="theme-heading text-base font-semibold">{item.label}</span>
              <span className="text-[var(--brand-cool)] opacity-60 transition-opacity group-hover:opacity-100 font-[family-name:var(--font-mono)]">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
