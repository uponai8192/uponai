'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ModelDetailDialog, { type DialogTarget } from './ModelDetailDialog';
import { ModelBadges, ProviderMark, computeRanks } from './parts';
import {
  BenchmarkUnavailableError,
  SCORE_KEYS,
  SCORE_META,
  fetchBenchmarkFeed,
  formatMs,
  formatPercent,
  formatUpdated,
  providerOf,
  type BenchmarkFeed,
  type BenchmarkModel,
  type ScoreKey,
} from '@/lib/benchmarks';

type SortKey = ScoreKey | 'latency';
type Sort = { key: SortKey; dir: 'asc' | 'desc' };

const SORT_OPTIONS: Array<{ key: SortKey; label: string; description: string }> = [
  ...SCORE_KEYS.map((key) => ({ key, label: SCORE_META[key].label, description: SCORE_META[key].description })),
  {
    key: 'latency',
    label: 'Latency',
    description: 'Median time to the first sentence of a reply. Lower is better; ~ marks limited samples.',
  },
];

const COLUMNS: Array<{ key: SortKey; label: string }> = [
  ...SCORE_KEYS.map((key) => ({ key, label: SCORE_META[key].label })),
  { key: 'latency', label: 'Latency' },
];

const REFRESH_MS = 60_000;
// # | model | four scores | latency | chevron
const GRID = 'grid-cols-[1.75rem_minmax(0,1fr)_6.75rem_6.75rem_6.75rem_6.75rem_6.25rem_1.25rem]';

function sortValue(model: BenchmarkModel, key: SortKey) {
  return key === 'latency' ? model.latencyP50Ms : model.scores[key]?.accuracy ?? null;
}

function cellValue(model: BenchmarkModel, key: SortKey) {
  return key === 'latency' ? formatMs(model.latencyP50Ms, model.lowSamples) : formatPercent(model.scores[key]);
}

// ── Small controls ──────────────────────────────────────────────────────

function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return ref;
}

const TOOLBAR_BUTTON =
  'flex h-[2.375rem] items-center gap-1.5 rounded-[0.625rem] bg-white/10 px-3 text-[0.8125rem] font-medium text-[#fff] transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60';

