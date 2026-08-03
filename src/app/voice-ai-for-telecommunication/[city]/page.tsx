import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, formatCityState, staticParamCities } from '@/lib/data';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const page = requireVoiceAIIndustryPage('voice-ai-for-telecommunication');

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
    title: `Voice AI for Telecommunications in ${location}`,
    description: `Use voice AI in ${location} to improve telecom routing, support intent detection, sales intake, provisioning flow, and high-volume call handling.`,
    alternates: { canonical: `https://uponai.com/voice-ai-for-telecommunication/${city.slug}` },
    openGraph: {
      title: `Voice AI for Telecommunications in ${location}`,
      description: `Telecom voice AI for ${location} teams that need cleaner routing, better overflow handling, and stronger first-contact workflows.`,
    },
  };
}

export default async function VoiceAIForTelecommunicationsCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return <VoiceAIIndustryCityPage page={page} city={city} />;
}
