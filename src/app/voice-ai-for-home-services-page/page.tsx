import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-for-home-services-page');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Home Services',
  description:
    'Use voice AI to capture home services leads, support dispatch, handle after-hours requests, and improve booking intake.',
  path: '/voice-ai-for-home-services-page',
  openGraphDescription:
    'Answer more service calls, support dispatch, and keep after-hours job opportunities active with voice AI.',
  image: page.image,
});

export default function VoiceAIForHomeServicesPage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
