import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-for-chiropractors');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Chiropractors',
  description:
    'Use voice AI to handle new patient inquiries, appointment scheduling, insurance questions, and after-hours coverage for chiropractic offices.',
  path: '/voice-ai-for-chiropractors',
  openGraphDescription:
    'Reduce front-desk interruptions, capture more new patients, and keep scheduling active after hours with voice AI built for chiropractic practices.',
  image: page.image,
});

export default function VoiceAIForChiropractorsPage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