function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: Array<{ value: string; count: number }>;
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);
  return (
    <div ref={ref} className="relative max-sm:flex-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`${TOOLBAR_BUTTON} w-full whitespace-nowrap sm:min-w-[10rem]`}
      >
        {label}
        <Chevron className="ml-auto" />
      </button>
      {open ? (
        <div role="listbox" aria-multiselectable="true" className="theme-menu absolute left-0 top-full z-40 mt-2 min-w-[14rem] rounded-xl p-1.5">
          {options.map((option) => {
            const checked = selected.has(option.value);
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={checked}
                onClick={() => {
                  const next = new Set(selected);
                  if (checked) next.delete(option.value);
                  else next.add(option.value);
                  onChange(next);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-[var(--text-strong)] transition-colors hover:bg-[var(--surface-inset)]"
              >
                <span
                  className={`flex size-4 items-center justify-center rounded border ${
                    checked ? 'border-[var(--brand)] bg-[var(--brand)] text-[#fff]' : 'border-[var(--border-strong)]'
                  }`}
                >
                  {checked ? (
                    <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                      <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
                <span className="flex-1">{option.value}</span>
                <span className="theme-subtle tabular-nums">{option.count}</span>
              </button>
            );
          })}
          {selected.size ? (
            <button
              type="button"
              onClick={() => onChange(new Set())}
              className="mt-1 w-full rounded-lg border-t border-[var(--border)] px-2.5 py-2 text-left text-sm text-[var(--brand-primary-text)] hover:bg-[var(--surface-inset)]"
            >
              Clear
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function SortSelect({ sort, onChange }: { sort: Sort; onChange: (key: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);
  const current = SORT_OPTIONS.find((option) => option.key === sort.key)!;
  return (
    <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto">
      <span id="sort-by-label" className="shrink-0 text-[0.8125rem] text-white/60">
        Sort by
      </span>
      <div ref={ref} className="relative min-w-0 flex-1 sm:w-[12.5rem] sm:flex-none">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="sort-by-label"
          onClick={() => setOpen((value) => !value)}
          className={`${TOOLBAR_BUTTON} w-full justify-between`}
        >
          <span className="truncate">{current.label}</span>
          <Chevron />
        </button>
        {open ? (
          <div role="listbox" className="theme-menu absolute right-0 top-full z-40 mt-2 w-full min-w-[12.5rem] rounded-xl p-1.5">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                role="option"
                aria-selected={option.key === sort.key}
                onClick={() => {
                  onChange(option.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-[var(--surface-inset)] ${
                  option.key === sort.key ? 'font-semibold text-[var(--brand-primary-text)]' : 'text-[var(--text-strong)]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <span className="relative inline-flex w-full items-center sm:w-auto">
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search models"
        aria-label="Search models"
        className="h-[2.375rem] w-full rounded-[0.625rem] bg-white/10 pl-3 pr-8 text-[0.8125rem] font-medium text-[#fff] placeholder:font-normal placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-[11.5rem] [&::-webkit-search-cancel-button]:hidden"
      />
      <svg viewBox="0 0 16 16" className="pointer-events-none absolute right-2.5 size-3.5 text-white/50" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5L14 14" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ── Board ───────────────────────────────────────────────────────────────

type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; base: string; feed: BenchmarkFeed }
  | { status: 'unavailable'; retryAt: number };

export default function BenchmarkBoard() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [query, setQuery] = useState('');
  const [providers, setProviders] = useState<Set<string>>(new Set());
  const [reasoning, setReasoning] = useState<Set<string>>(new Set());
  const [fastMode, setFastMode] = useState(false);
  const [sort, setSort] = useState<Sort>({ key: 'instruction_following', dir: 'desc' });
  const [dialog, setDialog] = useState<DialogTarget | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(
    (signal?: AbortSignal) =>
      fetchBenchmarkFeed(signal).then(
        ({ base, feed }) => setState({ status: 'ready', base, feed }),
        (error) => {
          if (signal?.aborted) return;
          const wait = error instanceof BenchmarkUnavailableError && error.retryAfterSeconds ? error.retryAfterSeconds : 60;
          // A refresh failure keeps the board that is already on screen.
          setState((previous) =>
            previous.status === 'ready' ? previous : { status: 'unavailable', retryAt: Date.now() + wait * 1000 },
          );
        },
      ),
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  // Re-read the feed every minute while the tab is visible and no dialog is
  // open, and immediately when the tab comes back after a longer absence.
  const dialogOpen = dialog !== null;
  useEffect(() => {
    if (dialogOpen) return;
    let last = Date.now();
    const tick = () => {
      setNow(Date.now());
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - last < REFRESH_MS) return;
      last = Date.now();
      load();
    };
    const interval = window.setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [dialogOpen, load]);

  const models = useMemo(() => (state.status === 'ready' ? state.feed.models : []), [state]);
  const available = useMemo(() => models.filter((m) => m.status === 'available'), [models]);
  const pending = useMemo(() => models.filter((m) => m.status === 'not_benchmarked'), [models]);
  const ranks = useMemo(() => computeRanks(available), [available]);

  const pool = useMemo(() => available.filter((m) => m.fast === fastMode), [available, fastMode]);
  const providerOptions = useMemo(() => countBy(pool, (m) => providerOf(m.model)), [pool]);
  const reasoningOptions = useMemo(() => countBy(pool, (m) => m.reasoning ?? 'none'), [pool]);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = pool.filter(
      (m) =>
        (!needle || m.model.toLowerCase().includes(needle) || providerOf(m.model).toLowerCase().includes(needle)) &&
        (providers.size === 0 || providers.has(providerOf(m.model))) &&
        (reasoning.size === 0 || reasoning.has(m.reasoning ?? 'none')),
    );
    return filtered.sort((a, b) => {
      const av = sortValue(a, sort.key);
      const bv = sortValue(b, sort.key);
      if (av === null && bv === null) return a.model.localeCompare(b.model);
      if (av === null) return 1;
      if (bv === null) return -1;
      return sort.dir === 'asc' ? av - bv : bv - av;
    });
  }, [pool, query, providers, reasoning, sort]);

  const pendingRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return pending.filter(
      (m) =>
        (!needle || m.model.toLowerCase().includes(needle)) &&
        (providers.size === 0 || providers.has(providerOf(m.model))),
    );
  }, [pending, query, providers]);

  function chooseSort(key: SortKey, toggle: boolean) {
    setSort((current) => {
      const natural = key === 'latency' ? 'asc' : 'desc';
      if (toggle && current.key === key) return { key, dir: current.dir === 'asc' ? 'desc' : 'asc' };
      return { key, dir: natural };
    });
  }

  const sortMeta = SORT_OPTIONS.find((option) => option.key === sort.key)!;
  const providerLabel =
    providers.size === 0 ? 'All Providers' : providers.size === 1 ? [...providers][0] : `${providers.size} providers`;
  const reasoningLabel =
    reasoning.size === 0 ? 'Reasoning: all' : `Reasoning: ${[...reasoning].join('/')}`;

  const closeDialog = useCallback(() => setDialog(null), []);
  const updated = state.status === 'ready' ? formatUpdated(state.feed.updatedAt) : null;

  return (
    <div className="mx-auto max-w-[76rem] md:px-6 xl:px-0">
      <div className="theme-panel overflow-clip rounded-[1.75rem] lg:overflow-visible">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[linear-gradient(120deg,#01396b,#0157a3)] px-5 py-4 sm:px-6 lg:sticky lg:top-28 lg:z-20 lg:rounded-t-[1.75rem] [html[data-theme='dark']_&]:bg-[linear-gradient(120deg,#0b1b31,#10284a)]">
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
            <SearchBox value={query} onChange={setQuery} />
            <MultiSelect label={providerLabel} options={providerOptions} selected={providers} onChange={setProviders} />
            <MultiSelect label={reasoningLabel} options={reasoningOptions} selected={reasoning} onChange={setReasoning} />
            <button
              type="button"
              role="switch"
              aria-checked={fastMode}
              onClick={() => setFastMode((value) => !value)}
              className={`${TOOLBAR_BUTTON} gap-4 max-sm:flex-1`}
            >
              Fast mode
              <span aria-hidden="true" className={`relative ml-auto h-4 w-7 rounded-full transition-colors ${fastMode ? 'bg-[#4da3e8]' : 'bg-white/25'}`}>
                <span className={`absolute left-0.5 top-0.5 size-3 rounded-full bg-white transition-transform ${fastMode ? 'translate-x-3' : ''}`} />
              </span>
            </button>
          </div>
          <SortSelect sort={sort} onChange={(key) => chooseSort(key, false)} />
        </div>

        <p className="theme-soft border-b border-[var(--border)] bg-[var(--surface-solid)] px-5 py-3 text-[0.8125rem] leading-5 sm:px-6">
          {sortMeta.description}
        </p>

        {state.status === 'loading' ? <LoadingRows /> : null}

        {state.status === 'unavailable' ? (
          <Unavailable seconds={Math.max(0, Math.ceil((state.retryAt - now) / 1000))} onRetry={() => load()} />
        ) : null}

        {state.status === 'ready' ? (
          <div className="bg-[var(--surface-solid)] lg:rounded-b-[1.75rem]">
            {/* Column header (desktop) */}
            <div
              className={`hidden items-center gap-4 border-b border-[var(--border)] bg-[var(--surface-solid)] py-3 pl-6 pr-3 lg:sticky lg:top-[11.5rem] lg:z-10 lg:grid ${GRID}`}
            >
              <span className="theme-subtle text-[0.8125rem]">#</span>
              <span className="theme-subtle text-[0.8125rem]">Model</span>
              {COLUMNS.map((column) => {
                const active = column.key === sort.key;
                return (
                  <div
                    key={column.key}
                    className={`-mx-2 -my-3 flex items-center self-stretch px-2 py-3 transition-colors duration-300 ${
                      active ? 'bg-[var(--brand-primary-bg)]' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => chooseSort(column.key, true)}
                      aria-label={`${column.label}${active ? `, sorted ${sort.dir === 'asc' ? 'ascending' : 'descending'}` : ''}`}
                      className={`flex flex-1 items-center justify-end gap-1.5 text-right text-[0.8125rem] transition-colors ${
                        active ? 'font-semibold text-[var(--text-strong)]' : 'theme-subtle hover:text-[var(--text-strong)]'
                      }`}
                    >
                      {column.label}
                      <SortIcon state={active ? sort.dir : null} />
                    </button>
                  </div>
                );
              })}
              <span />
            </div>

            {rows.map((model, index) => (
              <ModelRow
                key={model.id}
                index={index + 1}
                model={model}
                sortKey={sort.key}
                onDetails={() => setDialog({ primary: model.id, compare: null, picking: false })}
                onCompare={() => setDialog({ primary: model.id, compare: null, picking: true })}
              />
            ))}

            {rows.length === 0 ? (
              <p className="theme-soft px-6 py-14 text-center text-sm">
                No benchmarked models match these filters.
                {fastMode ? ' Fast mode shows only Fast variants; switch it off to see the rest.' : ''}
              </p>
            ) : null}

            {pendingRows.length > 0 && !fastMode ? (
              <div className="border-t border-[var(--border)]">
                <p className="theme-subtle bg-[var(--surface-inset)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]">
                  Available on UponAI, not benchmarked yet
                </p>
                {pendingRows.map((model) => (
                  <div key={model.id} className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3 last:border-b-0 sm:px-6">
                    <ProviderMark provider={providerOf(model.model)} size="sm" />
                    <span className="theme-body text-sm font-medium">{model.model}</span>
                    <ModelBadges model={model} />
                    <span className="theme-subtle ml-auto text-xs">No measurements yet</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {state.status === 'ready' ? (
        <div className="theme-soft mt-5 flex flex-col gap-2 px-4 text-xs leading-5 md:px-0 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl">
            Scores and latency come from external benchmarks run against each model. They are not measurements of
            production call performance on UponAI. Pricing is not shown.
          </p>
          <p className="flex shrink-0 items-center gap-2">
            {state.feed.stale ? (
              <span className="theme-pill-accent rounded-full px-2.5 py-0.5 font-medium">Data may be out of date</span>
            ) : null}
            {updated ? <span>Updated {updated}</span> : null}
          </p>
        </div>
      ) : null}

      {dialog && state.status === 'ready' ? (
        <ModelDetailDialog
          base={state.base}
          models={available}
          ranks={ranks}
          target={dialog}
          onChange={setDialog}
          onClose={closeDialog}
        />
      ) : null}
    </div>
  );
}

function countBy(models: BenchmarkModel[], key: (m: BenchmarkModel) => string) {
  const counts = new Map<string, number>();
  for (const m of models) counts.set(key(m), (counts.get(key(m)) ?? 0) + 1);
  return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));
}

function SortIcon({ state }: { state: 'asc' | 'desc' | null }) {
  return (
    <svg viewBox="0 0 10 14" className={`h-3 w-2 ${state ? 'text-[var(--brand)]' : 'text-[var(--text-subtle)] opacity-60'}`} aria-hidden="true">
      <path d="M5 1.5L8 5H2z" fill="currentColor" opacity={state === 'desc' ? 0.25 : 1} />
      <path d="M5 12.5L2 9h6z" fill="currentColor" opacity={state === 'asc' ? 0.25 : 1} />
    </svg>
  );
}

function ModelRow({
  index,
  model,
  sortKey,
  onDetails,
  onCompare,
}: {
  index: number;
  model: BenchmarkModel;
  sortKey: SortKey;
  onDetails: () => void;
  onCompare: () => void;
}) {
  const provider = providerOf(model.model);
  const subtitle = `${provider}${model.speechToSpeech ? ' (S2S)' : ''}${model.reasoning ? ` · ${model.reasoning}` : ''}`;
  const name = (
    <span className="flex min-w-0 items-center gap-2">
      <span className="theme-heading truncate text-[0.9375rem] font-semibold leading-5">{model.model}</span>
      {model.fast ? <span className="theme-pill-primary rounded-md px-1.5 py-0.5 text-[0.6875rem] font-medium">Fast</span> : null}
    </span>
  );

  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      {/* Desktop row */}
      <div
        role="button"
        tabIndex={0}
        onClick={onDetails}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onDetails();
          }
        }}
        className={`group hidden w-full cursor-pointer items-center gap-4 py-3.5 pl-6 pr-3 text-left transition-colors hover:bg-[var(--surface-inset)] focus:outline-none focus-visible:bg-[var(--surface-inset)] lg:grid ${GRID}`}
      >
        <span className="theme-subtle text-sm tabular-nums">{index}</span>
        <span className="flex min-w-0 items-center gap-3">
          <ProviderMark provider={provider} />
          <span className="min-w-0 flex-1">
            {name}
            <span className="theme-subtle mt-0.5 block truncate text-[0.8125rem] leading-4">{subtitle}</span>
          </span>
          <span className="ml-auto flex shrink-0 flex-col items-end gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDetails();
              }}
              className="theme-subtle text-xs transition-colors hover:text-[var(--brand-primary-text)]"
            >
              Details ›
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onCompare();
              }}
              className="theme-subtle text-xs transition-colors hover:text-[var(--brand-primary-text)]"
            >
              Compare +
            </button>
          </span>
        </span>
        {COLUMNS.map((column) => (
          <span
            key={column.key}
            className={`-mx-2 -my-3.5 flex items-center justify-end self-stretch px-2 py-3.5 text-right text-sm font-medium tabular-nums transition-colors duration-300 ${
              column.key === sortKey ? 'bg-[var(--brand-primary-bg)]' : ''
            } ${cellValue(model, column.key) === '—' ? 'theme-subtle' : 'theme-heading'}`}
          >
            {cellValue(model, column.key)}
          </span>
        ))}
        <svg viewBox="0 0 16 16" className="theme-subtle size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Mobile / tablet card */}
      <button type="button" onClick={onDetails} className="flex w-full items-center gap-3 px-5 py-4 text-left lg:hidden">
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-3">
            <span className="theme-heading flex size-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] text-sm font-semibold tabular-nums">
              {index}
            </span>
            <ProviderMark provider={provider} />
            <span className="min-w-0">
              {name}
              <span className="theme-subtle block truncate text-[0.8125rem]">{subtitle}</span>
            </span>
          </span>
          <span className="mt-3 grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-5">
            {COLUMNS.map((column) => (
              <span key={column.key} className="min-w-0">
                <span
                  className={`block truncate text-[0.6875rem] font-semibold uppercase tracking-[0.08em] ${
                    column.key === sortKey ? 'text-[var(--brand-primary-text)]' : 'theme-subtle'
                  }`}
                >
                  {column.key === 'latency' ? 'Latency' : SCORE_META[column.key].short}
                </span>
                <span className="theme-heading text-sm font-semibold tabular-nums">{cellValue(model, column.key)}</span>
              </span>
            ))}
          </span>
        </span>
        <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[var(--brand)]" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="bg-[var(--surface-solid)] lg:rounded-b-[1.75rem]" aria-busy="true" aria-label="Loading benchmarks">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-[var(--border)] px-6 py-4 last:border-b-0">
          <span className="size-8 animate-pulse rounded-lg bg-[var(--surface-inset)]" />
          <span className="h-4 w-40 animate-pulse rounded bg-[var(--surface-inset)]" />
          <span className="ml-auto h-4 w-1/2 animate-pulse rounded bg-[var(--surface-inset)]" />
        </div>
      ))}
    </div>
  );
}

function Unavailable({ seconds, onRetry }: { seconds: number; onRetry: () => void }) {
  const fired = useRef(false);
  useEffect(() => {
    if (seconds > 0) {
      fired.current = false;
      return;
    }
    if (fired.current) return;
    fired.current = true;
    onRetry();
  }, [seconds, onRetry]);

  return (
    <div className="flex flex-col items-center bg-[var(--surface-solid)] px-6 py-16 text-center lg:rounded-b-[1.75rem]">
      <span className="theme-pill-accent flex size-12 items-center justify-center rounded-2xl">
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path d="M4 18h16M7 14v4M12 9v9M17 5v13" strokeLinecap="round" />
        </svg>
      </span>
      <h2 className="theme-heading mt-5 text-xl font-semibold">Benchmarks are temporarily unavailable</h2>
      <p className="theme-soft mt-2 max-w-md text-sm leading-6">
        The latest results are being prepared. This page checks again automatically
        {seconds > 0 ? ` in ${seconds}s` : ''}.
      </p>
      <button type="button" onClick={onRetry} className="theme-secondary-button mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold">
        Try again now
      </button>
    </div>
  );
}
