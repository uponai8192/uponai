import { unstable_cache } from 'next/cache';
import { CMS_TAG_LEGAL, sanityQuery } from '@/lib/cms/sanity';

// Privacy policy and terms of service from Sanity. Unlike the rest of the CMS
// work there is no in-repo fallback copy: the existing pages are hand-written
// JSX, so the routes keep rendering that when the CMS has no document for the
// slug. See src/app/privacy-policy/page.tsx.

export type PortableTextSpan = {
  _key?: string;
  _type: 'span';
  text: string;
  marks?: string[];
};

export type PortableTextMarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type: 'block';
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
};

export type LegalSection = {
  id: string;
  title: string;
  body: PortableTextBlock[];
};

export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  intro?: string;
  effectiveDate?: string;
  sections: LegalSection[];
};

export const getLegalPage = unstable_cache(
  async (slug: string): Promise<LegalPage | null> => {
    const doc = await sanityQuery<LegalPage | null>(
      `*[_type == "legalPage" && slug.current == "${slug}"][0]{
        "slug": slug.current, title, description, intro, effectiveDate,
        sections[]{id, title, body}
      }`
    );
    if (!doc?.sections?.length) return null;
    return doc;
  },
  ['cms-legal'],
  { tags: [CMS_TAG_LEGAL] }
);
