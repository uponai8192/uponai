import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-real-estate';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Real Estate',
  description:
    'Use voice AI to qualify real estate leads, capture showing requests, support seller intake, and improve speed-to-lead.',
  path: '/voice-ai-real-estate',
  openGraphDescription:
    'Capture listing inquiries faster, qualify buyers and sellers, and route real estate prospects to the right agent.',
  image: localPage.image,
});

export default async function VoiceAIRealEstatePage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
