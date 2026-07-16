const logoMarks = ['◆', '●', '▲', '■', '✦'];

export default function SocialProof() {
  return (
    <section className="theme-section-alt border-y border-[var(--border)] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-center text-sm text-[var(--text-body)]">
          Trusted by support and operations teams building their front line on{' '}
          <b className="text-[var(--text-strong)]">UponAI</b>
        </p>
        <div className="flex flex-wrap justify-center gap-x-[52px] gap-y-6">
          {logoMarks.map((mark, i) => (
            <div key={i} className="flex flex-col items-center gap-2 opacity-75 transition-opacity hover:opacity-100">
              <span
                className="grid h-11 w-11 place-items-center rounded-full text-[17px] text-[var(--text-body)]"
                style={{ background: '#D1D9E0' }}
              >
                {mark}
              </span>
              <small className="text-[10.5px] tracking-[0.1em] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
                LOGO
              </small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
