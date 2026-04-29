'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  consentEventName,
  consentStorageKey,
  type ConsentChoice,
} from '@/lib/consent';

declare global {
  interface Window {
    __uponaiTrackingLoaded?: boolean;
  }
}

const consentChangeEventName = 'uponai-consent-changed';

function loadTrackingScripts() {
  if (typeof window === 'undefined' || window.__uponaiTrackingLoaded) return;
  window.__uponaiTrackingLoaded = true;

  const snitcherScript = document.createElement('script');
  snitcherScript.id = 'uponai-snitcher-consent';
  snitcherScript.text = `!function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})})),-1===e.apiEndpoint.indexOf("http")&&(e.apiEndpoint="https://"+e.apiEndpoint),i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0,i.type="text/javascript",i.id="__radar__",i.setAttribute("data-settings",JSON.stringify(e)),i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");var a=document.scripts[0];a.parentNode.insertBefore(i,a)},i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({"apiEndpoint":"radar.snitcher.com","cdn":"cdn.snitcher.com","namespace":"Snitcher","profileId":"s1XiOpQkwL"});`;
  document.head.appendChild(snitcherScript);

  const reb2bScript = document.createElement('script');
  reb2bScript.id = 'uponai-reb2b-consent';
  reb2bScript.text = `!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}("4N210HQ31G6Z");`;
  document.head.appendChild(reb2bScript);
}

function readStoredConsent(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(consentStorageKey);
    return stored === 'accepted' || stored === 'rejected' ? stored : null;
  } catch {
    return null;
  }
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(consentChangeEventName, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(consentChangeEventName, onStoreChange);
  };
}

export default function CookieConsentManager() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readStoredConsent,
    () => null,
  );

  useEffect(() => {
    if (consent === 'accepted') {
      loadTrackingScripts();
    }
  }, [consent]);

  useEffect(() => {
    const handleOpenConsent = () => setBannerOpen(true);
    window.addEventListener(consentEventName, handleOpenConsent);

    return () => window.removeEventListener(consentEventName, handleOpenConsent);
  }, []);

  function saveConsent(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(consentStorageKey, choice);
    } catch {
      // Ignore storage write failures and still respect the in-memory choice.
    }

    window.dispatchEvent(new Event(consentChangeEventName));
    setBannerOpen(false);
  }

  const statusLabel =
    consent === 'accepted'
      ? 'Analytics and marketing cookies enabled'
      : consent === 'rejected'
        ? 'Only essential site cookies enabled'
        : 'Choose whether to allow analytics and marketing cookies';

  if (!(bannerOpen || consent === null)) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[70] px-4">
      <div className="theme-panel mx-auto max-w-4xl rounded-[1.75rem] p-5 shadow-[0_24px_70px_rgba(var(--shadow-rgb),0.28)] md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="theme-pill-green inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
              Cookie Consent
            </div>
            <h2 className="theme-heading mt-4 text-2xl font-bold">Control analytics and marketing tracking on UponAI.</h2>
            <p className="theme-body mt-3 text-sm leading-7 md:text-base">
              UponAI uses non-essential tracking tools for analytics and lead attribution. Accepting allows RB2B and
              Snitcher to load. Rejecting keeps those scripts off until you opt in later.
            </p>
            <p className="theme-soft mt-3 text-xs uppercase tracking-[0.22em]">{statusLabel}</p>
            <div className="mt-3">
              <Link href="/privacy-policy" className="theme-link-muted text-sm">
                Review the privacy policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => saveConsent('rejected')}
              className="theme-secondary-button rounded-full px-5 py-3 text-sm font-semibold"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="theme-primary-button rounded-full px-5 py-3 text-sm font-bold"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
