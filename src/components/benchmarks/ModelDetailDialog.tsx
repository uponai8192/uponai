'use client';

import { useEffect, useRef, useState } from 'react';
import LatencyChart from './LatencyChart';
import {
  BenchmarkNotFoundError,
  SCORE_KEYS,
  SCORE_META,
  fetchModelDetail,
  formatMs,
  formatPercent,
  formatRate,
  formatUpdated,
  providerOf,
  type BenchmarkModel,
  type ModelDetailResponse,
  type ScoreKey,
} from '@/lib/benchmarks';
import { ModelBadges, ProviderMark, type Ranks } from './parts';

type DetailState =
  | { status: 'loading' }
  | { status: 'ready'; data: ModelDetailResponse }
  | { status: 'missing' }
  | { status: 'error' };

function useModelDetail(base: string, model: BenchmarkModel) {
  // Tagged with the id it belongs to, so switching models reads as loading
  // until the new response lands instead of showing the previous model.
  const [result, setResult] = useState<{ id: string; state: DetailState } | null>(null);
  useEffect(() => {
    if (!model.detailsAvailable) return;
    const controller = new AbortController();
    fetchModelDetail(base, model.id, controller.signal)
      .then((data) => setResult({ id: model.id, state: { status: 'ready', data } }))
      .catch((error) => {
        if (controller.signal.aborted) return;
        setResult({ id: model.id, state: { status: error instanceof BenchmarkNotFoundError ? 'missing' : 'error' } });
      });
    return () => controller.abort();
  }, [base, model.id, model.detailsAvailable]);
  if (!model.detailsAvailable) return { status: 'error' } as DetailState;
  return result?.id === model.id ? result.state : ({ status: 'loading' } as DetailState);
}

function Card({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`theme-card rounded-[1.25rem] p-5 ${className}`}>
      <h3 className="theme-heading text-base font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] py-2.5 text-sm last:border-b-0">
      <span className="theme-soft">{label}</span>
      <span className="theme-heading font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function StatTile({ label, value, note }: { label: string; value: string; note?: string | null }) {
  return (
    <div className="theme-inset rounded-[1.25rem] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary-text)]">{label}</p>
      <p className="theme-heading mt-2 text-3xl font-semibold tabular-nums">{value}</p>
      {note ? <p className="theme-subtle mt-2 text-xs">{note}</p> : null}
    </div>
  );
}

