import type { Metadata } from 'next';
import Link from 'next/link';
import { uponaiBookingUrl } from '@/lib/booking';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
  buildServiceSchema,
} from '@/lib/seo';
import { brandPhotos } from '@/lib/brand-photos';
import VerticalVoiceAgentCard from '@/components/voice/VerticalVoiceAgentCard';
import { getVerticalAgentForSlug } from '@/lib/vertical-agents';
import { getFeaturedCities, requireVoiceAIIndustryPage } from '@/lib/voice-ai-industries';

const page = requireVoiceAIIndustryPage('ai-voice-for-answering-service-replacement');

const problemPoints = [
  'High monthly fees',
  'Inconsistent caller experiences',
  'Limited customization',
  'Delayed messages',
  'Missed lead details',
  'Agents who do not fully understand your business',
  'No direct integration with your CRM, calendar, or phone system',
  'Limited after-hours or overflow flexibility',
];

const capabilityCards = [
  {
    title: 'Answer Calls 24/7',
    body: 'Never miss a call because your office is closed, your team is busy, or your answering service is overwhelmed.',
  },
  {
    title: 'Qualify New Leads',
    body: 'Ask the right questions, determine caller intent, collect key details, and identify high-value opportunities automatically.',
  },
  {
    title: 'Route Calls Instantly',
    body: 'Send callers to the right department, location, employee, or emergency contact based on their needs.',
  },
  {
    title: 'Book Appointments',
    body: 'Connect to scheduling workflows so callers can request or book appointments without waiting for a callback.',
  },
  {
    title: 'Capture Accurate Details',
    body: 'Collect names, phone numbers, email addresses, locations, service needs, urgency, and custom intake information.',
  },
  {
    title: 'Send SMS Or Email Notifications',
    body: 'Notify your team immediately with caller summaries, contact details, and the next step that needs to happen.',
  },
  {
    title: 'Integrate With Your CRM',
    body: 'Push call details into your CRM, helpdesk, calendar, or internal systems so your team does not re-enter the same information manually.',
  },
  {
    title: 'Handle Overflow Calls',
    body: 'When your staff is busy, UponAI can answer overflow calls and prevent callers from reaching voicemail.',
  },
  {
    title: 'Support After-Hours Calls',
    body: 'Give callers a professional experience after hours while still capturing urgent issues and routing critical calls when needed.',
  },
];

const comparisonRows = [
  {
    legacy: 'Human agents may vary in quality',
    ai: 'Consistent call handling every time',
  },
  {
    legacy: 'Often only takes a message',
    ai: 'Can qualify, route, book, and automate',
  },
  {
    legacy: 'Limited business knowledge',
    ai: 'Trained on your exact process',
  },
  {
    legacy: 'Delayed message delivery',
    ai: 'Instant summaries and notifications',
  },
  {
    legacy: 'Higher cost as volume increases',
    ai: 'Scalable and cost-efficient',
  },
  {
    legacy: 'Limited integrations',
    ai: 'Connects with phone systems, CRMs, calendars, and workflows',
  },
  {
    legacy: 'May miss key details',
    ai: 'Structured data capture every call',
  },
  {
    legacy: 'Requires ongoing retraining',
    ai: 'Easy updates to scripts and logic',
  },
];

const useCases = [
  'Home services',
  'Medical and dental offices',
  'Law firms',
  'Senior living communities',
  'Property management companies',
  'Real estate teams',
  'Insurance agencies',
  'Financial services',
  'Local service businesses',
  'Franchise locations',
  'Multi-location businesses',
  'UCaaS and VoIP providers offering AI services to their customers',
];

const callFlowSteps = [
  'Caller dials your business.',
  'UponAI answers with your custom greeting.',
  'The AI agent asks what the caller needs help with.',
  'The agent collects key information such as name, phone number, location, and reason for calling.',
  'The agent determines whether the call is sales, support, urgent, after-hours, or a general inquiry.',
  'The caller is routed, scheduled, or sent to the correct next step.',
  'Your team receives a call summary and caller details instantly.',
  'The information can be logged into your CRM or workflow automatically.',
];

const controlPoints = [
  'The greeting',
  'What questions are asked',
  'What information is collected',
  'When calls are transferred',
  'What counts as urgent',
  'Which calls go to sales, support, or after-hours contacts',
  'What messages are sent to your team',
  'What data is pushed into your systems',
];

