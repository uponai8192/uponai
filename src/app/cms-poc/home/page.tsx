import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PlatformHero from '@/components/home/PlatformHero';
import SocialProof from '@/components/home/SocialProof';
import OldWay from '@/components/home/OldWay';
import IntroSolution from '@/components/home/IntroSolution';
import Capabilities from '@/components/home/Capabilities';
import AllFeatures from '@/components/home/AllFeatures';
import HowItWorksSteps from '@/components/home/HowItWorksSteps';
import CustomerStories from '@/components/home/CustomerStories';
import FinalCTA from '@/components/home/FinalCTA';
import { cmsPocEnabled, getCmsPocHomePage } from '@/lib/cms-poc/source';

export const metadata: Metadata = {
  title: 'CMS PoC: Homepage',
  robots: { index: false, follow: false },
};

// The real homepage components rendered from the CMS-managed homePage
// document. The live / route keeps its in-repo defaults; this route is the
// editable preview of the same sections.
export default async function CmsPocHomePage() {
  if (!cmsPocEnabled()) notFound();
  const { data: content, source, loadedAt } = await getCmsPocHomePage();

  return (
    <>
      <div className="theme-section-alt border-b border-[var(--border)] px-4 py-2 text-center text-xs theme-soft">
        CMS PoC homepage · source: {source} · cached snapshot loaded at {loadedAt}
      </div>
      <PlatformHero content={content.hero} />
      <SocialProof content={content.socialProof} />
      <OldWay content={content.oldWay} />
      <IntroSolution content={content.intro} />
      <Capabilities content={content.capabilities} />
      <AllFeatures content={content.allFeatures} />
      <HowItWorksSteps content={content.howItWorks} />
      <CustomerStories content={content.customerStories} />
      <FinalCTA content={content.finalCta} />
    </>
  );
}
