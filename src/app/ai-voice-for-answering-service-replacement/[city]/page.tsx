import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { formatCityState, getCityBySlug } from '@/lib/data';
import { getVertical, getVerticalCityOverride, getVerticals } from '@/lib/cms/verticals';
import { prerenderedCityParams } from '@/lib/prerender';
import { VoiceAIIndustryCityPage } from '@/components/pages/VoiceAIIndustryPages';

const VERTICAL_SLUG = 'ai-voice-for-answering-service-replacement';

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
    title: `AI Voice Answering Service Replacement in ${location}`,
    description: `Replace traditional answering services in ${location} with an AI voice agent that answers calls, qualifies leads, routes callers, books appointments, and captures structured intake details 24/7.`,
    alternates: { canonical: `https://uponai.com/ai-voice-for-answering-service-replacement/${city.slug}` },
    openGraph: {
      title: `AI Voice Answering Service Replacement in ${location}`,
      description: `Use UponAI in ${location} to replace message-only answering coverage with AI call handling, routing, booking, and lead qualification.`,
    },
  };
}

export default async function AnsweringServiceReplacementCityPage({ params }: Props) {
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
