import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-veterinary-clinics';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Veterinary Clinics',
  description:
    'Use voice AI to support veterinary appointment intake, routine pet-owner questions, urgent call routing, and after-hours coverage.',
  path: '/voice-ai-veterinary-clinics',
  openGraphDescription:
    'Reduce front-desk interruptions, support scheduling, and route urgent pet-owner calls more cleanly with voice AI.',
  image: localPage.image,
});

export default async function VoiceAIVeterinaryClinicsPage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
