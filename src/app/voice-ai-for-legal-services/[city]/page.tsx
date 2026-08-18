import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-for-legal-services',
  title: (location) => `Voice AI for Legal Services in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to improve legal intake, route current-client calls, support consultations, and capture more new matter opportunities.`,
  socialDescription: (location) =>
    `Legal intake voice AI for ${location} firms that want cleaner screening, routing, and consultation scheduling.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
