'use client';

import { consentEnabled, consentEventName } from '@/lib/consent';

export default function CookieSettingsButton() {
  // Dormant: hide the footer entry point while the consent system is disabled.
  if (!consentEnabled) return null;

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

