import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-for-telecommunication',
  title: (location) => `Voice AI for Telecommunications in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to improve telecom routing, support intent detection, sales intake, provisioning flow, and high-volume call handling.`,
  socialDescription: (location) =>
    `Telecom voice AI for ${location} teams that need cleaner routing, better overflow handling, and stronger first-contact workflows.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
