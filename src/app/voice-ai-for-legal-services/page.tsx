import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-for-legal-services');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Legal Services',
  description:
    'Use voice AI to improve legal intake, route current-client calls, support consultations, and capture after-hours new matter inquiries.',
  path: '/voice-ai-for-legal-services',
  openGraphDescription:
    'Create a better legal intake workflow with voice AI for new matter screening, client routing, and consultation scheduling.',
  image: page.image,
});

export default function VoiceAIForLegalServicesPage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
