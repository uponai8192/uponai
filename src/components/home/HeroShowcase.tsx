'use client';

import { useEffect, useRef } from 'react';
import HeroConsole from './HeroConsole';

// The hero product shot: a scripted tour of the UponAI Admin, drawn in the
// page rather than played from a video. It is text and a few hundred
// small boxes, so there is nothing heavy on the critical path, it stays sharp
// when the scroll dolly takes it full screen, and it follows the site theme.
// The walkthrough recording it replaced is still in public/videos.

export default function HeroShowcase() {
  const frameRef = useRef<HTMLDivElement>(null);

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
      // No transform at all when there is nothing to tilt, so at the
      // full-screen hold the console sits on a clean 2D layer.
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

  return (
    <div className="hero-rise hero-showcase relative mt-12 flex w-full justify-center">
      {/* 16/9 to match the console canvas (and the dolly's full-screen box);
          phones get a portrait canvas without the side panels. The rounding
          and the clip live on this box so the corners follow the dolly. */}
      <div
        ref={frameRef}
        className="hero-frame relative aspect-[4/5] w-full max-w-5xl overflow-hidden rounded-2xl bg-[var(--surface-solid)] shadow-[0_0_0_1px_var(--border),0_24px_60px_-24px_rgba(var(--shadow-rgb),0.35)] md:aspect-[16/9]"
      >
        <HeroConsole />
      </div>
    </div>
  );
}
