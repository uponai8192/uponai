import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, formatCityState } from '@/lib/data';
import { getVertical, getVerticalCityOverride, getVerticals } from '@/lib/cms/verticals';
import { prerenderedCityParams } from '@/lib/prerender';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const VERTICAL_SLUG = 'voice-ai-for-chiropractors';

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
    title: `Voice AI for Chiropractors in ${location}`,
    description: `Use voice AI in ${location} to handle new patient scheduling, insurance questions, after-hours coverage, and front-desk call relief for chiropractic offices.`,
    alternates: { canonical: `https://uponai.com/voice-ai-for-chiropractors/${city.slug}` },
    openGraph: {
      title: `Voice AI for Chiropractors in ${location}`,
      description: `Chiropractic voice AI for ${location} practices that want more new patients, less front-desk pressure, and steadier after-hours coverage.`,
    },
  };
}

export default async function VoiceAIForChiropractorsCityPage({ params }: Props) {
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
