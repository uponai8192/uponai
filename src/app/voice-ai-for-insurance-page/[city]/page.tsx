import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, formatCityState } from '@/lib/data';
import { getVertical, getVerticalCityOverride, getVerticals } from '@/lib/cms/verticals';
import { prerenderedCityParams } from '@/lib/prerender';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const VERTICAL_SLUG = 'voice-ai-for-insurance-page';

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return prerenderedCityParams(VERTICAL_SLUG);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const location = formatCityState(city);

  return {
    title: `Voice AI for Insurance in ${location}`,
    description: `Use voice AI in ${location} to capture insurance quote requests faster, route policy service calls cleanly, and support after-hours lead response.`,
    alternates: { canonical: `https://uponai.com/voice-ai-for-insurance-page/${city.slug}` },
    openGraph: {
      title: `Voice AI for Insurance in ${location}`,
      description: `Insurance voice AI for ${location} agencies that need cleaner intake, service routing, and faster lead response.`,
    },
  };
}

export default async function VoiceAIForInsuranceCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const [page, override, allPages] = await Promise.all([
    getVertical(VERTICAL_SLUG),
    getVerticalCityOverride(VERTICAL_SLUG, city.slug),
    getVerticals(),
  ]);

  return (
    <VoiceAIIndustryCityPage page={page} city={city} override={override} allPages={allPages} />
  );
}
