'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: 'auto' | 'light' | 'dark';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

type TurnstileFieldProps = {
  onTokenChange: (token: string) => void;
  resetKey?: number;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function TurnstileField({ onTokenChange, resetKey = 0 }: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [widgetError, setWidgetError] = useState('');

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || widgetIdRef.current || !containerRef.current || !window.turnstile) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'auto',
        callback: (token) => {
          setWidgetError('');
          onTokenChange(token);
        },
        'expired-callback': () => {
          onTokenChange('');
          setWidgetError('Captcha expired. Please complete it again.');
        },
        'error-callback': () => {
          onTokenChange('');
          setWidgetError('Captcha could not be verified. Please try again.');
        },
      });
    };

    renderWidget();
    const intervalId = window.setInterval(renderWidget, 250);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [onTokenChange]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenChange('');
    setWidgetError('');
  }, [onTokenChange, resetKey]);

  if (!siteKey) {
    return (
      <div className="rounded-xl border border-amber-700/50 bg-amber-950/20 px-4 py-3 text-sm text-amber-200">
        Captcha is not configured yet. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to enable form submissions.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div ref={containerRef} className="min-h-[65px]" />
      {widgetError ? (
        <p className="text-sm text-red-300">{widgetError}</p>
      ) : (
        <p className="text-xs text-slate-500">Complete the captcha before submitting.</p>
      )}
    </div>
  );
}
