import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cities } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'AI Chatbots for Business | UponAI',
  description:
    'Deploy AI chatbots that engage website visitors, qualify leads, and route customers 24/7 — powered by UponAI. Never miss an inquiry, even when your team is offline.',
  alternates: { canonical: 'https://uponai.com/services/ai-chatbots' },
  openGraph: {
    title: 'AI Chatbots for Business | UponAI',
    description: 'AI chatbots that engage, qualify, and convert visitors around the clock.',
  },
};

const features = [
  {
    title: 'Trained on Your Business',
    desc: 'Upload your FAQs, product docs, pricing, and policies. The chatbot answers questions specific to your business — not generic responses.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Lead Capture & Qualification',
    desc: "Automatically collect name, email, phone, and budget — then score leads and route hot prospects directly to your sales team while they're still on your site.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Live Agent Handoff',
    desc: 'When a customer needs a human, the chatbot transfers the full conversation history to a live agent instantly — no repeating, no friction.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'CRM Integration',
    desc: 'Every conversation, lead, and data point automatically syncs to your CRM — Salesforce, HubSpot, Zoho, or your existing stack.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
  },
  {
    title: 'Multi-Channel Deployment',
    desc: 'Launch on your website, embed in SMS, connect to Facebook Messenger, WhatsApp, and more — one bot, every channel, consistent experience.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  {
    title: 'Analytics & Conversation Data',
    desc: 'See exactly what visitors are asking, which topics convert, and where drop-offs happen — with real-time dashboards and weekly reports.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const useCases = [
  { industry: 'Healthcare', use: 'Appointment booking, insurance verification, patient FAQs — without tying up your front desk.' },
  { industry: 'Real Estate', use: 'Qualify buyers and sellers instantly, schedule showings, and capture leads 24/7 from your listings.' },
  { industry: 'Legal', use: 'Intake new clients, gather case details, and schedule consultations — even after office hours.' },
  { industry: 'E-Commerce', use: 'Answer product questions, track orders, handle returns, and upsell — automatically.' },
  { industry: 'Financial Services', use: 'Pre-qualify loan applicants, schedule advisor meetings, and answer compliance-safe FAQs.' },
  { industry: 'SaaS / Tech', use: 'Onboard new users, troubleshoot common issues, and route complex tickets to the right tier.' },
];

const stats = [
  { value: '80%', label: 'of inquiries resolved without a human' },
  { value: '3×', label: 'more leads captured vs. forms alone' },
  { value: '24/7', label: 'always-on engagement' },
  { value: '< 1s', label: 'response time' },
];

const featuredCities = cities.slice(0, 30);

export default function AIChatbotsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[700px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-800/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Copy */}
          <div>
            <nav className="mb-6 flex items-center gap-1 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="text-slate-600">/</span>
              <Link href="/services/business-voip" className="hover:text-white">Services</Link>
              <span className="text-slate-600">/</span>
              <span className="text-white">AI Chatbots</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/30 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                <span className="text-violet-300 text-sm font-medium">Powered by UponAI Technology</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5">
                <span className="text-blue-300 text-sm font-medium">UponAI Solution</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              AI Chatbots That{' '}
              <span className="text-violet-400">Engage Every Visitor</span>
              {' '}— 24/7
            </h1>
            <p className="text-xl text-slate-300 mb-4 leading-relaxed">
              Stop losing leads to contact forms and slow response times. Our AI chatbots engage visitors the moment they land on your site — answering questions, qualifying leads, and booking meetings automatically.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Powered by{' '}
              <a href="https://uponai.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline">
                UponAI
              </a>{' '}
              and integrated natively with your UponAI workflow — so a chat can instantly escalate to a call with the right agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Get a Free Demo
              </Link>
              <a href="tel:+18887876624" className="border border-slate-600 text-slate-200 hover:border-violet-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Call (888) 787-6624
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="relative">
            <div className="absolute -inset-2 bg-violet-500/15 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-700/60">
              <Image
                src="/site-photos/ai-chatbot.jpeg"
                alt="AI chatbot engaging a mobile user — powered by UponAI"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
              {/* Floating chat bubble */}
              <div className="absolute bottom-5 left-5 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-2xl px-4 py-3 shadow-xl max-w-[220px]">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold mb-0.5">AI Chatbot</p>
                    <p className="text-slate-300 text-xs leading-snug">Hi! Can I help you find the right VoIP plan? 👋</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-5 right-5 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
                <div className="text-lg font-black text-violet-400">80%</div>
                <div className="text-slate-300 text-xs">Auto-resolved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 bg-slate-800/40 border-y border-slate-700/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-violet-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Most Websites Lose 90% of Visitors Without a Conversation</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              A contact form is not a conversation. Visitors fill it out, wait hours for a reply, and by then they&apos;ve already called your competitor.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              An AI chatbot starts the conversation the second they land — qualifying them, answering their questions, and booking a call before they ever leave.
            </p>
            <ul className="space-y-3">
              {[
                'Respond instantly — even at 2am on a Sunday',
                'Qualify leads before they reach your team',
                'Book meetings directly on your calendar',
                'Sync every conversation to your CRM',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Without AI Chatbot', items: ['Visitors fill out a form', 'Wait 4–24 hours for a reply', 'Call a competitor in the meantime', 'You lose a hot lead'], bad: true },
              { label: 'With AI Chatbot', items: ['Greeted instantly on arrival', 'Questions answered in real time', 'Lead qualified & meeting booked', 'Your team gets a warm handoff'], bad: false },
            ].map((col) => (
              <div key={col.label} className={`rounded-xl p-5 border ${col.bad ? 'border-red-900/40 bg-red-900/10' : 'border-green-900/40 bg-green-900/10'}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${col.bad ? 'text-red-400' : 'text-green-400'}`}>{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className={`text-sm flex items-center gap-2 ${col.bad ? 'text-slate-400' : 'text-slate-200'}`}>
                      <span className={col.bad ? 'text-red-500' : 'text-green-400'}>{col.bad ? '×' : '✓'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Everything Your AI Chatbot Can Do</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Built on the UponAI platform and connected natively to UponAI — not a generic chatbot widget.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-violet-500/40 transition-colors">
                <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center text-violet-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VoIP + Chat integration spotlight */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">The UponAI Advantage</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Chat That Can Instantly Become a Call</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Because your AI chatbot runs on the same platform as your UponAI workflow, a chat conversation can escalate to a live call — or an AI voice agent — in one click. No other provider can do this natively.
            </p>
            <ul className="space-y-4">
              {[
                { title: 'One-Click Call Escalation', desc: 'A chat can trigger a live call to the right agent, with full context passed automatically.' },
                { title: 'Unified Inbox', desc: 'Chat, SMS, and voice conversations appear in a single UponAI dashboard.' },
                { title: 'Shared Knowledge Base', desc: 'Your chatbot and AI voice agent share the same knowledge base — consistent answers everywhere.' },
                { title: 'One Vendor, One Bill', desc: 'VoIP service and AI on a single invoice with one support team.' },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4 bg-slate-800/40 border border-slate-700 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Live Chat Demo</p>
                <p className="text-slate-400 text-xs">Powered by UponAI</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Online</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { from: 'bot', text: "Hi! I'm here to help you find the right VoIP plan for your business. How many employees do you have?" },
                { from: 'user', text: 'We have about 25 people across 3 offices.' },
                { from: 'bot', text: "Great! For a distributed team like yours, our Business VoIP + Contact Center package is a great fit. Would you like me to schedule a free demo with one of our specialists?" },
                { from: 'user', text: 'Yes, tomorrow works.' },
                { from: 'bot', text: "Perfect — I've booked a 30-min call for tomorrow at 10am. You'll receive a confirmation at your email. Is there anything else I can help with?" },
              ].map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.from === 'bot' ? 'bg-slate-700 text-slate-200 rounded-tl-sm' : 'bg-violet-600 text-white rounded-tr-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 bg-slate-900/60 rounded-xl px-4 py-2.5 border border-slate-700">
              <span className="text-slate-500 text-sm flex-1">Type a message...</span>
              <button className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Industry use cases */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">AI Chatbots for Every Industry</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Deployed and customized for your specific business workflows — not a generic FAQ bot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div key={uc.industry} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-violet-500/40 transition-colors">
                <p className="text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">{uc.industry}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{uc.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">AI Chatbots Available Nationwide</h2>
          <p className="text-slate-400 mb-8 text-sm">
            UponAI deploys AI chatbots for businesses across the United States. Select your city below.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/services/ai-chatbots/${city.slug}`}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white hover:border-violet-500/40 transition-colors text-center"
              >
                {city.name}, {city.stateAbbr}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-slate-500 text-sm">+ {cities.length - featuredCities.length} more cities nationwide</p>
        </div>
      </section>

      <CTASection
        heading="Ready to Deploy Your AI Chatbot?"
        subheading="Get a live demo in 24 hours. See exactly how it engages your visitors and captures leads for your specific business."
      />
    </>
  );
}
