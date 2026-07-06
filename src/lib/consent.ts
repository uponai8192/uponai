// Master kill-switch for the cookie-consent system and the third-party
// tracking scripts it gates (RB2B + Snitcher). Set to `true` to reactivate
// the consent banner, the footer "Cookie Settings" link, and tracking.
// While `false`, nothing renders and no third-party scripts ever load.
export const consentEnabled = true;

export const consentStorageKey = 'uponai-cookie-consent';

export type ConsentChoice = 'accepted' | 'rejected';

export const consentEventName = 'uponai-open-consent';

