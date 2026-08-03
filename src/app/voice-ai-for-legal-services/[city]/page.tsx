import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, formatCityState, staticParamCities } from '@/lib/data';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const page = requireVoiceAIIndustryPage('voice-ai-for-legal-services');

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return staticParamCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const location = formatCityState(city);

  return {
    title: `Voice AI for Legal Services in ${location}`,
    description: `Use voice AI in ${location} to improve legal intake, route current-client calls, support consultations, and capture more new matter opportunities.`,
    alternates: { canonical: `https://uponai.com/voice-ai-for-legal-services/${city.slug}` },
    openGraph: {
      title: `Voice AI for Legal Services in ${location}`,
      description: `Legal intake voice AI for ${location} firms that want cleaner screening, routing, and consultation scheduling.`,
    },
  };
}

export default async function VoiceAIForLegalServicesCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return <VoiceAIIndustryCityPage page={page} city={city} />;
}
