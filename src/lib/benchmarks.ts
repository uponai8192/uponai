// Client for the platform's public model-benchmark feed
// (GET /api/public/model-benchmarks and /:id). The feed is public, read-only
// and CORS-enabled, so the browser calls it directly with no credentials.

// Tried in order. The production admin panel does not serve the feed until it
// ships, so staging answers in the meantime. NEXT_PUBLIC_BENCHMARKS_API_BASE
// replaces the list (comma separated), e.g. to point at a local fixture.
const DEFAULT_API_BASES = ['https://admin-panel.upon-ai.com', 'https://staging.upon-ai.com'];

export const BENCHMARK_API_BASES = (process.env.NEXT_PUBLIC_BENCHMARKS_API_BASE ?? '')
  .split(',')
  .map((base) => base.trim().replace(/\/+$/, ''))
  .filter(Boolean);

function apiBases() {
  return BENCHMARK_API_BASES.length > 0 ? BENCHMARK_API_BASES : DEFAULT_API_BASES;
}

export const SCORE_KEYS = ['instruction_following', 'hallucination', 'tool_calling', 'colloquial'] as const;
export type ScoreKey = (typeof SCORE_KEYS)[number];

export type Score = { accuracy: number; passed: number; evaluated: number } | null;

export type BenchmarkModel = {
  id: string;
  model: string;
  reasoning: string | null;
  fast: boolean;
  speechToSpeech: boolean;
  benchmarkVersion: string | null;
  status: 'available' | 'not_benchmarked';
  scores: Partial<Record<ScoreKey, Score>>;
  latencyP50Ms: number | null;
  lowSamples: boolean;
  detailsAvailable: boolean;
  detailUpdatedAt: string | number | null;
};

export type BenchmarkFeed = {
  schemaVersion?: number | string;
  benchmarkVersion?: string | null;
  updatedAt: string | number | null;
  stale: boolean;
  measurement?: unknown;
  models: BenchmarkModel[];
};

export type HistoryPoint = {
  t: number;
  p50: number | null;
  p95: number | null;
  errorRate: number | null;
  lowSamples: boolean;
};

export type ModelDetail = {
  scores: Partial<Record<ScoreKey, Score>>;
  observedAt: number | null;
  latency: { p50: number | null; p90: number | null; p95: number | null; p99: number | null };
  errorRate: number | null;
  history: { day: HistoryPoint[]; week: HistoryPoint[] };
};

export type ModelDetailResponse = {
  updatedAt: string | number | null;
  stale: boolean;
  model: BenchmarkModel;
  detail: ModelDetail | null;
  detailStale: boolean;
};

