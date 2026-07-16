import Link from 'next/link';

const stories = [
  { av: '◆' },
  { av: '●' },
  { av: '▲' },
];

export default function CustomerStories() {
  return (
    <section className="theme-section-alt border-y border-[var(--border)] px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            Customer stories
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">What our customers say about us</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {stories.map((story, i) => (
            <div key={i} className="theme-card flex flex-col rounded-[18px] p-6">
              <div className="mb-2.5 text-[44px] leading-[0.6] text-[var(--brand)] opacity-25 font-[family-name:var(--font-display)]">
                &ldquo;
              </div>
              <p className="theme-body flex-1 text-[14.5px]">Customer story coming soon.</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-[18px]">
                <span
                  className="grid h-10 w-10 flex-none place-items-center rounded-full text-[15px] text-[var(--text-body)]"
                  style={{ background: '#D1D9E0' }}
                >
                  {story.av}
                </span>
                <span>
                  <b className="theme-heading block text-sm">[Customer name]</b>
                  <small className="text-xs text-[var(--text-subtle)]">[Title], [Company]</small>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <Link
            href="/contact-us-page"
            className="theme-secondary-button inline-flex rounded-xl px-6 py-3.5 text-[15px] font-semibold"
          >
            Read case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
