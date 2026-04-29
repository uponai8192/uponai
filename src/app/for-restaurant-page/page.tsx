import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('for-restaurant-page');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Restaurants',
  description:
    'Use voice AI to capture reservations, answer guest questions, support private event intake, and reduce missed restaurant calls.',
  path: '/for-restaurant-page',
  openGraphDescription:
    'Handle reservations, guest questions, and restaurant call overflow without pulling staff off the floor.',
  image: page.image,
});

export default function VoiceAIForRestaurantsPage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
