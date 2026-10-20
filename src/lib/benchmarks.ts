// Model benchmark data, read from the public UponAI admin-panel API that also
// powers bench.uponai.com. Shared by the server page (list) and the client
// board (per-model detail), so nothing here may import server-only modules.

export const BENCHMARKS_API = 'https://admin-panel.upon-ai.com/api/public/model-benchmarks';

export const METRIC_KEYS = ['instruction_following', 'hallucination', 'tool_calling', 'colloquial'] as const;
export type MetricKey = (typeof METRIC_KEYS)[number];
export type SortKey = 'overall' | MetricKey | 'latency';

export const METRICS: Record<MetricKey, { label: string; short: string; tiny: string; description: string }> = {
  instruction_following: {
    label: 'Instruction Following',
    short: 'Instructions',
    tiny: 'Rules',
    description: 'Whether the model honours role constraints, business rules, and refusal rules.',
  },
  hallucination: {
    label: 'Grounding',
    short: 'Grounding',
    tiny: 'Facts',
    description: 'Whether answers stay grounded in the provided context instead of inventing facts.',
  },
  tool_calling: {
    label: 'Tool Calling',
    short: 'Tools',
    tiny: 'Tools',
    description: 'Whether the model calls the right tool with the right arguments at the right time.',
  },
  colloquial: {
    label: 'Colloquial',
    short: 'Colloquial',
    tiny: 'Tone',
    description: 'Conversational quality: natural, concise replies that read well when spoken aloud.',
  },
};

export const SORT_DESCRIPTIONS: Record<SortKey, string> = {
  overall: 'The average of all four quality scores, for a single read on how a model holds up on calls.',
  latency: 'Median time to the first complete sentence over the last 24 hours. Lower is faster.',
  ...Object.fromEntries(METRIC_KEYS.map((key) => [key, METRICS[key].description])),
} as Record<SortKey, string>;

export type Score = { accuracy: number; passed: number; evaluated: number };

export type BenchmarkModel = {
  id: string;
  model: string;
  provider: Provider;
  reasoning: string | null;
  fast: boolean;
  scores: Record<MetricKey, Score | null>;
  overall: number | null;
  latencyP50Ms: number | null;
  lowSamples: boolean;
  detailsAvailable: boolean;
};

export type BenchmarkMeasurement = {
  latency: string;
  window: string;
  basis: string;
};

export type BenchmarkData = {
  benchmarkVersion: number | null;
  updatedAt: string | null;
  stale: boolean;
  measurement: BenchmarkMeasurement | null;
  models: BenchmarkModel[];
};

export type LatencyPoint = { t: number; p50: number | null; p95: number | null; errorRate: number | null };

export type BenchmarkDetail = {
  p50Ms: number | null;
  p95Ms: number | null;
  errorRate: number | null;
  history24h: LatencyPoint[];
  history7d: LatencyPoint[];
};

// Fixed provider order: it drives the categorical colour slots, so a filter
// that hides a provider never repaints the others.
export const PROVIDERS = ['OpenAI', 'Anthropic', 'Google', 'Other'] as const;
export type Provider = (typeof PROVIDERS)[number];

const PROVIDER_PATTERNS: [RegExp, Provider][] = [
  [/^(gpt|o\d|chatgpt|openai)/i, 'OpenAI'],
  [/^claude/i, 'Anthropic'],
  [/^(gemini|gemma)/i, 'Google'],
];

export function providerOf(model: string): Provider {
  for (const [pattern, provider] of PROVIDER_PATTERNS) if (pattern.test(model)) return provider;
  return 'Other';
}

// Light and dark steps validated together (dataviz palette slots 1-4).
export const PROVIDER_COLOR_VAR: Record<Provider, string> = {
  OpenAI: 'var(--bench-openai)',
  Anthropic: 'var(--bench-anthropic)',
  Google: 'var(--bench-google)',
  Other: 'var(--bench-other)',
};

type Raw = Record<string, unknown>;

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function readScore(value: unknown): Score | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Raw;
  const accuracy = num(raw.accuracy);
  if (accuracy === null) return null;
  return { accuracy, passed: num(raw.passed) ?? 0, evaluated: num(raw.evaluated) ?? 0 };
}

