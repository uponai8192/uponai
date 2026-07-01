import type { Metadata } from 'next';
import Link from 'next/link';
import LiveVoiceDemo from '@/components/sections/LiveVoiceDemo';
import GraceTalkButton from '@/components/grace/GraceTalkButton';
import { uponaiBookingUrl } from '@/lib/booking';
import { uponaiIndustriesMenu } from '@/lib/uponai-pages';

export const metadata: Metadata = {
  title: "Meet Grace — UponAI's AI Voice Agent",
  description:
    'Grace is UponAI’s AI voice agent. She answers questions, books appointments, routes and transfers callers, works 24/7 and multilingual, and logs to your CRM. Talk to her live.',
  alternates: { canonical: 'https://uponai.com/grace' },
  openGraph: {
    title: "Meet Grace — UponAI's AI Voice Agent",
    description:
      'Talk to Grace live. She answers questions, books appointments, routes to your team, and logs to your CRM — 24/7 and multilingual.',
    url: 'https://uponai.com/grace',
    type: 'website',
  },
};

const heroChips = ['Answers questions', 'Books appointments', 'Routes & transfers', '24/7', 'Multilingual'];

const capabilities = [
  { title: 'Answers your questions', body: 'Handles product and service questions in natural conversation — no keypad menus, no scripts that dead-end.' },
  { title: 'Books appointments & demos', body: 'Collects the details, checks availability, and confirms the booking before the call ends.' },
  { title: 'Routes & transfers', body: 'Warm-transfers to the right person, department, or extension — with voicemail or take-a-message fallback.' },
  { title: '24/7 and multilingual', body: 'Answers every call, day or night, in the caller’s language — no missed after-hours opportunities.' },
  { title: 'Logs to your CRM', body: 'Syncs contacts and outcomes to Salesforce, HubSpot, Zoho, n8n, or Zapier automatically.' },
  { title: 'Outbound calling', body: 'Runs first-touch outreach and follow-ups, then hands warm, qualified leads to your team.' },
];

const steps = [
  { title: 'Greets & understands', body: 'Picks up instantly and works out what the caller actually needs.' },
  { title: 'Answers or qualifies', body: 'Resolves the question, or gathers the right details to move things forward.' },
  { title: 'Books or routes', body: 'Schedules the meeting or transfers to the right person or department.' },
  { title: 'Logs & hands off', body: 'Writes the outcome to your CRM with full context — no lost notes.' },
];

const offerings = [
  { title: 'AI phone agents', body: 'Natural-language voice agents that handle inbound calls end to end.' },
  { title: 'CRM integration', body: 'Two-way sync with Salesforce, HubSpot, Zoho, n8n, and Zapier.' },
  { title: 'Custom AI solutions', body: 'Agents tuned to your business, retrained on your industry data.' },
  { title: 'Outbound call services', body: 'Automated first-touch and follow-up campaigns at scale.' },
];

const tryAsking = [
  'What can Grace do?',
  'Can I book a demo?',
  'Which CRMs do you integrate with?',
  'What are your hours?',
];

const integrations = ['Salesforce', 'HubSpot', 'Zoho', 'n8n', 'Zapier'];

const proofStats = [
  { value: '24/7', label: 'always answering' },
  { value: 'Multilingual', label: 'in the caller’s language' },
  { value: 'Warm', label: 'human handoff with context' },
  { value: 'CRM-synced', label: 'every outcome logged' },
];

const faqs = [
  {
    q: 'How does Grace understand callers?',
    a: 'Natural language understanding, not keypad menus. Grace interprets what the caller means and responds in context, the way a person would.',
  },
  {
    q: 'What does it take to integrate with our CRM?',
    a: 'A secure API endpoint or a compatible low-code platform such as n8n or Zapier, plus an admin token. From there Grace syncs contacts and outcomes automatically.',
  },
  {
    q: 'Can Grace be tuned to our business?',
    a: 'Yes. Models can be retrained on your industry and business data, and updates are managed from the UponAI dashboard.',
  },
  {
    q: 'Does Grace support other languages?',
    a: 'Yes — Grace handles calls 24/7 in multiple languages.',
  },
  {
    q: 'Can Grace hand off to a human?',
    a: 'Yes. Grace warm-transfers to a person, department, or extension, and falls back to voicemail or taking a message if they are unavailable.',
  },
  {
    q: 'How does billing work?',
    a: 'Credit card, PayPal, ACH, or Net-30 corporate terms.',
  },
];

