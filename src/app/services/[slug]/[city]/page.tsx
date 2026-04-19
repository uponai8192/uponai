import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services, cities, industries, getServiceBySlug, getCityBySlug, formatCityState } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';
import FeaturesBento from '@/components/sections/FeaturesBento';

interface Props {
  params: Promise<{ slug: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of services) {
    for (const city of cities) {
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
  return {
    title: `${service.shortName} in ${location} | MyVoIP`,
    description: `MyVoIP provides ${service.name.toLowerCase()} for businesses in ${location}. ${service.tagline}. Starting at $9.99/month with 24/7 US-based support. Get a free quote today.`,
    keywords: [`${service.shortName.toLowerCase()} ${city.name}`, `business VoIP ${city.name}`, `cloud phone system ${city.name} ${city.stateAbbr}`, `${service.shortName.toLowerCase()} ${city.state}`],
    alternates: { canonical: `https://my-voip.com/services/${slug}/${citySlug}` },
    openGraph: {
      title: `${service.shortName} in ${location} | MyVoIP`,
      description: `${service.name} for ${location} businesses. ${service.tagline}.`,
    },
  };
}

// Assign a photo to each service
const SERVICE_PHOTOS: Record<string, string> = {
  'business-voip':          '/site-photos/voip-phone.jpg',
  'contact-centers':        '/site-photos/omnichannel.jpg',
  'sip-trunks':             '/site-photos/digital-cx.png',
  'hosted-fax':             '/site-photos/laptop-typing.jpg',
  'mobile-voip-sms':        '/site-photos/business-mobile.jpg',
  'web-video-conferencing': '/site-photos/team-consultation.jpg',
  'voip-integration':       '/site-photos/team-meeting.jpg',
  'ai-voice-agents':        '/site-photos/ai-concept.jpeg',
  'ai-chatbots':            '/site-photos/ai-chatbot.jpeg',
};

// Photo badge overlay data per service
const SERVICE_BADGES: Record<string, { top: string; bottom: string }> = {
  'business-voip':          { top: '99.99% Uptime', bottom: '$9.99 / month' },
  'contact-centers':        { top: 'Omnichannel Ready', bottom: 'Setup in 24 hrs' },
  'sip-trunks':             { top: 'Unlimited Calls', bottom: 'Keep Your PBX' },
  'hosted-fax':             { top: 'HIPAA Compliant', bottom: 'No Fax Machine' },
  'mobile-voip-sms':        { top: 'iOS & Android', bottom: 'Work Anywhere' },
  'web-video-conferencing': { top: '500 Participants', bottom: 'HD Video Included' },
  'voip-integration':       { top: '100+ Integrations', bottom: 'REST API Access' },
  'ai-voice-agents':        { top: '24/7 AI Answering', bottom: '< 1s Response' },
  'ai-chatbots':            { top: '80% Auto-Resolved', bottom: 'Live on Your Site' },
};


export default async function ServiceCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const location = formatCityState(city);
  const photo = SERVICE_PHOTOS[slug] ?? '/site-photos/team-on-phone.jpg';
  const badge = SERVICE_BADGES[slug] ?? { top: '99.99% Uptime', bottom: '$9.99 / month' };

  const nearbyCities = cities.filter((c) => c.stateAbbr === city.stateAbbr && c.slug !== citySlug).slice(0, 8);
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 4);
  const featuredIndustries = industries.slice(0, 6);

