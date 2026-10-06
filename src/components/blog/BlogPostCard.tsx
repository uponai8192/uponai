import Image from 'next/image';
import Link from 'next/link';
import type { UponAIBlogPost, UponAIBlogTopic } from '@/lib/blog-posts';

// One blog card, shared by the blog archive, the topic pages and the case
// studies hub so the three grids cannot drift apart again.

function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

type Props = {
  post: UponAIBlogPost;
  topics: UponAIBlogTopic[];
  /** Alternates the category pill colour across a grid. */
  index: number;
  /** Button label, "Read Article" for posts and "Read Story" for case studies. */
  ctaLabel?: string;
};

export default function BlogPostCard({ post, topics, index, ctaLabel = 'Read Article' }: Props) {
  return (
    <article className="theme-panel overflow-hidden rounded-[2rem]">
      <div className="theme-section-alt aspect-[16/9] overflow-hidden border-b border-[var(--border)]">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt ?? post.title}
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          unoptimized
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span
            className={`rounded-full px-3 py-1 font-semibold ${
              index % 2 === 0 ? 'theme-pill-primary' : 'theme-pill-accent'
            }`}
          >
            {post.category}
          </span>
          <span className="theme-subtle">{formatBlogDate(post.publishedAt)}</span>
          <span className="theme-subtle">{post.readTimeMinutes.toFixed(1)} min read</span>
        </div>

        <h3 className="theme-heading mt-5 text-2xl font-semibold leading-tight">{post.title}</h3>
        <p className="theme-soft mt-4 text-sm leading-7">{post.excerpt}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.topicSlugs.map((slug) => {
            const topic = topics.find((entry) => entry.slug === slug);
            if (!topic) return null;

            return (
              <Link
                key={slug}
                href={`/blogs/topics/${slug}`}
                className="theme-card-soft rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)] transition-colors hover:text-[var(--text-strong)]"
              >
                {topic.title}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="theme-subtle text-sm">By {post.author}</p>
          <Link
            href={`/post/${post.slug}`}
            className="theme-primary-button rounded-full px-4 py-2 text-sm font-bold"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
