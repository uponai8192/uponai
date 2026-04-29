import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug, formatCityState } from '@/lib/data';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const page = requireVoiceAIIndustryPage('voice-ai-real-estate');

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
    title: `Voice AI for Real Estate in ${location}`,
    description: `Use voice AI in ${location} to respond faster to listing inquiries, support buyer and seller intake, and improve real estate lead routing.`,
    alternates: { canonical: `https://uponai.com/voice-ai-real-estate/${city.slug}` },
    openGraph: {
      title: `Voice AI for Real Estate in ${location}`,
      description: `Real estate voice AI for ${location} teams that want faster speed-to-lead and cleaner qualification.`,
    },
  };
}

export default async function VoiceAIRealEstateCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return <VoiceAIIndustryCityPage page={page} city={city} />;
}