  // Alternate photo side based on city slug char code for visual variety
  const photoRight = city.slug.charCodeAt(0) % 2 === 0;

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MyVoIP',
    description: `${service.name} provider serving ${location} businesses`,
    url: `https://my-voip.com/services/${slug}/${citySlug}`,
    telephone: '+18336986471',
    address: { '@type': 'PostalAddress', streetAddress: '281 US-46 West', addressLocality: 'Elmwood Park', addressRegion: 'NJ', postalCode: '07407', addressCountry: 'US' },
    areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.state } },
    priceRange: '$$',
    openingHours: 'Mo-Su 00:00-23:59',
    serviceType: service.name,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-3xl" />
        </div>
        <div className={`relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!photoRight ? 'lg:grid-flow-dense' : ''}`}>

          {/* Copy */}
          <div className={!photoRight ? 'lg:col-start-2' : ''}>
            <nav className="flex flex-wrap items-center gap-2 text-slate-500 text-sm mb-6">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/services/${slug}`} className="hover:text-slate-300 transition-colors">{service.shortName}</Link>
              <span>/</span>
              <span className="text-slate-300">{location}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Now serving {location}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {service.shortName} in{' '}
              <span className="text-blue-400">{city.name}, {city.stateAbbr}</span>
            </h1>
            <p className="text-slate-300 text-xl mb-6 leading-relaxed">{service.tagline}</p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
              MyVoIP provides {city.name} businesses with {service.name.toLowerCase()} — feature-rich, reliable, and affordable. Get enterprise-grade cloud communications without the enterprise price tag.
            </p>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-slate-400 text-sm mb-8">
              {['No Long-Term Contracts', '24/7 US Support', '99.99% Uptime', 'Setup in 24 Hours'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Get a Free Quote
              </Link>
              <a href="tel:+18336986471" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                (833) 698-6471
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className={`relative ${!photoRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className="absolute -inset-3 bg-blue-500/8 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-700/60">
              <Image
                src={photo}
                alt={`${service.name} in ${location}`}
                width={680}
                height={460}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
              {/* Stat badges */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="text-blue-400 font-black text-lg leading-none">{badge.bottom.split(' ')[0]}</div>
                <div className="text-slate-300 text-xs">{badge.bottom.split(' ').slice(1).join(' ')}</div>
              </div>
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="text-green-400 font-black text-sm leading-none">{badge.top}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <FeaturesBento
            features={service.features}
            title={`${service.shortName} Features for ${city.name} Businesses`}
            subtitle="Every plan includes these features — no add-on fees, no surprises."
          />
        </div>
      </section>

      {/* ── Why MyVoIP in [City] — photo + copy ─────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Photo collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 row-span-2">
                <Image
                  src="/site-photos/team-on-phone.jpg"
                  alt={`MyVoIP support team serving ${city.name}`}
                  width={400}
                  height={560}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700/50">
                <Image
                  src="/site-photos/team-office.jpg"
                  alt="MyVoIP team"
                  width={400}
                  height={260}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700/50">
                <Image
                  src="/site-photos/team-conversation.jpg"
                  alt="MyVoIP support"
                  width={400}
                  height={260}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Why {city.name} Businesses Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5 leading-tight">
              Local-Quality Service. Enterprise-Grade Technology.
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Unlike big telecom carriers, MyVoIP gives every {city.name} business direct access to our US-based support team — not an overseas call center. When something needs fixing, you talk to a real person who knows your system.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              We&apos;ve been connecting businesses across {city.state} with reliable cloud communications for over 20 years. No long-term contracts, no surprise bills, and no IT department required.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: '20+', label: 'Years in Business' },
                { value: '5,000+', label: 'Businesses Served' },
                { value: '99.99%', label: 'Uptime SLA' },
                { value: '$9.99', label: 'Starting Price/mo' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                  <div className="text-2xl font-black text-blue-400 mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link href="/quote" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Start Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Industries we serve in this city ────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            {service.shortName} for Every Industry in {city.name}
          </h2>
          <p className="text-slate-400 text-center mb-8">Trusted by businesses across every sector in {city.state}.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredIndustries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}/${citySlug}`} className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-3 text-center hover:border-blue-500/40 hover:bg-slate-800 transition-all group">
                <div className="text-slate-300 text-xs font-medium group-hover:text-white transition-colors leading-snug">{ind.name.split(' ')[0]}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other services ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">More MyVoIP Services in {location}</h2>
          <p className="text-slate-400 mb-8">Explore our full suite of cloud communication products.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${citySlug}`} className="group bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 hover:bg-slate-800 transition-all">
                <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-blue-300 transition-colors">{s.shortName}</h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">{s.tagline}</p>
                <span className="text-blue-400 text-xs font-medium group-hover:text-blue-300">
                  {s.shortName} in {city.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby cities ────────────────────────────────────────────────────── */}
      {nearbyCities.length > 0 && (
        <section className="py-12 px-4 bg-slate-900/50 border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <p className="text-slate-500 text-sm mb-4">Also serving {service.shortName} customers near {city.name}:</p>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((nc) => (
                <Link key={nc.slug} href={`/services/${slug}/${nc.slug}`} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white hover:border-blue-500/50 transition-colors">
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
