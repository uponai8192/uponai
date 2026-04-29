import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-for-telecommunication');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Telecommunications',
  description:
    'Use voice AI to support telecom sales, billing, support, provisioning, overflow handling, and higher-volume inbound routing.',
  path: '/voice-ai-for-telecommunication',
  openGraphDescription:
    'Reduce repetitive front-line call handling and route telecom support, sales, and provisioning calls more accurately with voice AI.',
  image: page.image,
});

export default function VoiceAIForTelecommunicationsPage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
