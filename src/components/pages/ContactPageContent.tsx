import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/sections/ContactForm';
import { uponaiBookingUrl } from '@/lib/booking';
import { brandPhotos } from '@/lib/brand-photos';
import { buildBreadcrumbSchema, buildContactPageSchema } from '@/lib/seo';

export default function ContactPageContent() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact-us-page' },
  ]);
  const contactSchema = buildContactPageSchema({
    name: 'Contact UponAI',
    description:
      'Contact UponAI for AI voice agents, AI chatbots, automation, communications workflow planning, and implementation questions.',
    path: '/contact-us-page',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="theme-pill-primary inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">We reply within 1 business day</span>
          </div>
          <h1 className="theme-heading text-4xl md:text-5xl font-bold mb-4">Get In Touch With Us</h1>
          <p className="theme-soft text-xl max-w-2xl mx-auto">
            Questions about AI voice, AI chat, automation, or communications strategy? We&apos;re here to help.
          </p>
          <div className="theme-pill-accent mt-6 inline-flex items-center gap-3 rounded-xl px-5 py-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">
              Need a tailored walkthrough? Tell us what you want to automate and we&apos;ll point you to the right solution.
            </span>
          </div>

          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button rounded-2xl px-6 py-4 text-center text-base font-semibold"
            >
              Book In HighLevel
            </a>
            <a
              href="#contact-form"
              className="theme-secondary-button rounded-2xl px-6 py-4 text-center text-base font-semibold"
            >
              Send A Message
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div id="contact-form" className="lg:col-span-3 scroll-mt-36">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="theme-panel rounded-2xl p-6">
              <h2 className="theme-heading font-bold text-xl">Talk To The Right Team</h2>
              <p className="theme-body mt-3 text-sm leading-7">
                Use the form for implementation questions, partnerships, support, or general inquiries. If you already
                know you want to book time, jump straight into HighLevel and choose a slot.
              </p>
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-primary-button mt-5 inline-block rounded-xl px-5 py-3 text-sm font-semibold"
              >
                Open HighLevel Booking
              </a>
            </div>

            <h2 className="theme-heading font-bold text-xl">Contact Information</h2>

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
                label: 'Address',
                value: '711 Moorefield Park Drive, Suite A, North Chesterfield, Virginia, 23236',
                href: 'https://www.google.com/maps?q=711+Moorefield+Park+Drive,+Suite+A,+North+Chesterfield,+Virginia,+23236',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.label} className="theme-card flex items-start gap-4 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--brand-accent-text)] bg-[var(--brand-accent-bg)] border border-[var(--brand-accent-border)] flex-shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="theme-subtle text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <a href={item.href} className="theme-heading break-words font-medium hover:text-[var(--brand)] transition-colors">
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
              <Image
                src={brandPhotos.analyticsWorld}
                alt="UponAI communications analytics and automation concept"
                width={500}
                height={340}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>

            <div>
              <h3 className="theme-heading font-semibold text-sm mb-3">Other Office Locations</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Montreal, QB', 'New York, NY', 'Vancouver, BC', 'Toronto, ON', 'Atlanta, GA', 'Houston, TX', 'West Palm Beach, FL', 'Allentown, PA', 'San Francisco, CA', 'Chicago, IL', 'Ottawa, ON'].map(
                  (loc) => (
                    <div key={loc} className="theme-card-soft rounded-lg px-3 py-2 text-sm theme-body">
                      {loc}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="theme-panel rounded-xl p-5">
              <h3 className="theme-heading font-semibold mb-2">Response Time</h3>
              <p className="theme-body text-sm">Typically within 1 business day</p>
              <p className="theme-soft text-sm mt-1">
                We&apos;ll route your request to the right team for demos, partnerships, support, or implementation planning.
              </p>
            </div>

            <div className="text-xs theme-subtle space-y-2 pt-2 border-t border-[var(--border)]">
              <p className="font-medium theme-soft">Legal</p>
              <div className="flex gap-4">
                <Link href="/privacy-policy" className="theme-link-muted">Privacy Policy</Link>
                <Link href="/terms-of-services" className="theme-link-muted">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
