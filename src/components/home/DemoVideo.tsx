'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// The agent-builder walkthrough in the "See it in action" section. It is an
// 82s silent loop (the narration is dropped in the encode), so it follows
// HeroShowcase: the poster is the first paint, the video is only fetched once
// the section is near the viewport, and it pauses whenever it scrolls away.
// Reduced motion, Save-Data and slow connections keep the poster alone.
//
// Encoded from the master in Downloads (3710x2234 at 60fps, 58MB), not kept in
// the repo. The card is about half the container wide, so the wide tier is
// 1280 for 2x screens and phones get 720; browsers without VP9 get the 960
// H.264 at either width.
const SOURCES = {
  webm: { wide: '/videos/demo-1280.webm', narrow: '/videos/demo-720.webm' },
  mp4: { wide: '/videos/demo-960.mp4', narrow: '/videos/demo-960.mp4' },
};

type Connection = { saveData?: boolean; effectiveType?: string };

export default function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  // Read by the observer, so it lives in a ref; `paused` above only drives
  // the button. A pause from the button sticks across scrolling away and back.
  const userPaused = useRef(false);
  const inView = useRef(false);

  // Nothing sets `playing` until the browser reports playback, so a failure
  // at any point shows the poster. Some browsers claim VP9 support and then
  // fail to decode it, so a failed WebM gets one retry as H.264 first.
  const onFailed = useCallback(() => {
    setPlaying(false);
    const video = ref.current;
    if (!video?.currentSrc.endsWith('.webm')) return;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    video.src = wide ? SOURCES.mp4.wide : SOURCES.mp4.narrow;
    if (inView.current && !userPaused.current) video.play().catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const slow = connection?.saveData || /2g|3g/.test(connection?.effectiveType ?? '');
    if (reduced || slow) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Picked on first approach rather than on mount, so a visitor who
          // never scrolls this far never downloads it.
          if (!video.src) {
            const wide = window.matchMedia('(min-width: 768px)').matches;
            const canWebm = video.canPlayType('video/webm; codecs="vp9"') !== '';
            const tier = canWebm ? SOURCES.webm : SOURCES.mp4;
            video.src = wide ? tier.wide : tier.narrow;
          }
          if (!userPaused.current) video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
    setPaused(userPaused.current);
  };

  return (
    <div className="relative aspect-[1280/770] w-full overflow-hidden rounded-xl bg-[#4c74e1] shadow-[0_18px_40px_-18px_rgba(2,20,60,0.55)]">
      {/* A plain img on purpose: next.config.ts sets images.unoptimized, so
          next/image would emit no srcset here and only add indirection. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/videos/demo-poster.webp"
        alt="Building an AI agent in the UponAI console"
        width={1280}
        height={770}
        loading="lazy"
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
        onError={onFailed}
        onEmptied={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          playing ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play the walkthrough' : 'Pause the walkthrough'}
          className="theme-menu absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-full text-[var(--brand)] opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
          </svg>
        </button>
      )}
    </div>
  );
}
