import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries, cities, getIndustryBySlug, getCityBySlug, formatCityState } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';
import FeaturesBento from '@/components/sections/FeaturesBento';

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const industry of industries) {
    for (const city of cities) {
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
  const cs = formatCityState(city);
  return {
    title: `VoIP for ${industry.name} in ${cs} | MyVoIP`,
    description: `MyVoIP provides ${industry.name.toLowerCase()} businesses in ${cs} with cloud phone systems, AI features, and 24/7 US-based support. ${industry.tagline}. Starting at $9.99/month.`,
    alternates: { canonical: `https://my-voip.com/industries/${slug}/${citySlug}` },
    openGraph: {
      title: `VoIP for ${industry.name} in ${cs} | MyVoIP`,
      description: `${industry.tagline} — serving ${cs}.`,
    },
  };
}

const colorMap: Record<string, { bg: string; border: string; text: string; pill: string; pillText: string; dot: string; glow: string }> = {
  red:     { bg: 'bg-red-600/10',     border: 'border-red-500/30',     text: 'text-red-400',     pill: 'bg-red-600/10',     pillText: 'text-red-300',     dot: 'bg-red-400',    glow: 'bg-red-600/10' },
  blue:    { bg: 'bg-blue-600/10',    border: 'border-blue-500/30',    text: 'text-blue-400',    pill: 'bg-blue-600/10',    pillText: 'text-blue-300',    dot: 'bg-blue-400',   glow: 'bg-blue-600/10' },
  green:   { bg: 'bg-green-600/10',   border: 'border-green-500/30',   text: 'text-green-400',   pill: 'bg-green-600/10',   pillText: 'text-green-300',   dot: 'bg-green-400',  glow: 'bg-green-600/10' },
  yellow:  { bg: 'bg-yellow-600/10',  border: 'border-yellow-500/30',  text: 'text-yellow-400',  pill: 'bg-yellow-600/10',  pillText: 'text-yellow-300',  dot: 'bg-yellow-400', glow: 'bg-yellow-600/10' },
  orange:  { bg: 'bg-orange-600/10',  border: 'border-orange-500/30',  text: 'text-orange-400',  pill: 'bg-orange-600/10',  pillText: 'text-orange-300',  dot: 'bg-orange-400', glow: 'bg-orange-600/10' },
  purple:  { bg: 'bg-purple-600/10',  border: 'border-purple-500/30',  text: 'text-purple-400',  pill: 'bg-purple-600/10',  pillText: 'text-purple-300',  dot: 'bg-purple-400', glow: 'bg-purple-600/10' },
  slate:   { bg: 'bg-slate-600/20',   border: 'border-slate-500/30',   text: 'text-slate-300',   pill: 'bg-slate-700/50',   pillText: 'text-slate-300',   dot: 'bg-slate-400',  glow: 'bg-slate-600/10' },
  pink:    { bg: 'bg-pink-600/10',    border: 'border-pink-500/30',    text: 'text-pink-400',    pill: 'bg-pink-600/10',    pillText: 'text-pink-300',    dot: 'bg-pink-400',   glow: 'bg-pink-600/10' },
  amber:   { bg: 'bg-amber-600/10',   border: 'border-amber-500/30',   text: 'text-amber-400',   pill: 'bg-amber-600/10',   pillText: 'text-amber-300',   dot: 'bg-amber-400',  glow: 'bg-amber-600/10' },
  cyan:    { bg: 'bg-cyan-600/10',    border: 'border-cyan-500/30',    text: 'text-cyan-400',    pill: 'bg-cyan-600/10',    pillText: 'text-cyan-300',    dot: 'bg-cyan-400',   glow: 'bg-cyan-600/10' },
  violet:  { bg: 'bg-violet-600/10',  border: 'border-violet-500/30',  text: 'text-violet-400',  pill: 'bg-violet-600/10',  pillText: 'text-violet-300',  dot: 'bg-violet-400', glow: 'bg-violet-600/10' },
  rose:    { bg: 'bg-rose-600/10',    border: 'border-rose-500/30',    text: 'text-rose-400',    pill: 'bg-rose-600/10',    pillText: 'text-rose-300',    dot: 'bg-rose-400',   glow: 'bg-rose-600/10' },
  emerald: { bg: 'bg-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-400', pill: 'bg-emerald-600/10', pillText: 'text-emerald-300', dot: 'bg-emerald-400',glow: 'bg-emerald-600/10' },
};

// Assign photos to industries — rotate for variety
const INDUSTRY_PHOTOS = [
  '/site-photos/team-on-phone.jpg',
  '/site-photos/team-consultation.jpg',
  '/site-photos/voip-phone.jpg',
  '/site-photos/team-meeting.jpg',
  '/site-photos/omnichannel.jpg',
  '/site-photos/laptop-typing.jpg',
  '/site-photos/team-office.jpg',
  '/site-photos/team-conversation.jpg',
  '/site-photos/digital-cx.png',
  '/site-photos/business-mobile.jpg',
];

// Second content-section photo — offset from hero
const CONTENT_PHOTOS = [
  '/site-photos/team-meeting.jpg',
  '/site-photos/team-on-phone.jpg',
  '/site-photos/laptop-typing.jpg',
  '/site-photos/omnichannel.jpg',
  '/site-photos/team-conversation.jpg',
  '/site-photos/voip-phone.jpg',
  '/site-photos/team-consultation.jpg',
  '/site-photos/business-mobile.jpg',
  '/site-photos/team-office.jpg',
  '/site-photos/digital-cx.png',
];

export default async function IndustryCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const industry = getIndustryBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!industry || !city) notFound();

  const cs = formatCityState(city);
  const c = colorMap[industry.color] ?? colorMap['blue'];

  const industryIndex = industries.findIndex((i) => i.slug === slug);
  const heroPhoto = INDUSTRY_PHOTOS[industryIndex % INDUSTRY_PHOTOS.length];
  const contentPhoto = CONTENT_PHOTOS[(industryIndex + 3) % CONTENT_PHOTOS.length];

  // Alternate photo placement based on industry index
  const photoRight = industryIndex % 2 === 0;

  const cityIdx = cities.findIndex((ci) => ci.slug === citySlug);
  const nearby = [
    ...cities.slice(Math.max(0, cityIdx - 3), cityIdx),
    ...cities.slice(cityIdx + 1, cityIdx + 4),
  ].slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-0 w-[600px] h-[500px] ${c.glow} rounded-full blur-3xl opacity-50`} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-800/30 rounded-full blur-3xl" />
        </div>
        <div className={`relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!photoRight ? 'lg:grid-flow-dense' : ''}`}>

          {/* Copy */}
          <div className={!photoRight ? 'lg:col-start-2' : ''}>
            <nav className="flex items-center gap-2 text-slate-500 text-sm mb-6 flex-wrap">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/industries/${slug}`} className="hover:text-slate-300 transition-colors">{industry.name}</Link>
              <span>/</span>
              <span className="text-slate-300">{cs}</span>
            </nav>

            <div className={`inline-flex items-center gap-2 ${c.pill} ${c.border} border rounded-full px-4 py-1.5 mb-6`}>
              <span className={`w-2 h-2 ${c.dot} rounded-full animate-pulse`} />
              <span className={`${c.pillText} text-sm font-medium`}>{industry.name} · {cs}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              VoIP for{' '}
              <span className={c.text}>{industry.name}</span>{' '}
              in {cs}
            </h1>
            <p className="text-slate-300 text-xl mb-6 leading-relaxed">{industry.tagline}</p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
              {industry.description.replace(/\.$/, '')} — serving {city.name}, {city.state} businesses with 24/7 US-based support and no long-term contracts.
            </p>

            {/* Trust signals */}
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
                Get a Free Quote in {city.name}
              </Link>
              <a href="tel:+18336986471" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                (833) 698-6471
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className={`relative ${!photoRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className={`absolute -inset-3 ${c.glow} rounded-3xl blur-2xl opacity-30`} />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-700/60">
              <Image
                src={heroPhoto}
                alt={`${industry.name} VoIP phone system in ${cs}`}
                width={680}
                height={460}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
              {/* Floating stat badges */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl">
                <div className={`text-lg font-black ${c.text}`}>{industry.stats[0].value}</div>
                <div className="text-slate-300 text-xs">{industry.stats[0].label}</div>
              </div>
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="text-green-400 font-black text-sm">{industry.stats[2].value}</div>
                <div className="text-slate-300 text-xs">{industry.stats[2].label}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-slate-800/40 border-y border-slate-700/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {industry.stats.map((stat) => (
            <div key={stat.label}>
              <div className={`text-2xl font-black ${c.text} mb-0.5`}>{stat.value}</div>
              <div className="text-slate-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Challenges vs Solutions ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              We Understand {industry.name} in {city.name}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every challenge you face has a purpose-built solution in the MyVoIP platform.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg">Common Challenges</h3>
              </div>
              <div className="space-y-3">
                {industry.challenges.map((ch) => (
                  <div key={ch} className="flex items-start gap-3 bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                    <span className="text-slate-300 text-sm leading-relaxed">{ch}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${c.bg} ${c.border} border rounded-2xl p-8`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg">MyVoIP Solutions</h3>
              </div>
              <div className="space-y-3">
                {industry.solutions.map((sol) => (
                  <div key={sol} className="flex items-start gap-3 bg-slate-900/40 rounded-xl p-4 border border-white/5">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-sm leading-relaxed">{sol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features + Photo ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto mb-16">
          <FeaturesBento
            features={industry.features}
            title={`Everything Included for ${city.name} Businesses`}
            subtitle={`Purpose-built ${industry.name} features — no hidden fees, no complicated setups.`}
          />
          <div className="mt-8 text-center">
            <Link href="/quote" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Get a Free Quote
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-14 items-center">

          {/* Photo */}
          <div className="relative max-w-3xl mx-auto w-full">
            <div className={`absolute -inset-2 ${c.glow} rounded-3xl blur-2xl opacity-25`} />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50">
              <Image
                src={contentPhoto}
                alt={`VoIP features for ${industry.name} in ${cs}`}
                width={680}
                height={480}
                className="w-full h-auto object-cover"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                <p className="text-white font-semibold text-sm">24/7 US-Based Support</p>
                <p className="text-slate-300 text-xs">Real humans, not overseas call centers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Local trust ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className={`${c.bg} ${c.border} border rounded-2xl p-8 md:p-10`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Trusted by {city.name} {industry.name} Businesses
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  MyVoIP has been the go-to cloud phone provider for {industry.name.toLowerCase()} businesses in {cs} and across {city.state} for over two decades.
                  Our US-based support team is available 24/7, and setup typically takes less than 24 hours.
                </p>
                <Link href="/quote" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors">
                  Start Free Consultation
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '20+', label: 'Years Experience' },
                  { value: '5,000+', label: 'Businesses Served' },
                  { value: '99.99%', label: 'Uptime SLA' },
                  { value: '< 24 hrs', label: 'Setup Time' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 text-center">
                    <div className={`text-2xl font-black ${c.text} mb-1`}>{stat.value}</div>
                    <div className="text-slate-500 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'MyVoIP',
            description: `VoIP phone systems for ${industry.name} in ${cs}`,
            url: `https://my-voip.com/industries/${slug}/${citySlug}`,
            telephone: '+18336986471',
            email: 'Sales@my-voip.com',
            areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.state } },
          }),
        }}
      />

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <section className="py-12 px-4 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <p className="text-slate-500 text-sm mb-4">Also serving nearby areas:</p>
            <div className="flex flex-wrap gap-3">
              {nearby.map((nc) => (
                <Link key={nc.slug} href={`/industries/${slug}/${nc.slug}`} className={`${c.text} hover:opacity-80 text-sm transition-opacity`}>
                  {industry.name} VoIP in {formatCityState(nc)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
