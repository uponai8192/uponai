import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug, formatCityState } from '@/lib/data';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const page = requireVoiceAIIndustryPage('for-restaurant-page');

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const location = formatCityState(city);

  return {
    title: `Voice AI for Restaurants in ${location}`,
    description: `Use voice AI in ${location} to capture reservations, answer guest questions, support event inquiries, and reduce missed restaurant calls during the rush.`,
    alternates: { canonical: `https://uponai.com/for-restaurant-page/${city.slug}` },
    openGraph: {
      title: `Voice AI for Restaurants in ${location}`,
      description: `Restaurant voice AI for ${location} teams that want fewer missed calls and better reservation support.`,
    },
  };
}

export default async function VoiceAIForRestaurantsCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return <VoiceAIIndustryCityPage page={page} city={city} />;
}
