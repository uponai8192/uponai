// Master kill-switch for the cookie-consent system and the third-party
// tracking scripts it gates (RB2B + Snitcher). Set to `true` to reactivate
// the consent banner, the footer "Cookie Settings" link, and tracking.
// While `false`, nothing renders and no third-party scripts ever load.
export const consentEnabled = true;

export const consentStorageKey = 'uponai-cookie-consent';

export type ConsentChoice = 'accepted' | 'rejected';

export const consentEventName = 'uponai-open-consent';

export const gtmContainerId = 'GTM-NP9HGDQN';

// Google Consent Mode v2 signals. GTM always loads, but Google tags only
// use cookies once the visitor has accepted the banner.
export function consentModeState(granted: boolean) {
  const value = granted ? 'granted' : 'denied';
  return {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  };
}

