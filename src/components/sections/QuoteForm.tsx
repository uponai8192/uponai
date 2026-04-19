'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INPUT =
  'w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors';
const LABEL = 'block text-slate-300 text-sm font-medium mb-1.5';
const REQ = <span className="text-blue-400">*</span>;

const SEAT_OPTIONS = ['1–5', '6–15', '16–30', '31–50', '51–100', '101–250', '250+'];

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            value === opt
              ? 'border-blue-500 bg-blue-600/20 text-blue-300'
              : 'border-slate-600 bg-slate-900/40 text-slate-400 hover:border-slate-500 hover:text-slate-200'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="sr-only"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);

  const [form, setForm] = useState({
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    seats: '',
    deskPhones: '',
    deskPhonesQty: '',
    mobileUsers: '',
    mobileUsersQty: '',
    aiReceptionist: '',
    callRecording: '',
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'quote', ...form, smsConsent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Quote Request Received!</h3>
        <p className="text-slate-300 leading-relaxed mb-2">
          Thanks, {form.firstName}! One of our specialists will reach out within one business day with a custom quote.
        </p>
        <p className="text-slate-400 text-sm">
          Need it faster?{' '}
          <a href="tel:+18336986471" className="text-blue-400 hover:text-blue-300 font-medium">
            Call (833) 698-6471
          </a>{' '}
          — available 24/7.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-slate-700 bg-gradient-to-r from-blue-600/10 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Responding within 1 business day</span>
        </div>
        <h2 className="text-xl font-bold text-white">Get Your Custom VoIP Quote</h2>
        <p className="text-slate-400 text-sm mt-1">Tell us about your setup and we&apos;ll build a plan around it.</p>
      </div>

      <div className="px-7 py-6 space-y-6">

        {/* Company */}
        <div>
          <label className={LABEL}>Company Name {REQ}</label>
          <input type="text" required value={form.company} onChange={(e) => set('company', e.target.value)}
            placeholder="Acme Corp" className={INPUT} />
        </div>

        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>First Name {REQ}</label>
            <input type="text" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)}
              placeholder="John" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Last Name</label>
            <input type="text" value={form.lastName} onChange={(e) => set('lastName', e.target.value)}
              placeholder="Smith" className={INPUT} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={LABEL}>Business Email {REQ}</label>
          <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)}
            placeholder="john@yourcompany.com" className={INPUT} />
        </div>

        {/* Phone */}
        <div>
          <label className={LABEL}>Phone Number {REQ}</label>
          <input type="tel" required value={form.phone} onChange={(e) => set('phone', e.target.value)}
            placeholder="(555) 000-0000" className={INPUT} />
        </div>

        <div className="border-t border-slate-700/60 pt-6">
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-5">System Requirements</p>

          {/* Seats */}
          <div className="space-y-2 mb-6">
            <label className={LABEL}>How many users or seats will you need?</label>
            <RadioGroup name="seats" options={SEAT_OPTIONS} value={form.seats} onChange={(v) => set('seats', v)} />
          </div>

          {/* Desk phones */}
          <div className="space-y-3 mb-6">
            <label className={LABEL}>Will you need desk phones?</label>
            <RadioGroup name="deskPhones" options={['Yes', 'No', 'Not Sure']} value={form.deskPhones} onChange={(v) => set('deskPhones', v)} />
            {form.deskPhones === 'Yes' && (
              <input type="number" min={1} value={form.deskPhonesQty} onChange={(e) => set('deskPhonesQty', e.target.value)}
                placeholder="How many desk phones?" className={INPUT + ' mt-2'} />
            )}
          </div>

          {/* Mobile/desktop */}
          <div className="space-y-3 mb-6">
            <label className={LABEL}>Will some users be mobile or desktop app only?</label>
            <RadioGroup name="mobileUsers" options={['Yes', 'No']} value={form.mobileUsers} onChange={(v) => set('mobileUsers', v)} />
            {form.mobileUsers === 'Yes' && (
              <input type="number" min={1} value={form.mobileUsersQty} onChange={(e) => set('mobileUsersQty', e.target.value)}
                placeholder="How many mobile / desktop-only users?" className={INPUT + ' mt-2'} />
            )}
          </div>

          {/* AI Receptionist */}
          <div className="space-y-2 mb-6">
            <label className={LABEL}>
              Would you like an AI receptionist?{' '}
              <a href="/services/ai-voice-agents" className="text-blue-400 hover:text-blue-300 font-normal text-xs" target="_blank">
                Learn more ↗
              </a>
            </label>
            <RadioGroup name="aiReceptionist" options={['Yes', 'No', 'Tell Me More']} value={form.aiReceptionist} onChange={(v) => set('aiReceptionist', v)} />
          </div>

          {/* Call recording */}
          <div className="space-y-2">
            <label className={LABEL}>Call recording?</label>
            <RadioGroup name="callRecording" options={['Yes', 'No']} value={form.callRecording} onChange={(v) => set('callRecording', v)} />
          </div>
        </div>

        {/* SMS consent */}
        <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={smsConsent}
              onChange={(e) => setSmsConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 accent-blue-500 cursor-pointer"
            />
            <span className="text-slate-300 text-xs leading-relaxed">
              By checking this box, I consent to receive SMS text messages and/or calls from{' '}
              <strong className="text-white">MyVoIP</strong> at the phone number provided. Message
              frequency may vary. Standard message and data rates may apply. Reply{' '}
              <strong>STOP</strong> to opt out at any time. Reply <strong>HELP</strong> for
              assistance. Consent is not required as a condition of purchase. See our{' '}
              <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a>{' '}
              and{' '}
              <a href="/terms-of-services" className="text-blue-400 hover:underline">Terms of Service</a>.
            </span>
          </label>
          <div className="mt-3 pt-3 border-t border-slate-700 text-slate-500 text-xs space-y-0.5">
            <p>📱 Msg frequency varies &nbsp;·&nbsp; Msg &amp; data rates may apply</p>
            <p>Text STOP to cancel &nbsp;·&nbsp; Text HELP for help</p>
          </div>
        </div>

        {status === 'error' && (
          <div className="bg-red-900/20 border border-red-700/50 rounded-xl px-4 py-3 text-red-300 text-sm">
            {errorMsg || 'Something went wrong. Please call us at (833) 698-6471.'}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Request My Custom Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-slate-500 text-xs">
          We never sell your information. See our{' '}
          <a href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</a>.
        </p>
      </div>
    </form>
  );
}
