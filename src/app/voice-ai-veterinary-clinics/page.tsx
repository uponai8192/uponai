import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const page = requireVoiceAIIndustryPage('voice-ai-veterinary-clinics');

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Veterinary Clinics',
  description:
    'Use voice AI to support veterinary appointment intake, routine pet-owner questions, urgent call routing, and after-hours coverage.',
  path: '/voice-ai-veterinary-clinics',
  openGraphDescription:
    'Reduce front-desk interruptions, support scheduling, and route urgent pet-owner calls more cleanly with voice AI.',
  image: page.image,
});

export default function VoiceAIVeterinaryClinicsPage() {
  return <VoiceAIIndustryLandingPage page={page} />;
}
