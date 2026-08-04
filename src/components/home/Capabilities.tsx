import Link from 'next/link';

type StepsVisual = {
  kind: 'steps';
  head: string;
  rows: { n: string; label: string; tag: string }[];
};

type ChannelsVisual = {
  kind: 'channels';
  head: string;
  cards: { ic: string; label: string }[];
  footRow: string;
};

type IntelligenceVisual = {
  kind: 'intelligence';
  head: string;
  bars: { label: string; width: string }[];
  leadRow: { label: string; tag: string };
  footRow: { label: string; tag: string };
};

type Capability = {
  num: string;
  title: string;
  lede: string;
  benefit: string;
  feats: string[];
  reversed: boolean;
  visual: StepsVisual | ChannelsVisual | IntelligenceVisual;
};

const capabilities: Capability[] = [
  {
    num: 'Capability 01 · Build',
    title: 'An all-in-one AI voice platform',
    lede: 'Train, test, and deploy from a single place. A simple training interface and sandbox playgrounds let your team ship a working agent without waiting on engineering.',
    benefit: 'your first version is live in 10 minutes, not a quarter-long integration project.',
    feats: [
      'Simple training interface',
      'Multiple test playgrounds (sandbox)',
      'Integrations with your existing stack',
    ],
    reversed: false,
    visual: {
      kind: 'steps',
      head: 'Build & test',
      rows: [
        { n: '01', label: 'Train on your knowledge base', tag: '2 min' },
        { n: '02', label: 'Test in sandbox playground', tag: 'live' },
        { n: '03', label: 'Connect your integrations', tag: 'no-code' },
        { n: '04', label: 'Deploy to production', tag: '1 click' },
      ],
    },
  },
  {
    num: 'Capability 02 · Deploy',
    title: 'Train once, deploy everywhere',
    lede: 'The same AI agent handles phone calls, website chat, WhatsApp, and more, under your own branding, on your own domain and numbers, fully mobile.',
    benefit: 'one agent to maintain instead of three, every improvement ships to every channel at once.',
    feats: [
      'No-code builder',
      'Multi-channel: phone, chat, web, WhatsApp',
      'Custom branding: logo, domain, phone number',
      '100% mobile support',
    ],
    reversed: true,
    visual: {
      kind: 'channels',
      head: 'One agent · four surfaces',
      cards: [
        { ic: '☎', label: 'Phone' },
        { ic: '💬', label: 'Web chat' },
        { ic: '📱', label: 'WhatsApp' },
        { ic: '🌐', label: 'Website' },
      ],
      footRow: 'Single training source',
    },
  },
  {
    num: 'Capability 03 · Intelligence',
    title: 'AI intelligence into your customer service',
    lede: 'Every conversation is transcribed, analyzed, and turned into insight, so you get real-time intelligence about your operations instead of a black box.',
    benefit: "you finally see what customers ask for, where they drop off, and which leads you would have missed.",
    feats: [
      'Transcribed call transcripts and insights',
      'Multi-step complex workflows',
      'Automatic lead generation',
    ],
    reversed: false,
    visual: {
      kind: 'intelligence',
      head: 'Operations intelligence',
      bars: [
        { label: 'Resolved by agent', width: '66%' },
        { label: 'Escalated to human', width: '34%' },
      ],
      leadRow: { label: 'Leads auto-captured', tag: 'synced to CRM' },
      footRow: { label: 'Transcripts synced to CRM', tag: 'real-time' },
    },
  },
];

