import EmailCaptureForm from '@/components/home/EmailCaptureForm';

export default function PlaybookCapture() {
  return (
    <section id="guide" className="px-4 py-20">
      <div className="theme-card-gradient relative mx-auto grid max-w-6xl items-center gap-11 overflow-hidden rounded-[26px] border border-[var(--border-strong)] p-8 md:p-12 lg:grid-cols-2">
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Free Playbook
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">Unlock the AI Voice Playbook</h2>
          <p className="theme-soft mt-3.5">
            A practical guide to mapping call flows, qualifying inbound intent, and designing clean human handoff -
            built for operations leaders across healthcare, legal, home services, and more.
          </p>
          <EmailCaptureForm
            sourceTag="voice-playbook"
            details="Requested the AI Voice Playbook from the homepage."
            buttonLabel="Send it to my inbox"
            fineprint="By entering your email you agree to our privacy policy."
          />
        </div>
        <div className="theme-inset relative z-10 rounded-2xl border border-[var(--border)] p-6">
          <span className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            2026 Edition
          </span>
          <h4 className="theme-heading my-3 text-2xl font-bold leading-tight">The AI Voice Playbook</h4>
          <div className="grid gap-2">
            <i className="block h-2 rounded bg-[var(--border-strong)]" />
            <i className="block h-2 w-4/5 rounded bg-[var(--border-strong)]" />
            <i className="block h-2 w-3/5 rounded bg-[var(--border-strong)]" />
          </div>
          <div aria-hidden className="mt-5 flex h-10 items-end gap-[3px]">
            {[40, 65, 30, 80, 55, 70, 45, 90, 35, 60, 75, 50, 85, 40, 65, 55].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] opacity-70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
