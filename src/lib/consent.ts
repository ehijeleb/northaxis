/*
  Cookie-consent helper (Step 4). Privacy-first: nothing non-essential runs until the user
  accepts. Choice is stored in localStorage and broadcast via a custom event so later steps
  (GA4 in Step 21, Google Maps in Step 16) can gate their loading on it.

  Usage in later steps:
    import { hasConsent, onConsent } from '../lib/consent';
    if (hasConsent()) loadAnalytics();
    else onConsent((v) => { if (v === 'accepted') loadAnalytics(); });
*/

export type ConsentValue = 'accepted' | 'rejected';

export const CONSENT_KEY = 'nx-consent';
export const CONSENT_EVENT = 'nx:consent';

/** The stored decision, or null if the user has not chosen yet. */
export function getConsent(): ConsentValue | null {
  if (typeof localStorage === 'undefined') return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === 'accepted' || v === 'rejected' ? v : null;
}

/** True only when the user has explicitly accepted non-essential cookies. */
export function hasConsent(): boolean {
  return getConsent() === 'accepted';
}

/** True once the user has made any decision (accept or reject) — i.e. hide the banner. */
export function hasDecided(): boolean {
  return getConsent() !== null;
}

/** Persist a decision and broadcast it. */
export function setConsent(value: ConsentValue): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(CONSENT_KEY, value);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
  }
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function onConsent(callback: (value: ConsentValue) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => callback((e as CustomEvent<ConsentValue>).detail);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
