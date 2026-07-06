const cards = [
  {
    tag: 'Replace',
    title: 'You WITHOUT an in-house call team',
    body: 'Give every caller a fast, professional experience without hiring a front desk or paying for a traditional answering service that just takes messages.',
    items: [
      'Tired of voicemail and missed after-hours calls',
      'Paying for an answering service that only takes messages',
      'Want appointments booked, not just logged',
      'Need coverage every hour without more headcount',
      'Want leads captured and synced automatically',
    ],
    note: 'Human handoff is still available — route to your mobile anytime.',
  },
  {
    tag: 'Augment',
    title: 'You WITH an existing team',
    body: 'Bring UponAI in as overflow and after-hours backup so your people handle the conversations that need a human — and nothing else slips through.',
    items: [
      'Staff pulled off work by a ringing phone',
      'Calls dropped during surges and busy periods',
      'Want qualified calls only reaching your team',
      'Need clean escalation with full context',
      'Want every outcome tracked and reported',
    ],
    note: 'Your team stays in control — you set exactly when a person takes over.',
  },
];

export default function FitCards() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            The Right Fit
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Is UponAI right for you?</h2>
          <p className="theme-soft mt-3 text-lg">
            Built for teams that want faster call handling and cleaner conversations — whether AI handles the whole
            line or backs up the people you already have.
          </p>
        </div>
        <div className="mt-11 grid gap-5 lg:grid-cols-2">
          {cards.map((card) => (
            <div key={card.tag} className="theme-card rounded-[20px] p-8">
              <span className="mb-4 inline-block rounded-full border border-[var(--brand-primary-border)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
                {card.tag}
              </span>
              <h3 className="theme-heading text-[22px] font-semibold leading-tight">{card.title}</h3>
              <p className="theme-soft my-3 text-[14.5px]">{card.body}</p>
              <ul>
                {card.items.map((item) => (
                  <li key={item} className="theme-soft flex items-start gap-3 border-t border-[var(--border)] py-2.5 text-sm">
                    <span className="flex-none font-bold text-[var(--brand-cool)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="theme-subtle mt-4 border-t border-dashed border-[var(--border-strong)] pt-4 text-[11.5px] font-[family-name:var(--font-mono)]">
                {card.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
