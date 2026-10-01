'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// The hero product walkthrough, in place of the mocked agent console. It is a
// silent 70s loop, so it autoplays muted, with the poster frame held over it
// until playback actually starts. That keeps multiple megabytes out of the
// critical path and keeps the LCP element a small image rather than a video
// frame, which matters here: this hero already cost us a measured LCP
// regression once (see the perf commits around the headline animation).
//
// The source is picked in JS rather than with <source media> because media on
// a source element is only evaluated once, when the resource is selected, so
// a window opened narrow and then widened would keep the small encode.
//
// Playback is held back entirely for reduced motion, Save-Data and slow
// connections; the poster alone is then the whole experience.
const SOURCES = {
  webm: { wide: '/videos/showcase-1600.webm', narrow: '/videos/showcase-960.webm' },
  mp4: { narrow: '/videos/showcase-960.mp4' },
};

type Connection = { saveData?: boolean; effectiveType?: string };

export default function HeroShowcase() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  // Nothing above sets this until the browser reports it is playing, so a
  // decode or network failure at any point falls back to the poster.
  const onStalled = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const slow = connection?.saveData || /2g|3g/.test(connection?.effectiveType ?? '');
    if (reduced || slow) return;

    const wide = window.matchMedia('(min-width: 768px)').matches;
    const canWebm = video.canPlayType('video/webm; codecs="vp9"') !== '';
    video.src = canWebm ? (wide ? SOURCES.webm.wide : SOURCES.webm.narrow) : SOURCES.mp4.narrow;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { rootMargin: '100px 0px' },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <div className="mt-12 flex w-full justify-center">
      {/* The footage carries a wide margin around the console, so the frame
          crops rather than letterboxes: phones crop the sides (a 16/9 frame
          375px wide leaves the UI unreadable) and every size caps its height,
          which keeps the hero close to one screen tall. Before the cap this
          pushed the hero 234px past the fold at 1280x720, against 29px for
          the console mock it replaced. */}
      {/* The height cap makes the ratio box shrink its own width, so the
          rounding and the clip live here rather than on a full-width wrapper:
          otherwise the frame keeps its corners where the video no longer
          reaches, and the video sits left of centre inside it. */}
      <div className="relative aspect-[4/3] max-h-[55svh] w-full max-w-7xl overflow-hidden rounded-2xl sm:aspect-[16/9]">
        {/* A plain img on purpose: next.config.ts sets images.unoptimized, so
            next/image would emit no srcset here and only add indirection. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/videos/showcase-poster.webp"
          alt="The UponAI console routing an inbound call to an AI voice agent"
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          onError={onStalled}
          onEmptied={onStalled}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {playing && (
          <button
            type="button"
            onClick={toggle}
            aria-label={paused ? 'Play the product walkthrough' : 'Pause the product walkthrough'}
            className="theme-menu absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full text-[var(--brand)] opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
