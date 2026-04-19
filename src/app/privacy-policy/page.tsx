import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | MyVoIP',
  description: 'MyVoIP Privacy Policy — how we collect, use, and protect your personal information, including SMS opt-in data.',
  alternates: { canonical: 'https://my-voip.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-16 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-5 flex items-center gap-1 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: January 1, 2025 &nbsp;·&nbsp; MYVOIP LLC</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 text-slate-300 text-sm leading-relaxed space-y-8">

        <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5">
          <p className="text-blue-300 font-semibold mb-1">Your Privacy Matters</p>
          <p>
            MYVOIP LLC (&quot;MyVoIP&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            data when you use our website, services, or communicate with us.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">1. Information We Collect</h2>
          <p className="mb-3">We may collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number, company name, and mailing address</li>
            <li><strong className="text-white">Account Information:</strong> Username, password, billing details, and service preferences</li>
            <li><strong className="text-white">Usage Data:</strong> Call logs, message records, and feature usage within our platform</li>
            <li><strong className="text-white">Device & Technical Data:</strong> IP address, browser type, operating system, and referring URLs</li>
            <li><strong className="text-white">Communications:</strong> Records of calls, emails, and chat conversations with our support team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Provide, operate, and maintain our VoIP services</li>
            <li>Process transactions and send related information (invoices, confirmations)</li>
            <li>Respond to inquiries, provide customer support, and resolve disputes</li>
            <li>Send service updates, security alerts, and administrative messages</li>
            <li>Send marketing communications (with your consent, and you may opt out at any time)</li>
            <li>Analyze usage to improve our services and develop new features</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">3. SMS & Text Messaging</h2>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-3">
            <p>
              If you opt in to receive SMS messages from MyVoIP, we will use your mobile number solely to send
              the types of communications you consented to receive (quotes, service updates, support follow-ups,
              and promotional offers).
            </p>
            <p>
              <strong className="text-white">We do not sell, share, or rent your mobile phone number or SMS opt-in
              data to any third parties for their own marketing purposes.</strong>
            </p>
            <p>
              To opt out at any time, reply <strong className="text-white">STOP</strong> to any SMS message.
              For help, reply <strong className="text-white">HELP</strong> or contact us at{' '}
              <a href="tel:+18336986471" className="text-blue-400 hover:text-blue-300">(833) 698-6471</a>.
            </p>
            <p>
              Message frequency varies. Standard message and data rates may apply.
              See our full{' '}
              <Link href="/terms-of-services#sms-policy" className="text-blue-400 hover:text-blue-300">
                SMS Policy in our Terms of Service
              </Link>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">4. Sharing Your Information</h2>
          <p className="mb-3">We do not sell your personal information. We may share your data only in these limited circumstances:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong className="text-white">Service Providers:</strong> Trusted vendors who assist in operating our business (billing, hosting, CRM), bound by confidentiality agreements</li>
            <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
            <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong className="text-white">With Your Consent:</strong> For any other purpose with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information from unauthorized access,
            alteration, disclosure, or destruction. These include SSL/TLS encryption, secure data centers, and
            access controls. However, no method of transmission over the internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">6. Cookies & Tracking</h2>
          <p>
            Our website uses cookies and similar tracking technologies to enhance your experience, analyze traffic,
            and understand where our visitors come from. You can control cookie settings through your browser.
            Disabling cookies may affect certain functionality of our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">7. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Access, correct, or delete your personal information</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Request a copy of data we hold about you</li>
            <li>Lodge a complaint with a data protection authority (where applicable)</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, contact us at{' '}
            <a href="mailto:Sales@my-voip.com" className="text-blue-400 hover:text-blue-300">Sales@my-voip.com</a>{' '}
            or call <a href="tel:+18336986471" className="text-blue-400 hover:text-blue-300">(833) 698-6471</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">8. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal
            information from children. If you believe a child has provided us with personal information, please
            contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by
            posting the new policy on this page with an updated &quot;Last updated&quot; date. We encourage you
            to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">10. Contact Us</h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-1 text-sm">
            <p className="text-white font-semibold mb-2">MYVOIP LLC</p>
            <p>281 US-46 West, Elmwood Park, NJ 07407</p>
            <p><a href="tel:+18336986471" className="text-blue-400 hover:text-blue-300">(833) 698-6471</a></p>
            <p><a href="mailto:Sales@my-voip.com" className="text-blue-400 hover:text-blue-300">Sales@my-voip.com</a></p>
            <p className="pt-2">
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact form →</Link>
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
