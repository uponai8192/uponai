import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services, cities, getServiceBySlug } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';
import Testimonials from '@/components/sections/Testimonials';
import FeaturesBento from '@/components/sections/FeaturesBento';

const servicePhotos: Record<string, string> = {
  'business-voip': '/site-photos/voip-phone.jpg',
  'contact-centers': '/site-photos/omnichannel.jpg',
  'sip-trunks': '/site-photos/digital-cx.png',
  'hosted-fax': '/site-photos/laptop-typing.jpg',
  'mobile-voip-sms': '/site-photos/business-mobile.jpg',
  'web-video-conferencing': '/site-photos/team-consultation.jpg',
  'voip-integration': '/site-photos/digital-cx.png',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | MyVoIP`,
    description: `${service.description} Get started with MyVoIP ${service.shortName} — starting at $9.99/month with 24/7 US-based support.`,
    alternates: { canonical: `https://my-voip.com/services/${slug}` },
    openGraph: {
      title: `${service.name} | MyVoIP`,
      description: service.tagline,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 4);
  const featuredCities = cities.slice(0, 24);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Copy */}
          <div>
            <nav className="mb-5 flex items-center gap-1 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">Services</span>
              <span className="text-slate-600">/</span>
              <span className="text-white">{service.shortName}</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-300 text-sm font-medium">Cloud VoIP Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {service.name}
            </h1>
            <p className="text-xl text-blue-300 font-medium mb-5">{service.tagline}</p>
            <p className="text-slate-300 leading-relaxed mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Get a Free Quote
              </Link>
              <a href="tel:+18336986471" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Call (833) 698-6471
              </a>
            </div>
          </div>

          {/* Photo */}
          {servicePhotos[slug] && (
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50">
                <Image
                  src={servicePhotos[slug]}
                  alt={`${service.name} — MyVoIP`}
                  width={700}
                  height={480}
                  className="w-full h-auto object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <FeaturesBento
            features={service.features}
            title={`What's Included with MyVoIP ${service.shortName}`}
            subtitle="Every plan ships with these features — no add-on fees, no surprises."
          />
        </div>
      </section>

      {/* Why MyVoIP */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-blue-950/30 p-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Why Businesses Choose MyVoIP</h2>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '$9.99', label: 'Starting / month', sub: 'No long-term contracts', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { stat: '99.99%', label: 'Uptime SLA', sub: 'Enterprise-grade reliability', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                { stat: '24/7', label: 'US-Based Support', sub: 'Real humans, not bots', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
              ].map((item) => (
                <div key={item.stat} className={`${item.bg} ${item.border} border rounded-2xl p-7 text-center group hover:scale-[1.02] transition-transform duration-200`}>
                  <div className={`w-12 h-12 ${item.bg} ${item.border} border rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <svg className={`w-6 h-6 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <div className={`text-4xl font-black ${item.color} mb-2`}>{item.stat}</div>
                  <div className="text-white font-semibold mb-1">{item.label}</div>
                  <div className="text-slate-400 text-sm">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* City-specific pages for this service */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {service.shortName} Available Nationwide
              </h2>
              <p className="text-slate-400">
                MyVoIP serves businesses in every major US market. Find your city.
              </p>
            </div>
            <span className="text-slate-500 text-sm whitespace-nowrap">{cities.length} cities covered</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/services/${slug}/${city.slug}`}
                className="group relative text-center bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-3 text-sm text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all duration-200"
              >
                <span className="font-medium">{city.name}</span>
                <span className="block text-slate-600 text-xs group-hover:text-blue-400/70 transition-colors">{city.stateAbbr}</span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-slate-500 text-sm">+ {cities.length - featuredCities.length} more cities nationwide</p>
        </div>
      </section>

      <Testimonials />

      {/* Other Services */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Explore Other MyVoIP Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 transition-all">
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-300">{s.shortName}</h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{s.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
