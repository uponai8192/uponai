import { unstable_cache } from 'next/cache';
import {
  getVoiceAICityPageOverride as getLocalCityOverride,
  voiceAIIndustryPages as localVerticals,
  type VoiceAICityPageOverride,
  type VoiceAIIndustryPage,
} from '@/lib/voice-ai-industries';
import { CMS_TAG_VERTICALS, sanityConfigured, sanityQuery } from '@/lib/cms/sanity';

// Industry landing pages ("verticals") from Sanity, returned in the existing
// VoiceAIIndustryPage shape so the page components did not change.
//
// image and imageAlt deliberately stay in code: they point at the brand photo
// manifest in src/lib/brand-photos.ts, which the site manages as build assets,
// and keeping them local means the route metadata can stay static. They are
// merged back onto each CMS document by slug below.

const VERTICAL_PROJECTION = `{
  "slug": slug.current,
  label,
  eyebrow,
  heroTitle,
  heroDescription,
  stats[]{value, label},
  workflowMoments[]{title, body},
  capabilityCards[]{title, body},
  outcomes,
  faqs[]{question, answer},
  localUseCaseTemplates,
  cityLead,
  citySupport,
  ctaHeading,
  ctaSubheading,
  integrations{title, body, examples, href, hrefLabel}
}`;

type RawVertical = Omit<VoiceAIIndustryPage, 'image' | 'imageAlt'> & { slug: string };

const localBySlug = new Map(localVerticals.map((page) => [page.slug, page]));

function normalizeVertical(raw: RawVertical): VoiceAIIndustryPage | null {
  // Routes are defined per vertical in code, so a CMS document whose slug does
  // not match a known route has nowhere to render and is skipped rather than
  // rendered into a broken page.
  const local = localBySlug.get(raw.slug);
  if (!local) return null;

  return {
    ...local,
    label: raw.label ?? local.label,
    eyebrow: raw.eyebrow ?? local.eyebrow,
    heroTitle: raw.heroTitle ?? local.heroTitle,
    heroDescription: raw.heroDescription ?? local.heroDescription,
    stats: raw.stats ?? local.stats,
    workflowMoments: raw.workflowMoments ?? local.workflowMoments,
    capabilityCards: raw.capabilityCards ?? local.capabilityCards,
    outcomes: raw.outcomes ?? local.outcomes,
    faqs: raw.faqs ?? local.faqs,
    localUseCaseTemplates: raw.localUseCaseTemplates ?? local.localUseCaseTemplates,
    cityLead: raw.cityLead ?? local.cityLead,
    citySupport: raw.citySupport ?? local.citySupport,
    ctaHeading: raw.ctaHeading ?? local.ctaHeading,
    ctaSubheading: raw.ctaSubheading ?? local.ctaSubheading,
    integrations: raw.integrations ?? local.integrations,
    // Kept from the code-side definition on purpose, see note above.
    image: local.image,
    imageAlt: local.imageAlt,
  };
}

const fetchVerticals = unstable_cache(
  async (): Promise<VoiceAIIndustryPage[]> => {
    if (!sanityConfigured()) return localVerticals;
    const raw = await sanityQuery<RawVertical[]>(
      `*[_type == "vertical" && defined(slug.current)]${VERTICAL_PROJECTION}`
    );
    if (!raw?.length) return localVerticals;

    const merged = raw
      .map(normalizeVertical)
      .filter((page): page is VoiceAIIndustryPage => page !== null);
    if (!merged.length) return localVerticals;

    // Preserve the order the site has always listed verticals in; the CMS has
    // no ordering field and the list drives navigation.
    const order = new Map(localVerticals.map((page, index) => [page.slug, index]));
    return merged.sort(
      (left, right) =>
        (order.get(left.slug) ?? Number.MAX_SAFE_INTEGER) -
        (order.get(right.slug) ?? Number.MAX_SAFE_INTEGER)
    );
  },
  ['cms-verticals'],
  { tags: [CMS_TAG_VERTICALS] }
);

const fetchCityOverrides = unstable_cache(
  async (): Promise<Record<string, VoiceAICityPageOverride>> => {
    if (!sanityConfigured()) return {};
    const raw = await sanityQuery<
      ({ verticalSlug: string; citySlug: string } & VoiceAICityPageOverride)[]
    >(`*[_type == "verticalCityOverride"]{
      "verticalSlug": vertical->slug.current,
      citySlug,
      heroTitle, heroDescription, marketHeadline, marketBody, regionTitle, regionBody,
      localUseCases, customHighlights[]{title, body}, ctaHeading, ctaSubheading
    }`);
    if (!raw?.length) return {};

    const map: Record<string, VoiceAICityPageOverride> = {};
    for (const entry of raw) {
      if (!entry.verticalSlug || !entry.citySlug) continue;
      const { verticalSlug, citySlug, ...override } = entry;
      map[`${verticalSlug}/${citySlug}`] = override;
    }
    return map;
  },
  ['cms-vertical-city-overrides'],
  { tags: [CMS_TAG_VERTICALS] }
);

export async function getVerticals(): Promise<VoiceAIIndustryPage[]> {
  return fetchVerticals();
}

export async function getVertical(slug: string): Promise<VoiceAIIndustryPage> {
  const pages = await fetchVerticals();
  const page = pages.find((entry) => entry.slug === slug);
  if (page) return page;

  // Routes are per vertical, so a missing document means the CMS is out of
  // step with the code rather than that the page should 404.
  const local = localBySlug.get(slug);
  if (!local) throw new Error(`Unknown voice AI industry page: ${slug}`);
  return local;
}

export async function getVerticalCityOverride(
  slug: string,
  citySlug: string
): Promise<VoiceAICityPageOverride | undefined> {
  if (!sanityConfigured()) return getLocalCityOverride(slug, citySlug);
  const overrides = await fetchCityOverrides();
  return overrides[`${slug}/${citySlug}`];
}
