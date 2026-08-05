import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { unstable_cache } from 'next/cache';

// Proof-of-concept content source for the CMS migration spike
// (docs/cms-migration-spike.md). Reads a local mock JSON file by default so
// the publish-to-revalidate loop can be demonstrated without a Sanity
// project. When SANITY_PROJECT_ID and SANITY_DATASET are set it queries the
// Sanity Content Lake HTTP API instead, using the same cache tags, so the
// swap to a real CMS changes nothing downstream.

export type CmsPocPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedAt: string;
  body: string[];
};

export type CmsPocResult<T> = {
  data: T;
  source: 'mock-file' | 'sanity';
  loadedAt: string;
};

export const CMS_POC_POSTS_TAG = 'cms-poc-posts';

export function cmsPocPostTag(slug: string) {
  return `cms-poc-post:${slug}`;
}

// PoC routes are visible in dev, and hidden in production unless CMS_POC=1
// is set, so merging the branch cannot leak them.
export function cmsPocEnabled() {
  return process.env.CMS_POC === '1' || process.env.NODE_ENV !== 'production';
}

const MOCK_FILE = path.join(process.cwd(), 'cms-poc-content', 'posts.json');

function sanityConfig() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!projectId || !dataset) return null;
  return { projectId, dataset, apiVersion: process.env.SANITY_API_VERSION ?? 'v2025-02-19' };
}

async function loadPostsFromMockFile(): Promise<CmsPocPost[]> {
  const raw = await readFile(MOCK_FILE, 'utf8');
  return JSON.parse(raw) as CmsPocPost[];
}

async function loadPostsFromSanity(): Promise<CmsPocPost[]> {
  const config = sanityConfig();
  if (!config) throw new Error('Sanity is not configured');

  const query = `*[_type == "post"]|order(publishedAt desc){
    "slug": slug.current, title, excerpt, author, category, publishedAt, body
  }`;
  // Query the uncached api host, not apicdn: Next's tagged cache is the
  // caching layer here, and the CDN's eventually-consistent query cache can
  // still serve the pre-publish result when the revalidate webhook fires
  // seconds after a mutation. One origin request per regeneration.
  const url =
    `https://${config.projectId}.api.sanity.io/${config.apiVersion}/data/query/${config.dataset}` +
    `?query=${encodeURIComponent(query)}`;

  // unstable_cache above provides the caching and tagging layer, so this
  // inner request must not be cached a second time by the fetch cache.
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`);
  }
  const payload = (await response.json()) as { result: CmsPocPost[] };
  return payload.result;
}

async function loadPosts(): Promise<CmsPocResult<CmsPocPost[]>> {
  const useSanity = sanityConfig() !== null;
  const data = useSanity ? await loadPostsFromSanity() : await loadPostsFromMockFile();
  return {
    data,
    source: useSanity ? 'sanity' : 'mock-file',
    loadedAt: new Date().toISOString(),
  };
}

export const getCmsPocPosts = unstable_cache(loadPosts, ['cms-poc-posts'], {
  tags: [CMS_POC_POSTS_TAG],
});

export async function getCmsPocPost(slug: string): Promise<CmsPocResult<CmsPocPost | null>> {
  const cached = unstable_cache(
    async () => {
      const { data, source, loadedAt } = await loadPosts();
      return {
        data: data.find((post) => post.slug === slug) ?? null,
        source,
        loadedAt,
      };
    },
    ['cms-poc-post', slug],
    { tags: [CMS_POC_POSTS_TAG, cmsPocPostTag(slug)] }
  );
  return cached();
}