function ModelPanel({
  base,
  model,
  ranks,
  compact,
  onClose,
}: {
  base: string;
  model: BenchmarkModel;
  ranks: Ranks;
  compact: boolean;
  onClose: () => void;
}) {
  const state = useModelDetail(base, model);
  const [range, setRange] = useState<'day' | 'week'>('day');
  const detail = state.status === 'ready' ? state.data.detail : null;
  const scores = detail?.scores ?? model.scores;
  const p50 = detail?.latency.p50 ?? model.latencyP50Ms;
  const rank = ranks.get(model.id);
  const provider = providerOf(model.model);
  const observed = formatUpdated(detail?.observedAt ?? model.detailUpdatedAt);

  return (
    <div className="theme-panel relative w-full rounded-[1.75rem] p-5 sm:p-7">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="theme-link-muted absolute right-4 top-4 flex size-9 items-center justify-center rounded-full hover:bg-[var(--surface-inset)]"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex items-center gap-2 pr-10 text-sm">
        <ProviderMark provider={provider} size="sm" />
        <span className="theme-body font-medium">{provider}</span>
        <code className="theme-subtle truncate font-[family-name:var(--font-mono)] text-xs">
          {model.model.toLowerCase()}
          {model.reasoning ? `@${model.reasoning}` : ''}
        </code>
      </div>
      <h2 id={`model-title-${model.id}`} className="theme-heading mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-3xl font-bold sm:text-4xl">
        {model.model}
        {model.reasoning ? (
          <span className="theme-soft text-xl font-normal italic sm:text-2xl">· {model.reasoning} reasoning</span>
        ) : null}
      </h2>
      <div className="mt-2">
        <ModelBadges model={model} />
      </div>

      {state.status === 'ready' && (state.data.detailStale || state.data.stale) ? (
        <p className="theme-pill-accent mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium">
          These details may be out of date{observed ? `: last observed ${observed}` : ''}.
        </p>
      ) : null}
      {state.status === 'missing' ? (
        <p className="theme-pill-accent mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium">
          This model is no longer listed. Showing the last summary values.
        </p>
      ) : null}

      <div className={`mt-6 grid gap-3 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
        <StatTile
          label="P50 first sentence"
          value={formatMs(p50, model.lowSamples)}
          note={rank?.latency ? `#${rank.latency.rank} fastest of ${rank.latency.of} listed` : null}
        />
        <StatTile
          label="Error rate"
          value={state.status === 'loading' ? '…' : formatRate(detail?.errorRate)}
          note={observed ? `Observed ${observed}` : null}
        />
        {!compact ? (
          <StatTile
            label="Benchmark version"
            value={model.benchmarkVersion ?? '—'}
            note="Scores only compare within one version."
          />
        ) : null}
      </div>

      <div className={`mt-3 grid gap-3 ${compact ? '' : 'lg:grid-cols-[1.35fr_1fr]'}`}>
        <Card title="Benchmark scores">
          <div className="space-y-4">
            {SCORE_KEYS.map((key: ScoreKey) => {
              const score = scores[key];
              const scoreRank = rank?.scores[key];
              return (
                <div key={key}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="theme-heading font-medium" title={SCORE_META[key].description}>
                      {SCORE_META[key].label}
                    </span>
                    <span className="theme-heading font-semibold tabular-nums">
                      {formatPercent(score)}
                      {scoreRank ? (
                        <span className="theme-subtle font-normal"> · #{scoreRank.rank} of {scoreRank.of}</span>
                      ) : null}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface-inset)]">
                    {score ? (
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--brand-2))]"
                        style={{ width: `${Math.max(0, Math.min(1, score.accuracy)) * 100}%` }}
                      />
                    ) : null}
                  </div>
                  {score ? (
                    <p className="theme-subtle mt-1 text-xs tabular-nums">
                      {score.passed.toLocaleString('en-US')} of {score.evaluated.toLocaleString('en-US')} cases passed
                    </p>
                  ) : (
                    <p className="theme-subtle mt-1 text-xs">Not evaluated</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid gap-3">
          <Card title="Latency details">
            <Row label="P50 first sentence" value={formatMs(p50, model.lowSamples)} />
            <Row label="P90 first sentence" value={formatMs(detail?.latency.p90)} />
            <Row label="P95 first sentence" value={formatMs(detail?.latency.p95)} />
            <Row label="P99 first sentence" value={formatMs(detail?.latency.p99)} />
          </Card>
          <Card title="Live reliability">
            <Row label="Error rate" value={formatRate(detail?.errorRate)} />
            <Row label="Samples" value={model.lowSamples ? 'Limited' : 'Sufficient'} />
            <Row label="Observed" value={observed ?? '—'} />
          </Card>
        </div>
      </div>

      <section className="theme-card mt-3 rounded-[1.25rem] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="theme-heading text-base font-semibold">First sentence latency and error rate over time</h3>
            <p className="theme-soft mt-1 text-sm">P50 and P95 time to first sentence, and the share of requests that failed. UTC.</p>
          </div>
          <div className="theme-inset flex rounded-xl p-1 text-sm" role="tablist" aria-label="History window">
            {(['day', 'week'] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={range === value}
                onClick={() => setRange(value)}
                className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                  range === value
                    ? 'bg-[var(--surface-solid)] text-[var(--brand-primary-text)] shadow-sm'
                    : 'theme-soft hover:text-[var(--text-strong)]'
                }`}
              >
                {value === 'day' ? 'Last 24 hours' : 'Last 7 days'}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5">
          {state.status === 'loading' ? (
            <div className="h-56 animate-pulse rounded-2xl bg-[var(--surface-inset)]" />
          ) : state.status === 'ready' && detail ? (
            <LatencyChart points={range === 'day' ? detail.history.day : detail.history.week} range={range} />
          ) : (
            <p className="theme-soft rounded-2xl border border-dashed border-[var(--border-strong)] px-4 py-10 text-center text-sm">
              Detailed telemetry is not available for this model yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function ComparePicker({
  models,
  exclude,
  onPick,
  onClose,
}: {
  models: BenchmarkModel[];
  exclude: string;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const choices = models.filter(
    (m) => m.id !== exclude && m.status === 'available' && m.model.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className="theme-panel relative w-full rounded-[1.75rem] p-5 sm:p-7 lg:sticky lg:top-0">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close comparison picker"
        className="theme-link-muted absolute right-4 top-4 flex size-9 items-center justify-center rounded-full hover:bg-[var(--surface-inset)]"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" strokeLinecap="round" />
        </svg>
      </button>
      <h2 className="theme-heading text-center text-2xl font-bold">Compare with</h2>
      <p className="theme-soft mt-1 text-center text-sm">Pick another model to show beside this one.</p>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search models"
        aria-label="Search models to compare"
        className="theme-inset mt-5 h-10 w-full rounded-xl px-3 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary-border)]"
      />
      <div className="mt-4 max-h-[60vh] overflow-y-auto">
        <div className="theme-subtle grid grid-cols-[minmax(0,1fr)_repeat(4,4.25rem)] gap-2 border-b border-[var(--border)] pb-2 text-xs max-sm:grid-cols-[minmax(0,1fr)_4.25rem]">
          <span>Model</span>
          {SCORE_KEYS.map((key, i) => (
            <span key={key} className={`text-right ${i > 0 ? 'max-sm:hidden' : ''}`}>
              {SCORE_META[key].short}
            </span>
          ))}
        </div>
        {choices.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onPick(m.id)}
            className="grid w-full grid-cols-[minmax(0,1fr)_repeat(4,4.25rem)] items-center gap-2 rounded-xl py-2.5 text-left text-sm transition-colors hover:bg-[var(--surface-inset)] max-sm:grid-cols-[minmax(0,1fr)_4.25rem]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <ProviderMark provider={providerOf(m.model)} size="sm" />
              <span className="min-w-0">
                <span className="theme-heading flex items-center gap-1.5 font-medium">
                  <span className="truncate">{m.model}</span>
                  {m.fast ? <span className="theme-pill-primary rounded px-1 text-[0.625rem]">Fast</span> : null}
                </span>
                <span className="theme-subtle block truncate text-xs">
                  {providerOf(m.model)}
                  {m.reasoning ? ` · ${m.reasoning}` : ''}
                </span>
              </span>
            </span>
            {SCORE_KEYS.map((key, i) => (
              <span key={key} className={`theme-heading text-right font-medium tabular-nums ${i > 0 ? 'max-sm:hidden' : ''}`}>
                {formatPercent(m.scores[key])}
              </span>
            ))}
          </button>
        ))}
        {choices.length === 0 ? <p className="theme-soft py-6 text-center text-sm">No other models match.</p> : null}
      </div>
    </div>
  );
}

export type DialogTarget = { primary: string; compare: string | null; picking: boolean };

export default function ModelDetailDialog({
  base,
  models,
  ranks,
  target,
  onChange,
  onClose,
}: {
  base: string;
  models: BenchmarkModel[];
  ranks: Ranks;
  target: DialogTarget;
  onChange: (target: DialogTarget) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const primary = models.find((m) => m.id === target.primary);
  const compare = target.compare ? models.find((m) => m.id === target.compare) : undefined;
  const split = Boolean(compare) || target.picking;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  if (!primary) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`model-title-${primary.id}`}
      tabIndex={-1}
      className="fixed inset-0 z-[1100] overflow-y-auto bg-[rgba(6,13,24,0.55)] px-2 py-6 outline-none backdrop-blur-sm sm:px-4 sm:py-10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`mx-auto grid items-start gap-4 ${split ? 'max-w-[92rem] lg:grid-cols-2' : 'max-w-[68rem]'}`}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <ModelPanel base={base} model={primary} ranks={ranks} compact={split} onClose={onClose} />
        {compare ? (
          <ModelPanel
            base={base}
            model={compare}
            ranks={ranks}
            compact
            onClose={() => onChange({ ...target, compare: null, picking: false })}
          />
        ) : target.picking ? (
          <ComparePicker
            models={models}
            exclude={primary.id}
            onPick={(id) => onChange({ ...target, compare: id, picking: false })}
            onClose={() => onChange({ ...target, picking: false })}
          />
        ) : null}
      </div>

      {!split ? (
        <button
          type="button"
          onClick={() => onChange({ ...target, picking: true })}
          className="theme-primary-button fixed bottom-6 right-6 z-10 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
          Compare
        </button>
      ) : null}
    </div>
  );
}
