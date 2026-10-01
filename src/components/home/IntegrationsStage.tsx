'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PARALLAX_X, PARALLAX_Y, wirePath } from '@/lib/integration-wire';

// Interaction layer for the integrations hub. The markup is rendered on the
// server; this wrapper flags whether the section is on screen so its
// animations can pause (data-playing, see globals.css), and runs the pointer
// parallax. The pointer is eased in one loop that both sets --mx/--my for the
// tiles and re-aims every wire at its tile's shifted position, so the wires
// stay attached while the tiles move.
export function IntegrationsStage({
  hub,
  stageWidth,
  stageHeight,
  className,
  children,
}: {
  hub: { x: number; y: number };
  stageWidth: number;
  stageHeight: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.playing = entry.isIntersecting ? 'true' : 'false';
      },
      { rootMargin: '120px 0px' },
    );
    io.observe(el);

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return () => io.disconnect();

    const wires = [...el.querySelectorAll<SVGPathElement>('path[data-geo]')].map((path) => {
      const [x, y, depth, bend] = path.dataset.geo!.split(' ').map(Number);
      return { path, x, y, depth, bend };
    });

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    // Untransformed size: the band scales the scene while it arrives, and a
    // bounding rect would fold that scale into the wire maths.
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    const step = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      if (settled) {
        current.x = target.x;
        current.y = target.y;
      }

      el.style.setProperty('--mx', current.x.toFixed(4));
      el.style.setProperty('--my', current.y.toFixed(4));

      // Tile offsets are CSS px; the wires live in stage units. The wire layer
      // stretches to the stage (preserveAspectRatio none), which is no longer
      // 16/9 once pinned to the screen, so each axis gets its own scale.
      const scaleX = stageWidth / width;
      const scaleY = stageHeight / height;
      for (const w of wires) {
        const nx = w.x - current.x * w.depth * PARALLAX_X * scaleX;
        const ny = w.y - current.y * w.depth * PARALLAX_Y * scaleY;
        w.path.setAttribute('d', wirePath(hub.x, hub.y, nx, ny, w.bend));
      }

      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      width = el.offsetWidth;
      height = el.offsetHeight;
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [hub.x, hub.y, stageWidth, stageHeight]);

  return (
    <div ref={ref} data-playing="false" className={className}>
      {children}
    </div>
  );
}

// Counts up to the target the first time it scrolls into view. The figure is
// announced from a static copy that always reads the real number: the
// animating copy is hidden from assistive tech, so a screen reader or an
// in-page search never sees the "0" the animation starts from.
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setValue(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      // Waits until the figure is well up the screen: in the pinned section
      // it is still fading in lower down, and the count would play unseen.
      { threshold: 0.6, rootMargin: '0px 0px -35% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  // The final figure reserves the width so the counter cannot nudge the copy
  // under it as it grows: a 0.04 layout shift, measured, before this.
  return (
    <span className="relative inline-grid tabular-nums">
      <span aria-hidden className="invisible [grid-area:1/1]">
        {to.toLocaleString('en-US')}
        {suffix}
      </span>
      <span ref={ref} aria-hidden className="[grid-area:1/1] justify-self-center">
        {value.toLocaleString('en-US')}
        {suffix}
      </span>
      <span className="sr-only">
        {to.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  );
}
