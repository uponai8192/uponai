'use client';

import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { uponaiBookingUrl } from '@/lib/booking';
import { defaultHomeHero, type HomeHeroContent } from '@/lib/home-content';
import HeroShowcase from './HeroShowcase';

function scrollToSolution() {
  document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
}

export default function PlatformHero({ content = defaultHomeHero }: { content?: HomeHeroContent }) {
  // Tolerates stray or doubled spaces from a CMS editor: empty words would
  // otherwise render blank spans and push the accent's delay out.
  const words = useMemo(() => content.headline.split(/\s+/).filter(Boolean), [content.headline]);

  // The headline shine and the aurora repaint for as long as they run, so
  // they only run while the hero is actually on screen.
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.active = entry.isIntersecting ? 'on' : 'off';
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // On large screens the hero is a scroll track with its stage pinned: as
    // the visitor starts to scroll, the walkthrough grows toward the camera
    // until it fills the screen while the copy lifts away, then it keeps
    // growing past the camera and dissolves into the switchboard (globals.css,
    // "Hero choreography"). Everywhere else it is a plain hero in flow.
    <section ref={sectionRef} className="hero-track relative">
      <div className="hero-pin relative overflow-clip px-4 pb-14 pt-16 md:pt-20">
        {/* Aurora: three soft colour fields drifting slowly behind the copy. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="hero-aurora" style={{ '--a': 'var(--wash-1)', '--x': '70%', '--y': '10%', '--t': '26s' } as CSSProperties} />
          <span className="hero-aurora" style={{ '--a': 'var(--wash-2)', '--x': '15%', '--y': '35%', '--t': '34s', '--delay': '-11s' } as CSSProperties} />
          <span className="hero-aurora" style={{ '--a': 'var(--brand-accent-bg)', '--x': '55%', '--y': '70%', '--t': '30s', '--delay': '-19s' } as CSSProperties} />
        </div>
      <div className="hero-inner relative mx-auto max-w-7xl">
        {/* Centred tagline and calls to action */}
        <div className="hero-copy relative mx-auto max-w-4xl text-center">
          {/* Entrance: the plain words rise in one by one, then the accent
              lands as a unit, draws its waveform underline and keeps a slow
              shine running (globals.css, "Hero headline"). The accent stays
              one span so the gradient runs unbroken across it. */}
          <h1 className="theme-heading text-5xl font-extrabold leading-[1.04] md:text-6xl">
            {words.map((word, i) => (
              <span key={i}>
                <span className="hero-word" style={{ '--i': i } as CSSProperties}>
                  {word}
                </span>{' '}
              </span>
            ))}
            <span
              className="hero-word hero-accent relative"
              style={{ '--i': words.length } as CSSProperties}
            >
              <span className="hero-shine">{content.headlineAccent}</span>
              <svg
                aria-hidden
                viewBox="0 0 400 16"
                preserveAspectRatio="none"
                className="hero-wave pointer-events-none absolute -bottom-2 left-0 h-3 w-full md:-bottom-3"
                fill="none"
              >
                <path
                  pathLength={1}
                  d="M2 8 C 22 8 22 3 32 3 S 42 13 52 13 S 62 2 72 2 S 82 14 92 14 S 102 4 112 4 S 122 11 132 11 S 142 6 152 6 S 162 9 172 9 C 190 9 210 8 230 8 C 250 8 252 5 262 5 S 272 12 282 12 S 292 3 302 3 S 312 13 322 13 S 332 5 342 5 S 352 10 362 10 S 380 8 398 8"
                />
              </svg>
            </span>
          </h1>
          <div className="hero-fade mt-8 flex flex-wrap justify-center gap-3" style={{ '--delay': '0.32s' } as CSSProperties}>
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button hero-cta rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              {content.primaryCtaLabel}
            </a>
            <button
              type="button"
              onClick={scrollToSolution}
              className="theme-secondary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold"
            >
              {content.secondaryCtaLabel}
            </button>
          </div>
          <p
            className="hero-fade hero-footnote theme-subtle mt-5 text-[12.5px] font-[family-name:var(--font-mono)]"
            style={{ '--delay': '0.4s' } as CSSProperties}
          >
            <b className="font-medium text-[var(--brand)]">{content.footnoteStrong}</b>
            {content.footnoteRest}
          </p>
        </div>

        <HeroShowcase />
      </div>
      </div>
    </section>
  );
}
