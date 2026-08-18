import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'ai-voice-for-answering-service-replacement',
  title: (location) => `AI Voice Answering Service Replacement in ${location}`,
  description: (location) =>
    `Replace traditional answering services in ${location} with an AI voice agent that answers calls, qualifies leads, routes callers, books appointments, and captures structured intake details 24/7.`,
  socialDescription: (location) =>
    `Use UponAI in ${location} to replace message-only answering coverage with AI call handling, routing, booking, and lead qualification.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
