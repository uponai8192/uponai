import type { Metadata } from 'next';
import { requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';
import { getVertical, getVerticals } from '@/lib/cms/verticals';
import { VoiceAIIndustryLandingPage } from '@/components/pages/VoiceAIIndustryPages';
import { buildPageMetadata } from '@/lib/seo';

const VERTICAL_SLUG = 'voice-ai-for-chiropractors';
// Copy comes from the CMS at request time; the hero image stays code-side,
// which is why the static metadata can still read it here.
const localPage = requireVoiceAIIndustryPage(VERTICAL_SLUG);

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI for Chiropractors',
  description:
    'Use voice AI to handle new patient inquiries, appointment scheduling, insurance questions, and after-hours coverage for chiropractic offices.',
  path: '/voice-ai-for-chiropractors',
  openGraphDescription:
    'Reduce front-desk interruptions, capture more new patients, and keep scheduling active after hours with voice AI built for chiropractic practices.',
  image: localPage.image,
});

export default async function VoiceAIForChiropractorsPage() {
  const [page, allPages] = await Promise.all([getVertical(VERTICAL_SLUG), getVerticals()]);
  return <VoiceAIIndustryLandingPage page={page} allPages={allPages} />;
}
