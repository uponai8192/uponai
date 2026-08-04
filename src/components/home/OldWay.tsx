const oldNodes = [
  { ic: '☎', label: 'Phone system', tag: 'siloed' },
  { ic: '💬', label: 'Web chat vendor', tag: 'separate' },
  { ic: '📱', label: 'WhatsApp', tag: 'unmanaged' },
  { ic: '📊', label: 'Reporting', tag: 'manual' },
];

const problems = [
  {
    n: '01',
    title: 'Every channel is a separate build',
    body: 'You rebuild the same logic three times, once for the phone line, once for web chat, once for messaging. Every change means shipping it everywhere, again.',
  },
  {
    n: '02',
    title: 'No visibility into what is actually happening',
    body: 'Conversations end and the insight leaves with them. No transcripts, no trends, no way to see where customers drop off or which requests keep coming back.',
  },
];

export default function OldWay() {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-11">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--text-body)] font-[family-name:var(--font-mono)]"
            style={{ background: '#D1D9E0' }}
          >
            The old way
          </span>
          <h2 className="theme-heading text-3xl font-bold md:text-4xl">
            Your channels do not talk. Neither does your data.
          </h2>
        </div>

        <div className="grid items-center gap-[52px] md:grid-cols-[0.95fr_1.05fr]">
          {/* Old, desaturated stack */}
          <div
            className="rounded-[20px] border border-[#D1D9E0] p-6"
            style={{ background: 'linear-gradient(165deg, #F2F3F5, #E4E7EA)', filter: 'saturate(0.35)' }}
          >
            {oldNodes.map((node) => (
              <div
                key={node.label}
                className="mb-2.5 flex items-center gap-3 rounded-xl border border-dashed border-[#B9C0C7] bg-white px-4 py-3 text-[13.5px] text-[var(--text-body)] last:mb-0"
              >
                <span
                  className="grid h-[26px] w-[26px] place-items-center rounded-[7px] text-xs"
                  style={{ background: '#D1D9E0' }}
                >
                  {node.ic}
                </span>
                {node.label}
                <span className="ml-auto text-[11px] text-[#9AA1A9] font-[family-name:var(--font-mono)]">
                  {node.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Numbered problems */}
          <div>
            {problems.map((problem, i) => (
              <div
                key={problem.n}
                className={`border-t border-[var(--border)] py-[22px] ${i === problems.length - 1 ? 'border-b' : ''}`}
              >
                <h3 className="theme-heading flex items-center gap-3 text-lg font-bold">
                  <span className="text-xs font-medium text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
                    {problem.n}
                  </span>
                  {problem.title}
                </h3>
                <p className="theme-body mt-2 pl-9 text-sm leading-relaxed">{problem.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
