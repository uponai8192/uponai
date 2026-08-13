import { staticParamCities } from '@/lib/data';
import { getFeaturedCities, promotedVoiceAICityRoutes } from '@/lib/voice-ai-industries';

// Which city pages get built ahead of time, per industry page.
//
// Previously every city route prerendered all 305 cities, which is most of the
// 13,465-page production build the deployment server cannot finish. Now only
// the curated, high-value city routes are prerendered. Everything else renders
// on first request and is cached until a publish invalidates it, which is
// possible because no route sets dynamicParams = false: an unlisted city has
// always rendered on demand, and still does.
//
// Staging keeps its existing behaviour of a small fixed sample.

const FLOOR = 6;

export function prerenderedCityParams(verticalSlug: string): { city: string }[] {
  if (process.env.NEXT_PUBLIC_SITE_ENV === 'staging') {
    return staticParamCities.map((city) => ({ city: city.slug }));
  }

  const prefix = `/${verticalSlug}/`;
  const promoted = promotedVoiceAICityRoutes
    .filter((route) => route.startsWith(prefix))
    .map((route) => route.slice(prefix.length));

  // A vertical with few or no promoted routes still gets the top featured
  // cities, so every industry page has some prerendered city coverage.
  const floor = getFeaturedCities(FLOOR).map((city) => city.slug);

  return [...new Set([...promoted, ...floor])].map((city) => ({ city }));
}

// City pages that are not tied to a vertical: the industry, service and
// location routes. There is no curated promoted list for these the way there
// is for verticals, so the top featured cities are prerendered and every other
// city renders on first request.
export function prerenderedCitySlugs(): string[] {
  if (process.env.NEXT_PUBLIC_SITE_ENV === 'staging') {
    return staticParamCities.map((city) => city.slug);
  }
  return getFeaturedCities(FLOOR).map((city) => city.slug);
}

export function prerenderedPlainCityParams(): { city: string }[] {
  return prerenderedCitySlugs().map((city) => ({ city }));
}

// Entity x city routes such as /industries/[slug]/[city]. Prerendering the
// full cross product is what made the production build too large to finish:
// 22 industries x 305 cities is 6,710 pages from one route file.
export function prerenderedEntityCityParams(
  entitySlugs: string[]
): { slug: string; city: string }[] {
  const citySlugs = prerenderedCitySlugs();
  return entitySlugs.flatMap((slug) => citySlugs.map((city) => ({ slug, city })));
}
