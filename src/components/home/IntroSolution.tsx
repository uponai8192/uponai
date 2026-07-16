const strip = [
  { big: '10 min', label: 'To your first working agent' },
  { big: '1 build', label: 'Deployed across every channel' },
  { big: 'Every', label: 'Conversation captured and analyzed' },
];

export default function IntroSolution() {
  return (
    <section id="solution" className="theme-section-alt border-y border-[var(--border)] px-4 py-24 text-center">
      <div className="mx-auto max-w-7xl">
        <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
          <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
          Introducing the new way · AI Agent Platform
        </span>
        <h2 className="theme-heading mx-auto mt-5 max-w-3xl text-4xl font-bold md:text-5xl">
          One platform.{' '}
          <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)] bg-clip-text text-transparent">
            Every channel.
          </span>{' '}
          Full visibility.
        </h2>
        <p className="theme-body mx-auto mt-6 max-w-2xl text-lg">
          Build and deploy AI agents across <b className="text-[var(--text-strong)]">phone, chat, and web</b> to
          augment your workforce with <b className="text-[var(--text-strong)]">visibility, speed, and scale</b>,
          trained once, live everywhere, measured in real time.
        </p>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3.5 md:grid-cols-3">
          {strip.map((cell) => (
            <div key={cell.big} className="theme-card rounded-[14px] p-5">
              <b className="block text-[22px] text-[var(--brand)] font-[family-name:var(--font-mono)]">{cell.big}</b>
              <small className="theme-body text-[12.5px]">{cell.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
