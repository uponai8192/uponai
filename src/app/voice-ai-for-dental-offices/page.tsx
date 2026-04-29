import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-for-dental-offices');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Dental Offices',
  description:
    'Use voice AI to support dental scheduling, recall workflows, routine insurance questions, and after-hours patient call coverage.',
  path: '/voice-ai-for-dental-offices',
  openGraphDescription:
    'Reduce missed calls, support appointment booking, and answer routine patient questions with voice AI for dental offices.',
  image: page.image,
});

export default function VoiceAIForDentalOfficesPage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
