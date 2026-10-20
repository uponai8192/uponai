'use client';

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import BenchmarkScatter from '@/components/benchmarks/BenchmarkScatter';
import ModelDetailDrawer from '@/components/benchmarks/ModelDetailDrawer';
import { useModalFocus } from '@/components/benchmarks/useModalFocus';
import {
  METRICS,
  METRIC_KEYS,
  PROVIDERS,
  PROVIDER_COLOR_VAR,
  SORT_DESCRIPTIONS,
  formatMs,
  formatPercent,
  reasoningLabel,
  sortValue,
  variantLabel,
  type BenchmarkData,
  type BenchmarkModel,
  type SortKey,
} from '@/lib/benchmarks';

const MAX_COMPARE = 3;
const noopSubscribe = () => () => {};

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'overall', label: 'Overall' },
  ...METRIC_KEYS.map((key) => ({ key, label: METRICS[key].label })),
  { key: 'latency', label: 'Latency' },
];

const sortLabel = (key: SortKey) => SORT_OPTIONS.find((o) => o.key === key)?.label ?? '';

function compareModels(key: SortKey) {
  const ascending = key === 'latency';
  return (a: BenchmarkModel, b: BenchmarkModel) => {
    const av = sortValue(a, key);
    const bv = sortValue(b, key);
    if (av == null && bv == null) return a.model.localeCompare(b.model);
    if (av == null) return 1;
    if (bv == null) return -1;
    return ascending ? av - bv : bv - av;
  };
}

