import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-veterinary-clinics',
  title: (location) => `Voice AI for Veterinary Clinics in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to support veterinary scheduling, routine pet-owner questions, urgent call routing, and after-hours clinic coverage.`,
  socialDescription: (location) =>
    `Veterinary voice AI for ${location} clinics that want calmer phones, cleaner intake, and better appointment coverage.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
