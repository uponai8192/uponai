import { SCORE_KEYS, type BenchmarkModel, type ScoreKey } from '@/lib/benchmarks';

// Rank within the models this page lists. The feed omits source-wide ranks on
// purpose (the catalog is a filtered subset), so every rank says "of N listed".
export type Rank = { rank: number; of: number };
export type Ranks = Map<string, { scores: Partial<Record<ScoreKey, Rank>>; latency: Rank | null }>;

export function computeRanks(models: BenchmarkModel[]): Ranks {
  const ranks: Ranks = new Map(models.map((m) => [m.id, { scores: {}, latency: null }]));
  for (const key of SCORE_KEYS) {
    const scored = models.filter((m) => m.scores[key]).sort((a, b) => b.scores[key]!.accuracy - a.scores[key]!.accuracy);
    scored.forEach((m, i) => (ranks.get(m.id)!.scores[key] = { rank: i + 1, of: scored.length }));
  }
  const timed = models.filter((m) => m.latencyP50Ms !== null).sort((a, b) => a.latencyP50Ms! - b.latencyP50Ms!);
  timed.forEach((m, i) => (ranks.get(m.id)!.latency = { rank: i + 1, of: timed.length }));
  return ranks;
}

// A neutral monogram instead of vendor logos: the feed carries no upstream
// branding, and the site does not ship third-party marks.
export function ProviderMark({ provider, size = 'md' }: { provider: string; size?: 'sm' | 'md' }) {
  const initials = provider === 'OpenAI' ? 'OA' : provider === 'xAI' ? 'xA' : provider.slice(0, 2);
  return (
    <span
      aria-hidden="true"
      className={`theme-pill-primary inline-flex shrink-0 items-center justify-center rounded-lg font-semibold tracking-tight ${
        size === 'sm' ? 'size-6 text-[0.625rem]' : 'size-8 text-xs'
      }`}
    >
      {initials}
    </span>
  );
}

export function ModelBadges({ model }: { model: BenchmarkModel }) {
  if (!model.fast && !model.speechToSpeech) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      {model.fast ? (
        <span className="theme-pill-primary rounded-md px-1.5 py-0.5 text-[0.6875rem] font-medium">Fast</span>
      ) : null}
      {model.speechToSpeech ? (
        <span className="theme-pill-accent rounded-md px-1.5 py-0.5 text-[0.6875rem] font-medium" title="Speech-to-speech">
          S2S
        </span>
      ) : null}
    </span>
  );
}
