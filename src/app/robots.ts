import type { MetadataRoute } from 'next';

// Staging must never be indexed: it serves the same content as production, so
// letting crawlers in would create duplicate content against uponai.com.
// Set NEXT_PUBLIC_SITE_ENV=staging on any non-production deployment.
const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === 'staging';

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://uponai.com/sitemap.xml',
  };
}
