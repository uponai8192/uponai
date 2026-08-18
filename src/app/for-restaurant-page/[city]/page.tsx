import { createVerticalCityRoute } from '@/lib/vertical-city-route';

const route = createVerticalCityRoute({
  slug: 'for-restaurant-page',
  title: (location) => `Voice AI for Restaurants in ${location}`,
  description: (location) =>
    `Use voice AI in ${location} to capture reservations, answer guest questions, support event inquiries, and reduce missed restaurant calls during the rush.`,
  socialDescription: (location) =>
    `Restaurant voice AI for ${location} teams that want fewer missed calls and better reservation support.`,
});

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
