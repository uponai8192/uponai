import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import CTASection from '@/components/sections/CTASection';
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';
import { getUponAIBlogPost, getUponAIBlogTopic, uponaiBlogPosts } from '@/lib/blog-posts';

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function toPlainText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6|blockquote|section|article)>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateStaticParams() {
  return uponaiBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getUponAIBlogPost(slug);
  if (!post) return {};

  return {
    ...buildPageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/post/${post.slug}`,
      openGraphDescription: post.excerpt,
      image: post.imageUrl,
    }),
    robots: slug === post.slug ? undefined : { index: false, follow: false },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getUponAIBlogPost(slug);
  if (!post) notFound();
  if (slug !== post.slug) permanentRedirect(`/post/${post.slug}`);
  const articleBody = post.htmlBody ? toPlainText(post.htmlBody) : post.body.join('\n\n');
  const relatedPosts = uponaiBlogPosts
    .filter(
      (entry) =>
        entry.slug !== post.slug && entry.topicSlugs.some((topicSlug) => post.topicSlugs.includes(topicSlug))
    )
    .slice(0, 3);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: post.title, path: `/post/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [post.imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/post/${post.slug}`,
    articleSection: post.category,
    articleBody,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="relative overflow-hidden px-4 pb-16 pt-12 md:pb-20 md:pt-20">
        <div className="absolute inset-0">
          <div className="absolute left-[6%] top-8 h-56 w-56 rounded-full bg-[#22c55e]/16 blur-3xl" />
          <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-[#54d2ff]/14 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <nav className="mb-8 flex items-center gap-2 text-sm theme-soft">
            <Link href="/" className="theme-link-muted">
              Home
            </Link>
            <span className="theme-subtle">/</span>
            <Link href="/blogs" className="theme-link-muted">
              Blogs
            </Link>
            <span className="theme-subtle">/</span>
            <span className="theme-heading line-clamp-1">{post.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="theme-pill-green inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_16px_rgba(34,197,94,0.75)]" />
              {post.category}
            </div>
            <h1 className="theme-heading mt-7 text-4xl font-bold leading-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="theme-body mt-6 text-lg leading-8 md:text-xl">{post.excerpt}</p>

            <div className="theme-soft mt-6 flex flex-wrap gap-4 text-sm uppercase tracking-[0.18em]">
              <span>By {post.author}</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>{post.readTimeMinutes.toFixed(1)} min read</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.topicSlugs.map((topicSlug) => {
                const topic = getUponAIBlogTopic(topicSlug);
                if (!topic) return null;

                return (
                  <Link
                    key={topic.slug}
                    href={`/blogs/topics/${topic.slug}`}
                    className="theme-card-soft rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)] transition-colors hover:text-[var(--text-strong)]"
                  >
                    {topic.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-5xl">
          <div className="theme-panel overflow-hidden rounded-[2rem]">
            <div className="theme-section-alt aspect-[16/9] overflow-hidden border-b border-[var(--border)]">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1600}
                height={900}
                className="h-full w-full object-cover"
                unoptimized
                priority
              />
            </div>

            <article className="p-6 md:p-10">
              <div className="theme-card rounded-[1.5rem] p-5">
                <p className="theme-body text-sm leading-7">
                  This article is part of the local UponAI blog library and focuses on practical AI voice and
                  communications workflow lessons that matter in live business environments.
                </p>
              </div>

              {post.htmlBody ? (
                <div
                  className="theme-body mt-8 space-y-6 text-base leading-8 md:text-lg [&_a]:font-semibold [&_a]:text-[var(--brand-green-text)] [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--border-strong)] [&_blockquote]:pl-4 [&_em]:italic [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:my-8 [&_img]:rounded-[1.25rem] [&_li]:ml-5 [&_li]:list-disc [&_ol]:space-y-3 [&_p]:mb-6 [&_strong]:font-semibold [&_ul]:space-y-3"
                  dangerouslySetInnerHTML={{ __html: post.htmlBody }}
                />
              ) : (
                <div className="mt-8 space-y-6">
                  {post.body.map((paragraph) => (
                    <p key={paragraph} className="theme-body text-base leading-8 md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="theme-section-alt mt-10 rounded-[1.5rem] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--brand-cyan-text)]">
                  What This Means
                </p>
                <p className="theme-body mt-4 text-base leading-8">
                  UponAI content is built around production use, not generic AI positioning. The goal is to help teams
                  understand how routing, call handling, automation, and human handoff behave once the system is part of
                  daily operations.
                </p>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="theme-card rounded-[1.5rem] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--brand-green-text)]">
                    Related Solutions
                  </p>
                  <div className="mt-4 space-y-3">
                    {post.relatedPages.map((page) => {
                      const external = page.path.startsWith('http');

                      return (
                        <Link
                          key={page.path}
                          href={page.path}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noreferrer' : undefined}
                          className="theme-section-alt block rounded-[1.25rem] px-4 py-4 text-sm font-semibold transition-colors hover:text-[var(--text-strong)]"
                        >
                          {page.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="theme-card rounded-[1.5rem] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--brand-cyan-text)]">
                    Explore Related Reading
                  </p>
                  <div className="mt-4 space-y-3">
                    {relatedPosts.map((entry) => (
                      <Link
                        key={entry.slug}
                        href={`/post/${entry.slug}`}
                        className="theme-section-alt block rounded-[1.25rem] px-4 py-4 transition-colors hover:text-[var(--text-strong)]"
                      >
                        <p className="theme-heading text-base font-semibold leading-7">{entry.title}</p>
                        <p className="theme-soft mt-2 text-sm leading-6">{entry.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <CTASection
        heading="Want To See These Workflows In Practice?"
        subheading="Book a demo to see how UponAI turns inbound demand, AI voice handling, and human escalation into one operating workflow."
      />
    </>
  );
}
