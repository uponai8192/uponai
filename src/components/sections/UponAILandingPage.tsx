import Image from 'next/image';
import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';
import type { UponAIPage } from '@/lib/uponai-pages';

export default function UponAILandingPage({ page }: { page: UponAIPage }) {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[680px] h-[520px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[460px] h-[360px] bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">{page.eyebrow}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">{page.title}</h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-8 max-w-3xl">{page.description}</p>
            <div className="space-y-3 mb-8">
              {page.highlights.map((item) => (
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
              <Link href="/get-a-demo-page" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Get a Demo
              </Link>
              <Link href="/contact-us-page" className="border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 bg-slate-900">
              <Image
                src={page.image}
                alt={page.imageAlt}
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
          {page.sections.map((section) => (
            <div key={section.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-white font-semibold text-xl mb-3">{section.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      {page.faqs && page.faqs.length > 0 && (
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-lg">Common questions about how UponAI approaches AI voice and AI chat workflows.</p>
            </div>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading={page.ctaHeading ?? `Ready To Explore ${page.title}?`}
        subheading={
          page.ctaSubheading ??
          'Book a demo to see how UponAI can apply AI voice, AI chat, and automation to your real business workflows.'
        }
      />
    </>
  );
}