function readModel(raw: Raw): BenchmarkModel | null {
  if (raw.status === 'not_benchmarked') return null;
  const model = String(raw.model ?? '');
  if (!model) return null;
  const rawScores = (raw.scores ?? {}) as Raw;
  const scores = Object.fromEntries(METRIC_KEYS.map((key) => [key, readScore(rawScores[key])])) as Record<
    MetricKey,
    Score | null
  >;
  const present = METRIC_KEYS.map((key) => scores[key]?.accuracy).filter((v): v is number => v != null);
  return {
    // Names repeat across fast and standard variants, so a missing id falls
    // back to the same model@reasoning[:fast] shape the API uses.
    id: String(raw.id ?? `${model}@${raw.reasoning ?? 'none'}${raw.fast === true ? ':fast' : ''}`),
    model,
    provider: providerOf(model),
    reasoning: typeof raw.reasoning === 'string' && raw.reasoning ? raw.reasoning : null,
    fast: raw.fast === true,
    scores,
    overall: present.length === METRIC_KEYS.length ? present.reduce((a, b) => a + b, 0) / present.length : null,
    latencyP50Ms: num(raw.latencyP50Ms),
    lowSamples: raw.lowSamples === true,
    detailsAvailable: raw.detailsAvailable === true,
  };
}

function readMeasurement(value: unknown): BenchmarkMeasurement | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Raw;
  return {
    latency: String(raw.latency ?? 'Time to first complete sentence'),
    window: String(raw.window ?? '24 hours'),
    basis: String(raw.basis ?? ''),
  };
}

// Returns null when the API is unreachable so the page can show a calm empty
// state instead of failing the render.
export async function getBenchmarks(): Promise<BenchmarkData | null> {
  try {
    // The timeout keeps a hanging API from stalling the build or an ISR
    // regeneration; Next still caches fetches that carry a signal.
    const response = await fetch(BENCHMARKS_API, {
      next: { revalidate: 300, tags: ['benchmarks'] },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const raw = (await response.json()) as Raw;
    const models = Array.isArray(raw.models)
      ? raw.models.map((m) => readModel(m as Raw)).filter((m): m is BenchmarkModel => m !== null)
      : [];
    return {
      benchmarkVersion: num(raw.benchmarkVersion),
      updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : null,
      stale: raw.stale === true,
      measurement: readMeasurement(raw.measurement),
      models,
    };
  } catch {
    return null;
  }
}

function readHistory(value: unknown): LatencyPoint[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      const raw = (entry ?? {}) as Raw;
      const latency = (raw.latency ?? {}) as Raw;
      const t = num(raw.time);
      if (t === null) return null;
      return { t, p50: num(latency.p50Ms), p95: num(latency.p95Ms), errorRate: num(raw.errorRate) };
    })
    .filter((p): p is LatencyPoint => p !== null)
    .sort((a, b) => a.t - b.t);
}

export async function getBenchmarkDetail(id: string, signal?: AbortSignal): Promise<BenchmarkDetail> {
  const response = await fetch(`${BENCHMARKS_API}/${encodeURIComponent(id)}`, { signal });
  if (!response.ok) throw new Error(`Detail request failed (${response.status})`);
  const raw = (await response.json()) as Raw;
  const detail = (raw.detail ?? {}) as Raw;
  const latency = (detail.latency ?? {}) as Raw;
  return {
    p50Ms: num(latency.p50Ms),
    p95Ms: num(latency.p95Ms),
    errorRate: num(detail.errorRate),
    history24h: readHistory(detail.history24h),
    history7d: readHistory(detail.history7d),
  };
}

export function formatPercent(value: number | null | undefined): string {
  return value == null ? '-' : `${(value * 100).toFixed(1)}%`;
}

const msFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export function formatMs(value: number | null | undefined, approximate = false): string {
  return value == null ? '-' : `${approximate ? '~' : ''}${msFormat.format(value)} ms`;
}

export function sortValue(model: BenchmarkModel, key: SortKey): number | null {
  if (key === 'overall') return model.overall;
  if (key === 'latency') return model.latencyP50Ms;
  return model.scores[key]?.accuracy ?? null;
}

// The API reports "none" for models run without reasoning. It stays a real
// filter value, but it is not worth printing next to the model name.
export function reasoningLabel(reasoning: string | null): string | null {
  return reasoning && reasoning !== 'none' ? reasoning : null;
}

export function variantLabel(model: Pick<BenchmarkModel, 'reasoning' | 'fast'>): string {
  const reasoning = reasoningLabel(model.reasoning);
  return [reasoning ? `${reasoning} reasoning` : null, model.fast ? 'fast' : null]
    .filter(Boolean)
    .join(' · ');
}
