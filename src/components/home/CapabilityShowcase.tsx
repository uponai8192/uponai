import GraceTalkButton from '@/components/grace/GraceTalkButton';

const capabilities = [
  'Qualify inbound intent', 'Book & reschedule', 'Answer FAQs', 'Route to the right person',
  'Escalate to a human', 'After-hours coverage', 'Capture & sync leads', 'Overflow handling',
];

const bigStats = [
  { b: '24/7', s: 'Always-on coverage' },
  { b: '<2s', s: 'First response' },
  { b: 'AI+Human', s: 'Handoff by design' },
  { b: '9+', s: 'Industry routes' },
];

const transcript = [
  { who: 'Caller', ai: false, text: 'Hi, I need to move my appointment to next week.' },
  { who: 'UponAI Agent', ai: true, text: 'Of course. I can see your Tuesday 2:00 PM visit. Would Wednesday at 10:00 or Thursday at 3:00 work better?' },
  { who: 'Caller', ai: false, text: 'Thursday at 3 is perfect.' },
  { who: 'UponAI Agent', ai: true, text: "Done — you're confirmed for Thursday at 3:00 PM. I've sent a text confirmation and updated your chart." },
];

export default function CapabilityShowcase() {
  return (
    <section id="showcase" className="px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Powered by UponAI Voice
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">
            Every call contains an opportunity. Our agents catch each one.
          </h2>
          <p className="theme-soft mt-3.5 text-lg">
            One conversational engine greets callers, understands intent, answers common questions, books time,
            and routes live — then logs the outcome where your team already works.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {capabilities.map((cap) => (
              <span key={cap} className="theme-card theme-body rounded-[10px] px-3.5 py-2.5 text-[13.5px]">
                <span className="text-[var(--brand-cool)]">◗ </span>
                {cap}
              </span>
            ))}
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {bigStats.map((s) => (
              <div key={s.s}>
                <b className="block text-3xl leading-none text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">{s.b}</b>
                <small className="theme-subtle text-xs">{s.s}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="theme-panel rounded-[20px] p-5">
          <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] theme-soft font-[family-name:var(--font-mono)]">
            <span>Live call · Healthcare</span>
            <span className="flex items-center gap-2 text-[var(--brand-cool)]">
              <span className="animate-brand-pulse inline-flex h-[7px] w-[7px] rounded-full bg-[var(--brand-cool)]" />
              Live
            </span>
          </div>
          {transcript.map((msg, i) => (
            <div key={i} className={`mb-3.5 max-w-[85%] ${msg.ai ? '' : 'ml-auto text-right'}`}>
              <p className="theme-subtle mb-1 text-[10.5px] tracking-[0.06em] font-[family-name:var(--font-mono)]">{msg.who}</p>
              <div
                className={`rounded-[14px] px-3.5 py-3 text-left text-sm leading-relaxed ${
                  msg.ai
                    ? 'rounded-tl-[4px] border border-[var(--brand-primary-border)] bg-[var(--brand-primary-bg)] theme-heading'
                    : 'theme-inset rounded-tr-[4px] border border-[var(--border)] theme-body'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div className="theme-pill-primary rounded-[14px] px-3.5 py-3 text-xs font-[family-name:var(--font-mono)]">
            ✓ Appointment updated · Synced to CRM · No staff needed
          </div>
          <div className="mt-5 text-center">
            <GraceTalkButton label="Talk to Grace live" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
