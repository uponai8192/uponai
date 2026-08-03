import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries, cities, getIndustryBySlug, getCityBySlug, formatCityState, staticParamCities } from '@/lib/data';
import { offsetBrandPhotos, rotatingBrandPhotos } from '@/lib/brand-photos';
import { getCityMarketNarrative, getCityRegionNarrative } from '@/lib/voice-ai-industries';
import { getIndustryContent } from '@/lib/site-content';
import { buildBreadcrumbSchema, buildLocalBusinessSchema, buildPageMetadata, buildServiceSchema } from '@/lib/seo';
import CTASection from '@/components/sections/CTASection';
import FeaturesBento from '@/components/sections/FeaturesBento';

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const industry of industries) {
    for (const city of staticParamCities) {
      params.push({ slug: industry.slug, city: city.slug });
    }
  }
  return params;
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const industry = getIndustryBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!industry || !city) return {};

  const content = getIndustryContent(industry, city);
  const location = formatCityState(city);

  return {
    ...buildPageMetadata({
      title: `${industry.name} in ${location}`,
      description: content.metaDescription,
      path: `/industries/${slug}/${citySlug}`,
      openGraphDescription: content.description,
      image: rotatingBrandPhotos[industries.findIndex((item) => item.slug === slug) % rotatingBrandPhotos.length],
    }),
    keywords: [
      `${industry.name.toLowerCase()} ${city.name}`,
      `${industry.slug.replaceAll('-', ' ')} ${city.name}`,
      `business communications ${industry.name.toLowerCase()} ${city.name}`,
      `${city.name} ${industry.name.toLowerCase()} phone systems`,
    ],
  };
}

const colorMap: Record<string, { bg: string; border: string; text: string; pill: string; pillText: string; dot: string; glow: string }> = {
  red: { bg: 'bg-red-600/10', border: 'border-red-500/30', text: 'text-red-400', pill: 'bg-red-600/10', pillText: 'text-red-300', dot: 'bg-red-400', glow: 'bg-red-600/10' },
  blue: { bg: 'bg-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400', pill: 'bg-blue-600/10', pillText: 'text-blue-300', dot: 'bg-blue-400', glow: 'bg-blue-600/10' },
  green: { bg: 'bg-green-600/10', border: 'border-green-500/30', text: 'text-green-400', pill: 'bg-green-600/10', pillText: 'text-green-300', dot: 'bg-green-400', glow: 'bg-green-600/10' },
  yellow: { bg: 'bg-yellow-600/10', border: 'border-yellow-500/30', text: 'text-yellow-400', pill: 'bg-yellow-600/10', pillText: 'text-yellow-300', dot: 'bg-yellow-400', glow: 'bg-yellow-600/10' },
  orange: { bg: 'bg-orange-600/10', border: 'border-orange-500/30', text: 'text-orange-400', pill: 'bg-orange-600/10', pillText: 'text-orange-300', dot: 'bg-orange-400', glow: 'bg-orange-600/10' },
  purple: { bg: 'bg-purple-600/10', border: 'border-purple-500/30', text: 'text-purple-400', pill: 'bg-purple-600/10', pillText: 'text-purple-300', dot: 'bg-purple-400', glow: 'bg-purple-600/10' },
  slate: { bg: 'bg-slate-600/20', border: 'border-slate-500/30', text: 'text-slate-300', pill: 'bg-slate-700/50', pillText: 'text-slate-300', dot: 'bg-slate-400', glow: 'bg-slate-600/10' },
  pink: { bg: 'bg-pink-600/10', border: 'border-pink-500/30', text: 'text-pink-400', pill: 'bg-pink-600/10', pillText: 'text-pink-300', dot: 'bg-pink-400', glow: 'bg-pink-600/10' },
  amber: { bg: 'bg-amber-600/10', border: 'border-amber-500/30', text: 'text-amber-400', pill: 'bg-amber-600/10', pillText: 'text-amber-300', dot: 'bg-amber-400', glow: 'bg-amber-600/10' },
  cyan: { bg: 'bg-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400', pill: 'bg-cyan-600/10', pillText: 'text-cyan-300', dot: 'bg-cyan-400', glow: 'bg-cyan-600/10' },
  violet: { bg: 'bg-violet-600/10', border: 'border-violet-500/30', text: 'text-violet-400', pill: 'bg-violet-600/10', pillText: 'text-violet-300', dot: 'bg-violet-400', glow: 'bg-violet-600/10' },
  rose: { bg: 'bg-rose-600/10', border: 'border-rose-500/30', text: 'text-rose-400', pill: 'bg-rose-600/10', pillText: 'text-rose-300', dot: 'bg-rose-400', glow: 'bg-rose-600/10' },
  emerald: { bg: 'bg-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-400', pill: 'bg-emerald-600/10', pillText: 'text-emerald-300', dot: 'bg-emerald-400', glow: 'bg-emerald-600/10' },
};

