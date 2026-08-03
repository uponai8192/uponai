import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services, cities, industries, getServiceBySlug, getCityBySlug, formatCityState, staticParamCities } from '@/lib/data';
import { brandPhotos, servicePhotoMap } from '@/lib/brand-photos';
import { getCityMarketNarrative, getCityRegionNarrative } from '@/lib/voice-ai-industries';
import { getServiceContent } from '@/lib/site-content';
import { buildBreadcrumbSchema, buildLocalBusinessSchema, buildPageMetadata, buildServiceSchema } from '@/lib/seo';
import CTASection from '@/components/sections/CTASection';
import FeaturesBento from '@/components/sections/FeaturesBento';

interface Props {
  params: Promise<{ slug: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of services) {
    for (const city of staticParamCities) {
      params.push({ slug: service.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};

  const location = formatCityState(city);
  const content = getServiceContent(service, city);
  const keywords = [
    `${service.shortName.toLowerCase()} ${city.name}`,
    `business communications ${city.name}`,
    `customer communication workflow ${city.name} ${city.stateAbbr}`,
    `${service.shortName.toLowerCase()} ${city.state}`,
  ];

  return {
    ...buildPageMetadata({
      title: `${service.shortName} in ${location}`,
      description: `${content.metaDescription} UponAI supports ${location} businesses with cleaner routing, stronger handoff logic, and communication workflows that can expand into AI.`,
      path: `/services/${slug}/${citySlug}`,
      openGraphDescription: `${service.name} for ${location} businesses. ${content.tagline}.`,
      image: servicePhotoMap[slug] ?? brandPhotos.voiceMic,
    }),
    keywords,
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const location = formatCityState(city);
  const content = getServiceContent(service, city);
  const market = getCityMarketNarrative(city);
  const region = getCityRegionNarrative(city);
  const photo = servicePhotoMap[slug] ?? brandPhotos.voiceMic;
  const nearbyCities = cities.filter((item) => item.stateAbbr === city.stateAbbr && item.slug !== citySlug).slice(0, 8);
  const otherServices = services.filter((item) => item.slug !== slug).slice(0, 4);
  const featuredIndustries = industries.slice(0, 6);
  const photoRight = city.slug.charCodeAt(0) % 2 === 0;

  const pagePath = `/services/${slug}/${citySlug}`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: service.shortName, path: `/services/${slug}` },
    { name: location, path: pagePath },
  ]);
  const serviceSchema = buildServiceSchema({
    name: `${service.shortName} in ${location}`,
    description: content.metaDescription,
    path: pagePath,
    serviceType: service.name,
    areaServed: location,
    image: photo,
  });
  const localBusinessSchema = buildLocalBusinessSchema({
    name: 'UponAI',
    description: `${service.name} provider serving ${location} businesses`,
    path: pagePath,
    areaServed: { city: city.name, state: city.state },
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-[500px] w-[600px] rounded-full bg-blue-600/8 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-900/10 blur-3xl" />
        </div>

        <div className={`relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center ${!photoRight ? 'lg:grid-flow-dense' : ''}`}>
          <div className={!photoRight ? 'lg:col-start-2' : ''}>
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition-colors hover:text-slate-300">Home</Link>
              <span>/</span>
              <Link href={`/services/${slug}`} className="transition-colors hover:text-slate-300">{service.shortName}</Link>
              <span>/</span>
              <span className="text-slate-300">{location}</span>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-blue-300">{content.badgeLabel} in {location}</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              {service.shortName} in <span className="text-blue-400">{city.name}, {city.stateAbbr}</span>
            </h1>
            <p className="mb-6 text-xl leading-relaxed text-slate-300">{content.tagline}</p>
            <p className="mb-8 max-w-lg leading-relaxed text-slate-400">{content.locationIntro}</p>

            <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
              {[content.badgeTop, content.badgeBottom, '24/7 US Support', 'Modern workflow design'].map((item) => (
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
                Get a Free Quote
              </Link>
              <a href="tel:+18336986471" className="rounded-xl border border-slate-600 px-8 py-4 text-center text-lg font-semibold text-slate-200 transition-colors hover:border-blue-500 hover:text-white">
                (888) 787-6624
              </a>
            </div>
          </div>

          <div className={`relative ${!photoRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className="absolute -inset-3 rounded-3xl bg-blue-500/8 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl shadow-black/60">
              <Image
                src={photo}
                alt={`${service.name} in ${location}`}
                width={680}
                height={460}
                className="h-auto w-full object-cover"
                priority
                unoptimized
              />
              <div className="absolute bottom-4 left-4 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 shadow-xl backdrop-blur-sm">
                <div className="text-sm font-black leading-none text-blue-400">{content.badgeBottom}</div>
              </div>
              <div className="absolute right-4 top-4 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 shadow-xl backdrop-blur-sm">
                <div className="text-sm font-black leading-none text-green-400">{content.badgeTop}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <FeaturesBento
            features={service.features}
            title={`${service.shortName} Features for ${city.name} Businesses`}
            subtitle="Core features for teams that want cleaner communication, stronger routing, and room to expand into AI workflows."
          />
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">Local Demand</span>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Why {service.shortName.toLowerCase()} in {city.name} needs more than generic national copy.
              </h2>
            </div>
            <p className="leading-relaxed text-slate-400">
              {market.seo} {region.body}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {content.localHighlights.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
                <p className="text-sm leading-relaxed text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="row-span-2 overflow-hidden rounded-2xl border border-slate-700/50 shadow-xl">
                <Image src={brandPhotos.voiceSearch} alt={`UponAI support team serving ${city.name}`} width={400} height={560} className="h-full w-full object-cover" unoptimized />
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-700/50 shadow-xl">
                <Image src={brandPhotos.connectedGlobe} alt="UponAI team" width={400} height={260} className="h-full w-full object-cover" unoptimized />
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-700/50 shadow-xl">
                <Image src={brandPhotos.chatbotPhone} alt="UponAI support" width={400} height={260} className="h-full w-full object-cover" unoptimized />
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">Why {city.name} Businesses Choose Us</span>
            <h2 className="mt-3 mb-5 text-3xl font-bold leading-tight text-white md:text-4xl">{content.whyTitle}</h2>
            <p className="mb-5 leading-relaxed text-slate-400">{content.whyBody}</p>
            <p className="mb-8 leading-relaxed text-slate-400">
              Teams in {city.name} get communication workflows designed around local demand, nearby-market coverage, and cleaner operational handoff across the broader {city.state} market.
            </p>
            <div className="mb-8 grid grid-cols-2 gap-4">
              {content.whyStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                  <div className="mb-1 text-2xl font-black text-blue-400">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link href="/quote" className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-colors hover:bg-blue-500">
              Start Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-white">{service.shortName} for Every Industry in {city.name}</h2>
          <p className="mb-8 text-center text-slate-400">Trusted by businesses across every sector in {city.state}.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featuredIndustries.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}/${citySlug}`} className="group rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-3 text-center transition-all hover:border-blue-500/40 hover:bg-slate-800">
                <div className="text-xs font-medium leading-snug text-slate-300 transition-colors group-hover:text-white">{industry.name.split(' ')[0]}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-2xl font-bold text-white">More UponAI Solutions in {location}</h2>
          <p className="mb-8 text-slate-400">Explore the broader communications and AI workflow stack available for {city.name} teams.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}/${citySlug}`} className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-blue-500/50 hover:bg-slate-800">
                <h3 className="mb-2 text-sm font-semibold text-white transition-colors group-hover:text-blue-300">{item.shortName}</h3>
                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-400">{getServiceContent(item).tagline}</p>
                <span className="text-xs font-medium text-blue-400 transition-colors group-hover:text-blue-300">{item.shortName} in {city.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {nearbyCities.length > 0 ? (
        <section className="border-t border-slate-800 bg-slate-900/50 px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm text-slate-500">Also serving {service.shortName} customers near {city.name}:</p>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((item) => (
                <Link key={item.slug} href={`/services/${slug}/${item.slug}`} className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-blue-500/50 hover:text-white">
                  {item.name}, {item.stateAbbr}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection city={location} />
    </>
  );
}
