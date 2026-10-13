// Shared Sanity access for CMS-backed content (docs/cms-migration-spike.md).
//
// Queries go to the uncached `api.` host rather than `apicdn.`: Next's tagged
// cache is the caching layer, and the CDN's query cache is eventually
// consistent, so a revalidate webhook firing seconds after a publish could
// otherwise re-cache the pre-publish result. One origin request per
// regeneration.

import { unstable_cache } from 'next/cache';
import { unstable_rethrow } from 'next/navigation';
import { cache } from 'react';

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

function sanityConfig(): SanityConfig | null {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!projectId || !dataset) return null;
  return { projectId, dataset, apiVersion: process.env.SANITY_API_VERSION ?? 'v2025-02-19' };
}

export function sanityConfigured() {
  return sanityConfig() !== null;
}

const SANITY_TIMEOUT_MS = 5000;

export async function sanityQuery<T>(query: string): Promise<T | null> {
  const config = sanityConfig();
  if (!config) return null;

  const url =
    `https://${config.projectId}.api.sanity.io/${config.apiVersion}/data/query/${config.dataset}` +
    `?query=${encodeURIComponent(query)}`;

  // The unstable_cache wrappers around each caller provide caching and
  // tagging, so this request must not be cached a second time here. The
  // timeout turns a hung connection into an error, which withCmsFallback below
  // serves as fallback content rather than leaving the page waiting.
  const response = await fetch(url, {
    cache: 'no-store',
    signal: AbortSignal.timeout(SANITY_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`);
  }
  const payload = (await response.json()) as { result: T | null };
  return payload.result;
}

// Wraps a cached CMS reader so a failed Sanity request (network error, timeout,
// non-OK response) renders the in-repo fallback instead of crashing the page.
//
// The catch has to sit outside unstable_cache, not inside sanityQuery: a reader
// that swallowed the error and returned fallback content would have that
// fallback cached under its tag until the next publish webhook, so a brief
// outage could pin stale copy for days. A rejected promise is never cached, so
// the next request retries Sanity.
//
// The same applies one level up: a static page prerendered from fallback copy
// would otherwise sit in the full route cache until the next publish. Calling
// an unstable_cache with a numeric revalidate during a prerender lowers the
// page's own revalidate to that value, so a page built from fallback content
// regenerates (and retries Sanity) about a minute later. Outside a prerender
// it has no effect on the response.
//
// The wrapper is memoised per request with React's cache(). unstable_cache
// does not share a failure between callers, so without it a page that reads
// the same collection twice (generateMetadata and the page body, or two
// readers over one collection) paid one Sanity timeout and one log line per
// call during an outage.
const CMS_FALLBACK_REVALIDATE_SECONDS = 60;
const shortenPageLifetime = unstable_cache(async () => true, ['cms-fallback-render'], {
  revalidate: CMS_FALLBACK_REVALIDATE_SECONDS,
});

export function withCmsFallback<Args extends unknown[], Result>(
  label: string,
  read: (...args: Args) => Promise<Result>,
  fallback: (...args: Args) => NoInfer<Result>
): (...args: Args) => Promise<Result> {
  return cache(async (...args: Args) => {
    try {
      return await read(...args);
    } catch (error) {
      // Next signals notFound, redirects and dynamic rendering by throwing;
      // those must keep propagating rather than being served as a fallback.
      unstable_rethrow(error);
      console.error(`[cms] ${label} failed, serving in-repo fallback:`, error);
      // Best effort: the fallback is the safety property, so a failure here
      // must not mask the original error or skip the fallback.
      try {
        await shortenPageLifetime();
      } catch {}
      return fallback(...args);
    }
  });
}
