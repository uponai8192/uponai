'use client';

import { useMemo, useState } from 'react';
import {
  PROVIDERS,
  PROVIDER_COLOR_VAR,
  formatMs,
  formatPercent,
  reasoningLabel,
  type BenchmarkModel,
} from '@/lib/benchmarks';

const W = 1100;
const H = 460;
const PAD = { top: 24, right: 32, bottom: 52, left: 76 };
const LATENCY_TICKS = [200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000];

type Point = { model: BenchmarkModel; x: number; y: number; latency: number; score: number };
// A narrow latency range can fall between two fixed ticks; fall back to the
// range ends so the axis is never unlabelled.
function xTicks(lo: number, hi: number): number[] {
  const inside = LATENCY_TICKS.filter((t) => Math.log(t) >= lo && Math.log(t) <= hi);
  return inside.length >= 2 ? inside : [Math.ceil(Math.exp(lo) / 10) * 10, Math.floor(Math.exp(hi) / 10) * 10];
}

type Label = { id: string; text: string; x: number; y: number; anchor: 'start' | 'end' };

// Greedy placement for the frontier labels: try a few spots around each dot
// and drop the label rather than let it collide with one already placed.
function placeLabels(points: Point[]): Label[] {
  const placed: { box: [number, number, number, number]; label: Label }[] = [];
  const overlaps = (a: number[], b: number[]) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
  for (const p of points) {
    const width = p.model.model.length * 7.2;
    const candidates: Label[] = [
      { id: p.model.id, text: p.model.model, x: p.x + 10, y: p.y - 10, anchor: 'start' },
      { id: p.model.id, text: p.model.model, x: p.x + 10, y: p.y + 20, anchor: 'start' },
      { id: p.model.id, text: p.model.model, x: p.x - 10, y: p.y - 10, anchor: 'end' },
      { id: p.model.id, text: p.model.model, x: p.x - 10, y: p.y + 20, anchor: 'end' },
    ];
    for (const c of candidates) {
      const left = c.anchor === 'start' ? c.x : c.x - width;
      const box: [number, number, number, number] = [left, c.y - 13, left + width, c.y + 3];
      if (box[0] < PAD.left || box[2] > W - PAD.right) continue;
      if (placed.some((q) => overlaps(box, q.box))) continue;
      placed.push({ box, label: c });
      break;
    }
  }
  return placed.map((q) => q.label);
}

function niceTicks(min: number, max: number, count: number): number[] {
  const span = max - min || 1;
  const step = 10 ** Math.floor(Math.log10(span / count));
  const nice = [1, 2, 2.5, 5, 10].map((m) => m * step).find((s) => span / s <= count) ?? step * 10;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / nice) * nice; v <= max + 1e-9; v += nice) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

// Models nothing else beats on both axes: no other model is both faster and
// better. Those are the honest picks, so they get the line and the labels.
function frontier(points: Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a.latency - b.latency || b.score - a.score);
  const result: Point[] = [];
  let best = -Infinity;
  for (const p of sorted) {
    if (p.score > best) {
      result.push(p);
      best = p.score;
    }
  }
  return result;
}