export default function GracePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-4 pb-8 pt-12 md:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-10 h-64 w-64 rounded-full bg-[#22c55e]/14 blur-3xl" />
          <div className="absolute right-[10%] top-24 h-72 w-72 rounded-full bg-[#54d2ff]/12 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="theme-pill-green inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]">
            <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.8)]" style={{ animation: 'pulse 2s infinite' }} />
            UponAI Voice Agent
          </div>

          <h1 className="theme-heading mt-7 text-5xl font-bold leading-[0.98] md:text-7xl">
            Meet <span className="text-[#22c55e]">Grace</span>
          </h1>

          <p className="theme-body mx-auto mt-6 max-w-2xl text-lg leading-8 md:text-xl">
            Grace is UponAI’s AI voice agent. She answers your callers, books appointments,
            routes them to the right person, and logs every outcome — 24/7, in their language.
            Talk to her right now.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {heroChips.map((chip) => (
              <span key={chip} className="theme-card rounded-full px-3 py-1 text-xs theme-body">{chip}</span>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GraceTalkButton label="Talk to Grace" />
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-secondary-button rounded-full px-8 py-4 text-center text-base font-semibold"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO ── */}
      <LiveVoiceDemo
        eyebrow="Live Demo"
        heading={<>Talk to Grace,<br />right now</>}
        subheading="Ask her anything — she answers, books, and points you to the right team."
      />

      {/* ── CAPABILITIES ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">What Grace does</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">One agent, the whole front line.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.title} className="theme-card rounded-[1.75rem] p-6">
                <h3 className="theme-heading text-xl font-semibold">{cap.title}</h3>
                <p className="theme-body mt-3 text-sm leading-7">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">How it works</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Every call, handled the same clean way.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="theme-card rounded-[1.75rem] p-6">
                <div className="theme-card-soft theme-heading flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                  0{i + 1}
                </div>
                <h3 className="theme-heading mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="theme-soft mt-2 text-sm leading-7">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT GRACE HANDLES + TRY ASKING ── */}
      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">What Grace can talk about</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-4xl">She knows the whole UponAI offering.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {offerings.map((o) => (
                <div key={o.title} className="theme-card rounded-[1.5rem] p-5">
                  <h3 className="theme-heading text-base font-semibold">{o.title}</h3>
                  <p className="theme-body mt-2 text-sm leading-6">{o.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="theme-panel rounded-[2rem] p-7 md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#22c55e]">Try asking</p>
            <h3 className="theme-heading mt-2 text-xl font-semibold">Not sure where to start?</h3>
            <div className="mt-5 flex flex-col gap-2.5">
              {tryAsking.map((prompt) => (
                <div key={prompt} className="theme-card flex items-center gap-3 rounded-xl px-4 py-2.5">
                  <svg className="h-4 w-4 flex-shrink-0 text-[#22c55e]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A3.67 3.67 0 0 1 9.17 7.5V6h-2zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83H15.5A3.67 3.67 0 0 1 19.17 7.5V6h-2z" />
                  </svg>
                  <span className="theme-body text-sm">{prompt}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <GraceTalkButton label="Talk to Grace" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES BY INDUSTRY ── */}
      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Use cases</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Grace adapts to your industry.</h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              The same agent, tuned to how calls actually move in your field — intake, scheduling,
              after-hours, qualification, and clean human handoff.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {uponaiIndustriesMenu.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[1.75rem] border p-5 transition-transform duration-200 hover:-translate-y-1 ${
                  index % 2 === 0 ? 'border-[#22c55e]/20 bg-[#22c55e]/8' : 'border-[#54d2ff]/18 bg-[#54d2ff]/8'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="theme-heading text-lg font-semibold">{item.label}</span>
                  <span className="theme-heading text-2xl">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF & TRUST ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Built on UponAI</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Ready for real operations.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {proofStats.map((stat) => (
              <div key={stat.label} className="theme-card rounded-[1.5rem] px-5 py-6 text-center">
                <div className="theme-heading text-2xl font-bold md:text-3xl">{stat.value}</div>
                <div className="theme-soft mt-2 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="theme-panel mt-6 flex flex-col items-center gap-5 rounded-[2rem] p-7 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="theme-subtle text-xs uppercase tracking-[0.24em]">Integrates with</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                {integrations.map((name) => (
                  <span key={name} className="theme-card rounded-full px-4 py-1.5 text-sm theme-body">{name}</span>
                ))}
              </div>
            </div>
            <p className="theme-soft max-w-sm text-sm leading-7">
              Conversations and lead data are handled in accordance with POPIA, with call
              recordings and post-call analysis available for quality assurance.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">FAQ</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Good questions to ask.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="theme-card group rounded-[1.5rem] p-5">
                <summary className="theme-heading flex cursor-pointer items-center justify-between text-base font-semibold marker:content-none">
                  {faq.q}
                  <span className="theme-subtle ml-4 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="theme-body mt-3 text-sm leading-7">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-4 py-20">
        <div className="theme-panel mx-auto max-w-4xl rounded-[2.5rem] p-10 text-center md:p-14">
          <h2 className="theme-heading text-3xl font-bold md:text-5xl">Ready to put Grace on your lines?</h2>
          <p className="theme-soft mx-auto mt-4 max-w-xl text-lg leading-8">
            Talk to her now, or book a walkthrough and we’ll map her onto your real call flow.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GraceTalkButton label="Talk to Grace" />
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-secondary-button rounded-full px-8 py-4 text-center text-base font-semibold"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
