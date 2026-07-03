import Image from 'next/image';
import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';
import { uponaiBookingUrl } from '@/lib/booking';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from '@/lib/seo';
import {
  uponaiIndustriesMenu,
  uponaiOfficeLocations,
  uponaiResourcesMenu,
  uponaiServicesMenu,
  uponaiUseCasesMenu,
  type UponAIPage,
  type UponAIMenuLink,
} from '@/lib/uponai-pages';

function getRelatedLinks(page: UponAIPage): UponAIMenuLink[] {
  const useCaseSlugs = new Set([
    'customer-support-page',
    'hours-support-page',
    'book-and-schedule-page',
    'voice-ai-for-outbound-sales-page',
  ]);
  const solutionSlugs = new Set([
    'ucaas-page',
    'call-overflow',
    'sip-integrations-and-transfers-685191',
  ]);
  const resourceSlugs = new Set(['recordings-page', 'faqs', 'partners']);

  const allLinks = [
    ...uponaiUseCasesMenu,
    ...uponaiServicesMenu,
    ...uponaiIndustriesMenu,
    ...uponaiResourcesMenu,
  ];

  if (useCaseSlugs.has(page.slug)) {
    return uponaiUseCasesMenu.filter((item) => item.href !== `/${page.slug}`);
  }

  if (solutionSlugs.has(page.slug)) {
    return [
      ...uponaiServicesMenu,
      ...uponaiUseCasesMenu.filter((item) => item.href !== `/${page.slug}`),
    ].slice(0, 6);
  }

  if (resourceSlugs.has(page.slug)) {
    return uponaiResourcesMenu.filter((item) => item.href !== `/${page.slug}`);
  }

  return allLinks.filter((item) => item.href !== `/${page.slug}`).slice(0, 6);
}

export default function UponAILandingPage({ page }: { page: UponAIPage }) {
  const capabilityCards = page.featureCards ?? [];
  const relatedLinks = getRelatedLinks(page);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: page.title, path: `/${page.slug}` },
  ]);
  const serviceSchema = buildServiceSchema({
    name: page.title,
    description: page.description,
    path: `/${page.slug}`,
    serviceType: page.eyebrow,
    image: page.image,
  });
  const faqSchema = buildFaqSchema(page.faqs ?? []);

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
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="relative overflow-hidden px-4 py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[var(--glow-cyan)] blur-3xl" />
          <div className="absolute bottom-0 right-[-6%] h-80 w-80 rounded-full bg-[var(--glow-green)] blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="theme-pill-accent inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
              {page.eyebrow}
            </div>
            <h1 className="theme-heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
              {page.title}
            </h1>
            <p className="theme-soft mt-6 max-w-3xl text-lg leading-8 md:text-xl">{page.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.highlights.map((item, index) => (
                <div key={item} className="theme-card rounded-[1.5rem] p-4">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                      index % 2 === 0 ? 'text-[var(--brand-accent-text)]' : 'text-[var(--brand-primary-text)]'
                    }`}
                  >
                    Priority Focus
                  </p>
                  <p className="theme-heading mt-3 text-lg font-semibold leading-7">{item}</p>
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
                {page.sections.slice(0, 2).map((section) => (
                  <div key={section.title} className="theme-card-soft rounded-[1.25rem] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                      {section.title}
                    </p>
                    <p className="theme-soft mt-2 text-sm leading-7">{section.body}</p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Where It Helps</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Built around the places where teams lose time, miss calls, or create inconsistent handoffs.
            </h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              These pages now carry more of the operational detail from the earlier site so the workflow, business fit, and
              handoff logic are clearer.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {page.sections.map((section, index) => (
              <div key={section.title} className="theme-card rounded-[1.75rem] p-6">
                <div className="theme-card-soft theme-heading flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                  0{index + 1}
                </div>
                <h2 className="theme-heading mt-5 text-2xl font-semibold">{section.title}</h2>
                <p className="theme-soft mt-3 text-sm leading-7">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {capabilityCards.length > 0 ? (
        <section className="theme-section-alt px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Capabilities</p>
                <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                  More of the older solution-page detail, rebuilt into the new UponAI layout.
                </h2>
              </div>
              <p className="theme-soft max-w-2xl text-base leading-7">
                These are the concrete workflow functions teams usually need before a page actually feels complete: coverage,
                routing, scheduling, escalation, reporting, and cleaner human handoff.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map((item) => (
                <div key={item.title} className="theme-card rounded-[1.75rem] p-6">
                  <h3 className="theme-heading text-xl font-semibold">{item.title}</h3>
                  <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="theme-panel rounded-[2rem] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Operational Coverage</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">How this page fits into the broader UponAI site.</h2>
            <p className="theme-soft mt-4 max-w-3xl text-base leading-8">
              The earlier site had more supporting detail across solution pages. This layout brings that back through practical
              workflow coverage, cross-linking, and clearer explanation of where AI voice fits into real business operations.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {page.highlights.map((item) => (
                <div key={item} className="theme-card-soft rounded-[1.25rem] px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="theme-card flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-primary-text)]" />
                    </span>
                    <p className="theme-body text-sm leading-7">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="theme-panel rounded-[2rem] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Related Pages</p>
            <h2 className="theme-heading mt-3 text-2xl font-bold md:text-3xl">Explore connected use cases, solutions, and resources.</h2>
            <div className="mt-6 grid gap-3">
              {relatedLinks.map((item) => (
                <Link
                  key={`${page.slug}-${item.href}`}
                  href={item.href}
                  className="theme-card-soft rounded-[1.25rem] px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="theme-body text-sm font-medium">{item.label}</span>
                    <span className="text-[var(--brand-primary-text)]">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {page.faqs && page.faqs.length > 0 ? (
        <section className="theme-section-alt px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">FAQ</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Questions teams usually ask before rollout.</h2>
              <p className="theme-soft mx-auto mt-4 max-w-2xl text-lg leading-8">
                These answers help carry forward the context the old site used to provide around deployment, team fit, and
                operational impact.
              </p>
            </div>
            <div className="mt-10 grid gap-4">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="theme-card rounded-[1.75rem] p-6">
                  <h3 className="theme-heading text-lg font-semibold">{faq.question}</h3>
                  <p className="theme-soft mt-3 text-sm leading-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Office Coverage</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Built for businesses operating across North American markets.
              </h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              These locations do not replace your local pages, but they reinforce that UponAI supports multi-market operations,
              cross-region response, and broader deployment planning.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {uponaiOfficeLocations.map((location) => (
              <div key={location} className="theme-card rounded-[1.5rem] px-5 py-4">
                <p className="theme-body text-sm font-medium">{location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={page.ctaHeading ?? `Ready To Explore ${page.title}?`}
        subheading={
          page.ctaSubheading ??
          'Book a demo to see how UponAI can apply AI voice, AI chat, and automation to your real business workflows.'
        }
      />
    </>
  );
}
