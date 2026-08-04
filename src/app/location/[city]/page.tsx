import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cities, services, industries, getCityBySlug, formatCityState, staticParamCities } from '@/lib/data';
import { offsetBrandPhotos, rotatingBrandPhotos } from '@/lib/brand-photos';
import { getCityMarketNarrative, getCityRegionNarrative, voiceAIIndustryPages } from '@/lib/voice-ai-industries';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildLocalBusinessSchema, buildPageMetadata } from '@/lib/seo';
import { getServiceContent } from '@/lib/site-content';
import CTASection from '@/components/sections/CTASection';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return staticParamCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const location = formatCityState(city);
  const heroPhoto = rotatingBrandPhotos[cities.findIndex((item) => item.slug === citySlug) % rotatingBrandPhotos.length];

  return {
    ...buildPageMetadata({
      title: `AI Voice and Communication Workflows in ${location}`,
      description: `UponAI provides AI voice workflows, cloud communications, routing design, and customer conversation infrastructure to companies in ${location}.`,
      path: `/location/${citySlug}`,
      openGraphDescription: `Cloud communications, AI voice workflows, and routing design for ${location} businesses.`,
      image: heroPhoto,
    }),
    keywords: [
      `business communications ${city.name}`,
      `AI voice ${city.name} ${city.stateAbbr}`,
      `customer communication workflow ${city.name}`,
      `cloud communications ${city.name}`,
    ],
  };
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'business-voip': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  'contact-centers': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  'sip-trunks': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" /></svg>,
  'hosted-fax': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
  'mobile-voip-sms': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  'web-video-conferencing': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  'voip-integration': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
  'ai-voice-agents': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
  'ai-chatbots': <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
};

