import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug, formatCityState } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const cs = formatCityState(city);
  return {
    title: `AI Voice Agents in ${cs} | UponAI`,
    description: `Deploy AI voice agents for your ${cs} business. Answer every call 24/7, qualify leads, book appointments, and route callers — powered by UponAI and UponAI.`,
    alternates: { canonical: `https://uponai.com/services/ai-voice-agents/${city.slug}` },
    openGraph: {
      title: `AI Voice Agents in ${cs} | UponAI`,
      description: `Automate your phone lines with human-sounding AI that never sleeps. Built for ${cs} businesses.`,
    },
  };
}

const USE_CASES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Appointment Scheduling',
    description: 'The AI books, reschedules, and confirms appointments directly into your calendar — zero hold time.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Lead Qualification',
    description: 'Ask custom screening questions, score inbound leads, and route hot prospects instantly to your sales team.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'FAQ Handling',
    description: 'Answer hours, pricing, directions, and common questions instantly — freeing your team for complex calls.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Smart Call Routing',
    description: 'Understand caller intent and route to the right department — no touchtone menus, no frustration.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '24/7 After-Hours Coverage',
    description: 'Never lose a lead after 5 PM again. The AI handles calls around the clock, even on weekends and holidays.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Call Transcripts & Analytics',
    description: 'Every conversation is logged, transcribed, and analyzed so you can improve scripts and track outcomes.',
  },
];

const INDUSTRIES = [
  'Medical & Dental Offices',
  'Law Firms & Legal Services',
  'Real Estate Agencies',
  'Auto Dealerships & Repair',
  'HVAC, Plumbing & Contractors',
  'Insurance Agencies',
  'Financial Services',
  'Restaurants & Hospitality',
];

const STEPS = [
  { num: '01', title: 'Choose Your Voice & Persona', desc: 'Pick from dozens of natural-sounding voices or clone your own.' },
  { num: '02', title: 'Train on Your Business', desc: 'Upload your FAQs, scripts, and call flows — the AI learns your brand.' },
  { num: '03', title: 'Connect to Your Phone System', desc: 'We plug directly into your existing UponAI number — zero downtime.' },
  { num: '04', title: 'Go Live & Monitor', desc: 'Launch in days, not months. Review transcripts and tune anytime.' },
];

export default async function AIVoiceAgentCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const cs = formatCityState(city);

  const nearbyIdx = cities.findIndex((c) => c.slug === citySlug);
  const nearby = [
    ...cities.slice(Math.max(0, nearbyIdx - 3), nearbyIdx),
    ...cities.slice(nearbyIdx + 1, nearbyIdx + 4),
  ].slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[700px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-800/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services/ai-voice-agents" className="hover:text-slate-300 transition-colors">AI Voice Agents</Link>
            <span>/</span>
            <span className="text-slate-300">{cs}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-violet-300 text-sm font-medium">Powered by UponAI × UponAI</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            AI Voice Agents for{' '}
            <span className="text-violet-400">{cs}</span>{' '}
            Businesses
          </h1>
          <p className="text-slate-300 text-xl mb-8 leading-relaxed max-w-3xl">
            Answer every call — 24 hours a day, 7 days a week — with a human-sounding AI that qualifies leads,
            books appointments, and handles FAQs for your {city.name} business. No hold queues. No missed opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/contact" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
              Deploy AI in {city.name}
            </Link>
            <a href="tel:+18887876624" className="border border-slate-600 text-slate-200 hover:border-violet-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
              Call (888) 787-6624
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '< 1s', label: 'Answer Time' },
              { value: '24/7', label: 'Always On' },
              { value: '95%+', label: 'Resolution Rate' },
              { value: '0', label: 'Hold Queues' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-violet-400 mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our AI Voice Agents Do for {city.name} Businesses
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Purpose-built automation that handles real phone conversations — not just simple touch-tone menus.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-violet-500/40 transition-colors">
                <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center text-violet-400 mb-4">
                  {uc.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{uc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Go Live in {cs} in Just Days
            </h2>
            <p className="text-slate-400 text-lg">
              We handle the entire setup — no engineering team required.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-5 bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                <div className="text-4xl font-black text-violet-600/40 flex-shrink-0 leading-none">{step.num}</div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Industries We Serve in {cs}
            </h2>
            <p className="text-slate-400">
              Our AI voice agents are trained for the most call-intensive businesses across {city.state}.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind) => (
              <div key={ind} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 text-sm font-medium text-center hover:border-violet-500/40 hover:text-white transition-colors">
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why UponAI + UponAI */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-violet-900/20 to-blue-900/20 border border-violet-500/20 rounded-3xl p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">The UponAI + UponAI Advantage</span>
                <h2 className="text-3xl font-bold text-white mt-3 mb-5 leading-tight">
                  Native AI Built Into Your Phone System
                </h2>
                <p className="text-slate-400 leading-relaxed mb-5">
                  Unlike standalone AI tools that bolt onto your existing setup, our AI Voice Agents are
                  natively integrated with UponAI&apos;s cloud phone platform. That means seamless handoffs
                  to live agents, real-time call data, and one monthly bill.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Businesses in {cs} get the same enterprise-grade AI technology used by Fortune 500
                  companies — at a price that makes sense for growing teams.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  'No separate AI platform to manage',
                  'Calls hand off to live agents seamlessly',
                  'One provider, one invoice, one support team',
                  'US-based support — real humans in {city}\'s time zone',
                  'SOC 2 & HIPAA-ready infrastructure',
                  'Cancel anytime — no long-term contracts',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{point.replace('{city}', city.name)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'UponAI',
            description: `AI Voice Agents for businesses in ${cs}`,
            url: `https://uponai.com/services/ai-voice-agents/${city.slug}`,
            telephone: '+18336986471',
            email: 'Sales@my-voip.com',
            areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.state } },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'AI Voice Agent Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Voice Agents', description: `24/7 AI phone answering for ${cs} businesses` } },
              ],
            },
          }),
        }}
      />

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <section className="py-12 px-4 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <p className="text-slate-500 text-sm mb-4">Also serving nearby areas:</p>
            <div className="flex flex-wrap gap-3">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/ai-voice-agents/${c.slug}`}
                  className="text-slate-400 hover:text-violet-400 text-sm transition-colors"
                >
                  AI Voice Agents in {formatCityState(c)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
