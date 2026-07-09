'use client';

import { useCallback, useState } from 'react';
import TurnstileField from '@/components/ui/TurnstileField';

type Props = {
  sourceTag: string;
  details: string;
  buttonLabel: string;
  fineprint?: string;
};

export default function EmailCaptureForm({ sourceTag, details, buttonLabel, fineprint }: Props) {
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const onTokenChange = useCallback((token: string) => setCaptchaToken(token), []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'lead', email, sourceTag, details, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'sent') {
    return (
      <p className="theme-pill-primary mt-5 inline-flex rounded-xl px-4 py-3 text-sm font-semibold">
        ✓ Sent - check your inbox shortly.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-5">
      <div className="flex flex-wrap gap-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Work email"
          className="theme-inset theme-heading min-w-[220px] flex-1 rounded-xl border border-[var(--border-strong)] px-4 py-3.5 text-[15px] placeholder:text-[var(--text-subtle)]"
        />
        <button
          type="submit"
          disabled={status === 'sending' || !captchaToken}
          className="theme-primary-button rounded-xl px-6 py-3.5 text-[15px] font-semibold disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : buttonLabel}
        </button>
      </div>
      <div className="mt-3">
        <TurnstileField onTokenChange={onTokenChange} />
      </div>
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      {fineprint ? (
        <p className="theme-subtle mt-3 text-[11px] font-[family-name:var(--font-mono)]">{fineprint}</p>
      ) : null}
    </form>
  );
}
