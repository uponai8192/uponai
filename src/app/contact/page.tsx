import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact UponAI | (888) 787-6624',
  description:
    'Contact UponAI with questions about AI voice agents, AI chatbots, call automation, or modern communications solutions. Call (888) 787-6624 or send us a message.',
  alternates: { canonical: 'https://uponai.com/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-violet-300 text-sm font-medium">We reply within 1 business day</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Questions about AI voice, AI chat, automation, or communications strategy? We&apos;re here to help.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-blue-600/10 border border-blue-500/30 rounded-xl px-5 py-3">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-slate-300 text-sm">
                Need a tailored walkthrough? Tell us what you want to automate and we&apos;ll point you to the right solution.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-white font-bold text-xl">Contact Information</h2>

              {[
                {
                  label: 'Phone',
                  value: '(888) 787-6624',
                  href: 'tel:+18887876624',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                },
                {
                  label: 'Email',
                  value: 'info@uponai.com',
                  href: 'mailto:info@uponai.com',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  label: 'Headquarters',
                  value: 'AI + Communications Solutions for Modern Businesses',
                  href: null,
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center text-violet-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white font-medium hover:text-violet-300 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Team photo */}
              <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                <Image
                  src="/site-photos/team-consultation.jpg"
                  alt="UponAI team — ready to help your business"
                  width={500}
                  height={340}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm mb-3">Other Office Locations</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Atlanta, GA', 'Houston, TX', 'West Palm Beach, FL', 'Allentown, PA', 'Chicago, IL', 'San Francisco, CA', 'New York, NY'].map(
                    (loc) => (
                      <div key={loc} className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300">
                        {loc}
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="bg-violet-600/10 border border-violet-500/30 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2">Response Time</h3>
                <p className="text-slate-300 text-sm">Typically within 1 business day</p>
                <p className="text-slate-400 text-sm mt-1">We&apos;ll route your request to the right team for demos, partnerships, or implementation planning.</p>
              </div>

              <div className="text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-800">
                <p className="font-medium text-slate-400">Legal</p>
                <div className="flex gap-4">
                  <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-of-services" className="hover:text-slate-300 transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
