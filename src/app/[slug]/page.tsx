import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import UponAILandingPage from '@/components/sections/UponAILandingPage';
import { getUponAIPage, uponaiPages } from '@/lib/uponai-pages';
import { buildPageMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return uponaiPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getUponAIPage(slug);
  if (!page) return {};

  if (page.aliasTo) {
    return {
      ...buildPageMetadata({
        title: page.title,
        description: page.description,
        path: page.aliasTo,
        image: page.image,
      }),
      robots: { index: false, follow: false },
    };
  }

  if (page.externalRedirectTo) {
    return {
      title: page.title,
      description: page.description,
      alternates: { canonical: page.externalRedirectTo },
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    image: page.image,
  });
}

export default async function UponAISlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getUponAIPage(slug);
  if (!page) notFound();
  if (page.aliasTo) permanentRedirect(page.aliasTo);
  if (page.externalRedirectTo) permanentRedirect(page.externalRedirectTo);

  return <UponAILandingPage page={page} />;
}
