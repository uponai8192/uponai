import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug, formatCityState } from '@/lib/data';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const page = requireVoiceAIIndustryPage('voice-ai-for-chiropractors');

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

  return <VoiceAIIndustryCityPage page={page} city={city} />;
}
