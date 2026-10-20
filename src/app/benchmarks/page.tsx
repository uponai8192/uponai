import type { Metadata } from 'next';
import BenchmarkBoard from '@/components/benchmarks/BenchmarkBoard';
import CTASection from '@/components/sections/CTASection';
import { getBenchmarks } from '@/lib/benchmarks';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'LLM Benchmarks for Voice AI Agents | UponAI',
  description:
    'Compare instruction following, grounding, tool calling, conversational quality and latency across the LLMs available for UponAI voice agents.',
  path: '/benchmarks',
  openGraphDescription:
    'Live quality and latency benchmarks for every model you can run behind an UponAI voice agent.',
});

export default async function BenchmarksPage() {
  const data = await getBenchmarks();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Model Benchmarks', path: '/benchmarks' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative px-4 pb-4 pt-14 md:pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[var(--glow-cyan)] blur-3xl" />
          <div className="absolute right-[-6%] top-24 h-80 w-80 rounded-full bg-[var(--glow-green)] blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="theme-pill-accent inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
            Model Benchmarks
          </div>
          <h1 className="theme-heading mt-6 text-5xl font-bold leading-[0.95] md:text-7xl">
            Pick the brain{' '}
            <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)] bg-clip-text text-transparent">
              behind the voice
            </span>
          </h1>
          <p className="theme-soft mt-6 max-w-2xl text-lg leading-8">
            Quality and latency for every model available on UponAI, scored on the things that matter on a live call:
            following your rules, staying grounded, calling tools correctly and sounding natural.
          </p>
        </div>

        {data && data.models.length > 0 ? null : (
          <div className="theme-card relative mx-auto mt-12 max-w-xl rounded-[1.75rem] p-8 text-center">
            <p className="theme-heading text-lg font-semibold">Benchmarks are refreshing</p>
            <p className="theme-soft mt-2">
              The latest results could not be loaded right now. Check back in a few minutes.
            </p>
          </div>
        )}
      </section>

      {data && data.models.length > 0 ? <BenchmarkBoard data={data} /> : null}

      <CTASection
        heading="Not sure which model fits your calls?"
        subheading="Book a demo and we will match a model to your call flows, tools and latency budget, then let you hear the difference."
      />
    </>
  );
}
