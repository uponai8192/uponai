import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import PersonaCarousel from '@/components/home/PersonaCarousel';
import Marquee from '@/components/home/Marquee';
import CoverageQuiz from '@/components/home/CoverageQuiz';
import CapabilityShowcase from '@/components/home/CapabilityShowcase';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessStats from '@/components/home/SuccessStats';
import IndustryGrid from '@/components/home/IndustryGrid';
import FitCards from '@/components/home/FitCards';
import GetStarted from '@/components/home/GetStarted';
import PlaybookCapture from '@/components/home/PlaybookCapture';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'AI Voice Systems For Modern Customer Conversations',
  description:
    'UponAI builds AI voice agents, AI chatbots, and conversation workflows for businesses that need faster call handling, better qualification, and cleaner escalation.',
  alternates: { canonical: 'https://uponai.com' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PersonaCarousel />
      <Marquee />
      <CoverageQuiz />
      <CapabilityShowcase />
      <HowItWorks />
      <SuccessStats />
      <IndustryGrid />
      <FitCards />
      <GetStarted />
      <PlaybookCapture />
      <Testimonials />
      <CTASection />
    </>
  );
}