function ProviderBadge({ model, size = 'md' }: { model: BenchmarkModel; size?: 'md' | 'lg' }) {
  const color = PROVIDER_COLOR_VAR[model.provider];
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl border font-bold ${size === 'lg' ? 'h-12 w-12 text-base' : 'h-9 w-9 text-xs'}`}
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
      }}
      aria-hidden
    >
      {model.provider === 'OpenAI' ? 'OA' : model.provider.slice(0, 2)}
    </span>
  );
}

function ScoreCell({ value, best, active }: { value: number | null; best: boolean; active: boolean }) {
  return (
    <td className={`px-4 py-4 text-right align-middle ${active ? 'bg-[var(--brand-primary-bg)]' : ''}`}>
      <span className={`inline-flex items-center gap-1.5 tabular-nums ${active ? 'theme-heading font-semibold' : 'theme-body'}`}>
        {best ? (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary-text)]" title="Best in this view">
            ★
          </span>
        ) : null}
        {formatPercent(value)}
      </span>
      <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[var(--surface-inset)]">
        <span
          className="bench-grow block h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)]"
          style={{ width: `${Math.max(0, ((value ?? 0) - 0.4) / 0.6) * 100}%`, opacity: active ? 1 : 0.55 }}
        />
      </span>
    </td>
  );
}

function Podium({ models, sortKey, onSelect }: { models: BenchmarkModel[]; sortKey: SortKey; onSelect: (m: BenchmarkModel) => void }) {
  if (models.length === 0) return null;
  const places = ['1st', '2nd', '3rd'];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {models.map((model, index) => {
        const value = sortValue(model, sortKey);
        const color = PROVIDER_COLOR_VAR[model.provider];
        return (
          <button
            key={model.id}
            type="button"
            onClick={() => onSelect(model)}
            className={`bench-rise theme-card group relative overflow-hidden rounded-[1.75rem] p-5 text-left transition-transform duration-200 hover:-translate-y-1 ${
              index === 0 ? 'md:-translate-y-2 md:hover:-translate-y-3' : ''
            }`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span
              className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full blur-3xl"
              style={{ background: `color-mix(in srgb, ${color} ${index === 0 ? 34 : 20}%, transparent)` }}
            />
            <div className="relative flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${
                  index === 0 ? 'theme-primary-button' : 'theme-pill-accent'
                }`}
              >
                {places[index]}
              </span>
              <ProviderBadge model={model} />
            </div>
            <p className="theme-heading relative mt-5 truncate text-xl font-bold">{model.model}</p>
            <p className="theme-subtle relative text-sm">
              {model.provider}
              {variantLabel(model) ? ` · ${variantLabel(model)}` : ''}
            </p>
            <p className="theme-heading relative mt-4 text-4xl font-bold tabular-nums">
              {sortKey === 'latency' ? formatMs(value, model.lowSamples) : formatPercent(value)}
            </p>
            <p className="theme-subtle relative text-xs uppercase tracking-[0.18em]">{sortLabel(sortKey)}</p>
            <div className="relative mt-4 grid grid-cols-4 gap-2">
              {METRIC_KEYS.map((key) => (
                <div key={key} title={`${METRICS[key].label}: ${formatPercent(model.scores[key]?.accuracy)}`}>
                  <div className="flex h-10 items-end overflow-hidden rounded-md bg-[var(--surface-inset)]">
                    <div
                      className="bench-grow-y w-full rounded-md bg-gradient-to-t from-[var(--brand)] to-[var(--brand-cool)]"
                      style={{ height: `${Math.max(0, ((model.scores[key]?.accuracy ?? 0) - 0.4) / 0.6) * 100}%` }}
                    />
                  </div>
                  <p className="theme-subtle mt-1 truncate text-[10px] uppercase tracking-wide">{METRICS[key].tiny}</p>
                </div>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function CompareDialog({ models, onClose, onRemove }: { models: BenchmarkModel[]; onClose: () => void; onRemove: (m: BenchmarkModel) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalFocus(true, dialogRef, onClose);

  const rows: { key: SortKey; label: string }[] = SORT_OPTIONS;
  const bestOf = (key: SortKey) => {
    const values = models.map((m) => sortValue(m, key)).filter((v): v is number => v != null);
    if (values.length < 2) return null;
    return key === 'latency' ? Math.min(...values) : Math.max(...values);
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Compare models" className="theme-menu bench-rise relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="theme-heading text-2xl font-bold">Head to head</h2>
          <button type="button" onClick={onClose} className="theme-secondary-button rounded-full px-4 py-2 text-sm font-semibold">
            Close
          </button>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="w-40" />
                {models.map((model) => (
                  <th key={model.id} className="px-3 pb-4 text-left align-bottom">
                    <div className="flex items-center gap-3">
                      <ProviderBadge model={model} />
                      <div className="min-w-0">
                        <p className="theme-heading truncate font-semibold">{model.model}</p>
                        <button type="button" onClick={() => onRemove(model)} className="theme-link-muted text-xs font-normal">
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const best = bestOf(row.key);
                return (
                  <tr key={row.key}>
                    <th className="theme-soft border-t border-[var(--border)] py-4 pr-3 text-left font-medium">{row.label}</th>
                    {models.map((model) => {
                      const value = sortValue(model, row.key);
                      const isBest = best !== null && value === best;
                      return (
                        <td key={model.id} className="border-t border-[var(--border)] px-3 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`tabular-nums ${isBest ? 'theme-heading font-bold' : 'theme-body'}`}>
                              {row.key === 'latency' ? formatMs(value, model.lowSamples) : formatPercent(value)}
                            </span>
                            {isBest ? (
                              <span className="theme-pill-primary rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                Best
                              </span>
                            ) : null}
                          </div>
                          {row.key !== 'latency' ? (
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-inset)]">
                              <div
                                className="bench-grow h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)]"
                                style={{ width: `${(value ?? 0) * 100}%`, opacity: isBest ? 1 : 0.5 }}
                              />
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function useUpdatedLabel(updatedAt: string | null) {
  // Formatted after mount so the server and the browser never disagree on
  // the visitor's time zone during hydration.
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const date = updatedAt ? new Date(updatedAt) : null;
      // Differs from the server snapshot so the tile never sits on "Loading".
      if (!date || Number.isNaN(date.getTime())) return '-';
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
    },
    () => null,
  );
}

export default function BenchmarkBoard({ data }: { data: BenchmarkData }) {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState<'all' | (typeof PROVIDERS)[number]>('all');
  const [reasoning, setReasoning] = useState('all');
  const [fast, setFast] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('overall');
  const [view, setView] = useState<'table' | 'chart'>('table');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const updatedLabel = useUpdatedLabel(data.updatedAt);
  const byId = useMemo(() => new Map(data.models.map((m) => [m.id, m])), [data.models]);

  const providers = useMemo(() => PROVIDERS.filter((p) => data.models.some((m) => m.provider === p)), [data.models]);
  const reasoningLevels = useMemo(
    () => Array.from(new Set(data.models.map((m) => m.reasoning).filter((r): r is string => !!r))),
    [data.models],
  );
  const hasFast = data.models.some((m) => m.fast);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.models
      .filter((m) => m.fast === fast)
      .filter((m) => provider === 'all' || m.provider === provider)
      .filter((m) => reasoning === 'all' || m.reasoning === reasoning)
      .filter((m) => !q || m.model.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q))
      .sort(compareModels(sortKey));
  }, [data.models, fast, provider, reasoning, query, sortKey]);

  const best = useMemo(() => {
    const out = {} as Record<SortKey, number | null>;
    for (const option of SORT_OPTIONS) {
      const values = visible.map((m) => sortValue(m, option.key)).filter((v): v is number => v != null);
      out[option.key] = values.length ? (option.key === 'latency' ? Math.min(...values) : Math.max(...values)) : null;
    }
    return out;
  }, [visible]);

  const standard = data.models.filter((m) => !m.fast);
  const topOverall = [...standard].sort(compareModels('overall'))[0];
  const fastest = [...standard].sort(compareModels('latency'))[0];

  const selected = selectedId ? (byId.get(selectedId) ?? null) : null;
  const compared = compareIds.map((id) => byId.get(id)).filter((m): m is BenchmarkModel => !!m);

  const toggleCompare = useCallback(
    (model: BenchmarkModel) => {
      const next = compareIds.includes(model.id)
        ? compareIds.filter((id) => id !== model.id)
        : compareIds.length >= MAX_COMPARE
          ? compareIds
          : [...compareIds, model.id];
      setCompareIds(next);
      // Dropping below two closes the dialog for good, so adding a model
      // later does not reopen it unasked.
      if (next.length < 2) setCompareOpen(false);
    },
    [compareIds],
  );
  const closeDetail = useCallback(() => setSelectedId(null), []);
  const closeCompare = useCallback(() => setCompareOpen(false), []);
  const scatterScore = useCallback(
    (m: BenchmarkModel) => sortValue(m, sortKey === 'latency' ? 'overall' : sortKey),
    [sortKey],
  );

  const selectClass =
    'theme-inset theme-heading h-11 appearance-none rounded-xl bg-no-repeat pl-4 pr-10 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]';
  const chevronBg = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238fa3b8' stroke-width='2'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
    backgroundPosition: 'right 0.85rem center',
    backgroundSize: '1rem',
  };

  return (
    <>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
        {[
          { label: 'Models tracked', value: String(new Set(data.models.map((m) => m.model)).size) },
          { label: 'Top overall', value: topOverall?.model ?? '-' },
          { label: 'Fastest p50', value: fastest ? `${fastest.model}` : '-', sub: fastest ? formatMs(fastest.latencyP50Ms) : undefined },
          {
            label: data.stale ? 'Last refresh' : 'Live data',
            value: updatedLabel ?? 'Loading',
            live: !data.stale,
          },
        ].map((stat, index) => (
          <div key={stat.label} className="bench-rise theme-card-soft rounded-2xl px-4 py-3 text-left" style={{ animationDelay: `${index * 70}ms` }}>
            <p className="theme-subtle flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
              {stat.live ? <span className="animate-brand-pulse h-1.5 w-1.5 rounded-full bg-[var(--bench-google)]" /> : null}
              {stat.label}
            </p>
            <p className={`theme-heading mt-1 font-bold ${'live' in stat ? 'text-sm leading-6' : 'truncate'}`}>{stat.value}</p>
            {stat.sub ? <p className="theme-soft text-xs tabular-nums">{stat.sub}</p> : null}
          </div>
        ))}
      </div>

      <section className="mx-auto mt-14 max-w-7xl px-4">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Podium</p>
            <h2 className="theme-heading mt-2 text-2xl font-bold md:text-3xl">Leading on {sortLabel(sortKey).toLowerCase()}</h2>
          </div>
          <p className="theme-soft max-w-md text-sm">{SORT_DESCRIPTIONS[sortKey]}</p>
        </div>
        <Podium models={visible.slice(0, 3)} sortKey={sortKey} onSelect={(m) => setSelectedId(m.id)} />
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 pb-24">
        <div className="theme-panel overflow-hidden rounded-[2rem]">
          <div className="flex flex-col gap-3 border-b border-[var(--border)] p-4 md:p-5 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <label className="relative min-w-[12rem] flex-1 sm:max-w-xs">
                <span className="sr-only">Search models</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search models"
                  className="theme-inset theme-heading h-11 w-full rounded-xl pl-4 pr-10 text-sm outline-none placeholder:text-[var(--text-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                />
                <svg className="theme-subtle pointer-events-none absolute right-3.5 top-3.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" strokeWidth={2} />
                  <path strokeLinecap="round" strokeWidth={2} d="M20 20l-3.5-3.5" />
                </svg>
              </label>
              <select aria-label="Provider" value={provider} onChange={(e) => setProvider(e.target.value as typeof provider)} className={selectClass} style={chevronBg}>
                <option value="all">All providers</option>
                {providers.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select aria-label="Reasoning" value={reasoning} onChange={(e) => setReasoning(e.target.value)} className={selectClass} style={chevronBg}>
                <option value="all">Reasoning: all</option>
                {reasoningLevels.map((r) => (
                  <option key={r} value={r}>
                    Reasoning: {r}
                  </option>
                ))}
              </select>
              {hasFast ? (
                <button
                  type="button"
                  role="switch"
                  aria-checked={fast}
                  onClick={() => setFast((v) => !v)}
                  className="theme-inset theme-heading flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold"
                  title="Show the priority-processing variants instead of the standard ones"
                >
                  Fast mode
                  <span className={`relative h-5 w-9 rounded-full transition-colors ${fast ? 'bg-[var(--brand)]' : 'bg-[var(--border-strong)]'}`}>
                    <span className={`absolute left-0 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${fast ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </span>
                </button>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2">
                <span className="theme-soft text-sm">Sort by</span>
                <select aria-label="Sort by" value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className={selectClass} style={chevronBg}>
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="theme-inset flex rounded-xl p-1 text-sm font-semibold" role="group" aria-label="View">
                {(['table', 'chart'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    onClick={() => setView(v)}
                    className={`rounded-lg px-3.5 py-1.5 transition-colors ${view === v ? 'theme-primary-button' : 'theme-soft hover:text-[var(--text-strong)]'}`}
                  >
                    {v === 'chart' ? 'Speed vs quality' : 'Leaderboard'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {view === 'chart' ? (
            <BenchmarkScatter
              models={visible}
              scoreOf={scatterScore}
              scoreLabel={sortKey === 'latency' ? 'Overall' : sortLabel(sortKey)}
              onSelect={(m) => setSelectedId(m.id)}
            />
          ) : visible.length === 0 ? (
            <p className="theme-soft px-6 py-16 text-center">No models match these filters.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[56rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="theme-subtle w-12 px-5 py-4 text-left font-medium">#</th>
                    <th className="theme-subtle px-4 py-4 text-left font-medium">Model</th>
                    {SORT_OPTIONS.map((o) => (
                      <th
                        key={o.key}
                        className={`px-4 py-4 text-right font-medium ${sortKey === o.key ? 'bg-[var(--brand-primary-bg)] text-[var(--brand-primary-text)]' : 'theme-subtle'}`}
                        aria-sort={sortKey === o.key ? (o.key === 'latency' ? 'ascending' : 'descending') : undefined}
                      >
                        <button type="button" onClick={() => setSortKey(o.key)} className="inline-flex max-w-[7rem] items-center gap-1 text-right leading-tight hover:text-[var(--text-strong)]" title={SORT_DESCRIPTIONS[o.key]}>
                          {o.label}
                          <span aria-hidden className="text-[10px]">{sortKey === o.key ? (o.key === 'latency' ? '▲' : '▼') : '↕'}</span>
                        </button>
                      </th>
                    ))}
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {visible.map((model, index) => {
                    const inCompare = compareIds.includes(model.id);
                    return (
                      <tr
                        key={model.id}
                        className="group cursor-pointer border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--surface-soft)]"
                        onClick={() => setSelectedId(model.id)}
                      >
                        <td className="theme-subtle px-5 py-4 tabular-nums">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <ProviderBadge model={model} />
                            <div className="min-w-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedId(model.id);
                                }}
                                className="theme-heading block max-w-full truncate rounded text-left font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
                                aria-label={`${model.model} details`}
                              >
                                {model.model}
                              </button>
                              <p className="theme-subtle text-xs">
                                {model.provider}
                                {reasoningLabel(model.reasoning) ? ` · ${reasoningLabel(model.reasoning)}` : ''}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCompare(model);
                              }}
                              disabled={!inCompare && compareIds.length >= MAX_COMPARE}
                              className={`ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-opacity disabled:opacity-40 ${
                                inCompare ? 'theme-pill-primary' : 'theme-secondary-button opacity-70 group-hover:opacity-100'
                              }`}
                              aria-pressed={inCompare}
                            >
                              {inCompare ? 'Comparing' : 'Compare +'}
                            </button>
                          </div>
                        </td>
                        {SORT_OPTIONS.filter((o) => o.key !== 'latency').map((o) => {
                          const value = sortValue(model, o.key);
                          return <ScoreCell key={o.key} value={value} active={sortKey === o.key} best={value !== null && value === best[o.key]} />;
                        })}
                        <td className={`px-4 py-4 text-right tabular-nums ${sortKey === 'latency' ? 'theme-heading bg-[var(--brand-primary-bg)] font-semibold' : 'theme-body'}`}>
                          {model.latencyP50Ms !== null && model.latencyP50Ms === best.latency ? (
                            <span className="mr-1.5 text-[10px] text-[var(--brand-primary-text)]">★</span>
                          ) : null}
                          {formatMs(model.latencyP50Ms, model.lowSamples)}
                        </td>
                        <td className="theme-subtle pr-5 text-right transition-transform group-hover:translate-x-0.5">›</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="theme-subtle border-t border-[var(--border)] px-5 py-4 text-xs leading-6">
            Scores and latency come from external benchmarks run against each model; they are not measurements of
            production call performance on UponAI. {data.measurement ? `Latency is ${data.measurement.latency.toLowerCase()}, median over ${data.measurement.window}. ` : ''}
            <span className="whitespace-nowrap">~ marks a latency with limited samples.</span> ★ marks the best value in the current view.
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 transition-all duration-300 ${
          compared.length ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <div className="theme-menu flex max-w-full items-center gap-3 overflow-x-auto rounded-full py-2 pl-4 pr-2">
          <span className="theme-soft shrink-0 text-sm">
            Compare {compared.length}/{MAX_COMPARE}
          </span>
          {compared.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => toggleCompare(model)}
              className="theme-pill-primary shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
              aria-label={`Remove ${model.model} from compare`}
            >
              {model.model} ✕
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCompareOpen(true)}
            disabled={compared.length < 2}
            className="theme-primary-button shrink-0 rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {compared.length < 2 ? 'Pick one more' : 'Compare'}
          </button>
        </div>
      </div>

      {compareOpen && compared.length >= 2 ? (
        <CompareDialog models={compared} onClose={closeCompare} onRemove={toggleCompare} />
      ) : null}

      <ModelDetailDrawer
        model={selected}
        onClose={closeDetail}
        onToggleCompare={toggleCompare}
        comparing={selected ? compareIds.includes(selected.id) : false}
        compareFull={compareIds.length >= MAX_COMPARE}
      />
    </>
  );
}
