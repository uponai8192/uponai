import type { CSSProperties } from 'react';
import Image from 'next/image';
import { uponaiBookingUrl } from '@/lib/booking';
import { INTEGRATION_HUB, integrations, type Integration } from '@/lib/integrations';
import { wireBend, wirePath } from '@/lib/integration-wire';
import { CountUp, IntegrationsStage } from './IntegrationsStage';

// Copy stays here until the stakeholder settles on this section; it moves to
// home-content.ts and the CMS once it is final.
const copy = {
  count: 1700,
  label: 'Integrations',
  tagline: 'Your AI Voice. Your Apps. Connected.',
  lede: 'Book appointments, update the CRM, open tickets and take payments mid-call. UponAI agents plug into the tools your team already runs on.',
  ctaLabel: 'Get a Demo',
};

const STAGE_W = 1600;
const STAGE_H = 900;

// Icon id for the shared <defs> sprite: each brand path is defined once per
// document and referenced by every tile that draws it, instead of being
// inlined again in the desktop stage and both marquee rows.
const iconId = (name: string) => `integ-icon-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

function IconSprite() {
  return (
    <svg aria-hidden className="absolute h-0 w-0" focusable="false">
      <defs>
        {integrations.map((item) =>
          item.path ? (
            <symbol key={item.name} id={iconId(item.name)} viewBox="0 0 24 24">
              <path d={item.path} />
            </symbol>
          ) : null,
        )}
      </defs>
    </svg>
  );
}

function Tile({ item }: { item: Integration }) {
  return (
    <span className="integ-tile">
      {item.path ? (
        <svg className="h-[52%] w-[52%]" fill={item.color} aria-hidden>
          <use href={`#${iconId(item.name)}`} />
        </svg>
      ) : (
        <span
          className="font-bold leading-none tracking-tight"
          style={{ color: item.color, fontSize: item.mark!.length > 2 ? '0.95em' : '1.15em' }}
        >
          {item.mark}
        </span>
      )}
    </span>
  );
}

// Lights a tile's connection line while the tile is hovered. Only wired tiles
// have a line, so only they get a rule.
const wireHoverCss = integrations
  .map((item, i) => (item.wired ? i : -1))
  .filter((i) => i >= 0)
  .map(
    (i) =>
      `.integ-stage:has([data-node="${i}"]:hover) [data-wire="${i}"]{stroke:rgba(143,208,255,.75);stroke-width:1.5}`,
  )
  .join('');

