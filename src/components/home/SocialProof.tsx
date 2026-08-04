import Link from 'next/link';
import AgentAvatar from '@/components/voice/AgentAvatar';

type Vertical = {
  label: string;
  href: string;
  /** Vertical key, which is also the agent whose portrait is shown. */
  agentKey: string;
  agentName: string;
};

// Each vertical points at the page that already covers it, and shows the agent
// you would actually talk to there, so the face is consistent across the site.
const verticals: Vertical[] = [
  { label: 'Healthcare', href: '/voice-ai-for-healthcare-page', agentKey: 'healthcare', agentName: 'Aria' },
  { label: 'Financial Services', href: '/industries/financial-services', agentKey: 'financial-services', agentName: 'Maxwell' },
  { label: 'Legal', href: '/voice-ai-for-legal-services', agentKey: 'legal', agentName: 'Lex' },
  { label: 'Retail & E-Commerce', href: '/industries/retail', agentKey: 'retail', agentName: 'Sage' },
  { label: 'Hospitality & Travel', href: '/industries/hotels-hospitality', agentKey: 'hospitality', agentName: 'Maren' },
  { label: 'Education', href: '/industries/education', agentKey: 'education', agentName: 'Nova' },
  { label: 'Government', href: '/industries/government', agentKey: 'government', agentName: 'Max' },
];

export default function SocialProof() {
  return (
    <section className="theme-section-alt border-y border-[var(--border)] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-center text-sm text-[var(--text-body)]">
          Trusted by support and operations teams building their front line on{' '}
          <b className="text-[var(--text-strong)]">UponAI</b>
        </p>
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-7">
          {verticals.map((vertical) => (
            <li key={vertical.href}>
              <Link
                href={vertical.href}
                className="group flex w-[104px] flex-col items-center gap-2.5 text-center"
              >
                <span className="overflow-hidden rounded-full border border-[var(--border-strong)] shadow-[0_6px_18px_rgba(1,87,163,0.10)] transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--brand)] group-hover:shadow-[0_10px_24px_rgba(1,87,163,0.18)]">
                  <AgentAvatar agentKey={vertical.agentKey} name={vertical.agentName} size={56} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[12px] font-semibold text-[var(--text-strong)] transition-colors group-hover:text-[var(--brand)]">
                    {vertical.agentName}
                  </span>
                  <span className="mt-0.5 text-[11px] text-[var(--text-subtle)]">{vertical.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
