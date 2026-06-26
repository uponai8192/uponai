import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';
import LiveVoiceDemo from '@/components/sections/LiveVoiceDemo';
import { uponaiBookingUrl } from '@/lib/booking';
import {
  uponaiIndustriesMenu,
  uponaiUseCasesMenu,
} from '@/lib/uponai-pages';

export const metadata: Metadata = {
  title: 'AI Voice Systems For Modern Customer Conversations',
  description:
    'UponAI builds AI voice agents, AI chatbots, and conversation workflows for businesses that need faster call handling, better qualification, and cleaner escalation.',
  alternates: { canonical: 'https://uponai.com' },
};

const stats = [
  { value: '24/7', label: 'voice coverage' },
  { value: '<2s', label: 'faster first response' },
  { value: 'AI + Human', label: 'handoff design' },
  { value: 'Multi-Route', label: 'industry workflows' },
];

const solutionCards = [
  {
    title: 'AI Voice Systems',
    href: '/services/ivr-system',
    tone: 'border-[var(--brand-green-border)] bg-[var(--brand-green-bg)] shadow-[0_18px_40px_rgba(var(--shadow-rgb),0.08)]',
    desc: 'Deploy branded voice experiences that greet callers, qualify intent, answer common questions, and route live conversations cleanly.',
  },
  {
    title: 'AI Chatbots',
    href: '/services/ai-chatbots',
    tone: 'border-[var(--brand-cyan-border)] bg-[var(--brand-cyan-bg)] shadow-[0_18px_40px_rgba(var(--shadow-rgb),0.08)]',
    desc: 'Capture website demand instantly with conversational flows that mirror your call logic and move visitors toward the right next step.',
  },
  {
    title: 'UCaaS Integrations',
    href: '/ucaas',
    tone: 'theme-card',
    desc: 'Connect AI call experiences with telecom infrastructure, routing rules, transfer logic, and reporting without creating operational sprawl.',
  },
  {
    title: 'Call Overflow Automation',
    href: '/call-overflow-page',
    tone: 'theme-card',
    desc: 'Keep inbound opportunities moving during surges, after-hours periods, and missed-call windows instead of sending prospects to dead ends.',
  },
];

