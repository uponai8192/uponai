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
// Encoded from the 4K master (kept in Downloads, not in the repo). The wide
// tier is 1920 because the hero dolly takes the frame to full screen, where
// the 1600 cut it replaced went soft. There is no wide H.264: at 11MB it is
// not worth carrying for the few browsers without VP9, which get the 960.
const SOURCES = {
  webm: { wide: '/videos/showcase-1920.webm', narrow: '/videos/showcase-960.webm' },
  mp4: { wide: '/videos/showcase-960.mp4', narrow: '/videos/showcase-960.mp4' },
};

type Connection = { saveData?: boolean; effectiveType?: string };

export default function HeroShowcase() {
  const ref = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  // Pointer tilt: the frame leans a few degrees toward the pointer like a
  // card in the hand, eased, and damped to nothing as the scroll dolly takes
  // the frame full screen. It writes `transform` only; the dolly animates the
  // separate translate and scale properties, so the two never collide.
  useEffect(() => {
    const frame = frameRef.current;
    const stage = frame?.closest<HTMLElement>('.hero-track');
    if (!frame || !stage) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    const step = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      const settled = Math.abs(target.x - current.x) < 0.0005 && Math.abs(target.y - current.y) < 0.0005;
      if (settled) {
        current.x = target.x;
        current.y = target.y;
      }
      // Gone by the time the dolly has the frame full screen (42svh of scroll).
      const damp = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.42));
      const rx = -current.y * 7 * damp;
      const ry = current.x * 9 * damp;
      // No transform at all when there is nothing to tilt: a perspective()
      // with zero rotations is still a 3D transform, and at the full-screen
      // hold it made the compositor resample the video through a filtered
      // surface, softening it. Clearing it leaves the video on a clean 2D
      // layer and lets the measured sharpness match the decoded frame.
      frame.style.transform =
        Math.abs(rx) < 0.01 && Math.abs(ry) < 0.01
          ? ''
          : `perspective(1400px) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      raf = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    // Wheel scrolling with a still pointer fires no pointer events, and the
    // damping has to follow the scroll, so the loop is kicked from there too.
    window.addEventListener('scroll', kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', kick);
    };
  }, []);

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
    const tier = canWebm ? SOURCES.webm : SOURCES.mp4;
    video.src = wide ? tier.wide : tier.narrow;

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
    <div className="hero-rise hero-showcase relative mt-12 flex w-full justify-center">
      {/* The frame matches the footage's own 16/9 and the media is contained,
          not cropped, so nothing is cut off or enlarged at any width. In flow
          its width stays below the container's; under the hero choreography
          it is sized from the viewport height instead so the scroll dolly can
          take it to full screen with a fixed scale (globals.css). The rounding
          and the clip live on this box so the corners follow the video. */}
      <div ref={frameRef} className="hero-frame relative aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl">
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
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
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
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
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
