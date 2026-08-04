import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { brandPhotos } from '@/lib/brand-photos';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/lib/seo';

const trustCenterLinks = [
  {
    label: 'Review Security Overview',
    href: '#internal-security-procedures',
  },
  {
    label: 'Request Legal Agreements',
    href: 'mailto:support@uponai.com?subject=UponAI%20Legal%20Agreements%20Request',
  },
];

const overviewCards = [
  {
    eyebrow: 'Primary Contact',
    title: 'support@uponai.com',
    body:
      'Use this address for legal agreements, trust documentation, procurement follow-up, and security review coordination.',
  },
  {
    eyebrow: 'Review Model',
    title: 'Controls + Request Path',
    body:
      'Customers can review security information directly on the UponAI site, then request additional agreements or review material from the UponAI team.',
  },
  {
    eyebrow: 'Program Scope',
    title: 'Voice, platform, and operations',
    body:
      'This page summarizes the control areas teams usually review when evaluating UponAI for AI voice and workflow deployments.',
  },
];

const quickLinks = [
  { id: 'internal-security-procedures', label: 'Internal Security Procedures' },
  { id: 'infrastructure-security', label: 'Infrastructure Security' },
  { id: 'access-control', label: 'Access Control' },
  { id: 'application-change-management', label: 'Application & Change Management' },
  { id: 'incident-response', label: 'Incident Response' },
  { id: 'business-continuity', label: 'Business Continuity' },
  { id: 'vendor-risk', label: 'Vendor & Third-Party Risk' },
  { id: 'data-handling', label: 'Data Handling & Privacy' },
];

const controlDomains = [
  {
    id: 'internal-security-procedures',
    eyebrow: 'Governance',
    title: 'Internal Security Procedures',
    description:
      'UponAI documents core security procedures so customer-facing systems are not managed informally. The operating model is intended to support predictable access, review, escalation, and accountability.',
    bullets: [
      'Documented internal practices for handling access, operational review, and administrative responsibility',
      'Defined ownership around system administration, deployment workflow, and environment management',
      'Review path for trust, procurement, and customer security questions',
    ],
  },
  {
    id: 'infrastructure-security',
    eyebrow: 'Infrastructure',
    title: 'Infrastructure Security',
    description:
      'Infrastructure review focuses on how production systems are hosted, segmented, monitored, and maintained. For buyers, this is the section that answers whether the platform is operated with real production discipline.',
    bullets: [
      'Hosting and environment controls designed around production reliability and access limitation',
      'Monitoring and availability visibility to catch service issues before they become prolonged outages',
      'Operational review of infrastructure dependencies and service-layer risk',
      'Vendor-backed platform components evaluated as part of the broader deployment stack',
    ],
  },
  {
    id: 'access-control',
    eyebrow: 'Identity',
    title: 'Access Control',
    description:
      'Access is treated as a scoped operational function, not an open convenience layer. Teams evaluating UponAI typically want to know who can access administrative systems, how access is granted, and how that access is reviewed over time.',
    bullets: [
      'Role-based access principles for internal systems and operational tooling',
      'Administrative permissions restricted to the people who need them',
      'Periodic review expectations for privileged access and environment reach',
      'Controlled path for onboarding, changing, and removing internal access',
    ],
  },
  {
    id: 'application-change-management',
    eyebrow: 'Engineering',
    title: 'Application & Change Management',
    description:
      'Because UponAI sits close to customer communications and workflow logic, change management matters. Buyers need confidence that production changes are not introduced casually and that application behavior can be updated with a defined workflow.',
    bullets: [
      'Structured development and deployment workflow rather than direct ad hoc production editing',
      'Review path for application changes that affect customer behavior or operational logic',
      'Defined process for updating workflow logic, routing rules, and system behavior over time',
      'Operational traceability around what is changed and why',
    ],
  },
  {
    id: 'incident-response',
    eyebrow: 'Response',
    title: 'Incident Response',
    description:
      'If an issue affects security, availability, or customer operations, the response path needs to be clear. The emphasis here is on investigation, containment, communication, and operational follow-up.',
    bullets: [
      'Documented response path for investigating material security or service events',
      'Escalation approach for incidents affecting customer-facing workflows',
      'Containment and communication expectations during meaningful disruptions',
      'Follow-up review to improve response quality over time',
    ],
  },
  {
    id: 'business-continuity',
    eyebrow: 'Resilience',
    title: 'Business Continuity & Availability',
    description:
      'For communications software, trust is tied directly to uptime and continuity. This section is about how the team thinks about service continuity, monitoring, and the ability to recover from operational issues.',
    bullets: [
      'Availability monitoring and service-level visibility across critical workflows',
      'Operational continuity planning for incidents that affect normal call-handling or platform behavior',
      'Recovery mindset around restoring service and reducing prolonged interruption',
      'Dependence review for third-party infrastructure and service providers',
    ],
  },
  {
    id: 'vendor-risk',
    eyebrow: 'Third Parties',
    title: 'Vendor & Third-Party Risk',
    description:
      'AI voice deployments often rely on infrastructure, monitoring, and software vendors. Customers reviewing UponAI need a clear indication that those dependencies are treated as part of the security model, not ignored because they sit outside first-party code.',
    bullets: [
      'Third-party services reviewed within the broader operational risk model',
      'Attention to infrastructure, monitoring, and communications dependencies',
      'Vendor selection and dependency awareness as part of platform operations',
      'Support path for customer questions related to external service reliance',
    ],
  },
  {
    id: 'data-handling',
    eyebrow: 'Data',
    title: 'Data Handling & Privacy',
    description:
      'Security review is incomplete without understanding how data is handled. This section is intended to frame how UponAI approaches customer information, workflow data, and operational processing in practical terms.',
    bullets: [
      'Defined handling approach for customer and workflow-related data across platform operations',
      'Processing expectations shaped around access limitation and operational need',
      'Customer path for trust-related questions about stored or processed information',
      'Support route for legal agreements and documentation requests tied to data review',
    ],
  },
];