const pillars = [
  {
    title: 'Voice-first workflow design',
    text: 'UponAI is positioned around the call journey itself: greet, capture, qualify, route, escalate, and log the outcome.',
  },
  {
    title: 'Built around live business operations',
    text: 'The site architecture and service pages reflect actual use cases across healthcare, telecom, insurance, legal, real estate, and field services.',
  },
  {
    title: 'A visual system that fits an AI company',
    text: 'The visual system leans into a sharper AI voice identity with a distinct palette, stronger hierarchy, and a layout rhythm built around modern conversation workflows.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="absolute inset-0">
          <div className="absolute left-[6%] top-10 h-56 w-56 rounded-full bg-[#22c55e]/18 blur-3xl" />
          <div className="absolute right-[10%] top-24 h-72 w-72 rounded-full bg-[#54d2ff]/14 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#22c55e]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="theme-pill-green inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_16px_rgba(34,197,94,0.75)]" />
              AI voice systems for modern teams
            </div>

            <h1 className="theme-heading mt-7 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Powering
              <span className="block text-[#22c55e]">Tomorrow&apos;s Conversations</span>
            </h1>

            <p className="theme-body mt-7 max-w-2xl text-lg leading-8 md:text-xl">
              UponAI is an AI voice company. We build phone and chat workflows that feel deliberate,
              move faster than manual handling, and escalate to your team only when the moment actually requires it.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-primary-button rounded-full px-7 py-4 text-center text-base font-bold"
              >
                Get a Demo
              </a>
              <Link
                href="/contact-us-page"
                className="theme-secondary-button rounded-full px-7 py-4 text-center text-base font-semibold"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                'Inbound call qualification',
                'Appointment and intake workflows',
                'Overflow and after-hours routing',
                'CRM-ready lead capture',
                'Industry-specific AI voice paths',
                'Human handoff when needed',
              ].map((item) => (
                <div
                  key={item}
                  className="theme-card rounded-2xl px-4 py-3 text-sm theme-body"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-28 w-28 rounded-[2rem] border border-[#54d2ff]/20 bg-[#54d2ff]/8 blur-xl" />
            <div className="absolute -right-6 bottom-16 h-32 w-32 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/12 blur-xl" />

            <div className="theme-panel relative space-y-4 rounded-[2rem] p-5">
              <div className="theme-card-gradient rounded-[1.5rem] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="theme-subtle text-xs uppercase tracking-[0.28em]">Live Session</p>
                    <h2 className="theme-heading mt-2 text-2xl font-semibold">Voice orchestration panel</h2>
                  </div>
                  <div className="theme-pill-green rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
                    Active
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="theme-inset rounded-[1.25rem] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="theme-soft text-sm">Incoming voice intent</p>
                        <p className="theme-heading mt-1 text-lg font-semibold">Healthcare scheduling</p>
                      </div>
                      <span className="theme-pill-cyan rounded-full px-3 py-1 text-xs font-semibold">
                        Routed
                      </span>
                    </div>

                    <div className="mt-5 flex h-24 items-end gap-2">
                      {[30, 52, 42, 74, 48, 84, 60, 46, 68, 38, 76, 54].map((height, index) => (
                        <div
                          key={`${height}-${index}`}
                          className={`w-full rounded-full ${
                            index % 3 === 0 ? 'bg-[#22c55e]' : 'bg-[#54d2ff]'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="theme-inset overflow-hidden rounded-[1.25rem]">
                    <Image
                      src="/ai-photos/test-call.png"
                      alt="UponAI call workflow dashboard"
                      width={900}
                      height={620}
                      className="h-full w-full object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.5rem] border border-[var(--brand-green-border)] bg-[var(--brand-green-bg)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-green-text)]">Response Layer</p>
                  <p className="theme-heading mt-3 text-3xl font-bold">24/7</p>
                  <p className="theme-body mt-2 text-sm">Always-on voice coverage with prompt-controlled handoff.</p>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--brand-cyan-border)] bg-[var(--brand-cyan-bg)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">Escalation</p>
                  <p className="theme-heading mt-3 text-3xl font-bold">Live</p>
                  <p className="theme-body mt-2 text-sm">Transfer paths stay available when a person is the better answer.</p>
                </div>
                <div className="theme-card rounded-[1.5rem] p-4">
                  <p className="theme-soft text-xs uppercase tracking-[0.24em]">Operational Fit</p>
                  <p className="theme-heading mt-3 text-3xl font-bold">Real</p>
                  <p className="theme-body mt-2 text-sm">Built for intake, support, booking, overflow, and qualification workflows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-section-alt border-y border-[var(--border-strong)] px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="theme-card rounded-[1.5rem] px-5 py-6 text-center">
              <div className="theme-heading text-3xl font-bold md:text-4xl">{item.value}</div>
              <div className="theme-soft mt-2 text-sm uppercase tracking-[0.18em]">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <LiveVoiceDemo />

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">What UponAI Builds</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              AI voice products shaped around how calls actually move.
            </h2>
            <p className="theme-soft mt-4 text-lg leading-8">
              This is not a phone company homepage with AI layered on top. The site is positioned around AI voice,
              conversational logic, and how those workflows connect to real business operations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {solutionCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`rounded-[2rem] border p-6 transition-transform duration-200 hover:-translate-y-1 ${item.tone}`}
              >
                <div className="theme-heading mb-5 inline-flex rounded-full border border-current/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
                  Solution
                </div>
                <h3 className="theme-heading text-2xl font-semibold">{item.title}</h3>
                <p className="theme-body mt-4 text-sm leading-7">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--border-strong)] md:row-span-2">
              <Image
                src="/ai-photos/agent-builder.jpeg"
                alt="UponAI AI voice builder"
                width={500}
                height={680}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[var(--border-strong)]">
              <Image
                src="/ai-photos/extension-routing.png"
                alt="UponAI routing controls"
                width={500}
                height={320}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[var(--border-strong)]">
              <Image
                src="/ai-photos/post-call-analysis.png"
                alt="UponAI call analysis"
                width={500}
                height={320}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Why The Redesign Works</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
              A clearer UponAI identity across the shell and homepage.
            </h2>
            <p className="theme-soft mt-5 text-lg leading-8">
              The current version keeps the route structure you needed, but reframes the brand as a product-led AI
              voice company instead of a generic telecom site with AI layered on top.
            </p>

            <div className="mt-8 space-y-4">
              {pillars.map((item, index) => (
                <div key={item.title} className="theme-card rounded-[1.75rem] p-5">
                  <div className="flex items-start gap-4">
                    <div className="theme-card-soft theme-heading flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="theme-heading text-lg font-semibold">{item.title}</h3>
                      <p className="theme-soft mt-2 text-sm leading-7">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-green-text)]">Industries</p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Voice AI tailored to real operating environments.</h2>
            </div>
            <p className="theme-soft max-w-xl text-base leading-7">
              The homepage now surfaces the industry paths as productized voice experiences instead of leaving them buried in menus.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {uponaiIndustriesMenu.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[1.75rem] border p-5 transition-transform duration-200 hover:-translate-y-1 ${
                  index % 2 === 0
                    ? 'border-[#22c55e]/20 bg-[#22c55e]/8'
                    : 'border-[#54d2ff]/18 bg-[#54d2ff]/8'
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

      <section className="theme-section-alt px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan-text)]">Use Cases</p>
            <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">Built around the moments that usually break teams.</h2>
            <p className="theme-soft mx-auto mt-4 max-w-3xl text-lg leading-8">
              Booking, overflow, sales outreach, support queues, and industry-specific intake all need different logic.
              These landing pages now read like parts of one AI voice system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {uponaiUseCasesMenu.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="theme-card rounded-[2rem] p-6 transition-colors hover:border-[var(--border-strong)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                      index % 2 === 0 ? 'theme-pill-green' : 'theme-pill-cyan'
                    }`}>
                      Workflow
                    </span>
                    <h3 className="theme-heading mt-4 text-2xl font-semibold">{item.label}</h3>
                    <p className="theme-soft mt-3 text-sm leading-7">
                      Explore how UponAI frames this use case as an AI voice workflow with clear intake, routing, and escalation paths.
                    </p>
                  </div>
                  <span className="theme-subtle text-2xl">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  );
}