export default async function IndustryCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const industry = getIndustryBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!industry || !city) notFound();

  const cs = formatCityState(city);
  const content = getIndustryContent(industry, city);
  const market = getCityMarketNarrative(city);
  const region = getCityRegionNarrative(city);
  const c = colorMap[industry.color] ?? colorMap.blue;
  const industryIndex = industries.findIndex((item) => item.slug === slug);
  const heroPhoto = rotatingBrandPhotos[industryIndex % rotatingBrandPhotos.length];
  const contentPhoto = offsetBrandPhotos[(industryIndex + 3) % offsetBrandPhotos.length];
  const photoRight = industryIndex % 2 === 0;
  const cityIdx = cities.findIndex((item) => item.slug === citySlug);
  const nearby = [...cities.slice(Math.max(0, cityIdx - 3), cityIdx), ...cities.slice(cityIdx + 1, cityIdx + 4)].slice(0, 6);
  const pagePath = `/industries/${slug}/${citySlug}`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: industry.name, path: `/industries/${slug}` },
    { name: cs, path: pagePath },
  ]);
  const serviceSchema = buildServiceSchema({
    name: `${industry.name} in ${cs}`,
    description: content.metaDescription,
    path: pagePath,
    serviceType: industry.name,
    areaServed: cs,
    image: heroPhoto,
  });
  const localBusinessSchema = buildLocalBusinessSchema({
    name: 'UponAI',
    description: `Communication workflows for ${industry.name} in ${cs}`,
    path: pagePath,
    areaServed: { city: city.name, state: city.state },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0">
          <div className={`absolute left-0 top-0 h-[500px] w-[600px] ${c.glow} rounded-full blur-3xl opacity-50`} />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-slate-800/30 blur-3xl" />
        </div>

        <div className={`relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center ${!photoRight ? 'lg:grid-flow-dense' : ''}`}>
          <div className={!photoRight ? 'lg:col-start-2' : ''}>
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition-colors hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href={`/industries/${slug}`} className="transition-colors hover:text-slate-300">{industry.name}</Link>
              <span>/</span>
              <span className="text-slate-300">{cs}</span>
            </nav>

            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border ${c.border} ${c.pill} px-4 py-1.5`}>
              <span className={`h-2 w-2 rounded-full ${c.dot}`} />
              <span className={`text-sm font-medium ${c.pillText}`}>{content.badgeLabel}</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              <span className={c.text}>{content.heroTitle}</span>
            </h1>
            <p className="mb-6 text-xl leading-relaxed text-slate-300">{content.tagline}</p>
            <p className="mb-8 max-w-lg leading-relaxed text-slate-400">{content.description}</p>

            <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
              {['No Long-Term Contracts', '24/7 US Support', '99.99% Uptime', 'Modern workflow design'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/quote" className="rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-blue-500">
                Get a Free Quote in {city.name}
              </Link>
              <a href="tel:+18336986471" className="rounded-xl border border-slate-600 px-8 py-4 text-center text-lg font-semibold text-slate-200 transition-colors hover:border-blue-500 hover:text-white">
                (888) 787-6624
              </a>
            </div>
          </div>

          <div className={`relative ${!photoRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className={`absolute -inset-3 ${c.glow} rounded-3xl blur-2xl opacity-30`} />
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl shadow-black/60">
              <Image src={heroPhoto} alt={`${industry.name} communication workflows in ${cs}`} width={680} height={460} className="h-auto w-full object-cover" priority unoptimized />
              <div className="absolute bottom-4 left-4 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 shadow-xl backdrop-blur-sm">
                <div className={`text-lg font-black ${c.text}`}>{content.stats[0]?.value}</div>
                <div className="text-xs text-slate-300">{content.stats[0]?.label}</div>
              </div>
              <div className="absolute right-4 top-4 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 shadow-xl backdrop-blur-sm">
                <div className="text-sm font-black text-green-400">{content.stats[1]?.value}</div>
                <div className="text-xs text-slate-300">{content.stats[1]?.label}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-700/50 bg-slate-800/40 px-4 py-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 text-center md:grid-cols-4">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <div className={`mb-0.5 text-2xl font-black ${c.text}`}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">We Understand {industry.name} in {city.name}</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">{market.seo} {region.body}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8">
              <h3 className="mb-6 text-lg font-bold text-white">Common Challenges</h3>
              <div className="space-y-3">
                {industry.challenges.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
                    <span className="mt-0.5 flex-shrink-0 font-bold text-red-400">✕</span>
                    <span className="text-sm leading-relaxed text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border ${c.border} ${c.bg} p-8`}>
              <h3 className="mb-6 text-lg font-bold text-white">UponAI Solutions</h3>
              <div className="space-y-3">
                {industry.solutions.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/40 p-4">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm leading-relaxed text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl mb-16">
          <FeaturesBento
            features={industry.features}
            title={`Everything Included for ${city.name} Businesses`}
            subtitle={`Purpose-built ${industry.name} features shaped around operational reality in ${city.name}.`}
          />
          <div className="mt-8 text-center">
            <Link href="/quote" className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-colors hover:bg-blue-500">
              Get a Free Quote
            </Link>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-1 lg:items-center">
          <div className="relative mx-auto w-full max-w-3xl">
            <div className={`absolute -inset-2 ${c.glow} rounded-3xl blur-2xl opacity-25`} />
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50">
              <Image src={contentPhoto} alt={`${industry.name} workflow support in ${cs}`} width={680} height={480} className="h-auto w-full object-cover" unoptimized />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                <p className="text-sm font-semibold text-white">24/7 US-Based Support</p>
                <p className="text-xs text-slate-300">Real humans, not generic call-center handoffs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className={`rounded-2xl border ${c.border} ${c.bg} p-8 md:p-10`}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-white">Trusted by {city.name} {industry.name} Businesses</h2>
                <p className="mb-6 leading-relaxed text-slate-400">{content.locationSummary}</p>
                <Link href="/quote" className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-colors hover:bg-blue-500">
                  Start Free Consultation
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4 text-center">
                    <div className={`mb-1 text-2xl font-black ${c.text}`}>{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {nearby.length > 0 ? (
        <section className="border-t border-slate-800 px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm text-slate-500">Also serving nearby areas:</p>
            <div className="flex flex-wrap gap-3">
              {nearby.map((item) => (
                <Link key={item.slug} href={`/industries/${slug}/${item.slug}`} className={`text-sm transition-opacity hover:opacity-80 ${c.text}`}>
                  {industry.name} workflows in {formatCityState(item)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}
