import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';
import {
  uponaiIndustriesMenu,
  uponaiUseCasesMenu,
} from '@/lib/uponai-pages';

export const metadata: Metadata = {
  title: "UponAI | Powering Tomorrow's Conversations",
  description:
    'UponAI builds AI voice agents, AI chatbots, and call automation systems that help businesses answer faster, qualify better, and engage customers around the clock.',
  alternates: { canonical: 'https://uponai.com' },
};

const stats = [
  { value: '100+', label: 'happy users' },
  { value: '24/7', label: 'conversation coverage' },
  { value: 'AI', label: 'voice + chatbot workflows' },
  { value: 'Fast', label: 'practical deployment paths' },
];

const solutions = [
  {
    title: 'AI Powered Voice Systems',
    href: '/services/ivr-system',
    desc: 'Build natural AI call experiences that handle inbound conversations, qualification, routing, and business-specific voice workflows.',
  },
  {
    title: 'AI Powered Chatbots',
    href: '/services/ai-chatbots',
    desc: 'Engage website visitors instantly, answer common questions, capture intent, and move conversations toward the right next step.',
  },
  {
    title: 'UCaaS Providers',
    href: '/ucaas',
    desc: 'Layer AI into communications infrastructure so routing, transfer logic, and automation work together instead of in isolation.',
  },
  {
    title: 'Call Overflow',
    href: '/call-overflow-page',
    desc: 'Protect missed opportunities during spikes and after hours with defined overflow workflows instead of voicemail dead ends.',
  },
];

const differentiators = [
  {
    title: 'Extensive Industry Experience',
    text: 'UponAI is positioned around real business workflows, with industry-specific routes and use cases already reflected throughout the site.',
  },
  {
    title: 'Simplified Navigation',
    text: 'The site mirrors the current live taxonomy across services, industries, use cases, features, and resources so visitors can reach the right path quickly.',
  },
  {
    title: 'Tailored Solutions',
    text: 'Every page is framed around practical deployment outcomes, from booking and support to legal intake, home services, and telecom workflows.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[720px] h-[620px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[520px] h-[420px] bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Welcome to UponAI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Powering <span className="text-blue-400">Tomorrow&apos;s</span> Conversations
            </h1>
            <p className="text-slate-300 text-xl mb-8 leading-relaxed max-w-2xl">
              Dive into a world where innovation meets conversation. UponAI blends AI and communication to redefine business engagement through AI-powered voice systems, chatbots, and workflow automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/get-a-demo-page" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Get a Demo
              </Link>
              <Link href="/contact-us-page" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Contact Us
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-400 text-sm">
              {['AI-powered IVR systems', 'AI chatbots', 'Conversation design', 'Automation workspace', 'Business engagement'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 bg-slate-900">
              <Image
                src="/ai-photos/test-call.png"
                alt="UponAI dashboard preview"
                width={900}
                height={620}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
              <div className="absolute bottom-5 left-5 bg-slate-950/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
                <div className="text-2xl font-black text-blue-400">24/7</div>
                <div className="text-slate-300 text-xs font-medium">Always-on conversation handling</div>
              </div>
              <div className="absolute top-5 right-5 bg-slate-950/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
                <div className="text-2xl font-black text-emerald-400">Live</div>
                <div className="text-slate-300 text-xs font-medium">Routing, prompts, and call flows</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-slate-800/40 border-y border-slate-700/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-blue-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Simplifying Your Business</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Premium Offerings</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Explore the same solution structure visitors see on the live UponAI site, built around voice, chat, communications, and overflow workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.title}
                href={solution.href}
                className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-800 transition-all"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{solution.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{solution.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-14 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 row-span-2">
                <Image
                  src="/ai-photos/agent-builder.jpeg"
                  alt="UponAI agent builder"
                  width={500}
                  height={680}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700/50">
                <Image
                  src="/ai-photos/extension-routing.png"
                  alt="UponAI routing tools"
                  width={500}
                  height={320}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700/50">
                <Image
                  src="/ai-photos/post-call-analysis.png"
                  alt="UponAI call insights"
                  width={500}
                  height={320}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Why Choose UponAI?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-5 leading-tight">
              Innovation Backed By A Clear Route Structure
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              The live UponAI site combines AI positioning with a broad page architecture across industries, use cases, features, and supporting resources. This local build now follows that same direction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map((item) => (
                <div key={item.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 sm:col-span-2 last:sm:col-span-2">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Driving Innovation Across Industries</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              The live site emphasizes industry-specific landing pages. This build now exposes that same set of major paths directly from the homepage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {uponaiIndustriesMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-700 bg-slate-800/50 px-5 py-5 text-white transition-colors hover:border-blue-500/50 hover:bg-slate-800"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-blue-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Use Cases</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built For Real Business Workflows</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              From support and booking to outbound sales, the main use-case routes from the live site are all available here as entry points.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {uponaiUseCasesMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition-colors hover:border-blue-500/50 hover:bg-slate-800"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Explore how UponAI frames this workflow inside the current site structure and move into the matching landing page.
                </p>
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
