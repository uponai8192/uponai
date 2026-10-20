'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useModalFocus } from '@/components/benchmarks/useModalFocus';
import {
  METRICS,
  METRIC_KEYS,
  PROVIDER_COLOR_VAR,
  formatMs,
  formatPercent,
  getBenchmarkDetail,
  variantLabel,
  type BenchmarkDetail,
  type BenchmarkModel,
  type LatencyPoint,
} from '@/lib/benchmarks';

const W = 520;
const H = 180;
const PAD = { top: 12, right: 8, bottom: 24, left: 48 };

function LatencyChart({ points, range }: { points: LatencyPoint[]; range: '24h' | '7d' }) {
  const [hover, setHover] = useState<number | null>(null);

  const chart = useMemo(() => {
    const usable = points.filter((p) => p.p50 != null);
    if (usable.length < 2) return null;
    const t0 = usable[0].t;
    const t1 = usable[usable.length - 1].t;
    const yMax = Math.max(...usable.map((p) => p.p95 ?? p.p50 ?? 0)) * 1.1 || 1;
    const x = (t: number) => PAD.left + ((t - t0) / (t1 - t0 || 1)) * (W - PAD.left - PAD.right);
    const y = (v: number) => H - PAD.bottom - (v / yMax) * (H - PAD.top - PAD.bottom);
    const line = (key: 'p50' | 'p95') =>
      usable
        .filter((p) => p[key] != null)
        .map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(1)},${y(p[key] as number).toFixed(1)}`)
        .join('');
    // About four gridlines whatever the range, so one slow outlier cannot
    // fill the chart with lines.
    const rawStep = yMax / 4;
    const magnitude = 10 ** Math.floor(Math.log10(rawStep));
    const step = [1, 2, 5, 10].map((m) => m * magnitude).find((v) => v >= rawStep) ?? rawStep;
    const ticks: number[] = [];
    for (let v = 0; v <= yMax; v += step) ticks.push(v);
    return { usable, x, y, p50: line('p50'), p95: line('p95'), ticks, t0, t1 };
  }, [points]);

  if (!chart) return <p className="theme-soft py-10 text-center text-sm">Not enough history yet.</p>;

  const active = hover === null ? null : chart.usable[hover];
  const fmtTime = (t: number) =>
    new Date(t).toLocaleString('en-US', range === '24h' ? { hour: 'numeric', minute: '2-digit' } : { month: 'short', day: 'numeric', hour: 'numeric' });

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Latency p50 and p95 over the last ${range === '24h' ? '24 hours' : '7 days'}`}
        onMouseMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          const px = ((event.clientX - box.left) / box.width) * W;
          let best = 0;
          chart.usable.forEach((p, i) => {
            if (Math.abs(chart.x(p.t) - px) < Math.abs(chart.x(chart.usable[best].t) - px)) best = i;
          });
          setHover(best);
        }}
        onMouseLeave={() => setHover(null)}
      >
        {chart.ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={chart.y(tick)} y2={chart.y(tick)} stroke="var(--border)" />
            <text x={PAD.left - 8} y={chart.y(tick)} dy="0.32em" textAnchor="end" fontSize="11" fill="var(--text-subtle)">
              {tick >= 1000 ? `${tick / 1000}s` : `${tick}`}
            </text>
          </g>
        ))}
        <text x={PAD.left} y={H - 6} fontSize="11" fill="var(--text-subtle)">
          {fmtTime(chart.t0)}
        </text>
        <text x={W - PAD.right} y={H - 6} textAnchor="end" fontSize="11" fill="var(--text-subtle)">
          {fmtTime(chart.t1)}
        </text>
        <path d={chart.p95} fill="none" stroke="var(--brand-cool)" strokeWidth={2} strokeOpacity={0.45} strokeDasharray="4 4" />
        <path d={chart.p50} fill="none" stroke="var(--brand)" strokeWidth={2} strokeLinejoin="round" />
        {active ? (
          <g pointerEvents="none">
            <line x1={chart.x(active.t)} x2={chart.x(active.t)} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--border-strong)" />
            <circle cx={chart.x(active.t)} cy={chart.y(active.p50 as number)} r={4.5} fill="var(--brand)" stroke="var(--surface-solid)" strokeWidth={2} />
          </g>
        ) : null}
      </svg>
      {active ? (
        <div
          className="theme-menu pointer-events-none absolute top-0 z-10 rounded-xl px-3 py-2 text-xs"
          style={{
            left: `${(chart.x(active.t) / W) * 100}%`,
            transform: `translateX(${chart.x(active.t) > W / 2 ? 'calc(-100% - 10px)' : '10px'})`,
          }}
        >
          <p className="theme-subtle">{fmtTime(active.t)}</p>
          <p className="theme-heading font-semibold tabular-nums">p50 {formatMs(active.p50)}</p>
          <p className="theme-soft tabular-nums">p95 {formatMs(active.p95)}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function ModelDetailDrawer({
  model,
  onClose,
  onToggleCompare,
  comparing,
  compareFull,
}: {
  model: BenchmarkModel | null;
  onClose: () => void;
  onToggleCompare: (model: BenchmarkModel) => void;
  comparing: boolean;
  compareFull: boolean;
}) {
  const [detail, setDetail] = useState<{ id: string; data: BenchmarkDetail | null; error: boolean } | null>(null);
  const [range, setRange] = useState<'24h' | '7d'>('24h');

  useEffect(() => {
    if (!model?.detailsAvailable) return;
    const controller = new AbortController();
    getBenchmarkDetail(model.id, controller.signal)
      .then((data) => setDetail({ id: model.id, data, error: false }))
      .catch((error: unknown) => {
        if ((error as Error).name !== 'AbortError') setDetail({ id: model.id, data: null, error: true });
      });
    return () => controller.abort();
  }, [model]);

  const panelRef = useRef<HTMLElement>(null);
  const open = model !== null;
  useModalFocus(open, panelRef, onClose);

  // Keep the last model on screen while the panel slides out, so the close
  // transition does not animate an empty panel.
  const [shown, setShown] = useState<BenchmarkModel | null>(model);
  if (model && model !== shown) setShown(model);
  const view = model ?? shown;

  const current = view && detail?.id === view.id ? detail : null;
  const variant = view ? variantLabel(view) : '';

  return (
    <div className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open} inert={!open}>
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={view ? `${view.model} benchmark details` : 'Benchmark details'}
        className={`theme-menu absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {view ? (
          <>
            <div
              className="relative shrink-0 overflow-hidden border-b border-[var(--border)] px-6 pb-6 pt-6"
              style={{
                background: `radial-gradient(420px 180px at 0% 0%, color-mix(in srgb, ${PROVIDER_COLOR_VAR[view.provider]} 22%, transparent), transparent 70%)`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: PROVIDER_COLOR_VAR[view.provider] }}>
                    {view.provider}
                  </p>
                  <h2 className="theme-heading mt-2 text-3xl font-bold">{view.model}</h2>
                  {variant ? <p className="theme-soft mt-1 text-sm">{variant}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="theme-secondary-button grid h-10 w-10 shrink-0 place-items-center rounded-full"
                  aria-label="Close details"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="theme-subtle text-xs uppercase tracking-[0.2em]">Overall</p>
                  <p className="theme-heading text-5xl font-bold tabular-nums">{formatPercent(view.overall)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleCompare(view)}
                  disabled={!comparing && compareFull}
                  className={`${comparing ? 'theme-pill-primary' : 'theme-secondary-button'} rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50`}
                >
                  {comparing ? 'Added to compare ✓' : compareFull ? 'Compare is full' : 'Add to compare'}
                </button>
              </div>
            </div>

            <div className="shrink-0 space-y-8 px-6 py-6">
              <section>
                <h3 className="theme-heading text-sm font-semibold uppercase tracking-[0.2em]">Quality</h3>
                <ul className="mt-4 space-y-4">
                  {METRIC_KEYS.map((key) => {
                    const score = view.scores[key];
                    return (
                      <li key={key}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="theme-body font-medium">{METRICS[key].label}</span>
                          <span className="theme-heading font-semibold tabular-nums">{formatPercent(score?.accuracy)}</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface-inset)]">
                          <div
                            className="bench-grow h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)]"
                            style={{ width: `${(score?.accuracy ?? 0) * 100}%` }}
                          />
                        </div>
                        <p className="theme-subtle mt-1 text-xs">
                          {score ? `${score.passed.toLocaleString('en-US')} of ${score.evaluated.toLocaleString('en-US')} test turns passed. ` : ''}
                          {METRICS[key].description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="theme-heading text-sm font-semibold uppercase tracking-[0.2em]">Latency</h3>
                  <div className="theme-inset flex rounded-full p-1 text-xs font-semibold">
                    {(['24h', '7d'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRange(r)}
                        className={`rounded-full px-3 py-1 transition-colors ${range === r ? 'theme-primary-button' : 'theme-soft'}`}
                        aria-pressed={range === r}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: 'p50', value: formatMs(current?.data?.p50Ms ?? view.latencyP50Ms, view.lowSamples) },
                    { label: 'p95', value: formatMs(current?.data?.p95Ms) },
                    {
                      label: 'Error rate',
                      value:
                        current?.data?.errorRate == null
                          ? '-'
                          : `${(current.data.errorRate * 100).toFixed(current.data.errorRate < 0.01 ? 2 : 1)}%`,
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="theme-card-soft rounded-2xl p-3">
                      <p className="theme-subtle text-xs uppercase tracking-[0.16em]">{stat.label}</p>
                      <p className="theme-heading mt-1 text-lg font-bold tabular-nums">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="theme-card-soft mt-4 rounded-2xl p-3">
                  <div className="theme-soft mb-2 flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="h-0.5 w-4 rounded bg-[var(--brand)]" /> p50
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-0.5 w-4 rounded border-t-2 border-dashed border-[var(--brand-cool)] opacity-60" /> p95
                    </span>
                  </div>
                  {!view.detailsAvailable ? (
                    <p className="theme-soft py-10 text-center text-sm">Latency history is not published for this model yet.</p>
                  ) : current?.error ? (
                    <p className="theme-soft py-10 text-center text-sm">Latency history could not be loaded. Try again shortly.</p>
                  ) : current?.data ? (
                    <LatencyChart key={range} points={range === '24h' ? current.data.history24h : current.data.history7d} range={range} />
                  ) : (
                    <div className="h-36 animate-pulse rounded-xl bg-[var(--surface-inset)]" />
                  )}
                </div>
                {view.lowSamples ? (
                  <p className="theme-subtle mt-3 text-xs">
                    Latency is marked approximate: this model had a limited number of samples in the window.
                  </p>
                ) : null}
              </section>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
