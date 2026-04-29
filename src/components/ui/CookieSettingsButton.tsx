'use client';

import { consentEventName } from '@/lib/consent';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(consentEventName))}
      className="theme-link-muted text-sm"
    >
      Cookie Settings
    </button>
  );
}

