import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-real-estate',
  title: (location) => `Voice AI for Real Estate in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to respond faster to listing inquiries, support buyer and seller intake, and improve real estate lead routing.`,
  socialDescription: (location) =>
    `Real estate voice AI for ${location} teams that want faster speed-to-lead and cleaner qualification.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
