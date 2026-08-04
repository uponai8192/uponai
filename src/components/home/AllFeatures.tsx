import Link from 'next/link';

const columns = [
  {
    ftag: 'Build',
    title: 'Train and test',
    items: [
      'Simple training interface',
      'Multiple test playgrounds (sandbox)',
      'Integrations',
      'Version history and rollback',
      'First version in 10 minutes',
    ],
  },
  {
    ftag: 'Deploy',
    title: 'Launch anywhere',
    items: [
      'No-code builder',
      'Multi-channel: phone, chat, web, WhatsApp',
      'Custom branding (logo, domain, number)',
      '100% mobile support',
      'Human handoff and routing rules',
    ],
  },
  {
    ftag: 'Intelligence',
    title: 'Measure and improve',
    items: [
      'Transcribed call transcripts',
      'Real-time insights and reporting',
      'Multi-step complex workflows',
      'Auto lead generation',
      'CRM sync',
    ],
  },
];

export default function AllFeatures() {
  return (
    <section id="features" className="border-y border-[var(--border)] bg-[var(--surface-solid)] px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            All Features
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">The full platform, at a glance</h2>
          <p className="theme-body mt-3.5 text-[17px]">
            Everything included across building, deploying, and measuring your AI agents.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((col) => (
            <div
              key={col.ftag}
              className="theme-card rounded-[18px] p-6 transition-transform hover:-translate-y-1 hover:border-[var(--brand)]"
            >
              <span className="mb-3.5 inline-block rounded-full bg-[rgba(1,87,163,0.08)] px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
                {col.ftag}
              </span>
              <h3 className="theme-heading text-lg font-bold">{col.title}</h3>
              <ul className="mt-4">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="theme-body flex gap-2.5 border-t border-[var(--border)] py-2.5 text-[13.5px]"
                  >
                    <span className="flex-none text-[var(--brand-cool)]">◗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <Link href="/services" className="theme-secondary-button inline-flex rounded-xl px-6 py-3.5 text-[15px] font-semibold">
            Explore all features →
          </Link>
        </div>
      </div>
    </section>
  );
}