export default async function LocationPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const location = formatCityState(city);
  const market = getCityMarketNarrative(city);
  const region = getCityRegionNarrative(city);
  const cityIndex = cities.findIndex((item) => item.slug === citySlug);
  const heroPhoto = rotatingBrandPhotos[cityIndex % rotatingBrandPhotos.length];
  const secondPhoto = offsetBrandPhotos[(cityIndex + 2) % offsetBrandPhotos.length];
  const nearbyCities = cities.filter((item) => item.stateAbbr === city.stateAbbr && item.slug !== citySlug).slice(0, 10);
  const featuredIndustries = industries.slice(0, 12);
  const pagePath = `/location/${citySlug}`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: location, path: pagePath },
  ]);
  const localBusinessSchema = buildLocalBusinessSchema({
    name: 'UponAI',
    description: `Business communications provider serving ${location}`,
    path: pagePath,
    areaServed: { city: city.name, state: city.state },
  });
  const collectionSchema = buildCollectionPageSchema({
    name: `UponAI services in ${location}`,
    description: `Service, industry, and AI voice workflow pages relevant to teams in ${location}.`,
    path: pagePath,
    items: [
      ...services.slice(0, 6).map((service) => ({ name: `${service.shortName} in ${location}`, path: `/services/${service.slug}/${citySlug}` })),
      ...voiceAIIndustryPages.slice(0, 6).map((page) => ({ name: `${page.label} in ${location}`, path: `/${page.slug}/${citySlug}` })),
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-[500px] w-[600px] rounded-full bg-blue-600/8 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-slate-700/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition-colors hover:text-slate-300">Home</Link>
              <span>/</span>
              <span className="text-slate-300">{location}</span>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-blue-300">Serving {city.name}, {city.state}</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              AI Voice, Calling, and Communication Workflows in <span className="text-blue-400">{city.name}, {city.stateAbbr}</span>
            </h1>
            <p className="mb-6 text-xl leading-relaxed text-slate-300">
              Cloud communications, AI voice layers, routing design, and customer conversation workflows for {city.name} teams
            </p>
            <p className="mb-8 max-w-lg leading-relaxed text-slate-400">
              UponAI gives {city.name} businesses a modern communications stack that combines telecom, AI voice, messaging, automation, and live handoff design around real customer conversations. {market.seo}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/quote" className="rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-blue-500">
                Get a Free Quote in {city.name}
              </Link>
              <a href="tel:+18336986471" className="rounded-xl border border-slate-600 px-8 py-4 text-center text-lg font-semibold text-slate-200 transition-colors hover:border-blue-500 hover:text-white">
                (888) 787-6624
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-blue-500/8 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl shadow-black/60">
              <Image src={heroPhoto} alt={`UponAI business communications service in ${location}`} width={680} height={460} className="h-auto w-full object-cover" priority unoptimized />
              <div className="absolute bottom-4 left-4 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                <div className="text-2xl font-black text-blue-400">AI + Telecom</div>
                <div className="text-xs text-slate-300">One connected communication stack</div>
              </div>
              <div className="absolute right-4 top-4 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur-sm">
                <div className="text-lg font-black text-green-400">99.99%</div>
                <div className="text-xs text-slate-300">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-700/50 bg-slate-800/40 px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            { value: '24/7', label: `Communication coverage in ${city.name}` },
            { value: '99.99%', label: 'Uptime SLA' },
            { value: '24/7', label: 'US-Based Support' },
            { value: 'AI', label: 'Voice workflow expansion' },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-1 text-2xl font-black text-blue-400">{item.value}</div>
              <div className="text-sm text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">Local Market</span>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Why communication design in {city.name} should not look like a generic national page.
              </h2>
            </div>
            <p className="leading-relaxed text-slate-400">
              {market.headline} {market.body} {region.body}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              `Teams in ${city.name} often need faster first-response coverage because ${market.seo.toLowerCase()}`,
              `${region.title} ${region.body}`,
              nearbyCities.length > 0
                ? `UponAI supports businesses across ${city.state}, so workflows in ${city.name} can stay consistent even when teams also cover nearby markets like ${nearbyCities.slice(0, 3).map((item) => item.name).join(', ')}.`
                : `UponAI supports businesses across ${city.state}, so workflows in ${city.name} can stay consistent across the broader market.`,
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
                <p className="text-sm leading-relaxed text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Communication and AI Services Available in {city.name}</h2>
            <p className="text-lg text-slate-400">The full UponAI stack, from calling infrastructure to AI voice and digital conversation workflows.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}/${citySlug}`} className="group rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-blue-500/50 hover:bg-slate-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 transition-colors group-hover:bg-blue-600/30">
                  {SERVICE_ICONS[service.slug] ?? <span className="text-lg font-bold">+</span>}
                </div>
                <h3 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-blue-300">{service.shortName}</h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-400">{getServiceContent(service).tagline}</p>
                <span className="text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">{service.shortName} in {city.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">Everything Included</span>
            <h2 className="mt-3 mb-5 text-3xl font-bold leading-tight text-white md:text-4xl">What {city.name} Businesses Get with UponAI</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Cloud calling and intelligent routing',
                'AI voice agents and call coverage workflows',
                'Website chatbots and digital lead capture',
                'Business messaging and softphone access',
                'Call transcripts, recordings, and analytics',
                'CRM and workflow integrations',
                'SIP connectivity and flexible number management',
                'Meetings, collaboration, and conferencing',
                'Hosted fax and document-heavy communication support',
                'Operationally-aware handoff design',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <svg className="h-4 w-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/quote" className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-colors hover:bg-blue-500">
                Get Started in {city.name}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-blue-500/8 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl">
              <Image src={secondPhoto} alt={`Cloud communication features for ${city.name} businesses`} width={680} height={500} className="h-auto w-full object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Industries We Serve in {city.name}</h2>
            <p className="text-lg text-slate-400">UponAI has specialized workflow support for a wide range of industries across {city.state}.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredIndustries.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}/${citySlug}`} className="group rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-center transition-all hover:border-blue-500/40 hover:bg-slate-800">
                <div className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">{industry.name}</div>
                <div className="mt-1 text-xs text-slate-500 transition-colors group-hover:text-blue-400">Communication workflows →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Dedicated AI Voice Pages for {city.name}</h2>
            <p className="text-lg text-slate-400">Explore city-specific AI voice pages built for the industries most likely to search locally.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {voiceAIIndustryPages.slice(0, 8).map((page) => (
              <Link key={page.slug} href={`/${page.slug}/${city.slug}`} className="group rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-center transition-all hover:border-blue-500/40 hover:bg-slate-800">
                <div className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">{page.label}</div>
                <div className="mt-1 text-xs text-slate-500 transition-colors group-hover:text-blue-400">In {city.name} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {nearbyCities.length > 0 ? (
        <section className="border-t border-slate-800 bg-slate-900/50 px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm text-slate-500">Also serving businesses near {city.name}:</p>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((nearbyCity) => (
                <Link key={nearbyCity.slug} href={`/location/${nearbyCity.slug}`} className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-blue-500/50 hover:text-white">
                  {nearbyCity.name}, {nearbyCity.stateAbbr}
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
