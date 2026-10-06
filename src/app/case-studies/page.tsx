import type { Metadata } from 'next';
import Link from 'next/link';
import BlogPostCard from '@/components/blog/BlogPostCard';
import CTASection from '@/components/sections/CTASection';
import { getBlogTopics, getCaseStudies } from '@/lib/cms/blog';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

const DESCRIPTION =
  'Customer case studies from UponAI partners and resellers: what they deployed, what changed, and the numbers they reported.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Customer Case Studies',
  description: DESCRIPTION,
  path: '/case-studies',
});

export default async function CaseStudiesPage() {
  const [caseStudies, topics] = await Promise.all([getCaseStudies(), getBlogTopics()]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
  ]);
  const collectionSchema = buildCollectionPageSchema({
    name: 'UponAI Customer Case Studies',
    description: DESCRIPTION,
    path: '/case-studies',
    items: caseStudies.map((post) => ({
      name: post.title,
      path: `/post/${post.slug}`,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="relative overflow-hidden px-4 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="absolute inset-0">
          <div className="absolute left-[8%] top-8 h-56 w-56 rounded-full bg-[#1e78cc]/16 blur-3xl" />
          <div className="absolute right-[12%] top-24 h-72 w-72 rounded-full bg-[#63ade5]/14 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-2 text-sm theme-soft">
            <Link href="/" className="theme-link-muted">
              Home
            </Link>
            <span className="theme-subtle">/</span>
            <span className="theme-heading">Case Studies</span>
          </nav>

          <div className="max-w-4xl">
            <div className="theme-pill-primary inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#1e78cc] shadow-[0_0_16px_rgba(30,120,204,0.75)]" />
              Customer Stories
            </div>

            <h1 className="theme-heading mt-7 max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Proof From
              <span className="block text-[#1e78cc]">Production Phone Lines</span>
            </h1>

            <p className="theme-body mt-7 max-w-3xl text-lg leading-8 md:text-xl">
              Telecom partners and resellers who run UponAI on their own numbers and their customers&apos;
              numbers, in their own words: the setup, what moved, and what they would tell the next
              provider evaluating AI voice.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">
                Case Studies
              </p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Interviews with the people who deployed it.
              </h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              Figures come straight from the customer interviews, with estimates labelled as estimates.
            </p>
          </div>

          {caseStudies.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {caseStudies.map((post, index) => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  topics={topics}
                  index={index}
                  ctaLabel="Read Story"
                />
              ))}
            </div>
          ) : (
            <div className="theme-card rounded-[2rem] p-8">
              <p className="theme-body text-base leading-7">
                Customer stories are on the way. In the meantime, the{' '}
                <Link href="/blogs" className="theme-link-muted font-semibold">
                  blog
                </Link>{' '}
                covers how UponAI behaves in production.
              </p>
            </div>
          )}

          <div className="theme-card mt-12 flex flex-col gap-4 rounded-[1.5rem] p-6 md:flex-row md:items-center md:justify-between">
            <p className="theme-body text-sm leading-7 md:text-base">
              Looking for the wider library? The blog covers AI voice operations, telecom partnerships,
              business continuity and integration strategy.
            </p>
            <Link href="/blogs" className="theme-link-muted shrink-0 text-sm font-semibold">
              Browse all articles
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        heading="Want Results Like These On Your Own Platform?"
        subheading="Book a demo and we will walk through how partners like these went from internal pilot to customer rollout."
      />
    </>
  );
}