function CapabilityVisual({ visual }: { visual: Capability['visual'] }) {
  const head = (
    <span className="mb-1 text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
      {visual.head}
    </span>
  );

  if (visual.kind === 'steps') {
    return (
      <div
        className="theme-panel flex min-h-[290px] flex-col justify-center gap-2.5 rounded-[20px] p-[22px]"
        style={{ background: 'linear-gradient(160deg, var(--surface-gradient-start), var(--surface-gradient-end))' }}
      >
        {head}
        {visual.rows.map((row) => (
          <div
            key={row.n}
            className="theme-card flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] text-[var(--text-body)]"
          >
            <span className="text-[11px] text-[var(--brand)] font-[family-name:var(--font-mono)]">{row.n}</span>
            {row.label}
            <span className="ml-auto text-[10.5px] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
              {row.tag}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (visual.kind === 'channels') {
    return (
      <div
        className="theme-panel flex min-h-[290px] flex-col justify-center gap-2.5 rounded-[20px] p-[22px]"
        style={{ background: 'linear-gradient(160deg, var(--surface-gradient-start), var(--surface-gradient-end))' }}
      >
        {head}
        <div className="grid grid-cols-2 gap-2.5">
          {visual.cards.map((card) => (
            <div key={card.label} className="theme-card rounded-xl p-3.5 text-center">
              <div className="text-[19px]">{card.ic}</div>
              <small className="theme-body mt-1.5 block text-[11.5px]">{card.label}</small>
              <div className="mt-1 text-[9.5px] text-[var(--brand)] font-[family-name:var(--font-mono)]">● LIVE</div>
            </div>
          ))}
        </div>
        <div className="theme-card mt-0.5 flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] text-[var(--text-body)]">
          <span className="text-[11px] text-[var(--brand)] font-[family-name:var(--font-mono)]">✓</span>
          {visual.footRow}
          <span className="ml-auto text-[10.5px] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
            synced
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="theme-panel flex min-h-[290px] flex-col justify-center gap-2.5 rounded-[20px] p-[22px]"
      style={{ background: 'linear-gradient(160deg, var(--surface-gradient-start), var(--surface-gradient-end))' }}
    >
      {head}
      {visual.bars.map((bar) => (
        <div key={bar.label} className="theme-card rounded-xl p-3.5">
          <div className="mb-2 text-xs text-[var(--text-body)]">{bar.label}</div>
          <div className="h-[7px] overflow-hidden rounded-[5px] bg-[var(--section-alt)]" aria-hidden>
            <span
              className="block h-full"
              style={{ width: bar.width, background: 'linear-gradient(90deg, var(--brand), var(--brand-cool))' }}
            />
          </div>
        </div>
      ))}
      <div className="theme-card flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] text-[var(--text-body)]">
        {visual.leadRow.label}
        <span className="ml-auto text-[10.5px] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
          {visual.leadRow.tag}
        </span>
      </div>
      <div className="theme-card flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] text-[var(--text-body)]">
        <span className="text-[11px] text-[var(--brand)] font-[family-name:var(--font-mono)]">✓</span>
        {visual.footRow.label}
        <span className="ml-auto text-[10.5px] text-[var(--text-subtle)] font-[family-name:var(--font-mono)]">
          {visual.footRow.tag}
        </span>
      </div>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            Capabilities
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">
            Everything you need to run AI agents in production
          </h2>
          <p className="theme-body mt-3.5 text-[17px]">
            Three capabilities that take you from first prototype to a measured, multi-channel workforce.
          </p>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {capabilities.map((cap) => (
            <div key={cap.num} className="grid items-center gap-14 py-14 md:grid-cols-2">
              <div className={cap.reversed ? 'md:order-2' : ''}>
                <span className="block text-xs uppercase tracking-[0.16em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
                  {cap.num}
                </span>
                <h3 className="theme-heading mt-3 text-2xl font-bold md:text-[34px]">{cap.title}</h3>
                <p className="theme-body mt-3.5 text-[16.5px]">{cap.lede}</p>
                <div
                  className="mt-5 rounded-r-xl border-l-[3px] border-[var(--brand)] px-4 py-3.5 text-[14.5px] text-[var(--text-strong)]"
                  style={{
                    background: 'linear-gradient(120deg, rgba(1,87,163,0.07), rgba(224,236,247,0.5))',
                  }}
                >
                  <b className="text-[var(--brand)]">The benefit:</b> {cap.benefit}
                </div>
                <ul className="mt-5 grid gap-2.5">
                  {cap.feats.map((feat) => (
                    <li key={feat} className="theme-body flex items-start gap-2.5 text-sm">
                      <span className="flex-none font-bold text-[var(--brand)]">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--brand)] hover:gap-2.5"
                >
                  Link to feature page →
                </Link>
              </div>
              <div className={cap.reversed ? 'md:order-1' : ''}>
                <CapabilityVisual visual={cap.visual} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
