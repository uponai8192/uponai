import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { brandPhotos } from '@/lib/brand-photos';
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
} from '@/lib/seo';

const controlAreas = [
  {
    title: 'Internal Security Procedures',
    body:
      'UponAI documents internal security practices around access, development workflows, change management, and operational review so customer-facing systems are not managed ad hoc.',
  },
  {
    title: 'Access Controls',
    body:
      'System access is limited by role, reviewed over time, and designed to keep administrative permissions scoped to the people who need them.',
  },
  {
    title: 'Data Handling',
    body:
      'UponAI uses defined workflows for storing, processing, and protecting customer data across voice, application, and support environments.',
  },
  {
    title: 'Vendor Oversight',
    body:
      'Critical third-party services are reviewed as part of the broader operating model so infrastructure dependencies are not treated as a blind spot.',
  },
  {
    title: 'Incident Response',
    body:
      'UponAI maintains response paths for investigating, containing, and communicating material security events when they arise.',
  },
  {
    title: 'Availability Monitoring',
    body:
      'Operational visibility, uptime monitoring, and environment checks help the team catch service issues early and respond quickly.',
  },
];

const requestItems = [
  'Legal agreements and procurement review support',
  'Security questionnaire coordination',
  'Trust center access and control documentation',
  'Vendor and architecture review conversations',
];

const trustCenterLinks = [
  {
    label: 'View Trust Center Details',
    href: 'https://app.vanta.com/re-tell.ai/trust/8nfvavp5klt9n4iz32h90/controls#internal-security-procedures',
  },
  {
    label: 'Request Legal Agreements',
    href: 'mailto:support@uponai.com?subject=UponAI%20Legal%20Agreements%20Request',
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Trust Center | UponAI',
  description:
    'Review the UponAI trust center, security posture overview, and request legal agreements or trust documentation from the team.',
  path: '/trust-center',
  openGraphDescription:
    'Access the UponAI trust center overview, security program highlights, and trust documentation request path.',
  image: brandPhotos.connectedGlobe,
});

export default function TrustCenterPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Trust Center', path: '/trust-center' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden px-4 py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[var(--glow-cyan)] blur-3xl" />
          <div className="absolute bottom-0 right-[-6%] h-80 w-80 rounded-full bg-[var(--glow-green)] blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="theme-pill-cyan inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
              Trust Center
            </div>
            <h1 className="theme-heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Trust, security, and transparency for teams evaluating UponAI.
            </h1>
            <p className="theme-soft mt-6 max-w-3xl text-lg leading-8 md:text-xl">
              When customers evaluate AI voice infrastructure, they need more than a product demo.
              They need a clear path to security information, operational controls, and legal review.
              The UponAI Trust Center is the place to start.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {trustCenterLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    index === 0
                      ? 'theme-primary-button rounded-2xl px-7 py-4 text-center text-base font-semibold'
                      : 'theme-secondary-button rounded-2xl px-7 py-4 text-center text-base font-semibold'
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="theme-card rounded-[1.5rem] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">
                  Primary Contact
                </p>
                <a
                  href="mailto:support@uponai.com"
                  className="theme-heading mt-3 block break-all text-2xl font-bold"
                >
                  support@uponai.com
                </a>
                <p className="theme-soft mt-2 text-sm leading-6">
                  Use this address to request legal agreements, security review help, or trust
                  documentation.
                </p>
              </div>
              <div className="theme-card rounded-[1.5rem] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-green-text)]">
                  Trust Workflow
                </p>
                <p className="theme-heading mt-3 text-2xl font-bold">Review and Request</p>
                <p className="theme-soft mt-2 text-sm leading-6">
                  Start with the control overview, then email the team for agreement access or
                  procurement follow-up.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="theme-panel overflow-hidden rounded-[2rem] p-3">
              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                <Image
                  src={brandPhotos.connectedGlobe}
                  alt="UponAI trust and security overview"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="theme-card-soft rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-green-text)]">
                    Review Path
                  </p>
                  <p className="theme-heading mt-2 text-lg font-semibold">
                    Trust center details plus procurement follow-up
                  </p>
                </div>
                <div className="theme-card-soft rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">
                    Legal Access
                  </p>
                  <p className="theme-heading mt-2 text-lg font-semibold">
                    Request agreements directly from the UponAI support team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">
              Security Overview
            </p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Areas teams usually review before approving a new AI vendor.
            </h2>
            <p className="theme-soft mt-4 text-base leading-8 md:text-lg">
              The goal of the Trust Center is not to bury procurement teams in buzzwords. It is to
              make the basic review path clear: how UponAI handles internal security practices,
              access, operational controls, and trust-related follow-up.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {controlAreas.map((item, index) => (
              <article
                key={item.title}
                className={`theme-card rounded-[1.75rem] p-6 ${
                  index % 2 === 0 ? 'shadow-[0_22px_50px_rgba(34,197,94,0.08)]' : ''
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">
                  Review Area
                </p>
                <h3 className="theme-heading mt-3 text-2xl font-semibold">{item.title}</h3>
                <p className="theme-soft mt-4 text-sm leading-7">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="theme-panel rounded-[2rem] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">
              Legal & Procurement
            </p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-4xl">
              Request trust documentation and legal agreements directly from UponAI.
            </h2>
            <p className="theme-soft mt-4 text-base leading-8">
              If your legal, procurement, or security team needs additional documentation, use the
              support address below. That request path is the fastest way to access trust-center
              follow-up for real evaluations.
            </p>

            <ul className="mt-6 space-y-3">
              {requestItems.map((item) => (
                <li key={item} className="theme-card-soft rounded-2xl px-4 py-3 text-sm leading-7 text-[var(--text-body)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="theme-card rounded-[2rem] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">
              Next Steps
            </p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-4xl">
              Review the trust center, then contact the team for the documents you need.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--text-body)]">
              <p>
                Start with the external controls view if you need a fast overview of the security
                program. That gives reviewers a structured place to begin.
              </p>
              <p>
                For legal agreements, procurement review, or customer-specific questions, email{' '}
                <a
                  href="mailto:support@uponai.com"
                  className="font-semibold text-[var(--brand-cyan-text)] transition-colors hover:text-[var(--text-strong)]"
                >
                  support@uponai.com
                </a>
                .
              </p>
              <p>
                If you also want to discuss product scope, deployment model, or AI voice
                architecture, use the normal sales path through the contact page or demo booking.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:support@uponai.com?subject=UponAI%20Legal%20Agreements%20Request"
                className="theme-primary-button rounded-2xl px-6 py-4 text-center text-base font-semibold"
              >
                Email Support
              </a>
              <Link
                href="/contact-us-page"
                className="theme-secondary-button rounded-2xl px-6 py-4 text-center text-base font-semibold"
              >
                Contact UponAI
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
