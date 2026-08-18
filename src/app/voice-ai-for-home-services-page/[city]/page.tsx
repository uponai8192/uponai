import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'voice-ai-for-home-services-page',
  title: (location) => `Voice AI for Home Services in ${location}`,
  description: (location) =>
    `Deploy voice AI in ${location} to capture more service calls, support dispatch, improve booking intake, and keep after-hours jobs from slipping away.`,
  socialDescription: (location) =>
    `Voice AI for ${location} home services teams that need fewer missed calls and stronger dispatch support.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
