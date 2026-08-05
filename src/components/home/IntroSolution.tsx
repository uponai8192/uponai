import { defaultHomeIntro, type HomeIntroContent } from '@/lib/home-content';

export default function IntroSolution({ content = defaultHomeIntro }: { content?: HomeIntroContent }) {
  return (
    <section id="solution" className="theme-section-alt border-y border-[var(--border)] px-4 py-24 text-center">
      <div className="mx-auto max-w-7xl">
        <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
          <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
          {content.eyebrow}
        </span>
        <h2 className="theme-heading mx-auto mt-5 max-w-3xl text-4xl font-bold md:text-5xl">
          {content.headingStart}{' '}
          <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)] bg-clip-text text-transparent">
            {content.headingAccent}
          </span>{' '}
          {content.headingEnd}
        </h2>
        <p className="theme-body mx-auto mt-6 max-w-2xl text-lg">
          {content.ledeStart}
          <b className="text-[var(--text-strong)]">{content.ledeBold1}</b>
          {content.ledeMiddle}
          <b className="text-[var(--text-strong)]">{content.ledeBold2}</b>
          {content.ledeEnd}
        </p>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3.5 md:grid-cols-3">
          {content.stats.map((cell) => (
            <div key={cell.value} className="theme-card rounded-[14px] p-5">
              <b className="block text-[22px] text-[var(--brand)] font-[family-name:var(--font-mono)]">{cell.value}</b>
              <small className="theme-body text-[12.5px]">{cell.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
