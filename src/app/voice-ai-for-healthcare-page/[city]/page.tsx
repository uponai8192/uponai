import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug, formatCityState } from '@/lib/data';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const page = requireVoiceAIIndustryPage('voice-ai-for-healthcare-page');

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
    title: `Voice AI for Healthcare in ${location}`,
    description: `Deploy healthcare voice AI in ${location} to improve scheduling, patient routing, office questions, and after-hours coverage without more front-desk pressure.`,
    alternates: { canonical: `https://uponai.com/voice-ai-for-healthcare-page/${city.slug}` },
    openGraph: {
      title: `Voice AI for Healthcare in ${location}`,
      description: `Support scheduling, patient access, office questions, and front-desk relief for ${location} healthcare teams.`,
    },
  };
}

export default async function VoiceAIForHealthcareCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return <VoiceAIIndustryCityPage page={page} city={city} />;
}
