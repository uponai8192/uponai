'use client';

import { useEffect, useRef } from 'react';

// Option B for the integrations section: the stakeholder's rendered loop,
// played as-is. The headline is baked into the footage, so it is repeated
// visually hidden for crawlers and screen readers. The file only starts
// downloading once the section nears the viewport, and playback pauses when
// it leaves. Reduced motion holds the poster frame instead.
export default function IntegrationsVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Reduced motion keeps the poster frame rather than an empty band: the
    // headline only exists inside the footage, so a black box says nothing.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.preload = 'metadata';
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === 'none') {
            video.preload = 'auto';
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="integrations-video-heading" className="relative overflow-hidden bg-[#02060f]">
      <h2 id="integrations-video-heading" className="sr-only">
        1,700+ integrations. Your AI Voice. Your Apps. Connected.
      </h2>
      <video
        ref={ref}
        src="/videos/integrations-loop.mp4"
        poster="/videos/integrations-loop-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        className="mx-auto block aspect-[4/5] w-full max-w-[1920px] object-cover sm:aspect-[16/9]"
      />
    </section>
  );
}
