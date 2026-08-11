import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-for-dental-offices';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Dental Offices',
  description:
    'Use voice AI to support dental scheduling, recall workflows, routine insurance questions, and after-hours patient call coverage.',
  path: '/voice-ai-for-dental-offices',
  openGraphDescription:
    'Reduce missed calls, support appointment booking, and answer routine patient questions with voice AI for dental offices.',
  image: localPage.image,
});

export default async function VoiceAIForDentalOfficesPage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
