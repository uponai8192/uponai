import type { Metadata } from 'next';

export const SITE_URL = 'https://uponai.com';
export const SITE_NAME = 'UponAI';
const SITE_PHONE = '+18887876624';
const SITE_EMAIL = 'info@uponai.com';
export const DEFAULT_OG_IMAGE = '/brand-photos/ai-voice-mic.jpeg';

type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  image?: string;
};

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: string;
  image?: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type CollectionItem = {
  name: string;
  path: string;
};

type LocalBusinessSchemaInput = {
  name: string;
  description: string;
  path: string;
  areaServed?: { city: string; state?: string };
};

function normalizeMetaTitle(title: string) {
  return title.replace(/\s+\|\s+UponAI$/u, '').trim();
}

function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  openGraphTitle,
  openGraphDescription,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const normalizedTitle = normalizeMetaTitle(title);
  const canonical = absoluteUrl(path);
  const socialTitle = normalizeMetaTitle(openGraphTitle ?? normalizedTitle);
  const socialDescription = openGraphDescription ?? description;
  const socialImage = absoluteUrl(image);

  return {
    title: normalizedTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      title: socialTitle,
      description: socialDescription,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(faqs: FAQ[]) {
  if (!faqs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed = 'United States',
  image = DEFAULT_OG_IMAGE,
}: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    serviceType: serviceType ?? name,
    areaServed,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
    },
  };
}

export function buildContactPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
    },
  };
}

export function buildCollectionPageSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: CollectionItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    hasPart: items.map((item) => ({
      '@type': 'CreativeWork',
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function buildLocalBusinessSchema({
  name,
  description,
  path,
  areaServed,
}: LocalBusinessSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url: absoluteUrl(path),
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '711 Moorefield Park Drive, Suite A',
      addressLocality: 'North Chesterfield',
      addressRegion: 'VA',
      postalCode: '23236',
      addressCountry: 'US',
    },
    ...(areaServed
      ? {
          areaServed: {
            '@type': 'City',
            name: areaServed.city,
            ...(areaServed.state
              ? {
                  containedInPlace: {
                    '@type': 'State',
                    name: areaServed.state,
                  },
                }
              : {}),
          },
        }
      : {}),
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/icon.png'),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      areaServed: 'US',
      availableLanguage: 'en',
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
};
