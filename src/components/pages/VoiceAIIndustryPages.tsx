import Image from 'next/image';
import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';
import { uponaiBookingUrl } from '@/lib/booking';
import type { City } from '@/lib/data';
import { formatCityState, getIndustryBySlug } from '@/lib/data';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from '@/lib/seo';
import {
  formatVoiceAITemplate,
  getCityMarketNarrative,
  getCityRegionNarrative,
  getFeaturedCities,
  getLegacyVoiceAIContent,
  getNearbyCities,
  getVoiceAICityPageOverride,
  type VoiceAIIndustryPage,
} from '@/lib/voice-ai-industries';

export function VoiceAIIndustryLandingPage({ page }: { page: VoiceAIIndustryPage }) {
  const featuredCities = getFeaturedCities();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: page.label, path: `/${page.slug}` },
  ]);
  const serviceSchema = buildServiceSchema({
    name: page.heroTitle,
    description: page.heroDescription,
    path: `/${page.slug}`,
    serviceType: page.label,
    image: page.image,
  });
  const faqSchema = buildFaqSchema(page.faqs);
  const legacyContent =
    getLegacyVoiceAIContent(page.slug) ??
    (page.slug === 'voice-ai-for-dental-offices'
      ? (() => {
          const legacyIndustry = getIndustryBySlug('dental');
          if (!legacyIndustry) return null;
          return {
            highlights: [
              legacyIndustry.tagline,
              ...legacyIndustry.solutions.slice(0, 2),
            ],
            sections: [
              { title: 'Operational Challenges', body: legacyIndustry.challenges.slice(0, 3).join(' • ') },
              { title: 'Workflow Support', body: legacyIndustry.solutions.slice(0, 3).join(' • ') },
              { title: 'Included Capabilities', body: legacyIndustry.features.slice(0, 4).join(' • ') },
            ],
          };
        })()
      : null);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden px-4 py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[var(--glow-cyan)] blur-3xl" />
          <div className="absolute bottom-0 right-[-6%] h-80 w-80 rounded-full bg-[var(--glow-green)] blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="theme-pill-cyan inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
              {page.eyebrow}
            </div>
            <h1 className="theme-heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
              {page.heroTitle}
            </h1>
            <p className="theme-soft mt-6 max-w-3xl text-lg leading-8 md:text-xl">
              {page.heroDescription}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.stats.slice(0, 2).map((stat, index) => (
                <div key={stat.label} className="theme-card rounded-[1.5rem] p-4">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                      index === 0 ? 'text-[var(--brand-cyan-text)]' : 'text-[var(--brand-green-text)]'
                    }`}
                  >
                    {stat.label}
                  </p>
                  <p className="theme-heading mt-3 text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-primary-button rounded-2xl px-7 py-4 text-center text-base font-semibold"
              >
                Book A Demo
              </a>
              <Link href="/contact-us-page" className="theme-secondary-button rounded-2xl px-7 py-4 text-center text-base font-semibold">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="theme-panel overflow-hidden rounded-[2rem] p-3">
              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                <Image
                  src={page.image}
                  alt={page.imageAlt}
                  width={1200}
                  height={820}
                  className="h-full w-full object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {page.stats.slice(2).map((stat) => (
                  <div key={stat.label} className="theme-card-soft rounded-[1.25rem] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-green-text)]">
                      {stat.label}
                    </p>
                    <p className="theme-heading mt-2 text-lg font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-4 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Where It Helps</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Designed around real inbound conversations, not canned IVR logic.
            </h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              UponAI voice workflows focus on the places where teams usually lose time, miss opportunities, or force callers
              into voicemail and manual callbacks.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {page.workflowMoments.map((item, index) => (
              <div key={item.title} className="theme-card rounded-[1.75rem] p-6">
                <div className="theme-card-soft theme-heading flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                  0{index + 1}
                </div>
                <h2 className="theme-heading mt-5 text-2xl font-semibold">{item.title}</h2>
                <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.integrations ? (
        <section className="theme-section-alt px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Integrations</p>
                <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">{page.integrations.title}</h2>
                <p className="theme-soft mt-4 text-lg leading-8">{page.integrations.body}</p>
              </div>

              <div className="theme-panel rounded-[2rem] p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {page.integrations.examples.map((item) => (
                    <div key={item} className="theme-card rounded-[1.25rem] px-4 py-3 text-sm theme-body">
                      {item}
                    </div>
                  ))}
                </div>
                {page.integrations.href && page.integrations.hrefLabel ? (
                  <a
                    href={page.integrations.href}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-secondary-button mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
                  >
                    {page.integrations.hrefLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Capabilities</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Voice AI that supports the work your team is already trying to keep up with.
              </h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              These are the workflows teams usually automate first because they create the biggest operational relief without
              changing how the business actually runs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {page.capabilityCards.map((item) => (
              <div key={item.title} className="theme-card rounded-[1.75rem] p-5">
                <h3 className="theme-heading text-xl font-semibold">{item.title}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Outcomes</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">What teams usually want fixed first.</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {page.outcomes.map((item) => (
              <div key={item} className="theme-card rounded-[1.5rem] px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="theme-card-soft mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-green-text)]" />
                  </span>
                  <p className="theme-body text-sm leading-7">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {legacyContent ? (
        <section className="theme-section-alt px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Expanded Detail</p>
                <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                  Information carried forward from the earlier industry page.
                </h2>
              </div>
              <p className="theme-soft max-w-2xl text-base leading-7">
                This keeps the broader industry positioning from the older site while the new layout adds stronger voice-AI workflow detail and clearer calls to action.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {legacyContent.highlights.map((item) => (
                <div key={item} className="theme-card rounded-[1.5rem] px-5 py-4">
                  <p className="theme-body text-sm leading-7">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {legacyContent.sections.map((section) => (
                <div key={section.title} className="theme-card rounded-[1.75rem] p-6">
                  <h3 className="theme-heading text-xl font-semibold">{section.title}</h3>
                  <p className="theme-soft mt-3 text-sm leading-7">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">City Pages</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Dedicated {page.label.toLowerCase()} voice AI pages for major markets.
              </h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              Each city page is written around local demand, response speed, and call-handling pressure instead of just cloning the same paragraph onto every location.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${page.slug}/${city.slug}`}
                className="theme-card rounded-[1.35rem] px-4 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                <span className="theme-heading block">{city.name}</span>
                <span className="theme-soft mt-1 block text-xs uppercase tracking-[0.2em]">{city.stateAbbr}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">FAQs</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Common questions about this workflow.</h2>
          </div>

          <div className="mt-10 space-y-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="theme-card rounded-[1.5rem] p-6">
                <h3 className="theme-heading text-lg font-semibold">{faq.question}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading={page.ctaHeading} subheading={page.ctaSubheading} />
    </>
  );
}

