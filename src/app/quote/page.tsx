import type { Metadata } from 'next';
import QuoteForm from '@/components/sections/QuoteForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Get a Free VoIP Quote | MyVoIP — (833) 698-6471',
  description:
    'Get a custom VoIP quote for your business in minutes. Tell us your setup — seats, desk phones, AI receptionist, call recording — and we\'ll build a plan starting at $9.99/month.',
  alternates: { canonical: 'https://my-voip.com/quote' },
};

export default function QuotePage() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">No contracts · Setup in 24 hours</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Your Free VoIP Quote</h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Tell us about your business and we&apos;ll build a custom phone system plan — starting at $9.99/month.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <QuoteForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Why MyVoIP */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">Why Businesses Choose MyVoIP</h2>
                <ul className="space-y-3">
                  {[
                    { icon: '✓', text: 'Starting at $9.99 / user / month' },
                    { icon: '✓', text: '99.99% uptime SLA — enterprise-grade reliability' },
                    { icon: '✓', text: '24/7 US-based support — real humans' },
                    { icon: '✓', text: 'No long-term contracts required' },
                    { icon: '✓', text: 'Set up and live in under 24 hours' },
                    { icon: '✓', text: 'Works with your existing phones & PBX' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-green-400 font-bold flex-shrink-0">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact direct */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-4">
                <h2 className="text-white font-bold text-lg">Prefer to Talk?</h2>
                <a
                  href="tel:+18336986471"
                  className="flex items-center gap-3 group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">(833) 698-6471</p>
                    <p className="text-slate-500 text-xs">Available 24/7</p>
                  </div>
                </a>
                <a
                  href="mailto:Sales@my-voip.com"
                  className="flex items-center gap-3 group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Sales@my-voip.com</p>
                    <p className="text-slate-500 text-xs">Reply within 1 business day</p>
                  </div>
                </a>
              </div>

              {/* Need help instead */}
              <div className="bg-violet-600/10 border border-violet-500/30 rounded-xl p-5 text-center">
                <p className="text-slate-300 text-sm mb-3">Have a different question?</p>
                <Link
                  href="/contact"
                  className="inline-block border border-violet-500/50 text-violet-300 hover:bg-violet-600/20 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Go to Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
