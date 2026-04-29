import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/sections/QuoteForm';

export const metadata: Metadata = {
  title: 'Request an AI Workflow Consultation',
  description:
    "Tell UponAI about your communication workflow and we'll recommend the right mix of AI voice, chat, routing, and live handoff design for your business.",
  alternates: { canonical: 'https://uponai.com/quote' },
};

export default function QuotePage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="theme-pill-green inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">AI voice, chat, routing, and handoff planning</span>
          </div>
          <h1 className="theme-heading text-4xl md:text-5xl font-bold mb-4">Request Your AI Workflow Consultation</h1>
          <p className="theme-soft text-xl max-w-2xl mx-auto">
            Tell us how your team handles conversations today and we&apos;ll map the best next step for AI voice,
            chat, automation, and human handoff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <QuoteForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="theme-card rounded-2xl p-6">
              <h2 className="theme-heading font-bold text-lg mb-4">What We Can Help You Design</h2>
              <ul className="space-y-3">
                {[
                  'AI voice workflows for inbound calls, overflow, and after-hours coverage',
                  'Chatbot and website conversation design tied to your real operations',
                  'Live handoff logic when a person is the better answer',
                  'SIP, routing, and telecom integration planning',
                  'Operational guidance for qualification, scheduling, and support use cases',
                  'A recommendation tailored to your current stack instead of a generic package',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 theme-body text-sm">
                    <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="theme-card rounded-2xl p-6 space-y-4">
              <h2 className="theme-heading font-bold text-lg">Prefer to Talk?</h2>
              <a
                href="tel:+18887876624"
                className="flex items-center gap-3 group theme-body hover:text-[var(--text-strong)] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--brand-cyan-text)] bg-[var(--brand-cyan-bg)] border border-[var(--brand-cyan-border)] group-hover:bg-[var(--surface-soft)] transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">(888) 787-6624</p>
                  <p className="theme-subtle text-xs">Talk through your workflow with the team</p>
                </div>
              </a>
              <a
                href="mailto:info@uponai.com"
                className="flex items-center gap-3 group theme-body hover:text-[var(--text-strong)] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--brand-cyan-text)] bg-[var(--brand-cyan-bg)] border border-[var(--brand-cyan-border)] group-hover:bg-[var(--surface-soft)] transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">info@uponai.com</p>
                  <p className="theme-subtle text-xs">Reply within 1 business day</p>
                </div>
              </a>
            </div>

            <div className="theme-panel rounded-xl p-5 text-center">
              <p className="theme-body text-sm mb-3">Have a different question?</p>
              <Link href="/contact" className="theme-secondary-button inline-block font-medium px-5 py-2.5 rounded-xl text-sm">
                Go to Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
