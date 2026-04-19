'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INPUT =
  'w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors';

type ResourceDownloadGateProps = {
  resourceSlug: string;
  title: string;
  description: string;
  downloadUrl: string;
  fileLabel: string;
  highlights: string[];
};

export default function ResourceDownloadGate({
  resourceSlug,
  title,
  description,
  downloadUrl,
  fileLabel,
  highlights,
}: ResourceDownloadGateProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (status !== 'success') return;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  }, [downloadUrl, status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'download',
          email,
          resourceSlug,
          resourceTitle: title,
          downloadUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_420px] gap-10 items-start">
      <div>
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-blue-300 text-sm font-medium">Free PDF Download</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">{title}</h1>
        <p className="text-slate-300 text-xl leading-relaxed max-w-3xl mb-5">{description}</p>
        <p className="text-slate-400 leading-relaxed max-w-3xl mb-8">
          Enter your email address to unlock the file instantly. We&apos;ll send the lead into our system and open the PDF for download right away.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item) => (
            <div key={item} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
              <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
        <div className="px-7 pt-7 pb-5 border-b border-slate-700 bg-gradient-to-r from-blue-600/10 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Instant access</span>
          </div>
          <h2 className="text-xl font-bold text-white">Download the PDF</h2>
          <p className="text-slate-400 text-sm mt-1">{fileLabel}</p>
        </div>

        <div className="px-7 py-6">
          {status === 'success' ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Your download is ready</h3>
              <p className="text-slate-300 leading-relaxed mb-5">
                We opened the PDF in a new tab. If your browser blocked it, use the button below.
              </p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-colors text-base"
              >
                Download {fileLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l4-4m-4 4l-4-4m1 8h6" />
                </svg>
              </a>
              <p className="text-slate-500 text-xs mt-4">
                Need a demo instead? <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact the team</Link>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">
                  Email Address <span className="text-blue-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={INPUT}
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-900/20 border border-red-700/50 rounded-xl px-4 py-3 text-red-300 text-sm">
                  {errorMsg || 'Something went wrong. Please try again.'}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Unlocking...
                  </>
                ) : (
                  <>
                    Unlock Download
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-slate-500 text-xs leading-relaxed">
                By submitting, you agree that UponAI may contact you about this resource and related services. See our{' '}
                <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
