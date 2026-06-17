/*
  CookieConsent — privacy-first consent banner (Step 4).
  - No heavy library; ~1 small island.
  - Privacy-first default: non-essential cookies/scripts stay off until the user accepts.
  - Choice persists in localStorage; the banner does not reappear after accept or reject.
  - GA4 (Step 21) and Google Maps (Step 16) gate their loading on this via src/lib/consent.ts.
  - Reduced-motion safe (entrance transition is zeroed by the global reduced-motion rule).

  Copy here is my own voice: no em dashes.
*/
import { useEffect, useState } from 'react';
import { hasDecided, setConsent } from '../lib/consent';

export default function CookieConsent() {
  // Start hidden to avoid a flash; reveal after mount only if no decision exists yet.
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!hasDecided()) setVisible(true);
  }, []);

  // While the banner is up, mark the body so the floating WhatsApp button can lift clear of it.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('nx-consent-open', visible);
    return () => document.body.classList.remove('nx-consent-open');
  }, [visible]);

  if (!visible) return null;

  const decide = (value: 'accepted' | 'rejected') => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      className={`nx-consent${mounted ? ' nx-consent--in' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="nx-consent-title"
      aria-describedby="nx-consent-desc"
    >
      <div className="nx-consent__text">
        <p id="nx-consent-title" className="nx-consent__title">
          Cookies on this site
        </p>
        <p id="nx-consent-desc" className="nx-consent__desc">
          We use essential cookies to make this site work. With your consent we also use analytics
          cookies to understand how the site is used. No analytics or maps load until you accept.{' '}
          <a href="/privacy" className="nx-consent__link">
            Read our privacy policy
          </a>
          .
        </p>
      </div>
      <div className="nx-consent__actions">
        <button type="button" className="nx-consent__btn nx-consent__btn--ghost" onClick={() => decide('rejected')}>
          Reject non-essential
        </button>
        <button type="button" className="nx-consent__btn nx-consent__btn--solid" onClick={() => decide('accepted')}>
          Accept
        </button>
      </div>
    </div>
  );
}
