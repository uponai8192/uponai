import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-for-home-services-page';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Home Services',
  description:
    'Use voice AI to capture home services leads, support dispatch, handle after-hours requests, and improve booking intake.',
  path: '/voice-ai-for-home-services-page',
  openGraphDescription:
    'Answer more service calls, support dispatch, and keep after-hours job opportunities active with voice AI.',
  image: localPage.image,
});

export default async function VoiceAIForHomeServicesPage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
