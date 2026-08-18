import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-for-chiropractors',
  title: (location) => `Voice AI for Chiropractors in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to handle new patient scheduling, insurance questions, after-hours coverage, and front-desk call relief for chiropractic offices.`,
  socialDescription: (location) =>
    `Chiropractic voice AI for ${location} practices that want more new patients, less front-desk pressure, and steadier after-hours coverage.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
