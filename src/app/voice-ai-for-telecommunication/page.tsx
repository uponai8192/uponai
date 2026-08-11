import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-for-telecommunication';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Telecommunications',
  description:
    'Use voice AI to support telecom sales, billing, support, provisioning, overflow handling, and higher-volume inbound routing.',
  path: '/voice-ai-for-telecommunication',
  openGraphDescription:
    'Reduce repetitive front-line call handling and route telecom support, sales, and provisioning calls more accurately with voice AI.',
  image: localPage.image,
});

export default async function VoiceAIForTelecommunicationsPage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
