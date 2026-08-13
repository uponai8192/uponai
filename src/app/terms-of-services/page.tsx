import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { getLegalPage } from '@/lib/cms/legal';
import LegalPageView from '@/components/content/LegalPageView';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Service',
  description:
    'Terms governing use of the UponAI website, communications, and related services, including SMS consent and acceptable use.',
  path: '/terms-of-services',
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">{title}</h2>
      <div className="space-y-4 theme-body leading-relaxed text-sm">{children}</div>
    </section>
  );
}

function SubSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="theme-heading font-semibold mb-2">{num} {title}</h3>
      <div className="theme-soft leading-relaxed text-sm space-y-2">{children}</div>
    </div>
  );
}

// Hand-written original, still rendered when the CMS has no document for
// this page. Delete once the CMS copy is confirmed correct in production.
function TermsOfServicePageFallback() {
  const sections = [
    { id: 'acceptance', label: '1. Acceptance' },
    { id: 'use-of-site', label: '2. Use of Site' },
    { id: 'submissions', label: '3. Submissions & Accounts' },
    { id: 'services', label: '4. Services & Availability' },
    { id: 'sms-policy', label: '5. SMS & Text Messaging' },
    { id: 'third-parties', label: '6. Third-Party Links' },
    { id: 'liability', label: '7. Warranties & Liability' },
    { id: 'contact', label: '8. Contact' },
  ];

  return (
    <>
      <section className="py-16 px-4 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-5 flex items-center gap-1 text-sm theme-soft">
            <Link href="/" className="theme-link-muted">Home</Link>
            <span className="theme-subtle">/</span>
            <span className="theme-heading">Terms of Service</span>
          </nav>
          <h1 className="theme-heading text-4xl font-bold mb-3">Terms of Service</h1>
          <p className="theme-soft">Last updated: April 19, 2026 &nbsp;·&nbsp; UponAI</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="lg:col-span-1">
          <div className="theme-card sticky top-24 rounded-xl p-5">
            <p className="theme-heading font-semibold text-sm mb-3">Contents</p>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="theme-link-muted text-xs transition-colors block">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-[var(--border)]">
              <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 text-xs block mb-2">Privacy Policy →</Link>
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 text-xs block">Contact Us →</Link>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <Section id="acceptance" title="1. Acceptance">
            <SubSection num="1.1" title="Agreement to These Terms">
              <p>
                These Terms of Service govern your use of the UponAI website, forms, content, and related services.
                By accessing the site, submitting information, requesting a demo, or otherwise engaging with us
                through this website, you agree to these terms and our Privacy Policy.
              </p>
            </SubSection>
            <SubSection num="1.2" title="Updates">
              <p>
                We may update these terms from time to time. When we do, we will update the effective date on this
                page. Your continued use of the site after any update means you accept the revised terms.
              </p>
            </SubSection>
          </Section>

          <Section id="use-of-site" title="2. Use of Site">
            <SubSection num="2.1" title="Permitted Use">
              <p>
                You may use the site to learn about UponAI, request information, download resources, and communicate
                with our team for legitimate business purposes.
              </p>
            </SubSection>
            <SubSection num="2.2" title="Prohibited Conduct">
              <p>You agree not to misuse the site or any related services. This includes, without limitation:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Submitting false, misleading, or unlawful information.</li>
                <li>Attempting to interfere with the site, infrastructure, or security controls.</li>
                <li>Using the site to send spam, abusive messages, or unauthorized communications.</li>
                <li>Scraping, copying, or redistributing site content except as allowed by law or with written permission.</li>
                <li>Using UponAI systems in a way that violates applicable law or third-party rights.</li>
              </ul>
            </SubSection>
          </Section>

          <Section id="submissions" title="3. Submissions & Accounts">
            <p>
              Any information you submit through a form, message, or email must be accurate to the best of your
              knowledge. You are responsible for any credentials or access we may provide to you in connection with
              pilots, demos, portals, or related services.
            </p>
            <p>
              If you provide feedback, suggestions, or ideas about the site or our services, you agree that UponAI
              may use that feedback without restriction or compensation, subject to applicable law.
            </p>
          </Section>

          <Section id="services" title="4. Services & Availability">
            <p>
              Information on this site is provided for general informational purposes and may change without notice.
              Availability of products, features, integrations, pricing, pilots, and custom implementations depends on
              project scope, technical requirements, and any separate agreement between you and UponAI.
            </p>
            <p>
              UponAI may modify, suspend, or discontinue any part of the site or services at any time. Separate
              statements of work, service agreements, or order forms control the commercial terms of any paid
              engagement.
            </p>
          </Section>

          <Section id="sms-policy" title="5. SMS & Text Messaging Policy">
            <div className="theme-card rounded-xl p-4 mb-5">
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">A2P 10DLC Compliance</p>
              <p className="theme-body text-sm">
                This section governs SMS communications sent by UponAI to prospects or customers who have opted in to
                receive those communications.
              </p>
            </div>

            <SubSection num="5.1" title="Consent to Receive SMS Messages">
              <p>
                By providing your mobile phone number and checking the SMS consent checkbox on our contact form or
                any other opt-in mechanism, you expressly consent to receive SMS text messages and/or calls from
                UponAI at the phone number you provided. Your consent is not required as a condition of purchasing
                any goods or services.
              </p>
            </SubSection>

            <SubSection num="5.2" title="Types of Messages">
              <p>By opting in, you may receive the following categories of messages from UponAI:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Consultation scheduling and follow-up</li>
                <li>Support communications and service updates</li>
                <li>Appointment reminders and confirmations</li>
                <li>Occasional marketing or event announcements</li>
              </ul>
            </SubSection>

            <SubSection num="5.3" title="Message Frequency">
              <p>
                Message frequency varies. You may receive up to several messages per month depending on your activity
                and opt-in preferences. UponAI does not guarantee any specific message frequency.
              </p>
            </SubSection>

            <SubSection num="5.4" title="Message and Data Rates">
              <p>
                Standard message and data rates may apply. These charges are assessed by your mobile carrier and are
                not billed by UponAI. Check with your mobile carrier for details about your SMS plan.
              </p>
            </SubSection>

            <SubSection num="5.5" title="How to Opt Out (STOP)">
              <p>
                You may opt out of receiving SMS messages from UponAI at any time by replying{' '}
                <strong className="theme-heading">STOP</strong> to any text message you receive from us. After
                sending STOP, you will receive a single confirmation message acknowledging your opt-out request,
                and no further SMS messages will be sent to that number unless you re-opt in.
              </p>
            </SubSection>

            <SubSection num="5.6" title="How to Get Help (HELP)">
              <p>
                For assistance with SMS messages from UponAI, reply <strong className="theme-heading">HELP</strong> to
                any text message. You may also contact us directly:
              </p>
              <ul className="list-none space-y-1 ml-2">
                <li>📞 <a href="tel:+18887876624" className="text-blue-400 hover:text-blue-300">(888) 787-6624</a></li>
                <li>✉️ <a href="mailto:info@uponai.com" className="text-blue-400 hover:text-blue-300">info@uponai.com</a></li>
                <li>🌐 <Link href="/contact" className="text-blue-400 hover:text-blue-300">uponai.com/contact</Link></li>
              </ul>
            </SubSection>

            <SubSection num="5.7" title="Privacy of SMS Data">
              <p>
                UponAI will not share, sell, or rent your mobile phone number or SMS opt-in data to third parties
                for marketing purposes without your express consent. Your information is used solely to provide you
                with the communications you have requested. Please review our{' '}
                <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>{' '}
                for full details on how we handle your data.
              </p>
            </SubSection>

            <SubSection num="5.8" title="Carrier Disclaimer">
              <p>
                UponAI is not liable for delayed or undelivered messages. Carriers are not liable for delayed or
                undelivered messages. Message delivery is subject to network availability and your mobile carrier&apos;s
                terms of service.
              </p>
            </SubSection>

            <div className="theme-card rounded-xl p-5 mt-4">
              <p className="theme-body text-xs font-semibold uppercase tracking-wider mb-3">Required A2P 10DLC Disclosures</p>
              <div className="theme-soft text-xs space-y-1.5">
                <p>✉️ <strong className="theme-body">Program:</strong> UponAI customer communications, scheduling, updates, and promotions</p>
                <p>📱 <strong className="theme-body">Message Frequency:</strong> Varies - up to several messages per month</p>
                <p>💰 <strong className="theme-body">Rates:</strong> Standard message and data rates may apply</p>
                <p>🛑 <strong className="theme-body">To Opt Out:</strong> Reply STOP to any message</p>
                <p>❓ <strong className="theme-body">For Help:</strong> Reply HELP or call (888) 787-6624</p>
                <p>🔒 <strong className="theme-body">No Third-Party Sharing:</strong> We do not sell or share SMS opt-in data</p>
                <p>
                  📋 <strong className="theme-body">Policies:</strong>{' '}
                  <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
                  {' '}&nbsp;·&nbsp;{' '}
                  <Link href="/terms-of-services" className="text-blue-400 hover:text-blue-300">Terms of Service</Link>
                </p>
              </div>
            </div>
          </Section>

          <Section id="third-parties" title="6. Third-Party Links">
            <p>
              The site may contain links to external websites, applications, or services. Those third-party
              properties are governed by their own terms and privacy policies, and UponAI is not responsible for
              their content or practices.
            </p>
          </Section>

          <Section id="liability" title="7. Warranties & Liability">
            <p>
              The site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis. To
              the maximum extent permitted by law, UponAI disclaims warranties of merchantability, fitness for a
              particular purpose, non-infringement, and uninterrupted availability.
            </p>
            <p>
              UponAI will not be liable for indirect, incidental, special, consequential, or punitive damages arising
              out of or related to your use of the site. Any direct liability will be limited to the maximum extent
              permitted by applicable law.
            </p>
          </Section>

          <Section id="contact" title="8. Contact">
            <p>
              Questions about these terms or your use of the site can be directed to the UponAI team using the
              details below.
            </p>
          </Section>

          <div className="mt-10 pt-8 border-t border-[var(--border)] theme-subtle text-xs space-y-2">
            <p><strong className="theme-soft">UponAI</strong></p>
            <p>711 Moorefield Park Drive, Suite A, North Chesterfield, Virginia, 23236</p>
            <p>
              <a href="tel:+18887876624" className="hover:text-slate-300">(888) 787-6624</a>
              {' '}&nbsp;·&nbsp;{' '}
              <a href="mailto:info@uponai.com" className="hover:text-slate-300">info@uponai.com</a>
            </p>
            <p className="pt-2">
              Questions about these terms?{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact us</Link>.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default async function TermsOfServicePage() {
  const page = await getLegalPage('terms-of-services');
  if (page) return <LegalPageView page={page} />;
  return <TermsOfServicePageFallback />;
}
