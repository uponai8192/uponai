import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cmsPocEnabled, getCmsPocPosts } from '@/lib/cms-poc/source';

export const metadata: Metadata = {
  title: 'CMS PoC: Blog',
  robots: { index: false, follow: false },
};

export default async function CmsPocBlogListPage() {
  if (!cmsPocEnabled()) notFound();
  const { data: posts, source, loadedAt } = await getCmsPocPosts();

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--brand-accent-text)]">
          CMS migration spike, throwaway route
        </p>
        <h1 className="theme-heading mt-4 text-4xl font-bold">Blog posts from the CMS source</h1>
        <p className="theme-soft mt-3 text-sm">
          Source: {source} · cached snapshot loaded at {loadedAt}
        </p>

        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/cms-poc/blog/${post.slug}`}
              className="theme-card block rounded-[1.5rem] p-6 transition-colors hover:text-[var(--text-strong)]"
            >
              <p className="theme-soft text-xs uppercase tracking-[0.18em]">{post.category}</p>
              <h2 className="theme-heading mt-2 text-xl font-semibold">{post.title}</h2>
              <p className="theme-body mt-2 text-sm leading-6">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
