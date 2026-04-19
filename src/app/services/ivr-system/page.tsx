import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'AI Powered Voice Systems',
  description:
    'Deploy AI powered voice systems with UponAI to answer inbound calls, qualify leads, and route conversations more intelligently.',
  alternates: { canonical: 'https://uponai.com/services/ivr-system' },
};

const features = [
  'Natural language conversations instead of rigid menu trees',
  'Qualification and routing logic that reflects real business operations',
  'After-hours coverage without sending callers straight to voicemail',
  'Cleaner handoffs into live teams when a human needs to step in',
];

export default function IVRSystemPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[680px] h-[520px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[460px] h-[360px] bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <nav className="mb-6 flex items-center gap-1 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="text-slate-600">/</span>
              <span className="text-white">AI Powered Voice Systems</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">AI Powered Voice Systems</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              AI Voice Systems That Replace Friction With Better Conversations
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-8 max-w-3xl">
              UponAI helps businesses move beyond traditional IVR by using AI voice systems that can understand intent, qualify callers, and route them more intelligently.
            </p>
            <div className="space-y-3 mb-8">
              {features.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Get a Demo
              </Link>
              <a href="tel:+18887876624" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Call (888) 787-6624
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 bg-slate-900">
              <Image
                src="/ai-photos/extension-routing.png"
                alt="UponAI routing and voice system configuration"
                width={900}
                height={620}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">Natural Voice Experience</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              Replace keypad-heavy menus with a system that can interpret what callers are actually trying to do and move them toward the right next step.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">Smarter Routing</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              Route calls based on business intent, urgency, and workflow design rather than forcing every conversation through the same static options.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">Operational Leverage</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              AI powered voice systems help teams stay responsive without needing every inbound conversation to start with a live rep.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready To Replace Traditional IVR?"
        subheading="Book a demo to see how UponAI can turn rigid menu trees into more useful AI voice workflows."
      />
    </>
  );
}
