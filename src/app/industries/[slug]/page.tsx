import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { industries, services, cities, getIndustryBySlug } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';
import FeaturesBento from '@/components/sections/FeaturesBento';

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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `VoIP for ${industry.name} | MyVoIP`,
    description: `${industry.tagline}. MyVoIP provides ${industry.name.toLowerCase()} businesses with cloud phone systems, AI features, and 24/7 US-based support — starting at $9.99/month.`,
    alternates: { canonical: `https://my-voip.com/industries/${slug}` },
    openGraph: {
      title: `VoIP for ${industry.name} | MyVoIP`,
      description: industry.description,
    },
  };
}

const colorMap: Record<string, { bg: string; border: string; text: string; pill: string; pillText: string; dot: string }> = {
  red:     { bg: 'bg-red-600/10',     border: 'border-red-500/30',     text: 'text-red-400',     pill: 'bg-red-600/10',     pillText: 'text-red-300',     dot: 'bg-red-400' },
  blue:    { bg: 'bg-blue-600/10',    border: 'border-blue-500/30',    text: 'text-blue-400',    pill: 'bg-blue-600/10',    pillText: 'text-blue-300',    dot: 'bg-blue-400' },
  green:   { bg: 'bg-green-600/10',   border: 'border-green-500/30',   text: 'text-green-400',   pill: 'bg-green-600/10',   pillText: 'text-green-300',   dot: 'bg-green-400' },
  yellow:  { bg: 'bg-yellow-600/10',  border: 'border-yellow-500/30',  text: 'text-yellow-400',  pill: 'bg-yellow-600/10',  pillText: 'text-yellow-300',  dot: 'bg-yellow-400' },
  orange:  { bg: 'bg-orange-600/10',  border: 'border-orange-500/30',  text: 'text-orange-400',  pill: 'bg-orange-600/10',  pillText: 'text-orange-300',  dot: 'bg-orange-400' },
  purple:  { bg: 'bg-purple-600/10',  border: 'border-purple-500/30',  text: 'text-purple-400',  pill: 'bg-purple-600/10',  pillText: 'text-purple-300',  dot: 'bg-purple-400' },
  slate:   { bg: 'bg-slate-600/20',   border: 'border-slate-500/30',   text: 'text-slate-300',   pill: 'bg-slate-700/50',   pillText: 'text-slate-300',   dot: 'bg-slate-400' },
  pink:    { bg: 'bg-pink-600/10',    border: 'border-pink-500/30',    text: 'text-pink-400',    pill: 'bg-pink-600/10',    pillText: 'text-pink-300',    dot: 'bg-pink-400' },
  amber:   { bg: 'bg-amber-600/10',   border: 'border-amber-500/30',   text: 'text-amber-400',   pill: 'bg-amber-600/10',   pillText: 'text-amber-300',   dot: 'bg-amber-400' },
  cyan:    { bg: 'bg-cyan-600/10',    border: 'border-cyan-500/30',    text: 'text-cyan-400',    pill: 'bg-cyan-600/10',    pillText: 'text-cyan-300',    dot: 'bg-cyan-400' },
  violet:  { bg: 'bg-violet-600/10',  border: 'border-violet-500/30',  text: 'text-violet-400',  pill: 'bg-violet-600/10',  pillText: 'text-violet-300',  dot: 'bg-violet-400' },
  rose:    { bg: 'bg-rose-600/10',    border: 'border-rose-500/30',    text: 'text-rose-400',    pill: 'bg-rose-600/10',    pillText: 'text-rose-300',    dot: 'bg-rose-400' },
  emerald: { bg: 'bg-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-400', pill: 'bg-emerald-600/10', pillText: 'text-emerald-300', dot: 'bg-emerald-400' },
};

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const c = colorMap[industry.color] ?? colorMap['blue'];

  const industryIndex = industries.findIndex((i) => i.slug === slug);
  const heroPhoto = INDUSTRY_PHOTOS[industryIndex % INDUSTRY_PHOTOS.length];

  const recommendedServices = services.filter((s) =>
    !['ai-voice-agents', 'ai-chatbots'].includes(s.slug)
  ).slice(0, 4);

  const featuredCities = cities.slice(0, 60);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-0 w-[700px] h-[500px] ${c.bg} rounded-full blur-3xl opacity-60`} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#industries" className="hover:text-slate-300 transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-slate-300">{industry.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className={`inline-flex items-center gap-2 ${c.pill} ${c.border} border rounded-full px-4 py-1.5 mb-6`}>
                <span className={`w-2 h-2 ${c.dot} rounded-full animate-pulse`} />
                <span className={`${c.pillText} text-sm font-medium`}>Industry Solution</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                VoIP for <span className={c.text}>{industry.name}</span>
              </h1>
              <p className="text-xl text-slate-300 font-medium mb-5 leading-relaxed">{industry.tagline}</p>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{industry.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                  Get a Free Quote
                </Link>
                <a href="tel:+18336986471" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                  Call (833) 698-6471
                </a>
              </div>
            </div>

            {/* Right: Photo + floating stats */}
            <div className="relative">
              <div className={`absolute -inset-3 ${c.bg} rounded-3xl blur-2xl opacity-40`} />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-700/60">
                <Image
                  src={heroPhoto}
                  alt={`VoIP for ${industry.name}`}
                  width={680}
                  height={480}
                  className="w-full h-auto object-cover"
                  priority
                  unoptimized
                />
                {/* Floating stat overlays */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl">
                  <div className={`text-xl font-black ${c.text}`}>{industry.stats[0].value}</div>
                  <div className="text-slate-300 text-xs">{industry.stats[0].label}</div>
                </div>
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl">
                  <div className="text-green-400 font-black text-sm">{industry.stats[2].label}</div>
                  <div className={`font-black text-lg ${c.text}`}>{industry.stats[2].value}</div>
                </div>
              </div>
              {/* Mini stats below the photo */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {industry.stats.slice(1, 3).map((stat) => (
                  <div key={stat.label} className={`${c.bg} ${c.border} border rounded-xl p-4 text-center`}>
                    <div className={`text-2xl font-black ${c.text} mb-1`}>{stat.value}</div>
                    <div className="text-slate-400 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges vs Solutions */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              We Understand Your Industry
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every challenge you face has a purpose-built solution in the MyVoIP platform.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenges */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl">Common Challenges</h3>
              </div>
              <div className="space-y-3">
                {industry.challenges.map((challenge) => (
                  <div key={challenge} className="flex items-start gap-3 bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">✕</span>
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className={`${c.bg} ${c.border} border rounded-2xl p-8`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl">MyVoIP Solutions</h3>
              </div>
              <div className="space-y-3">
                {industry.solutions.map((solution) => (
                  <div key={solution} className="flex items-start gap-3 bg-slate-900/40 rounded-xl p-4 border border-white/5">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-sm leading-relaxed">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FeaturesBento
            features={industry.features}
            title={`Everything ${industry.name} Needs, Built In`}
            subtitle="Purpose-built features for your industry — no add-ons or complicated setups required."
          />
        </div>
      </section>

      {/* Recommended Services */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Most Popular Services for {industry.name}
            </h2>
            <p className="text-slate-400 text-lg">
              These MyVoIP products are most widely used by {industry.name.toLowerCase()} organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-800 transition-all">
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-300 transition-colors">{s.shortName}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{s.tagline}</p>
                <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why MyVoIP */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`${c.bg} ${c.border} border rounded-3xl p-10 md:p-14`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className={`${c.text} text-sm font-semibold uppercase tracking-wider`}>Why MyVoIP for {industry.name}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5 leading-tight">
                  The Right VoIP Partner for Your Industry
                </h2>
                <p className="text-slate-400 leading-relaxed mb-5">
                  Unlike generic phone providers, MyVoIP has specialized experience serving {industry.name.toLowerCase()} businesses.
                  We understand your workflows, your compliance requirements, and what it takes to keep your team communicating efficiently.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Get set up in as little as 24 hours with dedicated onboarding support — no IT department required.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/quote" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-center">
                    Start Free Consultation
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  '20+ years serving US businesses',
                  '5,000+ businesses across all industries',
                  '24/7 US-based support — real humans',
                  'No long-term contracts required',
                  '99.99% uptime SLA guaranteed',
                  'Setup in as little as 24 hours',
                  'Starting at just $9.99/month per user',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${c.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Serving {industry.name} Businesses Nationwide
            </h2>
            <p className="text-slate-400 text-lg">
              Click your city to see local pricing and availability for {industry.name.toLowerCase()} businesses.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/industries/${slug}/${city.slug}`}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition-all text-center"
              >
                {city.name}, {city.stateAbbr}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">+ 240 more cities nationwide · <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact us</Link> for your area</p>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `VoIP Phone Systems for ${industry.name}`,
            description: industry.description,
            provider: {
              '@type': 'Organization',
              name: 'MyVoIP',
              url: 'https://my-voip.com',
              telephone: '+18336986471',
            },
            areaServed: { '@type': 'Country', name: 'United States' },
            url: `https://my-voip.com/industries/${slug}`,
          }),
        }}
      />

      <CTASection />
    </>
  );
}
