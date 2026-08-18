import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-for-insurance-page',
  title: (location) => `Voice AI for Insurance in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to capture insurance quote requests faster, route policy service calls cleanly, and support after-hours lead response.`,
  socialDescription: (location) =>
    `Insurance voice AI for ${location} agencies that need cleaner intake, service routing, and faster lead response.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
