import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-real-estate');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Real Estate',
  description:
    'Use voice AI to qualify real estate leads, capture showing requests, support seller intake, and improve speed-to-lead.',
  path: '/voice-ai-real-estate',
  openGraphDescription:
    'Capture listing inquiries faster, qualify buyers and sellers, and route real estate prospects to the right agent.',
  image: page.image,
});

export default function VoiceAIRealEstatePage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
