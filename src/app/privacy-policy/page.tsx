import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'How UponAI collects, uses, protects, and communicates about your information, including form submissions and SMS consent data.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-16 px-4 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-5 flex items-center gap-1 text-sm theme-soft">
            <Link href="/" className="theme-link-muted">Home</Link>
            <span className="theme-subtle">/</span>
            <span className="theme-heading">Privacy Policy</span>
          </nav>
          <h1 className="theme-heading text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="theme-soft">Last updated: April 19, 2026 &nbsp;·&nbsp; UponAI</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 text-sm leading-relaxed space-y-8 theme-body">
        <div className="theme-panel rounded-xl p-5">
          <p className="text-[var(--brand-accent-text)] font-semibold mb-1">Your Privacy Matters</p>
          <p>
            UponAI is committed to protecting the information you share with us. This page explains what we collect,
            how we use it, and the choices you have when you visit our site, request a demo, download a resource, or
            communicate with our team.
          </p>
        </div>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">1. Information We Collect</h2>
          <p className="mb-3">Depending on how you interact with UponAI, we may collect:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong className="theme-heading">Contact details:</strong> Name, email address, phone number, company name, and any information you provide in a form or message.</li>
            <li><strong className="theme-heading">Workflow and project details:</strong> Seat counts, routing needs, AI coverage goals, and other implementation information you choose to share.</li>
            <li><strong className="theme-heading">Technical usage data:</strong> Device, browser, IP address, pages visited, referral source, and high-level interaction data used to operate and improve the site.</li>
            <li><strong className="theme-heading">Communication records:</strong> Emails, calls, form submissions, and support or sales conversations with our team.</li>
          </ul>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">2. How We Use Information</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Respond to demo requests, contact inquiries, and support questions.</li>
            <li>Recommend relevant AI voice, chatbot, routing, or communications solutions.</li>
            <li>Operate, secure, and improve our website, services, and internal processes.</li>
            <li>Send service-related communications, requested content, or marketing updates when permitted.</li>
            <li>Maintain records, prevent misuse, and comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">3. SMS &amp; Text Messaging</h2>
          <div className="theme-card rounded-xl p-5 space-y-3">
            <p>
              If you opt in to receive SMS communications from UponAI, we use your mobile number only for the
              categories of communication you agreed to receive, such as consultation follow-ups, scheduling,
              support communication, or requested updates.
            </p>
            <p>
              <strong className="theme-heading">We do not sell, share, or rent your mobile number or SMS opt-in data to third parties for their own marketing use.</strong>
            </p>
            <p>
              To opt out, reply <strong className="theme-heading">STOP</strong> to any text message. For help,
              reply <strong className="theme-heading">HELP</strong> or contact us at{' '}
              <a href="tel:+18887876624" className="text-blue-400 hover:text-blue-300">(888) 787-6624</a>.
            </p>
            <p>
              Message frequency varies. Standard message and data rates may apply. See our full{' '}
              <Link href="/terms-of-services#sms-policy" className="text-blue-400 hover:text-blue-300">
                SMS Policy in our Terms of Service
              </Link>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">4. Sharing Your Information</h2>
          <p className="mb-3">We do not sell your personal information. We may share information only as needed to operate the business:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong className="theme-heading">Service providers:</strong> Hosting, CRM, scheduling, analytics, email, and similar vendors who help us operate the site and our services.</li>
            <li><strong className="theme-heading">Legal requirements:</strong> When disclosure is required by law, regulation, subpoena, or valid legal process.</li>
            <li><strong className="theme-heading">Business changes:</strong> In connection with a merger, acquisition, financing, or asset transfer.</li>
            <li><strong className="theme-heading">With your permission:</strong> In any situation where you explicitly authorize us to do so.</li>
          </ul>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">5. Cookies, Analytics, and Tracking</h2>
          <p>
            We use cookies and related technologies to understand site usage, improve performance, remember
            preferences, and measure the effectiveness of our communications. You can control cookies through your
            browser settings, though some site functionality may be affected if cookies are disabled.
          </p>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">6. Data Security and Retention</h2>
          <p>
            We use reasonable administrative, technical, and organizational safeguards to protect information from
            unauthorized access, misuse, alteration, or loss. No security measure is perfect, and no online
            transmission can be guaranteed to be fully secure. We keep data only for as long as needed for the
            purposes described in this policy, unless a longer retention period is required by law or legitimate
            business need.
          </p>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">7. Your Choices</h2>
          <p className="mb-3">Depending on your location and circumstances, you may be able to:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Request access to, correction of, or deletion of your personal information.</li>
            <li>Opt out of marketing emails or SMS communications at any time.</li>
            <li>Ask us to stop using certain information where applicable.</li>
          </ul>
          <p className="mt-3">
            To make a request, contact us at{' '}
            <a href="mailto:info@uponai.com" className="text-blue-400 hover:text-blue-300">info@uponai.com</a>{' '}
            or call <a href="tel:+18887876624" className="text-blue-400 hover:text-blue-300">(888) 787-6624</a>.
          </p>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">8. Children&apos;s Privacy</h2>
          <p>
            Our website and services are intended for business use and are not directed to children. We do not
            knowingly collect personal information from children. If you believe that a child has provided
            information to us, contact us and we will take reasonable steps to delete it.
          </p>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the effective date at
            the top of the page. Continued use of the site after changes become effective means you accept the
            updated policy.
          </p>
        </section>

        <section>
          <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">10. Contact Us</h2>
          <div className="theme-card rounded-xl p-5 space-y-1 text-sm">
            <p className="theme-heading font-semibold mb-2">UponAI</p>
            <p>711 Moorefield Park Drive, Suite A, North Chesterfield, Virginia, 23236</p>
            <p><a href="tel:+18887876624" className="text-blue-400 hover:text-blue-300">(888) 787-6624</a></p>
            <p><a href="mailto:info@uponai.com" className="text-blue-400 hover:text-blue-300">info@uponai.com</a></p>
            <p className="pt-2">
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact form →</Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
