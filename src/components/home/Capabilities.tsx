import Link from 'next/link';
import { defaultHomeCapabilities, type HomeCapabilitiesContent } from '@/lib/home-content';

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

type CapabilityVisualData = StepsVisual | ChannelsVisual | IntelligenceVisual;

// Decorative panel next to each capability. Design, not copy: stays in code
// and is matched to CMS-managed capability items by position.
const capabilityVisuals: CapabilityVisualData[] = [
  {
    kind: 'steps',
    head: 'Build & test',
    rows: [
      { n: '01', label: 'Train on your knowledge base', tag: '2 min' },
      { n: '02', label: 'Test in sandbox playground', tag: 'live' },
      { n: '03', label: 'Connect your integrations', tag: 'no-code' },
      { n: '04', label: 'Deploy to production', tag: '1 click' },
    ],
  },
  {
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
  {
    kind: 'intelligence',
    head: 'Operations intelligence',
    bars: [
      { label: 'Resolved by agent', width: '66%' },
      { label: 'Escalated to human', width: '34%' },
    ],
    leadRow: { label: 'Leads auto-captured', tag: 'synced to CRM' },
    footRow: { label: 'Transcripts synced to CRM', tag: 'real-time' },
  },
];

function CapabilityVisual({ visual }: { visual: CapabilityVisualData }) {
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

export default function Capabilities({
  content = defaultHomeCapabilities,
}: {
  content?: HomeCapabilitiesContent;
}) {
  return (
    <section id="capabilities" className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            {content.eyebrow}
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">{content.heading}</h2>
          <p className="theme-body mt-3.5 text-[17px]">{content.sub}</p>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {content.items.map((cap, i) => (
            <div key={cap.kicker} className="grid items-center gap-14 py-14 md:grid-cols-2">
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <span className="block text-xs uppercase tracking-[0.16em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
                  {cap.kicker}
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
                  {cap.features.map((feat) => (
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
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <CapabilityVisual visual={capabilityVisuals[i % capabilityVisuals.length]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
