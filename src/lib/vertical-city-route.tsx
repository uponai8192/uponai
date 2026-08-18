import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, formatCityState } from '@/lib/data';
import { getVertical, getVerticalCityOverride, getVerticals } from '@/lib/cms/verticals';
import { prerenderedCityParams } from '@/lib/prerender';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

// Every vertical [city] route was the same 43 lines with four copy strings
// swapped, which is how one of them once missed a batch edit that the other
// ten received. The route files now supply only the copy and this builds the
// three segment exports around it.
//
// Cities stay a data array rather than CMS documents, so the slug here is the
// vertical, not the city (docs/cms-migration-spike.md).

type Props = {
  params: Promise<{ city: string }>;
};

type VerticalCityRouteConfig = {
  /** Vertical slug. Must match the route directory, since it builds the canonical URL. */
  slug: string;
  /** Page title and og:title. Receives the formatted "City, ST" string. */
  title: (location: string) => string;
  /** Meta description. */
  description: (location: string) => string;
  /** og:description, which is shorter and more conversational than the meta description. */
  socialDescription: (location: string) => string;
};

export function createVerticalCityRoute({
  slug,
  title,
  description,
  socialDescription,
}: VerticalCityRouteConfig) {
  function generateStaticParams() {
    return prerenderedCityParams(slug);
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city: citySlug } = await params;
    const city = getCityBySlug(citySlug);
    if (!city) return {};

    const location = formatCityState(city);

    return {
      title: title(location),
      description: description(location),
      alternates: { canonical: `https://uponai.com/${slug}/${city.slug}` },
      openGraph: {
        title: title(location),
        description: socialDescription(location),
      },
    };
  }

  async function Page({ params }: Props) {
    const { city: citySlug } = await params;
    const city = getCityBySlug(citySlug);
    if (!city) notFound();

    const [page, override, allPages] = await Promise.all([
      getVertical(slug),
      getVerticalCityOverride(slug, city.slug),
      getVerticals(),
    ]);

    return (
      <VoiceAIIndustryCityPage page={page} city={city} override={override} allPages={allPages} />
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
