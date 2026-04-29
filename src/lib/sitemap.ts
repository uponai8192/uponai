import { cities, industries, services } from '@/lib/data';
import { uponaiBlogPosts, uponaiBlogTopics } from '@/lib/blog-posts';
import { uponaiPages } from '@/lib/uponai-pages';
import { promotedVoiceAICityRoutes, voiceAIIndustryPages } from '@/lib/voice-ai-industries';

export const SITEMAP_BASE_URL = 'https://uponai.com';

export type SitemapEntry = {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

const buildTimestamp = () => new Date().toISOString();

const withBaseUrl = (pathname: string) =>
  pathname.startsWith('http') ? pathname : `${SITEMAP_BASE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export function buildUrlSet(entries: SitemapEntry[]) {
  const body = entries
    .map((entry) => {
      const parts = [
        '<url>',
        `<loc>${escapeXml(withBaseUrl(entry.url))}</loc>`,
      ];

      if (entry.lastModified) parts.push(`<lastmod>${escapeXml(entry.lastModified)}</lastmod>`);
      if (entry.changeFrequency) parts.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
      if (typeof entry.priority === 'number') parts.push(`<priority>${entry.priority.toFixed(1)}</priority>`);

      parts.push('</url>');
      return parts.join('');
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function buildSitemapIndex(urls: string[]) {
  const lastModified = buildTimestamp();
  const body = urls
    .map((url) => `<sitemap><loc>${escapeXml(withBaseUrl(url))}</loc><lastmod>${escapeXml(lastModified)}</lastmod></sitemap>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

const staticTimestamp = buildTimestamp();
const priorityCitySlugs = new Set([
  'new-york-ny',
  'philadelphia-pa',
  'allentown-pa',
  'atlanta-ga',
  'miami-fl',
  'orlando-fl',
  'west-palm-beach-fl',
  'houston-tx',
  'dallas-tx',
  'chicago-il',
  'san-francisco-ca',
  'los-angeles-ca',
]);
const priorityCities = cities.filter((city) => priorityCitySlugs.has(city.slug));

const standalonePages: SitemapEntry[] = [
  { url: '/', lastModified: staticTimestamp, changeFrequency: 'weekly', priority: 1.0 },
  { url: '/blogs', lastModified: staticTimestamp, changeFrequency: 'weekly', priority: 0.8 },
  { url: '/contact-us-page', lastModified: staticTimestamp, changeFrequency: 'monthly', priority: 0.8 },
  { url: '/quote', lastModified: staticTimestamp, changeFrequency: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', lastModified: staticTimestamp, changeFrequency: 'yearly', priority: 0.4 },
  { url: '/terms-of-services', lastModified: staticTimestamp, changeFrequency: 'yearly', priority: 0.4 },
  { url: '/services/ivr-system', lastModified: staticTimestamp, changeFrequency: 'monthly', priority: 0.8 },
];

const blogPostEntries: SitemapEntry[] = uponaiBlogPosts.map((post) => ({
  url: `/post/${post.slug}`,
  lastModified: post.publishedAt,
  changeFrequency: 'monthly',
  priority: 0.7,
}));

const blogTopicEntries: SitemapEntry[] = uponaiBlogTopics.map((topic) => ({
  url: `/blogs/topics/${topic.slug}`,
  lastModified: staticTimestamp,
  changeFrequency: 'weekly',
  priority: 0.7,
}));

const excludedLegacyCoreSlugs = new Set([
  '/recordings',
  '/recordings-page',
  '/supports',
  '/n8n-downloads',
  '/fast-start-532531',
  '/ai-quality-assurance-982024',
  '/sip-integrations-and-transfers-685191',
  '/cloud-telephony',
  '/virtual-reality',
  '/ucaas-page',
]);

const excludedCorePaths = new Set([
  ...standalonePages.map((entry) => entry.url),
  ...voiceAIIndustryPages.map((page) => `/${page.slug}`),
  ...excludedLegacyCoreSlugs,
]);

const landingPagesFromSlugRoutes: SitemapEntry[] = uponaiPages
  .filter((page) => !page.aliasTo && !page.externalRedirectTo && !excludedCorePaths.has(`/${page.slug}`))
  .map((page) => ({
    url: `/${page.slug}`,
    lastModified: staticTimestamp,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

export const coreSitemapEntries: SitemapEntry[] = [
  ...standalonePages,
  ...blogTopicEntries,
  ...blogPostEntries,
  ...landingPagesFromSlugRoutes,
];

export const voiceAIRootEntries: SitemapEntry[] = voiceAIIndustryPages.map((page) => ({
  url: `/${page.slug}`,
  lastModified: staticTimestamp,
  changeFrequency: 'monthly',
  priority: 0.9,
}));

const defaultVoiceAICityEntries: SitemapEntry[] = voiceAIIndustryPages.flatMap((page) =>
  priorityCities.map((city) => ({
    url: `/${page.slug}/${city.slug}`,
    lastModified: staticTimestamp,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
);

const promotedVoiceAICityEntries: SitemapEntry[] = promotedVoiceAICityRoutes.map((url) => ({
  url,
  lastModified: staticTimestamp,
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

export const voiceAICityEntries: SitemapEntry[] = Array.from(
  new Map(
    [...defaultVoiceAICityEntries, ...promotedVoiceAICityEntries].map((entry) => [entry.url, entry])
  ).values()
);

export const serviceEntries: SitemapEntry[] = services.map((service) => ({
  url: `/services/${service.slug}`,
  lastModified: staticTimestamp,
  changeFrequency: 'monthly',
  priority: 0.8,
}));

export const serviceCityEntries: SitemapEntry[] = services.flatMap((service) =>
  priorityCities.map((city) => ({
    url: `/services/${service.slug}/${city.slug}`,
    lastModified: staticTimestamp,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
);

export const industryEntries: SitemapEntry[] = industries.map((industry) => ({
  url: `/industries/${industry.slug}`,
  lastModified: staticTimestamp,
  changeFrequency: 'monthly',
  priority: 0.8,
}));

export const industryCityEntries: SitemapEntry[] = industries.flatMap((industry) =>
  priorityCities.map((city) => ({
    url: `/industries/${industry.slug}/${city.slug}`,
    lastModified: staticTimestamp,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
);

export const locationEntries: SitemapEntry[] = priorityCities.map((city) => ({
  url: `/location/${city.slug}`,
  lastModified: staticTimestamp,
  changeFrequency: 'monthly',
  priority: 0.7,
}));

export const sitemapIndexUrls = [
  '/sitemaps/core.xml',
  '/sitemaps/voice-ai.xml',
  '/sitemaps/voice-ai-cities.xml',
  '/sitemaps/services.xml',
  '/sitemaps/industries.xml',
  '/sitemaps/locations.xml',
];
