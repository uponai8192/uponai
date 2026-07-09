import { uponaiBookingUrl } from '@/lib/booking';

const items = [
  { main: 'Your main phone number(s)', sub: 'Works with your existing lines', tag: 'Required', req: true },
  { main: 'Your most common call types', sub: 'We turn them into voice paths', tag: 'Required', req: true },
  { main: 'Your CRM or scheduling tool', sub: 'Speeds up lead sync & booking', tag: 'Optional', req: false },
  { main: 'Nothing else', sub: 'No downloads, no spreadsheets', tag: "That's it", req: false },
];

export default function GetStarted() {
  return (
    <section className="theme-section-alt border-y border-[var(--border)] px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-11 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            What You Need To Get Started
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Either path, same simple setup</h2>
          <p className="theme-soft my-5 text-base">
            No software to install, no scripts to write from scratch. Bring what you have - we map the rest with
            you.
          </p>
          <a
            href={uponaiBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="theme-primary-button inline-flex rounded-xl px-6 py-3.5 text-[15px] font-semibold"
          >
            Get a Demo · ~30 min →
          </a>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.main} className="theme-card flex items-center justify-between gap-4 rounded-[14px] px-5 py-4">
              <div>
                <p className="theme-heading text-[15px] font-semibold">{item.main}</p>
                <p className="theme-subtle mt-0.5 text-[12.5px]">{item.sub}</p>
              </div>
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[10.5px] font-[family-name:var(--font-mono)] ${
                  item.req ? 'theme-pill-accent' : 'theme-pill-primary'
                }`}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
