import { unstable_cache } from 'next/cache';
import {
  uponaiBlogPosts as localBlogPosts,
  uponaiBlogTopics as localBlogTopics,
  type UponAIBlogPost,
  type UponAIBlogTopic,
} from '@/lib/blog-posts';
import { CMS_TAG_POSTS, CMS_TAG_TOPICS, sanityConfigured, sanityQuery } from '@/lib/cms/sanity';

// Blog content from Sanity, returned in the exact UponAIBlogPost and
// UponAIBlogTopic shapes the routes already render, so the page components did
// not change when the source did. Without Sanity env vars the local library in
// blog-posts.ts is used, which keeps builds working before the CMS env lands
// on a server and gives a fallback if the API is unreachable.

// An uploaded hero image wins over the legacy imageUrl string, and both land
// in the same imageUrl field, so the pages render either without knowing which
// one they got.
const POST_PROJECTION = `{
  "slug": slug.current,
  title,
  excerpt,
  author,
  category,
  publishedAt,
  "imageUrl": coalesce(image.asset->url, imageUrl),
  "imageAlt": image.alt,
  "videoUrl": video.asset->url,
  "videoCaption": video.caption,
  readTimeMinutes,
  body,
  topicSlugs,
  tags,
  aliases,
  htmlBody,
  "relatedPages": relatedPages[]{label, path}
}`;

type RawPost = Partial<UponAIBlogPost> & { slug?: string };

function normalizePost(raw: RawPost): UponAIBlogPost {
  return {
    slug: raw.slug ?? '',
    title: raw.title ?? '',
    excerpt: raw.excerpt ?? '',
    author: raw.author ?? '',
    category: raw.category ?? '',
    publishedAt: raw.publishedAt ?? new Date(0).toISOString(),
    imageUrl: raw.imageUrl ?? '',
    ...(raw.imageAlt ? { imageAlt: raw.imageAlt } : {}),
    ...(raw.videoUrl ? { videoUrl: raw.videoUrl } : {}),
    ...(raw.videoCaption ? { videoCaption: raw.videoCaption } : {}),
    readTimeMinutes: raw.readTimeMinutes ?? 0,
    body: raw.body ?? [],
    topicSlugs: raw.topicSlugs ?? [],
    relatedPages: raw.relatedPages ?? [],
    ...(raw.htmlBody ? { htmlBody: raw.htmlBody } : {}),
    ...(raw.tags?.length ? { tags: raw.tags } : {}),
    ...(raw.aliases?.length ? { aliases: raw.aliases } : {}),
  };
}

const fetchPosts = unstable_cache(
  async (): Promise<UponAIBlogPost[]> => {
    if (!sanityConfigured()) return localBlogPosts;
    const raw = await sanityQuery<RawPost[]>(
      `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)${POST_PROJECTION}`
    );
    if (!raw?.length) return localBlogPosts;
    return raw.map(normalizePost);
  },
  ['cms-posts'],
  { tags: [CMS_TAG_POSTS] }
);

const fetchTopics = unstable_cache(
  async (): Promise<UponAIBlogTopic[]> => {
    if (!sanityConfigured()) return localBlogTopics;
    const raw = await sanityQuery<UponAIBlogTopic[]>(
      `*[_type == "blogTopic" && defined(slug.current)]{"slug": slug.current, title, description}`
    );
    if (!raw?.length) return localBlogTopics;
    // Preserve the curated order the site has always shown topics in; any
    // topic added in the CMS lands after the known ones.
    const order = new Map(localBlogTopics.map((topic, index) => [topic.slug, index]));
    return [...raw].sort(
      (left, right) =>
        (order.get(left.slug) ?? Number.MAX_SAFE_INTEGER) -
        (order.get(right.slug) ?? Number.MAX_SAFE_INTEGER)
    );
  },
  ['cms-topics'],
  { tags: [CMS_TAG_TOPICS] }
);

export async function getBlogPosts(): Promise<UponAIBlogPost[]> {
  return fetchPosts();
}

export async function getBlogTopics(): Promise<UponAIBlogTopic[]> {
  return fetchTopics();
}

export async function getBlogPost(slug: string): Promise<UponAIBlogPost | undefined> {
  const posts = await fetchPosts();
  return posts.find((post) => post.slug === slug || post.aliases?.includes(slug));
}

export async function getBlogTopic(slug: string): Promise<UponAIBlogTopic | undefined> {
  const topics = await fetchTopics();
  return topics.find((topic) => topic.slug === slug);
}

export async function getBlogPostsByTopic(slug: string): Promise<UponAIBlogPost[]> {
  const posts = await fetchPosts();
  return posts.filter((post) => post.topicSlugs.includes(slug));
}
