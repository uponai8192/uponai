'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { formatMs, formatRate, type HistoryPoint } from '@/lib/benchmarks';

// Two stacked panels on one shared time axis: P50/P95 latency above, the
// error rate below. Two measures on different scales get two charts, never
// one chart with two y-axes.

const WIDTH = 720;
const PAD_L = 52;
const PAD_R = 12;
const LAT_TOP = 26;
const LAT_H = 170;
const GAP = 34;
const ERR_H = 70;
const AXIS_H = 22;
const HEIGHT = LAT_TOP + LAT_H + GAP + ERR_H + AXIS_H;
const ERR_TOP = LAT_TOP + LAT_H + GAP;
const PLOT_W = WIDTH - PAD_L - PAD_R;

function niceMax(value: number) {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  for (const step of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (value <= step * magnitude) return step * magnitude;
  }
  return 10 * magnitude;
}

function linePath(points: Array<[number, number] | null>) {
  let d = '';
  let pen = false;
  for (const point of points) {
    if (!point) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${point[0].toFixed(1)},${point[1].toFixed(1)}`;
    pen = true;
  }
  return d;
}

export default function LatencyChart({ points, range }: { points: HistoryPoint[]; range: 'day' | 'week' }) {
  const titleId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const geometry = useMemo(() => {
    if (points.length === 0) return null;
    const t0 = points[0].t;
    const t1 = points[points.length - 1].t;
    const span = Math.max(t1 - t0, 1);
    const x = (t: number) => PAD_L + ((t - t0) / span) * PLOT_W;
    const latMax = niceMax(Math.max(...points.map((p) => Math.max(p.p50 ?? 0, p.p95 ?? 0))));
    const errMax = niceMax(Math.max(0.01, ...points.map((p) => p.errorRate ?? 0)));
    const yLat = (v: number) => LAT_TOP + LAT_H - (v / latMax) * LAT_H;
    const yErr = (v: number) => ERR_TOP + ERR_H - (v / errMax) * ERR_H;
    const barW = Math.max(1.5, Math.min(10, PLOT_W / points.length - 2));
    const tickCount = range === 'day' ? 4 : 7;
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) => t0 + (span * i) / tickCount);
    return { x, yLat, yErr, latMax, errMax, barW, ticks };
  }, [points, range]);

  if (!geometry) {
    return (
      <p className="theme-soft rounded-2xl border border-dashed border-[var(--border-strong)] px-4 py-10 text-center text-sm">
        No history has been recorded for this window yet.
      </p>
    );
  }

  const { x, yLat, yErr, latMax, errMax, barW, ticks } = geometry;
  const p50 = linePath(points.map((p) => (p.p50 === null ? null : [x(p.t), yLat(p.p50)])));
  const p95 = linePath(points.map((p) => (p.p95 === null ? null : [x(p.t), yLat(p.p95)])));
  const tickLabel = (t: number) =>
    new Date(t).toLocaleString('en-US', range === 'day'
      ? { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }
      : { month: 'short', day: 'numeric', timeZone: 'UTC' });

  function onMove(event: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * WIDTH;
    let best = 0;
    let bestDistance = Infinity;
    points.forEach((p, i) => {
      const distance = Math.abs(x(p.t) - px);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    setHover(best);
  }

  const active = hover === null ? null : points[hover];
  const activeX = active ? x(active.t) : 0;

  return (
    <figure className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full touch-none select-none"
        role="img"
        aria-labelledby={titleId}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <title id={titleId}>
          First-sentence latency (P50 and P95) and error rate over the {range === 'day' ? 'last 24 hours' : 'last 7 days'}, UTC.
        </title>

        {/* Latency panel grid and axis */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={`lat-${f}`}>
            <line x1={PAD_L} x2={WIDTH - PAD_R} y1={yLat(latMax * f)} y2={yLat(latMax * f)} stroke="var(--border)" strokeWidth={1} />
            <text x={PAD_L - 8} y={yLat(latMax * f) + 4} textAnchor="end" className="fill-[var(--text-subtle)] text-[11px] tabular-nums">
              {Math.round(latMax * f).toLocaleString('en-US')}
            </text>
          </g>
        ))}
        <text x={PAD_L} y={LAT_TOP - 12} className="fill-[var(--text-soft)] text-[12px] font-medium">
          Latency (ms)
        </text>

        {/* Error-rate panel grid and axis */}
        {[0, 0.5, 1].map((f) => (
          <g key={`err-${f}`}>
            <line x1={PAD_L} x2={WIDTH - PAD_R} y1={yErr(errMax * f)} y2={yErr(errMax * f)} stroke="var(--border)" strokeWidth={1} />
            <text x={PAD_L - 8} y={yErr(errMax * f) + 4} textAnchor="end" className="fill-[var(--text-subtle)] text-[11px] tabular-nums">
              {formatRate(errMax * f)}
            </text>
          </g>
        ))}
        <text x={PAD_L} y={ERR_TOP - 12} className="fill-[var(--text-soft)] text-[12px] font-medium">
          Error rate
        </text>

        {ticks.map((t, i) => (
          <text key={t} x={x(t)} y={HEIGHT - 6} textAnchor={i === 0 ? 'start' : i === ticks.length - 1 ? 'end' : 'middle'} className="fill-[var(--text-subtle)] text-[11px] tabular-nums">
            {tickLabel(t)}
          </text>
        ))}

        {/* Error-rate bars, rounded at the data end only via a clip-free cap */}
        {points.map((p) =>
          p.errorRate === null || p.errorRate === 0 ? null : (
            <rect
              key={`e-${p.t}`}
              x={x(p.t) - barW / 2}
              y={yErr(p.errorRate)}
              width={barW}
              height={Math.max(1, ERR_TOP + ERR_H - yErr(p.errorRate))}
              rx={Math.min(2, barW / 2)}
              fill="var(--brand-cool)"
              opacity={p.lowSamples ? 0.45 : 0.85}
            />
          ),
        )}

        <path d={p95} fill="none" stroke="var(--text-subtle)" strokeWidth={2} strokeDasharray="5 4" strokeLinejoin="round" />
        <path d={p50} fill="none" stroke="var(--brand)" strokeWidth={2} strokeLinejoin="round" />

        {active ? (
          <g pointerEvents="none">
            <line x1={activeX} x2={activeX} y1={LAT_TOP} y2={ERR_TOP + ERR_H} stroke="var(--border-strong)" strokeWidth={1} />
            {active.p95 !== null ? (
              <circle cx={activeX} cy={yLat(active.p95)} r={4} fill="var(--surface-solid)" stroke="var(--text-subtle)" strokeWidth={2} />
            ) : null}
            {active.p50 !== null ? (
              <circle
                cx={activeX}
                cy={yLat(active.p50)}
                r={4}
                fill={active.lowSamples ? 'var(--surface-solid)' : 'var(--brand)'}
                stroke={active.lowSamples ? 'var(--brand)' : 'var(--surface-solid)'}
                strokeWidth={2}
              />
            ) : null}
          </g>
        ) : null}
      </svg>

      {active ? (
        <div
          className="theme-menu pointer-events-none absolute top-2 z-10 w-48 rounded-xl px-3 py-2 text-xs"
          style={{
            left: `${(activeX / WIDTH) * 100}%`,
            transform: activeX > WIDTH * 0.6 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)',
          }}
        >
          <p className="theme-heading font-semibold">
            {new Date(active.t).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: 'UTC',
            })}{' '}
            UTC
          </p>
          <dl className="mt-1.5 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
            <dt className="theme-soft flex items-center gap-1.5">
              <span className="h-0.5 w-3 rounded bg-[var(--brand)]" /> P50
            </dt>
            <dd className="theme-heading text-right font-medium tabular-nums">{formatMs(active.p50, active.lowSamples)}</dd>
            <dt className="theme-soft flex items-center gap-1.5">
              <span className="h-0.5 w-3 rounded border-t-2 border-dashed border-[var(--text-subtle)]" /> P95
            </dt>
            <dd className="theme-heading text-right font-medium tabular-nums">{formatMs(active.p95, active.lowSamples)}</dd>
            <dt className="theme-soft flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-[var(--brand-cool)]" /> Error rate
            </dt>
            <dd className="theme-heading text-right font-medium tabular-nums">{formatRate(active.errorRate)}</dd>
          </dl>
          {active.lowSamples ? <p className="theme-subtle mt-1.5">Limited samples in this interval.</p> : null}
        </div>
      ) : null}

      <figcaption className="theme-soft mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded bg-[var(--brand)]" /> P50 latency
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 border-t-2 border-dashed border-[var(--text-subtle)]" /> P95 latency
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[var(--brand-cool)]" /> Error rate (bars)
        </span>
        <span className="theme-subtle">Faded bars and ~ values mark limited samples.</span>
      </figcaption>
    </figure>
  );
}
