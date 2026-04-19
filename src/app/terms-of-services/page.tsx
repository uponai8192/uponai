import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | MyVoIP',
  description: 'MyVoIP Terms of Service — service agreement, pricing, SMS/text messaging policy, and A2P 10DLC compliance disclosures.',
  alternates: { canonical: 'https://my-voip.com/terms-of-services' },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-700">{title}</h2>
      <div className="space-y-4 text-slate-300 leading-relaxed text-sm">{children}</div>
    </section>
  );
}

function SubSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-white font-semibold mb-2">{num} {title}</h3>
      <div className="text-slate-400 leading-relaxed text-sm space-y-2">{children}</div>
    </div>
  );
}

export default function TermsOfServicePage() {
  const sections = [
    { id: 'general', label: '1. General' },
    { id: 'term', label: '2. Term' },
    { id: 'etf', label: '3. Early Termination Fee' },
    { id: 'voip-services', label: '4. VoIP Services' },
    { id: 'sms-policy', label: '5. SMS & Text Messaging Policy' },
  ];

  return (
    <>
      {/* Header */}
      <section className="py-16 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-5 flex items-center gap-1 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Terms of Service</span>
          </nav>
          <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-slate-400">Last updated: January 1, 2025 &nbsp;·&nbsp; MyVoIP (MYVOIP LLC)</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Sticky TOC */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <p className="text-white font-semibold text-sm mb-3">Contents</p>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-slate-400 hover:text-white text-xs transition-colors block">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-700">
              <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 text-xs block mb-2">Privacy Policy →</Link>
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 text-xs block">Contact Us →</Link>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3">

          <Section id="general" title="1. General">
            <SubSection num="1.1" title="Service Agreement">
              <p>
                This Service Agreement (this &quot;Agreement&quot;) sets forth the terms and conditions pursuant to which you
                will receive services from MyVoIP. This Agreement is by and between MYVOIP LLC on behalf of itself and
                its operating affiliates that provide the MyVoIP Services subject to this Agreement to you
                (&quot;MyVoIP&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), and &quot;You&quot;, the
                accountholder to whom the MyVoIP Services (defined below) are provided.
              </p>
            </SubSection>

            <SubSection num="1.2" title="Protected Retail Rates">
              <p>
                During the Term and subject to Section 1.3 below, MyVoIP will not charge you more than
                MyVoIP&apos;s published regular month-to-month, non-promotional rates, also called the retail rate, in
                effect for your local franchise service area as of the first day of the Term of this Agreement (the
                &quot;Protected Retail Rate(s)&quot;) for the MyVoIP Services you ordered and/or subscribed to in
                response to an offer from MyVoIP.
              </p>
              <p>
                The specific MyVoIP Services included in your account and covered by this Agreement will be
                designated on your monthly billing statement during the Term. You agree to carefully review the first
                billing statement you receive after acceptance of this Agreement and to bring any discrepancies to
                MyVoIP&apos;s attention within thirty (30) days of the Term or seven (7) days after receipt of your
                first bill, whichever is later. If you do not timely object, you waive the right to do so.
              </p>
            </SubSection>

            <SubSection num="1.3" title="Rates, Fees, Charges, and Services Not Price Protected">
              <p>The price protection provided by this Agreement does not apply to the following:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>One-time charges, including installation and activation/reactivation fees</li>
                <li>Usage-based charges, pay-per-use fees, and overage charges</li>
                <li>Applicable federal, state, and local taxes, franchise fees, and other government-mandated fees</li>
                <li>MyVoIP or third-party imposed surcharges and regulatory cost recovery fees</li>
                <li>Fees for services added after you enter into this Agreement</li>
                <li>Any fee or charge not expressly within the scope of the MyVoIP Services</li>
              </ul>
            </SubSection>

            <SubSection num="1.4" title="Promotional Discount Offers and Rates Are Not Price Protected">
              <p>
                If you qualified for and received a short-term promotional discount off of any Protected Retail Rate
                (&quot;Promotional Discount&quot;), your rates will revert to the Protected Retail Rate(s) after the
                stated Promotional Discount period ends for the remainder of the Term.
              </p>
            </SubSection>

            <SubSection num="1.5" title="Special Rebate and Incentive Offers">
              <p>
                If you accepted an offer that included a special rebate or incentive, you must maintain the MyVoIP
                Services covered under this Agreement at the service address of record for at least the first thirty
                (30) days of the Term to qualify. You must satisfy all stated eligibility requirements and follow all
                stated instructions for claiming a rebate or incentive. Please allow ten (10) to twelve (12) weeks after
                MyVoIP receives your qualifying submission.
              </p>
              <p>
                Except as required by law, rebate checks not deposited within 180 days after issuance will be
                non-negotiable, forfeited, and invalid. MyVoIP will not replace or reissue any check, prepaid reward
                card, or other incentive if lost, stolen, or damaged. Unless otherwise prohibited by applicable law,
                all rebate and incentive offers are limited to one (1) per MyVoIP account and per household.
              </p>
            </SubSection>

            <SubSection num="1.6" title="Acceptance of Agreement">
              <p>You accept this Agreement when you first do one of the following:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Orally confirm your acceptance to MyVoIP or its agent</li>
                <li>Activate any MyVoIP Service covered under this Agreement</li>
                <li>Use or pay for any MyVoIP Service covered under this Agreement</li>
                <li>Agree to this Agreement electronically or physically</li>
              </ul>
            </SubSection>
          </Section>

          <Section id="term" title="2. Term">
            <p>
              Unless otherwise specified in your service order, this Agreement is for a term of twenty-four (24)
              months beginning on the earlier of the Acceptance Date or the Offer date (the &quot;Term&quot;). After
              the initial Term, your service will continue on a month-to-month basis unless you notify MyVoIP of
              your intent to terminate in accordance with the terms herein.
            </p>
          </Section>

          <Section id="etf" title="3. Early Termination Fee">
            <p className="uppercase font-medium text-slate-200">
              Except as otherwise provided herein, you agree to pay the applicable Early Termination Fee
              (&quot;ETF&quot;) in the event that any one or all of the following MyVoIP Services you subscribe to
              (&quot;Core MyVoIP Services&quot;) are disconnected for any reason before the expiration of the Term.
            </p>
            <p>
              The ETF will be reduced by the amount the customer has already paid on their service agreement.
              Customer will be responsible for all charges due to MyVoIP that remain on the contract.
            </p>
            <p>
              You may terminate this Agreement by (i) calling MyVoIP Customer Care at{' '}
              <a href="tel:+18336986471" className="text-blue-400 hover:text-blue-300">(833) 698-6471</a>, or (ii)
              disconnecting any of your Core MyVoIP Services at any time during the Term, subject to payment of the
              applicable ETF and all other accrued charges.
            </p>
            <p>
              If MyVoIP disconnects any or all of your Core MyVoIP Services due to nonpayment, you will be deemed
              to have terminated this Agreement and will be charged the ETF.
            </p>
          </Section>

          <Section id="voip-services" title="4. MyVoIP VoIP Services">
            <p className="uppercase font-medium text-slate-200">
              You may upgrade or downgrade service within a Core MyVoIP Service category without incurring an ETF.
              However, the Protected Retail Rate(s) for the new tier/package will be MyVoIP&apos;s published regular
              month-to-month, non-promotional rate(s) in effect as of the date you instructed MyVoIP to change your
              services.
            </p>
            <p>
              MyVoIP reserves the right to modify, suspend, or discontinue any service (or any part thereof) at any
              time, with or without notice. MyVoIP shall not be liable to you or any third party for any modification,
              suspension, or discontinuation of services.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities that occur under your account. You agree to immediately notify MyVoIP of any unauthorized
              use of your account.
            </p>
          </Section>

          {/* SMS POLICY — A2P 10DLC Compliant */}
          <Section id="sms-policy" title="5. SMS & Text Messaging Policy">
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4 mb-5">
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">A2P 10DLC Compliance</p>
              <p className="text-slate-300 text-sm">
                This section governs all SMS and text message communications sent by MyVoIP (MYVOIP LLC) to customers
                and prospects who have opted in to receive such communications.
              </p>
            </div>

            <SubSection num="5.1" title="Consent to Receive SMS Messages">
              <p>
                By providing your mobile phone number and checking the SMS consent checkbox on our contact form or
                any other opt-in mechanism, you expressly consent to receive SMS text messages and/or calls from
                MyVoIP (MYVOIP LLC) at the phone number you provided. Your consent is not required as a condition
                of purchasing any goods or services.
              </p>
            </SubSection>

            <SubSection num="5.2" title="Types of Messages">
              <p>By opting in, you may receive the following types of SMS messages from MyVoIP:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Service quotes and pricing information</li>
                <li>Account notifications and service updates</li>
                <li>Appointment reminders and confirmations</li>
                <li>Promotional offers and announcements</li>
                <li>Support communications and follow-ups</li>
              </ul>
            </SubSection>

            <SubSection num="5.3" title="Message Frequency">
              <p>
                Message frequency varies. You may receive up to several messages per month depending on your
                account activity and opt-in preferences. MyVoIP does not guarantee any specific message frequency.
              </p>
            </SubSection>

            <SubSection num="5.4" title="Message and Data Rates">
              <p>
                Standard message and data rates may apply. These charges are assessed by your mobile carrier and
                are not billed by MyVoIP. Check with your mobile carrier for details about your SMS plan.
              </p>
            </SubSection>

            <SubSection num="5.5" title="How to Opt Out (STOP)">
              <p>
                You may opt out of receiving SMS messages from MyVoIP at any time by replying{' '}
                <strong className="text-white">STOP</strong> to any text message you receive from us. After
                sending STOP, you will receive a single confirmation message acknowledging your opt-out request,
                and no further SMS messages will be sent to that number unless you re-opt in.
              </p>
            </SubSection>

            <SubSection num="5.6" title="How to Get Help (HELP)">
              <p>
                For assistance with SMS messages from MyVoIP, reply <strong className="text-white">HELP</strong> to
                any text message. You may also contact us directly:
              </p>
              <ul className="list-none space-y-1 ml-2">
                <li>📞 <a href="tel:+18336986471" className="text-blue-400 hover:text-blue-300">(833) 698-6471</a></li>
                <li>✉️ <a href="mailto:Sales@my-voip.com" className="text-blue-400 hover:text-blue-300">Sales@my-voip.com</a></li>
                <li>🌐 <Link href="/contact" className="text-blue-400 hover:text-blue-300">my-voip.com/contact</Link></li>
              </ul>
            </SubSection>

            <SubSection num="5.7" title="Privacy of SMS Data">
              <p>
                MyVoIP will not share, sell, or rent your mobile phone number or SMS opt-in data to third parties
                for marketing purposes without your express consent. Your information is used solely to provide you
                with the communications you have requested. Please review our{' '}
                <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>{' '}
                for full details on how we handle your data.
              </p>
            </SubSection>

            <SubSection num="5.8" title="Carrier Disclaimer">
              <p>
                MyVoIP is not liable for delayed or undelivered messages. Carriers are not liable for delayed or
                undelivered messages. Message delivery is subject to network availability and your mobile
                carrier&apos;s terms of service.
              </p>
            </SubSection>

            {/* Required disclosure block */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 mt-4">
              <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">Required A2P 10DLC Disclosures</p>
              <div className="text-slate-400 text-xs space-y-1.5">
                <p>✉️ <strong className="text-slate-300">Program:</strong> MyVoIP customer communications (quotes, updates, promotions)</p>
                <p>📱 <strong className="text-slate-300">Message Frequency:</strong> Varies — up to several messages per month</p>
                <p>💰 <strong className="text-slate-300">Rates:</strong> Standard message and data rates may apply</p>
                <p>🛑 <strong className="text-slate-300">To Opt Out:</strong> Reply STOP to any message</p>
                <p>❓ <strong className="text-slate-300">For Help:</strong> Reply HELP or call (833) 698-6471</p>
                <p>🔒 <strong className="text-slate-300">No Third-Party Sharing:</strong> We do not sell or share SMS opt-in data</p>
                <p>
                  📋 <strong className="text-slate-300">Policies:</strong>{' '}
                  <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
                  {' '}&nbsp;·&nbsp;{' '}
                  <Link href="/terms-of-services" className="text-blue-400 hover:text-blue-300">Terms of Service</Link>
                </p>
              </div>
            </div>
          </Section>

          {/* Footer note */}
          <div className="mt-10 pt-8 border-t border-slate-700 text-slate-500 text-xs space-y-2">
            <p><strong className="text-slate-400">MYVOIP LLC</strong></p>
            <p>281 US-46 West, Elmwood Park, NJ 07407</p>
            <p>
              <a href="tel:+18336986471" className="hover:text-slate-300">(833) 698-6471</a>
              {' '}&nbsp;·&nbsp;{' '}
              <a href="mailto:Sales@my-voip.com" className="hover:text-slate-300">Sales@my-voip.com</a>
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
