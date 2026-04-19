import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cities, services, industries, getCityBySlug, formatCityState } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const location = formatCityState(city);
  return {
    title: `Business VoIP Phone Service in ${location} | MyVoIP`,
    description: `MyVoIP provides cloud phone systems and business VoIP service to companies in ${location}. Starting at $9.99/month. 24/7 US-based support. Get a free quote today.`,
    keywords: [`business VoIP ${city.name}`, `VoIP phone service ${city.name} ${city.stateAbbr}`, `cloud phone system ${city.name}`, `hosted PBX ${city.name}`, `SIP trunking ${city.name}`],
    alternates: { canonical: `https://my-voip.com/location/${citySlug}` },
    openGraph: {
      title: `Business VoIP in ${location} | MyVoIP`,
      description: `Cloud VoIP phone systems for ${location} businesses. Starting at $9.99/month.`,
    },
  };
}

// Rotate hero photos by city to add visual variety
const HERO_PHOTOS = [
  '/site-photos/team-on-phone.jpg',
  '/site-photos/team-consultation.jpg',
  '/site-photos/voip-phone.jpg',
  '/site-photos/team-meeting.jpg',
  '/site-photos/omnichannel.jpg',
  '/site-photos/team-office.jpg',
];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'business-voip': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  'contact-centers': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'sip-trunks': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  'hosted-fax': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  'mobile-voip-sms': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  'web-video-conferencing': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  'voip-integration': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
  'ai-voice-agents': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
  'ai-chatbots': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

export default async function LocationPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const location = formatCityState(city);
  const cityIndex = cities.findIndex((c) => c.slug === citySlug);
  const heroPhoto = HERO_PHOTOS[cityIndex % HERO_PHOTOS.length];
  const secondPhoto = HERO_PHOTOS[(cityIndex + 2) % HERO_PHOTOS.length];

  const nearbyCities = cities.filter((c) => c.stateAbbr === city.stateAbbr && c.slug !== citySlug).slice(0, 10);
  const featuredIndustries = industries.slice(0, 12);

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MyVoIP',
    description: `Business VoIP phone service provider serving ${location}`,
    url: `https://my-voip.com/location/${citySlug}`,
    telephone: '+18336986471',
    address: { '@type': 'PostalAddress', streetAddress: '281 US-46 West', addressLocality: 'Elmwood Park', addressRegion: 'NJ', postalCode: '07407', addressCountry: 'US' },
    areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.state } },
    priceRange: '$$',
    openingHours: 'Mo-Su 00:00-23:59',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-slate-700/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <nav className="flex items-center gap-2 text-slate-500 text-sm mb-6">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/location" className="hover:text-slate-300 transition-colors">Locations</Link>
              <span>/</span>
              <span className="text-slate-300">{location}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Serving {city.name}, {city.state}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Business VoIP in{' '}
              <span className="text-blue-400">{city.name}, {city.stateAbbr}</span>
            </h1>
            <p className="text-slate-300 text-xl mb-6 leading-relaxed">
              Cloud phone systems for {city.name} businesses — starting at $9.99/month
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
              MyVoIP gives {city.name} businesses enterprise-grade cloud phone systems at an affordable price. 24/7 US-based support, 99.99% uptime, and setup in under 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Get a Free Quote in {city.name}
              </Link>
              <a href="tel:+18336986471" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                (833) 698-6471
              </a>
            </div>
          </div>

          {/* Photo with floating stats */}
          <div className="relative">
            <div className="absolute -inset-3 bg-blue-500/8 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-700/60">
              <Image
                src={heroPhoto}
                alt={`MyVoIP business VoIP service in ${location}`}
                width={680}
                height={460}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
                <div className="text-2xl font-black text-blue-400">$9.99</div>
                <div className="text-slate-300 text-xs">Starting price / month</div>
              </div>
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
                <div className="text-lg font-black text-green-400">99.99%</div>
                <div className="text-slate-300 text-xs">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-slate-800/40 border-y border-slate-700/50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '$9.99/mo', label: `Starting price in ${city.name}` },
            { value: '99.99%', label: 'Uptime SLA' },
            { value: '24/7', label: 'US-Based Support' },
            { value: '< 24 hrs', label: 'Setup Time' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-black text-blue-400 mb-1">{item.value}</div>
              <div className="text-slate-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services grid with icons ─────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              VoIP Services Available in {city.name}
            </h2>
            <p className="text-slate-400 text-lg">
              Our full suite of cloud communication products — available to every {city.name} business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${citySlug}`} className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-800 transition-all">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600/30 transition-colors">
                  {SERVICE_ICONS[s.slug] ?? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-300 transition-colors">{s.shortName}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">{s.tagline}</p>
                <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300">
                  {s.shortName} in {city.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo + Features ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Everything Included</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5 leading-tight">
              What {city.name} Businesses Get with MyVoIP
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Unlimited local & long distance calls',
                'Auto-attendant & IVR menus',
                'Call recording & monitoring',
                'Voicemail to email with transcription',
                'Mobile app for iOS & Android',
                'Web softphone — no hardware needed',
                'Conference bridges & video meetings',
                'CRM & business tool integrations',
                'AI voice agents & chatbots',
                'SIP trunking & hosted fax',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/quote" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors">
                Get Started in {city.name}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/8 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
              <Image
                src={secondPhoto}
                alt={`Cloud VoIP features for ${city.name} businesses`}
                width={680}
                height={500}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Industries We Serve in {city.name}
            </h2>
            <p className="text-slate-400 text-lg">
              MyVoIP has specialized solutions for every business type in {city.state}.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredIndustries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}/${citySlug}`} className="group bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-blue-500/40 hover:bg-slate-800 transition-all text-center">
                <div className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{ind.name}</div>
                <div className="text-slate-500 text-xs mt-1 group-hover:text-blue-400 transition-colors">VoIP solutions →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby cities ────────────────────────────────────────────────────── */}
      {nearbyCities.length > 0 && (
        <section className="py-12 px-4 bg-slate-900/50 border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <p className="text-slate-500 text-sm mb-4">Also serving businesses near {city.name}:</p>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((nc) => (
                <Link key={nc.slug} href={`/location/${nc.slug}`} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white hover:border-blue-500/50 transition-colors">
                  {nc.name}, {nc.stateAbbr}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection city={location} />
    </>
  );
}
