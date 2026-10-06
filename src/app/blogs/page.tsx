import type { Metadata } from 'next';
import Link from 'next/link';
import BlogPostCard from '@/components/blog/BlogPostCard';
import CTASection from '@/components/sections/CTASection';
import PaginationNav from '@/components/ui/PaginationNav';
import { normalizeBlogPageNumber, paginateBlogPosts } from '@/lib/blog-posts';
import { getBlogPosts, getBlogTopics, getCaseStudies } from '@/lib/cms/blog';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

type Props = {
  searchParams?: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = searchParams ? await searchParams : undefined;
  const requestedPage = normalizeBlogPageNumber(params?.page);
  const currentPage = paginateBlogPosts(await getBlogPosts(), requestedPage).currentPage;
  const title = currentPage > 1 ? `UponAI Blogs - Page ${currentPage}` : 'UponAI Blogs';
  const path = currentPage > 1 ? `/blogs?page=${currentPage}` : '/blogs';

  return buildPageMetadata({
    title,
    description:
      'Read the latest UponAI articles on AI voice systems, call automation, routing, and communications workflows.',
    path,
  });
}

export default async function BlogsPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const requestedPage = normalizeBlogPageNumber(params?.page);
  const [posts, topics, caseStudies] = await Promise.all([
    getBlogPosts(),
    getBlogTopics(),
    getCaseStudies(),
  ]);
  const featuredCaseStudies = caseStudies.slice(0, 3);
  const archive = paginateBlogPosts(posts, requestedPage);
  const archivePath = archive.currentPage > 1 ? `/blogs?page=${archive.currentPage}` : '/blogs';

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
  ]);
  const collectionSchema = buildCollectionPageSchema({
    name: 'UponAI Blogs',
    description:
      'A collection of UponAI articles covering AI voice systems, call automation, routing, and communications workflows.',
    path: archivePath,
    items: archive.items.map((post) => ({
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
          <div className="max-w-4xl">
            <div className="theme-pill-primary inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#1e78cc] shadow-[0_0_16px_rgba(30,120,204,0.75)]" />
              Insights From UponAI
            </div>

            <h1 className="theme-heading mt-7 max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Powering
              <span className="block text-[#1e78cc]">Tomorrow&apos;s Conversations</span>
            </h1>

            <p className="theme-body mt-7 max-w-3xl text-lg leading-8 md:text-xl">
              Browse the latest UponAI writing on AI voice systems, communications workflows,
              routing, automation, and how these tools behave in real business environments.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Latest Posts</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Imported UponAI articles, rebuilt inside the main site.</h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              This library now includes the live blog plus missing older UponAI posts that were still stranded in the legacy preview site.
            </p>
          </div>

          <div className="theme-card mb-8 flex flex-col gap-3 rounded-[1.5rem] p-5 md:flex-row md:items-center md:justify-between">
            <p className="theme-body text-sm leading-7 md:text-base">
              Showing page <span className="font-semibold text-[var(--text-strong)]">{archive.currentPage}</span> of{' '}
              <span className="font-semibold text-[var(--text-strong)]">{archive.totalPages}</span> from{' '}
              <span className="font-semibold text-[var(--text-strong)]">{archive.totalItems}</span> imported UponAI posts.
            </p>
            <p className="theme-soft text-sm leading-7">
              Archive pages are now paginated to keep the main blog fast while preserving the full library.
            </p>
          </div>

          {featuredCaseStudies.length ? (
            <div className="theme-card mb-10 rounded-[2rem] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">
                    Customer Stories
                  </p>
                  <h2 className="theme-heading mt-3 text-2xl font-bold md:text-4xl">
                    What partners report after running UponAI in production.
                  </h2>
                </div>
                <Link href="/case-studies" className="theme-link-muted shrink-0 text-sm font-semibold">
                  View all case studies
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {featuredCaseStudies.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    className="theme-section-alt rounded-[1.5rem] p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                      Case Study
                    </p>
                    <h3 className="theme-heading mt-3 text-xl font-semibold leading-tight">{post.title}</h3>
                    <p className="theme-soft mt-3 text-sm leading-7">{post.excerpt}</p>
                    <span className="theme-link-muted mt-4 inline-flex text-sm font-semibold">Read Story</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="theme-card mb-10 rounded-[2rem] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">
                  Explore By Topic
                </p>
                <h2 className="theme-heading mt-3 text-2xl font-bold md:text-4xl">
                  Topic pages group the strongest UponAI content into tighter SEO clusters.
                </h2>
              </div>
              <p className="theme-soft max-w-2xl text-sm leading-7 md:text-base">
                Use these topic hubs to move between telecom partnership content, AI voice operations, business continuity, and integration strategy without relying on a flat archive alone.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/blogs/topics/${topic.slug}`}
                  className="theme-section-alt rounded-[1.5rem] p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                    Topic Hub
                  </p>
                  <h3 className="theme-heading mt-3 text-xl font-semibold">{topic.title}</h3>
                  <p className="theme-soft mt-3 text-sm leading-7">{topic.description}</p>
                  <span className="theme-link-muted mt-4 inline-flex text-sm font-semibold">View Topic</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {archive.items.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} topics={topics} index={index} />
            ))}
          </div>

          <PaginationNav
            basePath="/blogs"
            currentPage={archive.currentPage}
            totalPages={archive.totalPages}
          />
        </div>
      </section>

      <CTASection
        heading="Want To Turn Blog Interest Into Conversations?"
        subheading="Book a demo to see how UponAI can connect content, inbound inquiries, and AI voice workflows into one operating system."
      />
    </>
  );
}
