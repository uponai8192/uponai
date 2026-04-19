import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import UponAILandingPage from '@/components/sections/UponAILandingPage';
import { getUponAIPage, uponaiPages } from '@/lib/uponai-pages';

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
      title: page.title,
      description: page.description,
      alternates: { canonical: `https://uponai.com${page.aliasTo}` },
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://uponai.com/${page.slug}` },
  };
}

export default async function UponAISlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getUponAIPage(slug);
  if (!page) notFound();
  if (page.aliasTo) redirect(page.aliasTo);

  return <UponAILandingPage page={page} />;
}
