import Link from 'next/link';

type Vertical = {
  label: string;
  href: string;
  icon: 'healthcare' | 'financial' | 'legal' | 'retail' | 'hospitality' | 'education' | 'government';
};

// Each vertical points at the page that already covers it. Healthcare and legal
// use the richer voice-AI pages; the rest use their /industries entries.
const verticals: Vertical[] = [
  { label: 'Healthcare', href: '/voice-ai-for-healthcare-page', icon: 'healthcare' },
  { label: 'Financial Services', href: '/industries/financial-services', icon: 'financial' },
  { label: 'Legal', href: '/voice-ai-for-legal-services', icon: 'legal' },
  { label: 'Retail & E-Commerce', href: '/industries/retail', icon: 'retail' },
  { label: 'Hospitality & Travel', href: '/industries/hotels-hospitality', icon: 'hospitality' },
  { label: 'Education', href: '/industries/education', icon: 'education' },
  { label: 'Government', href: '/industries/government', icon: 'government' },
];

const iconPaths: Record<Vertical['icon'], React.ReactNode> = {
  healthcare: (
    <>
      <path d="M12 20.6s-6.6-4.3-6.6-8.9a3.9 3.9 0 0 1 6.6-2.8 3.9 3.9 0 0 1 6.6 2.8c0 4.6-6.6 8.9-6.6 8.9Z" />
      <path d="M5.8 12.4h2.9l1.2-2 1.9 3.7 1.3-2.6h3.4" />
    </>
  ),
  financial: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-4.5M12 20v-8M17 20v-11" />
    </>
  ),
  legal: (
    <>
      <path d="M4 8h16M12 8v11M8.5 19.2h7" />
      <path d="M4 8 1.9 12.3a2.5 2.5 0 0 0 4.2 0L4 8Z" />
      <path d="M20 8l-2.1 4.3a2.5 2.5 0 0 0 4.2 0L20 8Z" />
      <path d="M12 8V5.4" />
    </>
  ),
  retail: (
    <>
      <path d="M6.2 8.4h11.6l-1 11.2H7.2L6.2 8.4Z" />
      <path d="M9.6 8.4V6.9a2.4 2.4 0 0 1 4.8 0v1.5" />
    </>
  ),
  hospitality: (
    <>
      <path d="M4.2 17.2a7.8 7.8 0 0 1 15.6 0" />
      <path d="M2.8 17.4h18.4" />
      <path d="M12 9.4V7.6" />
      <circle cx="12" cy="6.3" r="1.1" />
    </>
  ),
  education: (
    <>
      <path d="M2.6 9.6 12 5.2l9.4 4.4L12 14 2.6 9.6Z" />
      <path d="M6.6 11.6v4.1c0 1.5 2.4 2.7 5.4 2.7s5.4-1.2 5.4-2.7v-4.1" />
      <path d="M21.4 9.6v4.2" />
    </>
  ),
  government: (
    <>
      <path d="M3.2 9.6 12 5.2l8.8 4.4H3.2Z" />
      <path d="M6.4 12v5.2M10.1 12v5.2M13.9 12v5.2M17.6 12v5.2" />
      <path d="M4.6 17.4h14.8M3.4 20h17.2" />
    </>
  ),
};

function VerticalAvatar({ icon }: { icon: Vertical['icon'] }) {
  return (
    <span
      aria-hidden
      className="grid h-14 w-14 place-items-center rounded-full border border-[var(--border-strong)] text-[var(--brand)] shadow-[0_6px_18px_rgba(1,87,163,0.10)] transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--brand)] group-hover:shadow-[0_10px_24px_rgba(1,87,163,0.18)]"
      style={{ background: 'linear-gradient(160deg, var(--surface-solid), var(--section-alt))' }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {iconPaths[icon]}
      </svg>
    </span>
  );
}

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
                <VerticalAvatar icon={vertical.icon} />
                <span className="text-[11.5px] font-semibold leading-tight text-[var(--text-body)] transition-colors group-hover:text-[var(--brand)]">
                  {vertical.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
