import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, formatCityState } from '@/lib/data';
import { getVertical, getVerticalCityOverride, getVerticals } from '@/lib/cms/verticals';
import { prerenderedCityParams } from '@/lib/prerender';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const VERTICAL_SLUG = 'voice-ai-veterinary-clinics';

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
    title: `Voice AI for Veterinary Clinics in ${location}`,
    description: `Use voice AI in ${location} to support veterinary scheduling, routine pet-owner questions, urgent call routing, and after-hours clinic coverage.`,
    alternates: { canonical: `https://uponai.com/voice-ai-veterinary-clinics/${city.slug}` },
    openGraph: {
      title: `Voice AI for Veterinary Clinics in ${location}`,
      description: `Veterinary voice AI for ${location} clinics that want calmer phones, cleaner intake, and better appointment coverage.`,
    },
  };
}

export default async function VoiceAIVeterinaryClinicsCityPage({ params }: Props) {
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
