import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug, formatCityState } from '@/lib/data';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const page = requireVoiceAIIndustryPage('voice-ai-for-home-services-page');

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
    title: `Voice AI for Home Services in ${location}`,
    description: `Deploy voice AI in ${location} to capture more service calls, support dispatch, improve booking intake, and keep after-hours jobs from slipping away.`,
    alternates: { canonical: `https://uponai.com/voice-ai-for-home-services-page/${city.slug}` },
    openGraph: {
      title: `Voice AI for Home Services in ${location}`,
      description: `Voice AI for ${location} home services teams that need fewer missed calls and stronger dispatch support.`,
    },
  };
}

export default async function VoiceAIForHomeServicesCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return <VoiceAIIndustryCityPage page={page} city={city} />;
}
