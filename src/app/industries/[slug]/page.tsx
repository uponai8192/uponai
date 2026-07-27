import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { industries, services, getIndustryBySlug } from '@/lib/data';
import { rotatingBrandPhotos } from '@/lib/brand-photos';
import { getIndustryContent, getServiceContent } from '@/lib/site-content';
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from '@/lib/seo';
import { getFeaturedCities } from '@/lib/voice-ai-industries';
import VerticalVoiceAgentCard from '@/components/voice/VerticalVoiceAgentCard';
import { getVerticalAgentForSlug } from '@/lib/vertical-agents';
import CTASection from '@/components/sections/CTASection';
import FeaturesBento from '@/components/sections/FeaturesBento';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  const content = getIndustryContent(industry);
  const heroPhoto = rotatingBrandPhotos[industries.findIndex((item) => item.slug === slug) % rotatingBrandPhotos.length];

  return buildPageMetadata({
    title: `${industry.name} Communication Workflows`,
    description: content.metaDescription,
    path: `/industries/${slug}`,
    openGraphDescription: content.description,
    image: heroPhoto,
  });
}

const colorMap: Record<string, { bg: string; border: string; text: string; pill: string; pillText: string; dot: string }> = {
  red: { bg: 'bg-red-600/10', border: 'border-red-500/30', text: 'text-red-400', pill: 'bg-red-600/10', pillText: 'text-red-300', dot: 'bg-red-400' },
  blue: { bg: 'bg-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400', pill: 'bg-blue-600/10', pillText: 'text-blue-300', dot: 'bg-blue-400' },
  green: { bg: 'bg-green-600/10', border: 'border-green-500/30', text: 'text-green-400', pill: 'bg-green-600/10', pillText: 'text-green-300', dot: 'bg-green-400' },
  yellow: { bg: 'bg-yellow-600/10', border: 'border-yellow-500/30', text: 'text-yellow-400', pill: 'bg-yellow-600/10', pillText: 'text-yellow-300', dot: 'bg-yellow-400' },
  orange: { bg: 'bg-orange-600/10', border: 'border-orange-500/30', text: 'text-orange-400', pill: 'bg-orange-600/10', pillText: 'text-orange-300', dot: 'bg-orange-400' },
  purple: { bg: 'bg-purple-600/10', border: 'border-purple-500/30', text: 'text-purple-400', pill: 'bg-purple-600/10', pillText: 'text-purple-300', dot: 'bg-purple-400' },
  slate: { bg: 'bg-slate-600/20', border: 'border-slate-500/30', text: 'text-slate-300', pill: 'bg-slate-700/50', pillText: 'text-slate-300', dot: 'bg-slate-400' },
  pink: { bg: 'bg-pink-600/10', border: 'border-pink-500/30', text: 'text-pink-400', pill: 'bg-pink-600/10', pillText: 'text-pink-300', dot: 'bg-pink-400' },
  amber: { bg: 'bg-amber-600/10', border: 'border-amber-500/30', text: 'text-amber-400', pill: 'bg-amber-600/10', pillText: 'text-amber-300', dot: 'bg-amber-400' },
  cyan: { bg: 'bg-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400', pill: 'bg-cyan-600/10', pillText: 'text-cyan-300', dot: 'bg-cyan-400' },
  violet: { bg: 'bg-violet-600/10', border: 'border-violet-500/30', text: 'text-violet-400', pill: 'bg-violet-600/10', pillText: 'text-violet-300', dot: 'bg-violet-400' },
  rose: { bg: 'bg-rose-600/10', border: 'border-rose-500/30', text: 'text-rose-400', pill: 'bg-rose-600/10', pillText: 'text-rose-300', dot: 'bg-rose-400' },
  emerald: { bg: 'bg-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-400', pill: 'bg-emerald-600/10', pillText: 'text-emerald-300', dot: 'bg-emerald-400' },
};

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const content = getIndustryContent(industry);
  const c = colorMap[industry.color] ?? colorMap.blue;
  const industryIndex = industries.findIndex((item) => item.slug === slug);
  const heroPhoto = rotatingBrandPhotos[industryIndex % rotatingBrandPhotos.length];
  const recommendedServices = services.filter((service) => !['ai-voice-agents', 'ai-chatbots'].includes(service.slug)).slice(0, 4);
  const featuredCities = getFeaturedCities(24);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: industry.name, path: `/industries/${slug}` },
  ]);
  const serviceSchema = buildServiceSchema({
    name: `${industry.name} Communication Workflows`,
    description: content.metaDescription,
    path: `/industries/${slug}`,
    serviceType: industry.name,
    image: heroPhoto,
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

      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0">
          <div className={`absolute left-0 top-0 h-[500px] w-[700px] ${c.bg} rounded-full blur-3xl opacity-60`} />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-900/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-slate-300">Home</Link>
            <span>/</span>
            <span className="text-slate-300">{industry.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className={`mb-6 inline-flex items-center gap-2 rounded-full border ${c.border} ${c.pill} px-4 py-1.5`}>
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                <span className={`text-sm font-medium ${c.pillText}`}>{content.badgeLabel}</span>
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
                <span className={c.text}>{content.heroTitle}</span>
              </h1>
              <p className="mb-5 text-xl leading-relaxed text-slate-300">{content.tagline}</p>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">{content.description}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/quote" className="rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-blue-500">
                  Get a Free Quote
                </Link>
                <a href="tel:+18336986471" className="rounded-xl border border-slate-600 px-8 py-4 text-center text-lg font-semibold text-slate-200 transition-colors hover:border-blue-500 hover:text-white">
                  Call (888) 787-6624
                </a>
              </div>
            </div>

            <div className="relative">
              <VerticalVoiceAgentCard agent={getVerticalAgentForSlug(industry.slug, industry.name)} />
              <div className="mt-4 grid grid-cols-2 gap-3">
                {content.stats.slice(2, 4).map((stat) => (
                  <div key={stat.label} className={`rounded-xl border ${c.border} ${c.bg} p-4 text-center`}>
                    <div className={`mb-1 text-2xl font-black ${c.text}`}>{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">We Understand Your Industry</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">Every challenge you face has a purpose-built solution in the UponAI platform.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8">
              <h3 className="mb-6 text-xl font-bold text-white">Common Challenges</h3>
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
              <h3 className="mb-6 text-xl font-bold text-white">UponAI Solutions</h3>
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
        <div className="mx-auto max-w-6xl">
          <FeaturesBento
            features={industry.features}
            title={`Everything ${industry.name} Needs, Built In`}
            subtitle="Purpose-built features for your industry without generic phone-system filler."
          />
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Most Relevant UponAI Services for {industry.name}</h2>
            <p className="text-lg text-slate-400">These UponAI solutions are commonly paired with {industry.name.toLowerCase()} workflows.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-blue-500/50 hover:bg-slate-800">
                <h3 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-blue-300">{service.shortName}</h3>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-400">{getServiceContent(service).tagline}</p>
                <div className="flex items-center text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">Learn more</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className={`rounded-3xl border ${c.border} ${c.bg} p-10 md:p-14`}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${c.text}`}>Why UponAI for {industry.name}</span>
                <h2 className="mt-3 mb-5 text-3xl font-bold leading-tight text-white md:text-4xl">
                  Communication workflows shaped around how your industry actually operates
                </h2>
                <p className="mb-5 leading-relaxed text-slate-400">{content.locationSummary}</p>
                <p className="leading-relaxed text-slate-400">
                  UponAI combines cloud communications, AI workflow design, and routing logic so your team can improve responsiveness without relying on generic phone-system messaging.
                </p>
                <div className="mt-8">
                  <Link href="/quote" className="rounded-xl bg-blue-600 px-8 py-4 text-center font-bold text-white transition-colors hover:bg-blue-500">
                    Start Free Consultation
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {content.trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <svg className={`h-5 w-5 flex-shrink-0 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Serving {industry.name} Businesses Nationwide</h2>
            <p className="text-lg text-slate-400">Click your city to see local workflow pages for {industry.name.toLowerCase()} teams.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {featuredCities.map((city) => (
              <Link key={city.slug} href={`/industries/${slug}/${city.slug}`} className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-center text-sm text-slate-300 transition-all hover:border-blue-500/50 hover:bg-slate-800 hover:text-white">
                {city.name}, {city.stateAbbr}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">+ 240 more cities nationwide · <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact us</Link> for your area</p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
