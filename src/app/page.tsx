import type { Metadata } from 'next';
import PlatformHero from '@/components/home/PlatformHero';
import SocialProof from '@/components/home/SocialProof';
import Solutions from '@/components/home/Solutions';
import IntroSolution from '@/components/home/IntroSolution';
import Capabilities from '@/components/home/Capabilities';
import HowItWorksSteps from '@/components/home/HowItWorksSteps';
import CustomerStories from '@/components/home/CustomerStories';
import FinalCTA from '@/components/home/FinalCTA';
import { getHomePageContent } from '@/lib/cms/home';

export const metadata: Metadata = {
  title: 'Enterprise AI Agents for Phone, Chat, and Web',
  description:
    'UponAI is the all-in-one platform to build and deploy AI agents across phone, chat, and web, augmenting your workforce with visibility, speed, and scale. Train once, deploy everywhere.',
  alternates: { canonical: 'https://uponai.com' },
};

// Copy comes from the Sanity homePage document, cached under the homepage
// tag until a publish webhook revalidates it (docs/cms-migration-spike.md).
// When Sanity is unreachable or unconfigured, every section falls back to
// the in-repo defaults in src/lib/home-content.ts, so the route can never
// render empty.
export default async function HomePage() {
  const content = await getHomePageContent();
  return (
    <>
      <PlatformHero content={content.hero} />
      <SocialProof content={content.socialProof} />
      <Solutions content={content.solutions} />
      <CustomerStories content={content.customerStories} />
      <IntroSolution content={content.intro} />
      <Capabilities content={content.capabilities} />
      <HowItWorksSteps content={content.howItWorks} />
      <FinalCTA content={content.finalCta} />
    </>
  );
}
