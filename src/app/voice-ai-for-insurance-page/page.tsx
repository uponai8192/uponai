import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-for-insurance-page';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Insurance',
  description:
    'Use voice AI to handle insurance quote intake, policy service routing, after-hours lead capture, and cleaner producer handoffs.',
  path: '/voice-ai-for-insurance-page',
  openGraphDescription:
    'Capture quote requests faster, route policy service calls cleanly, and keep insurance lead response active after hours.',
  image: localPage.image,
});

export default async function VoiceAIForInsurancePage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