export default function BenchmarkScatter({
  models,
  scoreOf,
  scoreLabel,
  onSelect,
}: {
  models: BenchmarkModel[];
  scoreOf: (model: BenchmarkModel) => number | null;
  scoreLabel: string;
  onSelect: (model: BenchmarkModel) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const chart = useMemo(() => {
    const raw = models
      .map((model) => ({ model, latency: model.latencyP50Ms, score: scoreOf(model) }))
      .filter((p): p is { model: BenchmarkModel; latency: number; score: number } => p.latency != null && p.latency > 0 && p.score != null);
    if (raw.length === 0) return null;

    const latencies = raw.map((p) => p.latency);
    const scores = raw.map((p) => p.score);
    // Log scale: most models sit between 250ms and 1.2s, and a linear axis
    // would let two slow outliers squash them into one corner.
    const lo = Math.log(Math.min(...latencies) * 0.85);
    const hi = Math.log(Math.max(...latencies) * 1.12);
    const yMin = Math.max(0, Math.floor(Math.min(...scores) * 20) / 20 - 0.02);
    const yMax = Math.min(1, Math.ceil(Math.max(...scores) * 20) / 20 + 0.01);
    const x = (v: number) => PAD.left + ((Math.log(v) - lo) / (hi - lo || 1)) * (W - PAD.left - PAD.right);
    const y = (v: number) => H - PAD.bottom - ((v - yMin) / (yMax - yMin)) * (H - PAD.top - PAD.bottom);

    const points: Point[] = raw.map((p) => ({ ...p, x: x(p.latency), y: y(p.score) }));
    const edge = frontier(points);
    return {
      points,
      edge,
      edgeIds: new Set(edge.map((p) => p.model.id)),
      labels: placeLabels(edge),
      xTicks: xTicks(lo, hi),
      yTicks: niceTicks(yMin, yMax, 5),
      x,
      y,
    };
  }, [models, scoreOf]);

  if (!chart) {
    return <p className="theme-soft px-6 py-16 text-center">No models with latency data match these filters.</p>;
  }

  const active = chart.points.find((p) => p.model.id === hovered) ?? null;
  const presentProviders = PROVIDERS.filter((provider) => models.some((m) => m.provider === provider));

  return (
    <div className="px-4 pb-6 pt-4 md:px-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="theme-soft text-sm">
          Up and to the left is better. The line joins the models nothing else beats on both speed and{' '}
          {scoreLabel.toLowerCase()}.
        </p>
        <ul className="flex flex-wrap items-center gap-4 text-sm" aria-label="Providers">
          {presentProviders.map((provider) => (
            <li key={provider} className="theme-body flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: PROVIDER_COLOR_VAR[provider] }} />
              {provider}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full overflow-visible"
          role="group"
          aria-label={`${scoreLabel} against median latency for ${chart.points.length} models`}
          onMouseLeave={() => setHovered(null)}
        >
          {chart.yTicks.map((tick) => (
            <g key={`y${tick}`}>
              <line x1={PAD.left} x2={W - PAD.right} y1={chart.y(tick)} y2={chart.y(tick)} stroke="var(--border)" />
              <text x={PAD.left - 10} y={chart.y(tick)} dy="0.32em" textAnchor="end" fontSize="12" fill="var(--text-subtle)">
                {Math.round(tick * 100)}%
              </text>
            </g>
          ))}
          {chart.xTicks.map((tick) => (
            <text
              key={`x${tick}`}
              x={chart.x(tick)}
              y={H - PAD.bottom + 20}
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-subtle)"
            >
              {tick >= 1000 ? `${tick / 1000}s` : `${tick}ms`}
            </text>
          ))}
          <text x={(PAD.left + W - PAD.right) / 2} y={H - 8} textAnchor="middle" fontSize="12" fill="var(--text-soft)">
            Median latency to first sentence
          </text>
          <text
            transform={`translate(18 ${(PAD.top + H - PAD.bottom) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-soft)"
          >
            {scoreLabel}
          </text>

          <polyline
            points={chart.edge.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="var(--brand)"
            strokeWidth={2}
            pathLength={1}
            strokeLinejoin="round"
            opacity={0.7}
            className="bench-draw"
          />

          {chart.points.map((p) => {
            const isActive = hovered === p.model.id;
            const dim = hovered !== null && !isActive;
            return (
              <g
                key={p.model.id}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(p.model.id)}
                onFocus={() => setHovered(p.model.id)}
                onBlur={() => setHovered(null)}
                onClick={() => onSelect(p.model)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(p.model);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${p.model.model}: ${formatPercent(p.score)}, ${formatMs(p.latency)}`}
                style={{ opacity: dim ? 0.35 : 1, transition: 'opacity 150ms ease' }}
              >
                <circle cx={p.x} cy={p.y} r={16} fill="transparent" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 8 : 6}
                  fill={PROVIDER_COLOR_VAR[p.model.provider]}
                  stroke="var(--surface-solid)"
                  strokeWidth={2}
                  style={{ transition: 'r 150ms ease' }}
                />
              </g>
            );
          })}

          {chart.labels.map((label) =>
            hovered === label.id ? null : (
              <text
                key={`l${label.id}`}
                x={label.x}
                y={label.y}
                textAnchor={label.anchor}
                fontSize="12"
                fontWeight={600}
                fill="var(--text-body)"
                pointerEvents="none"
                paintOrder="stroke"
                stroke="var(--surface-solid)"
                strokeWidth={4}
              >
                {label.text}
              </text>
            ),
          )}
        </svg>

        {active ? (
          <div
            className="theme-menu pointer-events-none absolute z-10 w-56 rounded-2xl p-3 text-sm"
            style={{
              left: `${(active.x / W) * 100}%`,
              top: `${(active.y / H) * 100}%`,
              transform: `translate(${active.x > W * 0.65 ? 'calc(-100% - 14px)' : '14px'}, -50%)`,
            }}
          >
            <p className="theme-heading font-semibold">{active.model.model}</p>
            <p className="theme-subtle text-xs">
              {active.model.provider}
              {reasoningLabel(active.model.reasoning) ? ` · ${reasoningLabel(active.model.reasoning)}` : ''}
              {active.model.fast ? ' · fast' : ''}
            </p>
            <div className="mt-2 flex justify-between">
              <span className="theme-soft">{scoreLabel}</span>
              <span className="theme-heading font-semibold tabular-nums">{formatPercent(active.score)}</span>
            </div>
            <div className="flex justify-between">
              <span className="theme-soft">Latency p50</span>
              <span className="theme-heading font-semibold tabular-nums">
                {formatMs(active.latency, active.model.lowSamples)}
              </span>
            </div>
            {chart.edgeIds.has(active.model.id) ? (
              <p className="mt-2 text-xs font-semibold text-[var(--brand-primary-text)]">On the best-tradeoff line</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
