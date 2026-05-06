'use client';

import Link from 'next/link';
import { useState } from 'react';
import TurnstileField from '@/components/ui/TurnstileField';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INPUT =
  'w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors';
const LABEL = 'block text-slate-300 text-sm font-medium mb-1.5';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaToken) {
      setStatus('error');
      setErrorMsg('Please complete the captcha before sending your message.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'contact', ...form, smsConsent, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setCaptchaResetKey((value) => value + 1);
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
        <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
        <p className="text-slate-300 leading-relaxed mb-2">
          Thanks for reaching out. A member of our team will get back to you within one business day.
        </p>
        <p className="text-slate-400 text-sm">
          Need immediate help?{' '}
          <a href="tel:+18887876624" className="text-blue-400 hover:text-blue-300 font-medium">
            Call (888) 787-6624
          </a>{' '}
          to reach the UponAI team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-slate-700 bg-gradient-to-r from-violet-600/10 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">We reply within 1 business day</span>
        </div>
        <h2 className="text-xl font-bold text-white">Contact Us</h2>
        <p className="text-slate-400 text-sm mt-1">Questions, support, billing — we&apos;re here to help.</p>
      </div>

      <div className="px-7 py-6 space-y-5">
        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>First Name <span className="text-blue-400">*</span></label>
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
          <label className={LABEL}>Email <span className="text-blue-400">*</span></label>
          <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)}
            placeholder="john@yourcompany.com" className={INPUT} />
        </div>

        {/* Phone */}
        <div>
          <label className={LABEL}>Phone Number</label>
          <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)}
            placeholder="(555) 000-0000" className={INPUT} />
        </div>

        {/* Message */}
        <div>
          <label className={LABEL}>How Can We Help? <span className="text-blue-400">*</span></label>
          <textarea
            rows={4}
            required
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="Tell us what you need — support question, billing inquiry, general info..."
            className={INPUT + ' resize-none'}
          />
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
              <strong className="text-white">UponAI</strong> at the phone number provided. Message
              frequency may vary. Standard message and data rates may apply. Reply{' '}
              <strong>STOP</strong> to opt out. Reply <strong>HELP</strong> for assistance.
              Consent is not required as a condition of purchase. See our{' '}
              <Link href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>{' '}
              and{' '}
              <Link href="/terms-of-services" className="text-blue-400 hover:underline">Terms of Service</Link>.
            </span>
          </label>
          <div className="mt-3 pt-3 border-t border-slate-700 text-slate-500 text-xs space-y-0.5">
            <p>📱 Msg frequency varies &nbsp;·&nbsp; Msg &amp; data rates may apply</p>
            <p>Text STOP to cancel &nbsp;·&nbsp; Text HELP for help</p>
          </div>
        </div>

        <TurnstileField onTokenChange={setCaptchaToken} resetKey={captchaResetKey} />

        {status === 'error' && (
          <div className="bg-red-900/20 border border-red-700/50 rounded-xl px-4 py-3 text-red-300 text-sm">
            {errorMsg || 'Something went wrong. Please call us at (888) 787-6624.'}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting' || !captchaToken}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-900 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
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
              Send Message
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-slate-500 text-xs">
          We never sell your information. See our{' '}
          <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}
