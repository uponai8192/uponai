import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cmsPocEnabled, getCmsPocPost } from '@/lib/cms-poc/source';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await getCmsPocPost(slug);
  return {
    title: post ? `CMS PoC: ${post.title}` : 'CMS PoC',
    robots: { index: false, follow: false },
  };
}

export default async function CmsPocBlogPostPage({ params }: Props) {
  if (!cmsPocEnabled()) notFound();
  const { slug } = await params;
  const { data: post, source, loadedAt } = await getCmsPocPost(slug);
  if (!post) notFound();

  return (
    <section className="px-4 py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/cms-poc/blog" className="theme-link-muted text-sm">
          Back to CMS PoC list
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--brand-accent-text)]">
          {post.category}
        </p>
        <h1 className="theme-heading mt-3 text-4xl font-bold leading-tight">{post.title}</h1>
        <p className="theme-soft mt-4 text-sm uppercase tracking-[0.18em]">
          By {post.author} · {new Date(post.publishedAt).toLocaleDateString('en-US')}
        </p>
        <p className="theme-soft mt-2 text-xs">
          Source: {source} · cached snapshot loaded at {loadedAt}
        </p>

        <div className="mt-8 space-y-6">
          {post.body.map((paragraph) => (
            <p key={paragraph} className="theme-body text-base leading-8">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
