import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services, cities, getServiceBySlug } from '@/lib/data';
import { servicePhotoMap } from '@/lib/brand-photos';
import { getServiceContent } from '@/lib/site-content';
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from '@/lib/seo';
import CTASection from '@/components/sections/CTASection';
import Testimonials from '@/components/sections/Testimonials';
import FeaturesBento from '@/components/sections/FeaturesBento';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const content = getServiceContent(service);

  return buildPageMetadata({
    title: `${service.name}`,
    description: `${content.metaDescription} UponAI connects ${service.shortName.toLowerCase()} to routing, AI workflows, and modern customer conversations.`,
    path: `/services/${slug}`,
    openGraphDescription: content.tagline,
    image: servicePhotoMap[slug],
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const content = getServiceContent(service);
  const otherServices = services.filter((item) => item.slug !== slug).slice(0, 4);
  const featuredCities = cities.slice(0, 24);
  const photo = servicePhotoMap[slug];
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: service.shortName, path: `/services/${slug}` },
  ]);
  const serviceSchema = buildServiceSchema({
    name: service.name,
    description: content.metaDescription,
    path: `/services/${slug}`,
    serviceType: service.shortName,
    image: photo,
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
          <div className="absolute left-0 top-0 h-[400px] w-[600px] rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <nav className="mb-5 flex items-center gap-1 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">Services</span>
              <span className="text-slate-600">/</span>
              <span className="text-white">{service.shortName}</span>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5">
              <span className="text-sm font-medium text-blue-300">{content.badgeLabel}</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              {service.name}
            </h1>
            <p className="mb-5 text-xl font-medium text-blue-300">{content.tagline}</p>
            <p className="mb-8 leading-relaxed text-slate-300">{content.description}</p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/quote" className="rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-blue-500">
                Get a Free Quote
              </Link>
              <a href="tel:+18336986471" className="rounded-xl border border-slate-600 px-8 py-4 text-center text-lg font-semibold text-slate-200 transition-colors hover:border-blue-500 hover:text-white">
                Call (888) 787-6624
              </a>
            </div>
          </div>

          {photo ? (
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-blue-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50">
                <Image
                  src={photo}
                  alt={`${service.name} — UponAI`}
                  width={700}
                  height={480}
                  className="h-auto w-full object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <FeaturesBento
            features={service.features}
            title={`What&apos;s Included with UponAI ${service.shortName}`}
            subtitle="Core features for teams that want cleaner communication, stronger routing, and room to expand into AI workflows."
          />
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-blue-950/30 p-10">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/8 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-600/8 blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">Why Teams Choose UponAI</h2>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-slate-400">{content.whyBody}</p>
            </div>

            <div className="relative mt-8 grid gap-6 md:grid-cols-4">
              {content.whyStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-700/70 bg-slate-900/40 p-6 text-center">
                  <div className="mb-2 text-3xl font-black text-blue-400">{item.value}</div>
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">{service.shortName} Available Nationwide</h2>
              <p className="text-slate-400">UponAI supports businesses in every major US market. Find your city.</p>
            </div>
            <span className="whitespace-nowrap text-sm text-slate-500">{cities.length} cities covered</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/services/${slug}/${city.slug}`}
                className="group rounded-xl border border-slate-700/60 bg-slate-800/40 px-3 py-3 text-center text-sm text-slate-400 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-white"
              >
                <span className="font-medium">{city.name}</span>
                <span className="block text-xs text-slate-600 transition-colors group-hover:text-blue-400/70">{city.stateAbbr}</span>
              </Link>
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-500">+ {cities.length - featuredCities.length} more cities nationwide</p>
        </div>
      </section>

      <Testimonials />

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-bold text-white">Explore Other UponAI Solutions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-blue-500/50">
                <h3 className="mb-1 text-sm font-semibold text-white group-hover:text-blue-300">{item.shortName}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{getServiceContent(item).tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