export function VoiceAIIndustryCityPage({
  page,
  city,
}: {
  page: VoiceAIIndustryPage;
  city: City;
}) {
  const location = formatCityState(city);
  const override = getVoiceAICityPageOverride(page.slug, city.slug);
  const market = getCityMarketNarrative(city);
  const region = getCityRegionNarrative(city);
  const nearbyCities = getNearbyCities(city);
  const cityPath = `/${page.slug}/${city.slug}`;
  const cityTitle = override?.heroTitle ?? `${page.label} voice AI in ${location}`;
  const cityDescription = override?.heroDescription ?? `${page.cityLead} ${location} ${page.citySupport}`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: page.label, path: `/${page.slug}` },
    { name: location, path: cityPath },
  ]);
  const serviceSchema = buildServiceSchema({
    name: cityTitle,
    description: cityDescription,
    path: cityPath,
    serviceType: `${page.label} in ${location}`,
    areaServed: location,
    image: page.image,
  });
  const faqSchema = buildFaqSchema(page.faqs);
  const localUseCases = override?.localUseCases ?? page.localUseCaseTemplates.map((item) => formatVoiceAITemplate(item, city));
  const legacyContent =
    getLegacyVoiceAIContent(page.slug) ??
    (page.slug === 'voice-ai-for-dental-offices'
      ? (() => {
          const legacyIndustry = getIndustryBySlug('dental');
          if (!legacyIndustry) return null;
          return {
            highlights: [
              legacyIndustry.tagline,
              ...legacyIndustry.solutions.slice(0, 2),
            ],
            sections: [
              { title: 'Operational Challenges', body: legacyIndustry.challenges.slice(0, 3).join(' • ') },
              { title: 'Workflow Support', body: legacyIndustry.solutions.slice(0, 3).join(' • ') },
              { title: 'Included Capabilities', body: legacyIndustry.features.slice(0, 4).join(' • ') },
            ],
          };
        })()
      : null);
  const localLegacySections = legacyContent?.sections.map((section, index) => {
    const appendedContext = [
      `In ${location}, this matters because ${market.seo.toLowerCase()}`,
      `${region.body} That makes cleaner first-contact handling more valuable for teams in ${city.name}.`,
      nearbyCities.length > 0
        ? `Businesses in ${city.name} often support nearby areas like ${nearbyCities.slice(0, 3).map((item) => item.name).join(', ')}, so call routing needs to stay consistent across more than one local market.`
        : `Teams in ${city.name} benefit when routing, qualification, and follow-up stay consistent across every inbound conversation.`,
    ][index % 3];

    return {
      title: `${section.title} in ${city.name}`,
      body: `${section.body} ${appendedContext}`,
    };
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden px-4 py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[var(--glow-cyan)] blur-3xl" />
          <div className="absolute bottom-0 right-[-6%] h-80 w-80 rounded-full bg-[var(--glow-green)] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--text-soft)]">
            <Link href="/" className="transition-colors hover:text-[var(--text-strong)]">Home</Link>
            <span>/</span>
            <Link href={`/${page.slug}`} className="transition-colors hover:text-[var(--text-strong)]">{page.label}</Link>
            <span>/</span>
            <span className="text-[var(--text-strong)]">{location}</span>
          </nav>

          <div className="grid gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <div className="theme-pill-cyan inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
                {page.label} in {location}
              </div>
              <h1 className="theme-heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
                {cityTitle}
              </h1>
              <p className="theme-soft mt-6 max-w-3xl text-lg leading-8 md:text-xl">
                {cityDescription}
              </p>
              <p className="theme-soft mt-4 max-w-3xl text-base leading-7">{market.seo}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="theme-card rounded-[1.5rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">
                    Local Demand
                  </p>
                  <p className="theme-heading mt-3 text-xl font-bold">{override?.marketHeadline ?? market.headline}</p>
                  <p className="theme-soft mt-2 text-sm leading-6">{override?.marketBody ?? market.body}</p>
                </div>
                <div className="theme-card rounded-[1.5rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-green-text)]">
                    Coverage
                  </p>
                  <p className="theme-heading mt-3 text-xl font-bold">{page.stats[0]?.value ?? '24/7'}</p>
                  <p className="theme-soft mt-2 text-sm leading-6">
                    Voice AI keeps the first response active without forcing every inbound call onto a small live team.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={uponaiBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-primary-button rounded-2xl px-7 py-4 text-center text-base font-semibold"
                >
                  Book A Demo
                </a>
                <Link href="/contact-us-page" className="theme-secondary-button rounded-2xl px-7 py-4 text-center text-base font-semibold">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="theme-panel overflow-hidden rounded-[2rem] p-3">
                <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                  <Image
                    src={page.image}
                    alt={`${page.imageAlt} in ${location}`}
                    width={1200}
                    height={820}
                    className="h-full w-full object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-4 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Local Use Cases</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              What teams in {city.name} usually automate first.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {localUseCases.map((item) => (
              <div key={item} className="theme-card rounded-[1.75rem] p-5">
                <p className="theme-body text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Workflow Support</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Built for how {page.label.toLowerCase()} calls actually come in.
              </h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              These are the operational moments that usually create missed opportunities, slow callbacks, or unnecessary front-desk pressure.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {page.workflowMoments.map((item) => (
              <div key={item.title} className="theme-card rounded-[1.75rem] p-6">
                <h2 className="theme-heading text-2xl font-semibold">{item.title}</h2>
                <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Market Context</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Why {city.name} needs a different voice workflow than a generic national page.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="theme-card rounded-[1.75rem] p-6">
                <h3 className="theme-heading text-xl font-semibold">{override?.marketHeadline ?? market.headline}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{override?.marketBody ?? market.body}</p>
              </div>
              <div className="theme-card rounded-[1.75rem] p-6">
                <h3 className="theme-heading text-xl font-semibold">{override?.regionTitle ?? region.title}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{override?.regionBody ?? region.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {override?.customHighlights ? (
        <section className="theme-section-alt px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Local Focus</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Why this page matters specifically in {location}.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {override.customHighlights.map((item) => (
                <div key={item.title} className="theme-card rounded-[1.75rem] p-6">
                  <h3 className="theme-heading text-xl font-semibold">{item.title}</h3>
                  <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {legacyContent ? (
        <section className="theme-section-alt px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Expanded Local Detail</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Older site detail, adapted for {location}.
              </h2>
              <p className="theme-soft mt-4 text-base leading-7">
                These sections preserve the broader positioning from the previous site while tying the copy more directly to local search intent and market conditions.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {legacyContent.highlights.map((item) => (
                <div key={item} className="theme-card rounded-[1.5rem] px-5 py-4">
                  <p className="theme-body text-sm leading-7">
                    {item} This gives teams in {city.name} a clearer way to support inbound demand without relying on a generic national workflow.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {localLegacySections?.map((section) => (
                <div key={section.title} className="theme-card rounded-[1.75rem] p-6">
                  <h3 className="theme-heading text-xl font-semibold">{section.title}</h3>
                  <p className="theme-soft mt-3 text-sm leading-7">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Capabilities</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                How {location} teams use voice AI in practice.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {page.capabilityCards.map((item) => (
                  <div key={item.title} className="theme-card rounded-[1.5rem] p-5">
                    <h3 className="theme-heading text-lg font-semibold">{item.title}</h3>
                    <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="theme-panel rounded-[2rem] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Nearby Coverage</p>
              <h2 className="theme-heading mt-3 text-2xl font-bold">Serving more than one market in {city.state}?</h2>
              <p className="theme-soft mt-3 text-sm leading-7">
                Many teams want one voice workflow that still respects local demand across nearby cities and service areas.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/${page.slug}/${nearbyCity.slug}`}
                    className="theme-card rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  >
                    <span className="theme-heading block">{nearbyCity.name}</span>
                    <span className="theme-soft mt-1 block text-xs uppercase tracking-[0.2em]">
                      {nearbyCity.stateAbbr}
                    </span>
                  </Link>
                ))}
              </div>

              {page.integrations?.href && page.integrations.hrefLabel ? (
                <a
                  href={page.integrations.href}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-secondary-button mt-6 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
                >
                  {page.integrations.hrefLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">FAQs</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Questions teams in {city.name} usually ask first.
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="theme-card rounded-[1.5rem] p-6">
                <h3 className="theme-heading text-lg font-semibold">{faq.question}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading={override?.ctaHeading ?? page.ctaHeading} subheading={override?.ctaSubheading ?? page.ctaSubheading} />
    </>
  );
}
