import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-for-insurance-page');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Insurance',
  description:
    'Use voice AI to handle insurance quote intake, policy service routing, after-hours lead capture, and cleaner producer handoffs.',
  path: '/voice-ai-for-insurance-page',
  openGraphDescription:
    'Capture quote requests faster, route policy service calls cleanly, and keep insurance lead response active after hours.',
  image: page.image,
});

export default function VoiceAIForInsurancePage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
