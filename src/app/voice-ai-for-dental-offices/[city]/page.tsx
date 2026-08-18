import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-for-dental-offices',
  title: (location) => `Voice AI for Dental Offices in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to support dental scheduling, recall booking, patient questions, and after-hours call coverage without more front-desk pressure.`,
  socialDescription: (location) =>
    `Dental voice AI for ${location} practices that want better scheduling coverage and fewer missed patient calls.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