export default function IntegrationsHub() {
  const half = Math.ceil(integrations.length / 2);
  const rows = [integrations.slice(0, half), integrations.slice(half)];

  return (
    // On large screens the section is a scroll track taller than the screen,
    // with the scene pinned inside it: the band grows from a card into a full
    // page as the track arrives, holds while you read it, then fades to the
    // page background on the way out (globals.css, "Scroll choreography").
    // The pin and the track height live in that CSS too, behind the same
    // support and reduced-motion gate as the animation, so nobody gets a
    // pinned hold without the motion that justifies it. Everywhere else the
    // band sits in the page with feathered edges.
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="integ-track relative"
    >
      <style>{wireHoverCss}</style>
      <IconSprite />

      <div className="integ-pin relative">
        {/* The band clips the whole scene, so while it grows in from a card
            the tiles arrive inside it rather than over the page around it. */}
        <div className="integ-band integ-woosh relative h-full overflow-hidden">
          <div className="integ-content relative flex h-full items-center px-4 py-16 md:px-6 md:py-8">
            <IntegrationsStage
              hub={INTEGRATION_HUB}
              stageWidth={STAGE_W}
              stageHeight={STAGE_H}
              className="integ-stage relative mx-auto w-full max-w-[1500px] md:h-[min(56.25vw,844px)] md:min-h-[700px] md:[container-type:inline-size]">
              {/* Wires and tiles: desktop only, decorative. The names are listed
                  for assistive tech below. */}
              <div aria-hidden className="integ-tiles absolute inset-0 hidden md:block">
                <svg
                  viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                >
                  {integrations.map((item, i) => {
                    if (!item.wired) return null;
                    const bend = wireBend(item.x, INTEGRATION_HUB.x, item.delay);
                    const d = wirePath(INTEGRATION_HUB.x, INTEGRATION_HUB.y, item.x, item.y, bend);
                    // data-geo lets IntegrationsStage re-aim the curve at the tile
                    // as it moves with the pointer.
                    const geo = `${item.x} ${item.y} ${item.depth} ${bend}`;
                    return (
                      <g key={item.name}>
                        <path data-wire={i} data-geo={geo} className="integ-wire" d={d} />
                        <path
                          data-geo={geo}
                          className="integ-pulse"
                          data-dir={i % 2 ? 'in' : 'out'}
                          pathLength={100}
                          style={{ animationDelay: `${-item.delay * 0.6}s` }}
                          d={d}
                        />
                      </g>
                    );
                  })}
                </svg>

                {integrations.map((item, i) => (
                  <span
                    key={item.name}
                    data-node={i}
                    className="integ-node"
                    style={
                      {
                        left: `${(item.x / STAGE_W) * 100}%`,
                        top: `${(item.y / STAGE_H) * 100}%`,
                        width: `${(34 + item.depth * 26) / 16}cqw`,
                        height: `${(34 + item.depth * 26) / 16}cqw`,
                        fontSize: `${(34 + item.depth * 26) / 16 / 2.6}cqw`,
                        '--d': item.depth,
                        '--delay': item.delay,
                      } as CSSProperties
                    }
                  >
                    <Tile item={item} />
                    <span className="integ-label">{item.name}</span>
                  </span>
                ))}
              </div>

              {/* Headline. In flow on mobile; pinned under the hub point on desktop. */}
              <div
                className="integ-headline relative z-10 flex flex-col items-center text-center md:absolute md:left-1/2 md:w-[62cqw] md:top-[44.444%] lg:w-[46cqw] md:-translate-x-1/2 md:-translate-y-[24px]"
              >
                <span className="relative grid place-items-center">
                  <span aria-hidden className="integ-halo absolute inset-0 rounded-full bg-[#4da3e8]/35" />
                  {/* logo.png is a 1024 square with the mark in its middle 38%, so
                      the image box is oversized and clipped by the pill. */}
                  <span className="relative grid h-12 w-32 place-items-center overflow-hidden rounded-full bg-white shadow-[0_0_40px_rgba(77,163,232,0.55)]">
                    <Image src="/logo.png" alt="UponAI" width={150} height={150} className="absolute h-[150px] w-[150px] max-w-none" />
                  </span>
                </span>

                <h2 id="integrations-heading" className="mt-7 flex flex-col items-center">
                  <span className="text-6xl font-bold leading-none tracking-tight md:text-[min(7cqw,6.5rem,11svh)]">
                    <CountUp to={copy.count} suffix="+" />
                  </span>
                  <span className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#b9d4f5] font-[family-name:var(--font-mono)] md:text-base">
                    {' '}
                    {copy.label}
                  </span>
                </h2>
                <p className="mt-4 text-base font-medium text-[#d6e3f7] md:text-lg">{copy.tagline}</p>
                <p className="integ-lede mt-2 max-w-md text-sm leading-relaxed text-[#8ea3c2]">{copy.lede}</p>
                <a
                  href={uponaiBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 rounded-full bg-[#1668b5] px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(77,163,232,0.8)] transition-colors hover:bg-[#2e7cc4]"
                >
                  {copy.ctaLabel}
                </a>
              </div>

              {/* Mobile: the tiles run past in two rows instead of a scatter. */}
              <div
                aria-hidden
                className="mt-12 space-y-4 md:hidden"
                style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
              >
                {rows.map((row, r) => (
                  <div key={r} className="flex overflow-hidden">
                    <div
                      className="animate-marquee flex w-max gap-4 pr-4"
                      style={r ? { animationDirection: 'reverse', animationDuration: '40s' } : undefined}
                    >
                      {[...row, ...row].map((item, i) => (
                        <span key={i} className="block h-14 w-14 text-[20px]" style={{ '--d': 1, '--delay': item.delay } as CSSProperties}>
                          <Tile item={item} />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </IntegrationsStage>
          </div>
        </div>
      </div>

      <ul aria-label="Integrations UponAI connects to" className="sr-only">
        {integrations.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </section>
  );
}
