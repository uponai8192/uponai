import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTASection from '@/components/sections/CTASection';
import PaginationNav from '@/components/ui/PaginationNav';
import {
  getUponAIBlogPostsByTopic,
  getUponAIBlogTopic,
  normalizeBlogPageNumber,
  paginateBlogPosts,
  uponaiBlogTopics,
} from '@/lib/blog-posts';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string | string[] }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function generateStaticParams() {
  return uponaiBlogTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const topic = getUponAIBlogTopic(slug);
  if (!topic) return {};
  const requestedPage = normalizeBlogPageNumber(resolvedSearchParams?.page);
  const currentPage = paginateBlogPosts(getUponAIBlogPostsByTopic(topic.slug), requestedPage).currentPage;
  const title = currentPage > 1 ? `${topic.title} Blogs - Page ${currentPage}` : `${topic.title} Blogs`;
  const path =
    currentPage > 1 ? `/blogs/topics/${topic.slug}?page=${currentPage}` : `/blogs/topics/${topic.slug}`;

  return buildPageMetadata({
    title,
    description: topic.description,
    path,
  });
}

export default async function BlogTopicPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const topic = getUponAIBlogTopic(slug);
  if (!topic) notFound();

  const requestedPage = normalizeBlogPageNumber(resolvedSearchParams?.page);
  const archive = paginateBlogPosts(getUponAIBlogPostsByTopic(topic.slug), requestedPage);
  const archivePath =
    archive.currentPage > 1
      ? `/blogs/topics/${topic.slug}?page=${archive.currentPage}`
      : `/blogs/topics/${topic.slug}`;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: topic.title, path: `/blogs/topics/${topic.slug}` },
  ]);
  const collectionSchema = buildCollectionPageSchema({
    name: `${topic.title} Blogs`,
    description: topic.description,
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

      <section className="relative overflow-hidden px-4 pb-14 pt-12 md:pb-20 md:pt-20">
        <div className="absolute inset-0">
          <div className="absolute left-[10%] top-10 h-56 w-56 rounded-full bg-[#22c55e]/16 blur-3xl" />
          <div className="absolute right-[8%] top-14 h-72 w-72 rounded-full bg-[#54d2ff]/14 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <nav className="mb-8 flex items-center gap-2 text-sm theme-soft">
            <Link href="/" className="theme-link-muted">
              Home
            </Link>
            <span className="theme-subtle">/</span>
            <Link href="/blogs" className="theme-link-muted">
              Blogs
            </Link>
            <span className="theme-subtle">/</span>
            <span className="theme-heading line-clamp-1">{topic.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="theme-pill-cyan inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#54d2ff] shadow-[0_0_16px_rgba(84,210,255,0.75)]" />
              Topic Archive
            </div>
            <h1 className="theme-heading mt-7 text-4xl font-bold leading-tight md:text-6xl">
              {topic.title}
            </h1>
            <p className="theme-body mt-6 max-w-3xl text-lg leading-8 md:text-xl">
              {topic.description}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap gap-3">
            {uponaiBlogTopics.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blogs/topics/${entry.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  entry.slug === topic.slug
                    ? 'theme-pill-green'
                    : 'theme-card-soft text-[var(--text-subtle)] hover:text-[var(--text-strong)]'
                }`}
              >
                {entry.title}
              </Link>
            ))}
          </div>

          <div className="theme-card mb-8 flex flex-col gap-3 rounded-[1.5rem] p-5 md:flex-row md:items-center md:justify-between">
            <p className="theme-body text-sm leading-7 md:text-base">
              Showing page <span className="font-semibold text-[var(--text-strong)]">{archive.currentPage}</span> of{' '}
              <span className="font-semibold text-[var(--text-strong)]">{archive.totalPages}</span> for{' '}
              <span className="font-semibold text-[var(--text-strong)]">{topic.title}</span>.
            </p>
            <p className="theme-soft text-sm leading-7">
              Topic archives are paginated to keep these SEO hubs crawlable without loading the full cluster at once.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {archive.items.map((post) => (
              <article key={post.slug} className="theme-panel overflow-hidden rounded-[2rem]">
                <div className="theme-section-alt aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={1200}
                    height={750}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                    unoptimized
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em]">
                    <span className="theme-pill-green rounded-full px-3 py-1 font-semibold">
                      {post.category}
                    </span>
                    <span className="theme-subtle">{formatDate(post.publishedAt)}</span>
                    <span className="theme-subtle">{post.readTimeMinutes.toFixed(1)} min read</span>
                  </div>

                  <h2 className="theme-heading mt-5 text-2xl font-semibold leading-tight">
                    {post.title}
                  </h2>
                  <p className="theme-soft mt-4 text-sm leading-7">{post.excerpt}</p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="theme-subtle text-sm">By {post.author}</p>
                    <Link
                      href={`/post/${post.slug}`}
                      className="theme-primary-button rounded-full px-4 py-2 text-sm font-bold"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <PaginationNav
            basePath={`/blogs/topics/${topic.slug}`}
            currentPage={archive.currentPage}
            totalPages={archive.totalPages}
          />
        </div>
      </section>

      <CTASection
        heading="Want These Workflows Applied To Your Business?"
        subheading="Book a demo to see how UponAI connects AI voice operations, inbound routing, and business continuity into one system."
      />
    </>
  );
}