const requestItems = [
  'Legal agreements and procurement review support',
  'Security questionnaire coordination',
  'Trust center access and control documentation',
  'Vendor and architecture review conversations',
  'Customer security follow-up tied to purchasing decisions',
  'Review support for privacy, data handling, and operational controls',
];

const documentItems = [
  'Direct on-site review of security control domains and trust-center content',
  'Legal agreement request coordination through support@uponai.com',
  'Procurement and vendor review follow-up for buying teams',
  'Clarification path for security, privacy, and operational review questions',
];

const evaluationSteps = [
  'Start with the security control sections on this UponAI Trust Center page for a quick program overview.',
  'Use this local UponAI page to understand how the review areas map to the platform and operating model.',
  'Email support@uponai.com for legal agreements, procurement review, or additional documentation.',
  'Use the standard contact or demo path if you also need architecture or product discussions.',
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Trust Center | UponAI',
  description:
    'Review the UponAI trust center, security posture overview, and request legal agreements or trust documentation from the team.',
  path: '/trust-center',
  openGraphDescription:
    'Access the UponAI trust center overview, security controls summary, and legal-agreement request path.',
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
            <div className="theme-pill-accent inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
              Trust Center
            </div>
            <h1 className="theme-heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Security, trust, and review support for teams evaluating UponAI.
            </h1>
            <p className="theme-soft mt-6 max-w-3xl text-lg leading-8 md:text-xl">
              The UponAI Trust Center is designed for legal, procurement, security, and customer
              review teams that need a clearer view of how the platform is operated. This page
              expands the review path beyond a simple overview and organizes the main control
              domains customers usually ask about.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {trustCenterLinks.map((link, index) => (
                index === 0 ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="theme-primary-button rounded-2xl px-7 py-4 text-center text-base font-semibold"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="theme-secondary-button rounded-2xl px-7 py-4 text-center text-base font-semibold"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {overviewCards.map((card) => (
                <div key={card.title} className="theme-card rounded-[1.5rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent-text)]">
                    {card.eyebrow}
                  </p>
                  <p className="theme-heading mt-3 break-all text-2xl font-bold">{card.title}</p>
                  <p className="theme-soft mt-2 text-sm leading-6">{card.body}</p>
                </div>
              ))}
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
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                    On-Site Review
                  </p>
                  <p className="theme-heading mt-2 text-lg font-semibold">
                    Trust-center controls directly on UponAI
                  </p>
                </div>
                <div className="theme-card-soft rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent-text)]">
                    Agreement Access
                  </p>
                  <p className="theme-heading mt-2 text-lg font-semibold">
                    support@uponai.com for legal and trust follow-up
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="theme-card rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">
                  Review Areas
                </p>
                <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                  A controls-style layout for the main trust questions buyers ask.
                </h2>
                <p className="theme-soft mt-4 text-base leading-8 md:text-lg">
                  The sections below are organized the way security and procurement reviews usually
                  happen: internal procedures first, then infrastructure, access, application
                  control, incident handling, continuity, vendors, and data practices.
                </p>
              </div>

              <div className="lg:max-w-md">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent-text)]">
                  Jump To
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {quickLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className="theme-card-soft rounded-2xl px-4 py-3 text-sm font-medium text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl space-y-6">
          {controlDomains.map((domain) => (
            <section
              id={domain.id}
              key={domain.id}
              className="theme-panel scroll-mt-36 rounded-[2rem] p-6 md:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">
                    {domain.eyebrow}
                  </p>
                  <h2 className="theme-heading mt-3 text-3xl font-bold md:text-4xl">
                    {domain.title}
                  </h2>
                  <p className="theme-soft mt-4 text-base leading-8">{domain.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {domain.bullets.map((item) => (
                    <div key={item} className="theme-card rounded-[1.5rem] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                        Control Focus
                      </p>
                      <p className="theme-body mt-3 text-sm leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="theme-panel rounded-[2rem] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">
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
                <li
                  key={item}
                  className="theme-card-soft rounded-2xl px-4 py-3 text-sm leading-7 text-[var(--text-body)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="theme-card rounded-[2rem] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">
              Available Review Path
            </p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-4xl">
              Review the trust information here, then request what your team needs.
            </h2>

            <div className="mt-6 grid gap-3">
              {documentItems.map((item) => (
                <div
                  key={item}
                  className="theme-card-soft rounded-2xl px-4 py-3 text-sm leading-7 text-[var(--text-body)]"
                >
                  {item}
                </div>
              ))}
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

      <section className="px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="theme-card rounded-[2rem] p-7 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">
              Evaluation Flow
            </p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-4xl">
              A straightforward path for customer trust review.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {evaluationSteps.map((step, index) => (
                <div key={step} className="theme-panel rounded-[1.5rem] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                    Step {index + 1}
                  </p>
                  <p className="theme-body mt-3 text-sm leading-7">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
