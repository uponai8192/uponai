import type { MetadataRoute } from 'next';
import { services, industries, cities } from '@/lib/data';

const BASE_URL = 'https://uponai.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/cloud-telephony`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/virtual-reality`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${BASE_URL}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/location/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const serviceCityPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    cities.map((city) => ({
      url: `${BASE_URL}/services/${service.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  );

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...locationPages,
    ...serviceCityPages,
  ];
}
