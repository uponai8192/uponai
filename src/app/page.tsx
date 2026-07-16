import type { Metadata } from 'next';
import PlatformHero from '@/components/home/PlatformHero';
import SocialProof from '@/components/home/SocialProof';
import OldWay from '@/components/home/OldWay';
import IntroSolution from '@/components/home/IntroSolution';
import Capabilities from '@/components/home/Capabilities';
import AllFeatures from '@/components/home/AllFeatures';
import HowItWorksSteps from '@/components/home/HowItWorksSteps';
import CustomerStories from '@/components/home/CustomerStories';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Enterprise AI Agents for Phone, Chat, and Web',
  description:
    'UponAI is the all-in-one platform to build and deploy AI agents across phone, chat, and web, augmenting your workforce with visibility, speed, and scale. Train once, deploy everywhere.',
  alternates: { canonical: 'https://uponai.com' },
};

export default function HomePage() {
  return (
    <>
      <PlatformHero />
      <SocialProof />
      <OldWay />
      <IntroSolution />
      <Capabilities />
      <AllFeatures />
      <HowItWorksSteps />
      <CustomerStories />
      <FinalCTA />
    </>
  );
}
