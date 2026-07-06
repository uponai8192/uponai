const cards = [
  {
    eyebrow: 'Coverage', stat: '24/7', title: 'Never miss another call',
    items: ['Always-on voice coverage on every line', 'After-hours calls answered, not lost', 'Overflow handled during surge periods'],
  },
  {
    eyebrow: 'Speed', stat: '<2s', title: 'Respond before callers hang up',
    items: ['Instant greeting on the first ring', 'Fast intent understanding', 'Faster qualification, fewer drop-offs'],
  },
  {
    eyebrow: 'Handoff', stat: '0', title: 'Zero dead ends for prospects',
    items: ['Clean transfer when a person is better', 'Full context passed to your team', 'Every outcome logged and synced'],
  },
];

export default function SuccessStats() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            What Success Looks Like
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Know exactly how you win with UponAI</h2>
          <p className="theme-soft mt-3 text-lg">
            Real operational improvements — whether you&apos;re replacing an answering service or giving your team
            overflow coverage.
          </p>
        </div>
        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.eyebrow} className="theme-card rounded-[20px] p-7 transition-colors hover:border-[var(--border-strong)]">
              <span className="theme-subtle text-[11px] uppercase tracking-[0.14em] font-[family-name:var(--font-mono)]">
                {card.eyebrow}
              </span>
              <div className="my-3 bg-gradient-to-r from-[var(--brand-cool)] to-[var(--brand)] bg-clip-text text-5xl font-semibold leading-none text-transparent font-[family-name:var(--font-mono)]">
                {card.stat}
              </div>
              <h3 className="theme-heading text-xl font-semibold">{card.title}</h3>
              <ul className="mt-4 space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="theme-soft relative pl-5 text-[13.5px]">
                    <span className="absolute left-0 text-[var(--brand-cool)]">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
