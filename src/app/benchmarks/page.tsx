import type { Metadata } from 'next';
import BenchmarkBoard from '@/components/benchmarks/BenchmarkBoard';
import { buildPageMetadata } from '@/lib/seo';

// Served at uponai.com/benchmarks and, through src/middleware.ts, at the root
// of bench.uponai.com.
export const metadata: Metadata = buildPageMetadata({
  title: 'LLM Benchmarks for Voice AI Agents',
  description:
    'Compare the language models available on UponAI by instruction following, grounding, tool calling, conversational quality, and first-sentence latency.',
  path: '/benchmarks',
});

export default function BenchmarksPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="theme-pill-accent inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
            Model Benchmarks
          </div>
          <h1 className="theme-heading mt-6 text-5xl font-bold leading-[0.95] md:text-7xl">Voice AI model benchmark</h1>
          <p className="theme-soft mt-6 max-w-2xl text-lg leading-8">
            Compare quality and latency across the models available on UponAI, with filters that make the tradeoffs
            easier to see.
          </p>
        </div>
      </section>

      <section id="model-benchmarks" className="scroll-mt-28 pb-24">
        <BenchmarkBoard />
      </section>
    </>
  );
}
