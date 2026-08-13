// Shared Sanity access for CMS-backed content (docs/cms-migration-spike.md).
//
// Queries go to the uncached `api.` host rather than `apicdn.`: Next's tagged
// cache is the caching layer, and the CDN's query cache is eventually
// consistent, so a revalidate webhook firing seconds after a publish could
// otherwise re-cache the pre-publish result. One origin request per
// regeneration.

export const CMS_TAG_HOME = 'cms-home';
export const CMS_TAG_POSTS = 'cms-posts';
export const CMS_TAG_TOPICS = 'cms-topics';
// One tag for industry pages and their city overrides: a vertical's copy feeds
// its own page and all ~305 of its city pages, so they invalidate together.
export const CMS_TAG_VERTICALS = 'cms-verticals';
// Nav, footer and legal pages: site chrome that renders on every page.
export const CMS_TAG_SETTINGS = 'cms-settings';
export const CMS_TAG_LEGAL = 'cms-legal';

export function cmsPostTag(slug: string) {
  return `cms-post:${slug}`;
}

type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

export function sanityConfig(): SanityConfig | null {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!projectId || !dataset) return null;
  return { projectId, dataset, apiVersion: process.env.SANITY_API_VERSION ?? 'v2025-02-19' };
}

export function sanityConfigured() {
  return sanityConfig() !== null;
}

export async function sanityQuery<T>(query: string): Promise<T | null> {
  const config = sanityConfig();
  if (!config) return null;

  const url =
    `https://${config.projectId}.api.sanity.io/${config.apiVersion}/data/query/${config.dataset}` +
    `?query=${encodeURIComponent(query)}`;

  // The unstable_cache wrappers around each caller provide caching and
  // tagging, so this request must not be cached a second time here.
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`);
  }
  const payload = (await response.json()) as { result: T | null };
  return payload.result;
}
