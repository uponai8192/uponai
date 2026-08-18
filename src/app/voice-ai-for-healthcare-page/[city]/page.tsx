import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-for-healthcare-page',
  title: (location) => `Voice AI for Healthcare in ${location}`,
  description: (location) =>
    `Deploy healthcare voice AI in ${location} to improve scheduling, patient routing, office questions, and after-hours coverage without more front-desk pressure.`,
  socialDescription: (location) =>
    `Support scheduling, patient access, office questions, and front-desk relief for ${location} healthcare teams.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
