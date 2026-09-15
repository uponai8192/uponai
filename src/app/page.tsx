import type { Metadata } from 'next';
import PlatformHero from '@/components/home/PlatformHero';
import AgentSwitchboard from '@/components/home/AgentSwitchboard';
import Solutions from '@/components/home/Solutions';
import IntroSolution from '@/components/home/IntroSolution';
import Capabilities from '@/components/home/Capabilities';
import HowItWorksSteps from '@/components/home/HowItWorksSteps';
import CustomerStories from '@/components/home/CustomerStories';
import Faq from '@/components/home/Faq';
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
// Each scroll-panel fills the viewport and its content drifts in and out
// tied to scroll position, via CSS scroll-driven animations (globals.css).
// Scrolling stays free, nothing snaps or hijacks the wheel. The agent
// switchboard sits outside the panels: it is several screens tall and pins
// its own stage while the visitor scrolls through the industries.
export default async function HomePage() {
  const content = await getHomePageContent();
  return (
    <>
      <div className="scroll-panel">
        <PlatformHero content={content.hero} />
      </div>
      <AgentSwitchboard content={content.socialProof} />
      <div className="scroll-panel">
        <Solutions content={content.solutions} />
      </div>
      <div className="scroll-panel">
        <CustomerStories content={content.customerStories} />
      </div>
      <div className="scroll-panel">
        <IntroSolution content={content.intro} />
      </div>
      <div className="scroll-panel">
        <Capabilities content={content.capabilities} />
      </div>
      <div className="scroll-panel">
        <HowItWorksSteps content={content.howItWorks} />
      </div>
      <div className="scroll-panel">
        <Faq content={content.faq} />
      </div>
      <div className="scroll-panel">
        <FinalCTA content={content.finalCta} />
      </div>
    </>
  );
}