const benefits = [
  {
    title: 'Lower Operating Costs',
    body: 'Reduce dependency on expensive answering services and scale call coverage more efficiently.',
  },
  {
    title: 'Faster Response Times',
    body: 'Answer callers instantly instead of making them wait in a queue or leave a voicemail.',
  },
  {
    title: 'Better Lead Capture',
    body: 'Collect structured information from every caller so your team can follow up with confidence.',
  },
  {
    title: 'Higher Conversion Rates',
    body: 'Respond to interested callers while they are actively looking for help.',
  },
  {
    title: 'Improved Customer Experience',
    body: 'Give callers a professional, consistent experience every time they call.',
  },
  {
    title: 'More Productive Staff',
    body: 'Free your team from repetitive call intake and let them focus on higher-value work.',
  },
  {
    title: '24/7 Availability',
    body: 'Support callers after hours, on weekends, during holidays, and when your office is closed.',
  },
];

const providerOfferings = [
  'AI receptionist services',
  'AI answering service replacement',
  'After-hours AI call handling',
  'AI lead qualification',
  'AI call routing',
  'AI appointment intake',
  'White-label AI voice solutions',
];

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Voice Answering Service Replacement | UponAI',
  description:
    'Replace traditional answering services with an AI voice agent that answers calls, qualifies leads, routes callers, books appointments, and integrates with your phone system 24/7.',
  path: '/ai-voice-for-answering-service-replacement',
  openGraphDescription:
    'Use UponAI to replace message-only answering services with AI call handling that qualifies leads, routes callers, books appointments, and integrates with your phone system.',
  image: page.image,
});

