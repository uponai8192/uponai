import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-for-legal-services';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Legal Services',
  description:
    'Use voice AI to improve legal intake, route current-client calls, support consultations, and capture after-hours new matter inquiries.',
  path: '/voice-ai-for-legal-services',
  openGraphDescription:
    'Create a better legal intake workflow with voice AI for new matter screening, client routing, and consultation scheduling.',
  image: localPage.image,
});

export default async function VoiceAIForLegalServicesPage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
