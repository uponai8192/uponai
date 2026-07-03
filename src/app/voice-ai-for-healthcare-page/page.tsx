import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { uponaiBookingUrl } from '@/lib/booking';
import CTASection from '@/components/sections/CTASection';
import { brandPhotos } from '@/lib/brand-photos';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
  buildServiceSchema,
} from '@/lib/seo';

const capabilityCards = [
  {
    title: 'Schedule Appointments',
    body: 'Voice AI acts like an always-on receptionist, booking, rescheduling, and canceling appointments when patients call after hours, during lunch, or while your team is already busy.',
  },
  {
    title: 'Share Pre-Appointment Prep',
    body: 'From fasting instructions to intake reminders, callers can hear the next steps that match the visit they are booking so fewer patients arrive unprepared.',
  },
  {
    title: 'Answer Common Questions Instantly',
    body: 'Hours, services, insurance questions, provider availability, office policies, and routine FAQs can be handled immediately without sending callers to voicemail.',
  },
  {
    title: 'Collect Insurance Information',
    body: 'The system can gather provider names, member IDs, and other intake details up front so staff spend less time chasing basic information later.',
  },
  {
    title: 'Provide Directions And Office Info',
    body: 'Patients can get office location details, parking guidance, nearby landmarks, and accessibility information before they arrive.',
  },
  {
    title: 'Reduce Hold Times And After-Hours Gaps',
    body: 'Multiple callers can be handled at once, which helps clinics stay responsive during peak periods and keeps new inquiries from falling into an overnight callback pile.',
  },
  {
    title: 'Support Busy Front-Desk Staff',
    body: 'Reception teams can stay focused on in-office care while AI covers repetitive calls, routine routing, and the first layer of patient communication.',
  },
  {
    title: 'Stay HIPAA-Compliant While You Scale',
    body: 'Healthcare workflows can be designed around privacy requirements so your team can expand coverage without sacrificing trust or adding process chaos.',
  },
];

const workflowMoments = [
  {
    title: 'Patient Access',
    body: 'Capture appointment requests, office questions, and new-patient calls before they turn into missed opportunities.',
  },
  {
    title: 'Front-Desk Relief',
    body: 'Absorb repetitive scheduling and information requests so staff can focus on check-ins, paperwork, and live patient needs.',
  },
  {
    title: 'Clear Escalation',
    body: 'Urgent calls and higher-touch scenarios can be routed to the right person with context instead of forcing callers to start over.',
  },
];

const healthcareIntegrationExamples = [
  'EHR & EMR systems',
  'Scheduling platforms',
  'Patient intake tools',
  'Insurance verification workflows',
  'Billing and revenue cycle systems',
  'Call routing and contact center tools',
  'SMS reminders and follow-ups',
  'CRM and care coordination platforms',
  'Form capture and document workflows',
  'Analytics and reporting layers',
  'Secure data sync automations',
  'HIPAA-ready messaging flows',
];

const faqs = [
  {
    question: 'What kinds of healthcare calls should Voice AI handle first?',
    answer:
      'The best starting point is usually repetitive front-desk volume: appointments, hours, provider availability, insurance questions, office directions, and other routine intake tasks.',
  },
  {
    question: 'Can the system transfer callers to a live staff member?',
    answer:
      'Yes. Workflows can be designed to hand off urgent, sensitive, or higher-complexity conversations to a live person with the collected context attached.',
  },
  {
    question: 'Does this replace staff?',
    answer:
      'No. The goal is to remove repetitive phone pressure from staff so they can focus on care delivery, in-person patients, and conversations that need human judgment.',
  },
  {
    question: 'Can this support after-hours patient communication?',
    answer:
      'Yes. After-hours coverage is one of the strongest use cases because it reduces voicemail dependency and gives patients a real response path outside office hours.',
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Voice AI For Healthcare',
  description:
    'Use UponAI voice AI for healthcare scheduling, patient FAQs, insurance intake, and front-desk relief with HIPAA-ready workflows.',
  path: '/voice-ai-for-healthcare-page',
  openGraphDescription:
    'Book appointments, answer patient questions, collect insurance details, and reduce front-desk pressure with healthcare voice AI.',
  image: brandPhotos.voiceSearch,
});

export default function VoiceAIForHealthcarePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Voice AI for Healthcare', path: '/voice-ai-for-healthcare-page' },
  ]);
  const serviceSchema = buildServiceSchema({
    name: 'Voice AI For Healthcare',
    description:
      'Use UponAI voice AI for healthcare scheduling, patient FAQs, insurance intake, and front-desk relief with HIPAA-ready workflows.',
    path: '/voice-ai-for-healthcare-page',
    serviceType: 'Healthcare Voice AI',
    image: brandPhotos.voiceSearch,
  });
  const faqSchema = buildFaqSchema(faqs);

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
            <div className="theme-pill-accent inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
              Healthcare
            </div>
            <h1 className="theme-heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Voice AI for healthcare teams that need better patient access.
            </h1>
            <p className="theme-soft mt-6 max-w-3xl text-lg leading-8 md:text-xl">
              In healthcare, where clear communication and quick scheduling matter, Voice AI acts as a reliable 24/7
              receptionist. It can book, reschedule, or cancel appointments, answer common questions, provide office
              information, and collect insurance details while helping your staff stay focused on care.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="theme-card rounded-[1.5rem] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent-text)]">
                  Coverage
                </p>
                <p className="theme-heading mt-3 text-3xl font-bold">24/7</p>
                <p className="theme-soft mt-2 text-sm leading-6">Appointment handling and routine patient questions, even when the front desk is unavailable.</p>
              </div>
              <div className="theme-card rounded-[1.5rem] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                  Workflow
                </p>
                <p className="theme-heading mt-3 text-3xl font-bold">Live</p>
                <p className="theme-soft mt-2 text-sm leading-6">Collect context, route urgent needs, and hand off to staff without forcing patients to repeat themselves.</p>
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
                  src={brandPhotos.voiceSearch}
                  alt="UponAI healthcare voice workflow support"
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
                    Patient Questions
                  </p>
                  <p className="theme-heading mt-2 text-lg font-semibold">Hours, insurance, providers, directions</p>
                </div>
                <div className="theme-card-soft rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent-text)]">
                    Staff Relief
                  </p>
                  <p className="theme-heading mt-2 text-lg font-semibold">Less voicemail, fewer hold-time bottlenecks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-4 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Where It Helps</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Built for the calls that usually overwhelm healthcare teams.</h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              This page is intentionally focused on patient communication and front-desk workflow support. It does not
              lean on integration-heavy messaging because the strongest value here is responsiveness, clarity, and
              better handling of real inbound volume.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workflowMoments.map((item, index) => (
              <div key={item.title} className="theme-card rounded-[1.75rem] p-6">
                <div className="theme-card-soft theme-heading flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                  0{index + 1}
                </div>
                <h3 className="theme-heading mt-5 text-2xl font-semibold">{item.title}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Integrations</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Explore 300+ healthcare integrations.</h2>
              <p className="theme-soft mt-4 text-lg leading-8">
                Connect sensitive patient data in a HIPAA-compliant way and build healthcare automations that save staff
                time, reduce repetitive work, and improve responsiveness across scheduling, intake, reminders, and follow-up.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://main.d2ern4ztpaq5h2.amplifyapp.com"
                target="_blank"
                rel="noreferrer"
                className="theme-secondary-button rounded-2xl px-6 py-4 text-center text-base font-semibold"
              >
                Open Full Catalog
              </a>
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-primary-button rounded-2xl px-6 py-4 text-center text-base font-semibold"
              >
                Get Started
              </a>
            </div>
          </div>

          <div className="theme-panel overflow-hidden rounded-[2rem] p-3">
            <div className="theme-card-soft overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
              <iframe
                src="https://main.d2ern4ztpaq5h2.amplifyapp.com"
                title="UponAI healthcare integrations"
                className="h-[1100px] w-full bg-transparent md:h-[1350px] xl:h-[1600px]"
                loading="lazy"
                scrolling="yes"
                style={{ overflow: 'auto' }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {healthcareIntegrationExamples.map((item) => (
              <div key={item} className="theme-card rounded-[1.25rem] px-4 py-3 text-sm theme-body">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Capabilities</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">A healthcare voice AI page that matches the current UponAI positioning.</h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              The workflow is centered on scheduling, routine patient questions, insurance intake, office information,
              and after-hours responsiveness rather than a stack of unrelated integration claims.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {capabilityCards.map((item) => (
              <div key={item.title} className="theme-card rounded-[1.75rem] p-5">
                <h3 className="theme-heading text-xl font-semibold">{item.title}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="theme-panel overflow-hidden rounded-[2rem] p-3">
            <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
              <Image
                src={brandPhotos.voiceMic}
                alt="UponAI call workflow testing interface"
                width={1200}
                height={760}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Why Teams Use It</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Faster answers for patients, less pressure on your staff.</h2>
            <div className="mt-8 space-y-4">
              <div className="theme-card rounded-[1.5rem] p-5">
                <h3 className="theme-heading text-lg font-semibold">No more voicemail-first experience</h3>
                <p className="theme-soft mt-2 text-sm leading-7">
                  Patients get an immediate response path instead of dead ends during lunch, after hours, or peak call windows.
                </p>
              </div>
              <div className="theme-card rounded-[1.5rem] p-5">
                <h3 className="theme-heading text-lg font-semibold">Better call handling during busy periods</h3>
                <p className="theme-soft mt-2 text-sm leading-7">
                  Voice AI can handle multiple routine conversations at once while live staff concentrate on care delivery and in-office patients.
                </p>
              </div>
              <div className="theme-card rounded-[1.5rem] p-5">
                <h3 className="theme-heading text-lg font-semibold">Cleaner handoffs for higher-touch scenarios</h3>
                <p className="theme-soft mt-2 text-sm leading-7">
                  When a conversation needs human attention, the caller can be transferred with context already collected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">FAQ</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Common questions about healthcare voice AI.</h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="theme-card rounded-[1.75rem] p-6">
                <h3 className="theme-heading text-lg font-semibold">{faq.question}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to modernize patient conversations without overloading your staff?"
        subheading="Book a demo to see how UponAI can support healthcare scheduling, patient FAQs, insurance intake, and after-hours call coverage."
      />
    </>
  );
}