export default function AnsweringServiceReplacementPage() {
  const featuredCities = getFeaturedCities();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'AI Voice for Answering Service Replacement', path: '/ai-voice-for-answering-service-replacement' },
  ]);
  const serviceSchema = buildServiceSchema({
    name: 'AI Voice Answering Service Replacement',
    description:
      'Replace traditional answering services with an AI voice agent that answers calls, qualifies leads, routes callers, books appointments, and integrates with your phone system 24/7.',
    path: '/ai-voice-for-answering-service-replacement',
    serviceType: 'AI Voice Answering Service Replacement',
    image: brandPhotos.voiceMic,
  });
  const faqSchema = buildFaqSchema(page.faqs);

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
              Answering Service Replacement
            </div>
            <h1 className="theme-heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Replace Your Answering Service With an AI Voice Agent That Never Misses a Call
            </h1>
            <p className="theme-soft mt-6 max-w-3xl text-lg leading-8 md:text-xl">
              Traditional answering services are expensive, limited, and often inconsistent. UponAI gives your business
              a smarter way to answer calls 24/7 with AI voice agents that sound natural, follow your process, collect
              the right information, and route callers instantly.
            </p>
            <p className="theme-soft mt-4 max-w-3xl text-base leading-7">
              Whether you need after-hours coverage, overflow call handling, lead qualification, appointment booking, or
              customer intake, UponAI helps you deliver a better caller experience without relying on a call center.
            </p>
            <p className="theme-heading mt-4 text-lg font-semibold">AI answering. Real conversations. No missed opportunities.</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-primary-button rounded-2xl px-7 py-4 text-center text-base font-semibold"
              >
                Book a Demo
              </a>
              <a
                href="#call-flow"
                className="theme-secondary-button rounded-2xl px-7 py-4 text-center text-base font-semibold"
              >
                See How It Works
              </a>
            </div>
          </div>

          <div className="relative">
            <VerticalVoiceAgentCard
              agent={getVerticalAgentForSlug('ai-voice-for-answering-service-replacement', 'Answering service')}
            />
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="theme-card-soft rounded-[1.25rem] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent-text)]">
                  Coverage
                </p>
                <p className="theme-heading mt-2 text-lg font-semibold">24/7 call handling</p>
              </div>
              <div className="theme-card-soft rounded-[1.25rem] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                  Outcome
                </p>
                <p className="theme-heading mt-2 text-lg font-semibold">Fewer missed leads and cleaner routing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-4 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">The Problem</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Traditional answering services are holding businesses back.
            </h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              Answering services can help prevent missed calls, but they often introduce cost, delay, weak intake, and
              inconsistent caller experiences right at the moment your business needs clarity.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {problemPoints.map((item) => (
              <div key={item} className="theme-card rounded-[1.5rem] px-5 py-4">
                <p className="theme-body text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">The Solution</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Meet your AI voice answering agent.</h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              UponAI creates AI voice agents that answer calls like a trained receptionist or answering service, but
              with more consistency, automation, and control. Instead of simply taking a message, your AI agent can
              actually help move the caller to the next step.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilityCards.map((item) => (
              <div key={item.title} className="theme-card rounded-[1.75rem] p-6">
                <h3 className="theme-heading text-2xl font-semibold">{item.title}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Better Than Legacy</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Why businesses are replacing answering services with AI voice.
            </h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              UponAI does not just answer the phone. It helps your business respond faster, operate smarter, and
              convert more callers into customers.
            </p>
          </div>

          <div className="grid gap-4">
            {comparisonRows.map((row) => (
              <div key={row.legacy} className="grid gap-3 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-5 md:grid-cols-2">
                <div className="theme-card rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
                    Traditional Answering Service
                  </p>
                  <p className="theme-body mt-2 text-sm leading-7">{row.legacy}</p>
                </div>
                <div className="theme-card-soft rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)]">
                    UponAI Voice Agent
                  </p>
                  <p className="theme-body mt-2 text-sm leading-7">{row.ai}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Use Cases</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Perfect for businesses that depend on phone calls.
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((item) => (
              <div key={item} className="theme-card rounded-[1.5rem] px-5 py-4">
                <p className="theme-body text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="call-flow" className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Example Call Flow</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              How an AI answering agent handles a call.
            </h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              Your business gets the information it needs, and your caller gets help right away.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {callFlowSteps.map((item, index) => (
              <div key={item} className="theme-card rounded-[1.75rem] p-5">
                <div className="theme-card-soft theme-heading flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <p className="theme-soft mt-4 text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Phone System Integration</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Works with your existing phone system.</h2>
              <p className="theme-soft mt-4 text-lg leading-8">
                UponAI is built for businesses and providers that already have phone systems in place. Your AI
                answering agent can connect into your existing voice environment, helping you add AI call handling
                without replacing your entire phone platform.
              </p>
              <p className="theme-soft mt-4 text-base leading-7">
                Depending on your setup, UponAI can support call forwarding, SIP-based routing, hosted voice platforms,
                UCaaS environments, and custom integrations.
              </p>
            </div>

            <div className="theme-panel rounded-[2rem] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Supported Environments</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {page.integrations?.examples.map((item) => (
                  <div key={item} className="theme-card rounded-[1.25rem] px-4 py-3 text-sm theme-body">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Controlled Conversations</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Natural conversations with business rules built in.
              </h2>
              <p className="theme-soft mt-4 text-lg leading-8">
                UponAI voice agents are designed to sound conversational while still following your business rules. Your
                AI agent does not freelance. It follows the process you define.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {controlPoints.map((item) => (
                <div key={item} className="theme-card rounded-[1.5rem] px-5 py-4">
                  <p className="theme-body text-sm leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Benefits</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Benefits of replacing your answering service with UponAI.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((item) => (
              <div key={item.title} className="theme-card rounded-[1.75rem] p-6">
                <h3 className="theme-heading text-2xl font-semibold">{item.title}</h3>
                <p className="theme-soft mt-3 text-sm leading-7">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">For VoIP And UCaaS Providers</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              Offer AI answering service replacement to your customers.
            </h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              Instead of watching customers pay third-party answering services, providers can offer AI answering as a
              new revenue-generating service directly through their own business.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {providerOfferings.map((item) => (
              <div key={item} className="theme-card rounded-[1.5rem] px-5 py-4">
                <p className="theme-body text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">City Pages</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                Dedicated answering service replacement pages for priority markets.
              </h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              These city pages give you localized versions of the offering for stronger internal linking and future SEO submissions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/ai-voice-for-answering-service-replacement/${city.slug}`}
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
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">Frequently Asked Questions</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Common questions about replacing answering services.</h2>
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

      <section className="theme-section-alt px-4 pb-10 pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="theme-card rounded-[2rem] p-8 text-center md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-accent-text)]">Do Not Let Calls Go To Voicemail</p>
            <h2 className="theme-heading mt-4 text-3xl font-bold md:text-5xl">Stop letting calls slip into outdated workflows.</h2>
            <p className="theme-soft mx-auto mt-4 max-w-3xl text-lg leading-8">
              Every missed call can mean a missed customer. UponAI gives your business an AI voice agent that answers
              instantly, captures the right information, and helps callers get what they need.
            </p>
            <p className="theme-soft mx-auto mt-4 max-w-3xl text-base leading-7">
              Replace outdated answering services with AI-powered call handling built for the way businesses operate today.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-primary-button rounded-full px-8 py-3.5 text-base font-bold"
              >
                Book Your Demo
              </a>
              <Link
                href="/contact-us-page"
                className="theme-secondary-button rounded-full px-8 py-3.5 text-base font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