export class BenchmarkUnavailableError extends Error {
  retryAfterSeconds: number | null;
  constructor(message: string, retryAfterSeconds: number | null = null) {
    super(message);
    this.name = 'BenchmarkUnavailableError';
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class BenchmarkNotFoundError extends Error {
  constructor() {
    super('This model is no longer listed.');
    this.name = 'BenchmarkNotFoundError';
  }
}

const FETCH_OPTIONS: RequestInit = { credentials: 'omit', cache: 'no-store' };

function retryAfter(response: Response) {
  const value = Number(response.headers.get('Retry-After'));
  return Number.isFinite(value) && value > 0 ? value : null;
}

/**
 * Loads the summary feed from the first base that serves it. Returns the base
 * too: model ids belong to that base's snapshot, so details must come from the
 * same place (a 404 there means "model disabled", not "try the next base").
 */
export async function fetchBenchmarkFeed(signal?: AbortSignal): Promise<{ base: string; feed: BenchmarkFeed }> {
  let lastError: BenchmarkUnavailableError | null = null;
  for (const base of apiBases()) {
    try {
      const response = await fetch(`${base}/api/public/model-benchmarks`, { ...FETCH_OPTIONS, signal });
      if (!response.ok) {
        lastError = new BenchmarkUnavailableError('Benchmarks are temporarily unavailable.', retryAfter(response));
        continue;
      }
      const raw = await response.json();
      return { base, feed: normalizeFeed(raw) };
    } catch (error) {
      if (signal?.aborted) throw error;
      lastError = new BenchmarkUnavailableError('Benchmarks are temporarily unavailable.');
    }
  }
  throw lastError ?? new BenchmarkUnavailableError('Benchmarks are temporarily unavailable.');
}

export async function fetchModelDetail(base: string, id: string, signal?: AbortSignal): Promise<ModelDetailResponse> {
  const response = await fetch(`${base}/api/public/model-benchmarks/${encodeURIComponent(id)}`, {
    ...FETCH_OPTIONS,
    signal,
  });
  if (response.status === 404) throw new BenchmarkNotFoundError();
  if (!response.ok) {
    throw new BenchmarkUnavailableError('Details are temporarily unavailable.', retryAfter(response));
  }
  const raw = await response.json();
  return {
    updatedAt: raw?.updatedAt ?? null,
    stale: raw?.stale === true,
    model: normalizeModel(raw?.model ?? {}),
    detail: raw?.detail ? normalizeDetail(raw.detail) : null,
    detailStale: raw?.detailStale === true,
  };
}

// ── Normalisation ────────────────────────────────────────────────────────
// The summary fields are documented exactly. The detail payload's inner field
// names are only described, so its reader accepts the plausible spellings and
// leaves anything it cannot find as null rather than guessing a value.

type Raw = Record<string, unknown>;

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function pick(source: unknown, ...keys: string[]): unknown {
  if (!source || typeof source !== 'object') return undefined;
  for (const key of keys) {
    const value = (source as Raw)[key];
    if (value !== undefined) return value;
  }
  return undefined;
}

function normalizeScore(value: unknown): Score {
  const accuracy = num(pick(value, 'accuracy'));
  if (accuracy === null) return null;
  return {
    accuracy,
    passed: num(pick(value, 'passed')) ?? 0,
    evaluated: num(pick(value, 'evaluated')) ?? 0,
  };
}

function normalizeScores(value: unknown): Partial<Record<ScoreKey, Score>> {
  const scores: Partial<Record<ScoreKey, Score>> = {};
  for (const key of SCORE_KEYS) scores[key] = normalizeScore(pick(value, key));
  return scores;
}

function normalizeModel(raw: Raw): BenchmarkModel {
  return {
    id: String(raw.id ?? ''),
    model: String(raw.model ?? 'Unknown model'),
    reasoning: typeof raw.reasoning === 'string' && raw.reasoning ? raw.reasoning : null,
    fast: raw.fast === true,
    speechToSpeech: raw.speechToSpeech === true,
    benchmarkVersion: typeof raw.benchmarkVersion === 'string' ? raw.benchmarkVersion : null,
    status: raw.status === 'not_benchmarked' ? 'not_benchmarked' : 'available',
    scores: normalizeScores(raw.scores),
    latencyP50Ms: num(raw.latencyP50Ms),
    lowSamples: raw.lowSamples === true,
    detailsAvailable: raw.detailsAvailable === true,
    detailUpdatedAt: (raw.detailUpdatedAt as string | number | null) ?? null,
  };
}

function normalizeFeed(raw: Raw): BenchmarkFeed {
  const models = Array.isArray(raw?.models) ? (raw.models as Raw[]).map(normalizeModel) : [];
  return {
    schemaVersion: raw?.schemaVersion as number | string | undefined,
    benchmarkVersion: (raw?.benchmarkVersion as string | null) ?? null,
    updatedAt: (raw?.updatedAt as string | number | null) ?? null,
    stale: raw?.stale === true,
    measurement: raw?.measurement,
    models: models.filter((model) => model.id),
  };
}

function normalizePoint(raw: unknown): HistoryPoint | null {
  const t = num(pick(raw, 'timestamp', 't', 'ts', 'time', 'at'));
  if (t === null) return null;
  return {
    t,
    p50: num(pick(raw, 'p50Ms', 'latencyP50Ms', 'p50', 'latencyP50')),
    p95: num(pick(raw, 'p95Ms', 'latencyP95Ms', 'p95', 'latencyP95')),
    errorRate: num(pick(raw, 'errorRate', 'error_rate')),
    lowSamples: pick(raw, 'lowSamples', 'limitedSamples', 'limited') === true,
  };
}

function normalizeSeries(raw: unknown): HistoryPoint[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(normalizePoint)
    .filter((point): point is HistoryPoint => point !== null)
    .sort((a, b) => a.t - b.t);
}

function normalizeDetail(raw: Raw): ModelDetail {
  const latency = pick(raw, 'latency');
  const latencyIsNumber = typeof latency === 'number';
  const history = pick(raw, 'history');
  return {
    scores: normalizeScores(pick(raw, 'scores', 'qualityScores', 'quality')),
    observedAt: num(pick(raw, 'observedAt')),
    latency: {
      p50: latencyIsNumber ? (latency as number) : num(pick(latency, 'p50Ms', 'p50', 'latencyP50Ms')) ?? num(pick(raw, 'latencyP50Ms')),
      p90: num(pick(latency, 'p90Ms', 'p90')),
      p95: num(pick(latency, 'p95Ms', 'p95')),
      p99: num(pick(latency, 'p99Ms', 'p99')),
    },
    errorRate: num(pick(raw, 'errorRate', 'error_rate')),
    history: {
      day: normalizeSeries(pick(history, '24h', 'day', 'last24h', 'hours24', 'h24') ?? pick(raw, 'history24h')),
      week: normalizeSeries(pick(history, '7d', 'week', 'last7d', 'days7', 'd7') ?? pick(raw, 'history7d')),
    },
  };
}

// ── Presentation helpers ─────────────────────────────────────────────────

export const SCORE_META: Record<ScoreKey, { label: string; short: string; description: string }> = {
  instruction_following: {
    label: 'Instruction Following',
    short: 'Instructions',
    description: 'Whether the model honours role constraints, business rules, and refusal rules.',
  },
  hallucination: {
    label: 'Grounding',
    short: 'Grounding',
    description: 'Whether answers stay grounded in the provided context instead of inventing facts.',
  },
  tool_calling: {
    label: 'Tool Calling',
    short: 'Tools',
    description: 'Whether the model calls the right tool with the right arguments at the right time.',
  },
  colloquial: {
    label: 'Colloquial',
    short: 'Colloquial',
    description: 'Conversational quality: natural, concise replies that read well when spoken aloud.',
  },
};

const PROVIDER_PREFIXES: Array<[RegExp, string]> = [
  [/^(gpt|o\d|chatgpt|openai)/i, 'OpenAI'],
  [/^claude/i, 'Anthropic'],
  [/^(gemini|gemma)/i, 'Google'],
  [/^grok/i, 'xAI'],
  [/^(llama|meta)/i, 'Meta'],
  [/^(mistral|mixtral|ministral)/i, 'Mistral'],
  [/^deepseek/i, 'DeepSeek'],
  [/^qwen/i, 'Alibaba'],
];

export function providerOf(model: string) {
  for (const [pattern, provider] of PROVIDER_PREFIXES) if (pattern.test(model)) return provider;
  return 'Other';
}

export function formatPercent(score: Score | undefined) {
  return score ? `${(score.accuracy * 100).toFixed(1)}%` : '—';
}

const integerFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export function formatMs(value: number | null | undefined, approximate = false) {
  if (value === null || value === undefined) return '—';
  return `${approximate ? '~' : ''}${integerFormat.format(value)} ms`;
}

export function formatRate(value: number | null | undefined) {
  if (value === null || value === undefined) return '—';
  const percent = value * 100;
  return `${percent < 1 && percent > 0 ? percent.toFixed(2) : percent.toFixed(1)}%`;
}

export function toDate(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === '') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatUpdated(value: string | number | null | undefined) {
  const date = toDate(value);
  if (!date) return null;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}
