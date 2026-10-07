import Image from 'next/image';
import Link from 'next/link';
import { defaultHomeCapabilities, type HomeCapabilitiesContent } from '@/lib/home-content';

// Product screenshot next to each capability. Design, not copy: stays in code
// and is matched to CMS-managed capability items by position. Agent ids and
// phone numbers are blurred in the exported files.
const capabilityShots = [
  { src: '/site-photos/capabilities/capability-01.webp', width: 1779, height: 754, alt: 'UponAI agent builder with model, voice, language, and prompt settings' },
  { src: '/site-photos/capabilities/capability-02.webp', width: 1087, height: 467, alt: 'UponAI VoIP administration listing phone numbers, carriers, and assigned agents' },
  { src: '/site-photos/capabilities/capability-03.webp', width: 568, height: 511, alt: 'UponAI call detail with recording, AI summary, and transcript' },
];

function CapabilityShot({ shot }: { shot: (typeof capabilityShots)[number] }) {
  return (
    <div className="theme-panel overflow-hidden rounded-[20px] p-2">
      <Image
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={shot.alt}
        sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
        className="block h-auto w-full rounded-[14px]"
      />
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
        <div className="sd-cine mx-auto mb-12 max-w-3xl text-center">
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
              {/* Text and visual slide in from their own sides, so alternating
                  rows sweep in from alternating directions. */}
              <div className={i % 2 === 1 ? 'sd-right md:order-2' : 'sd-left'}>
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
              <div className={i % 2 === 1 ? 'sd-left md:order-1' : 'sd-right'}>
                <CapabilityShot shot={capabilityShots[i % capabilityShots.length]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
