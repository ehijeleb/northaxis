/*
  ConsentMap — consent-gated, lazy Google Maps embed (Step 16, Brief §9.1).
  - No Maps iframe (and therefore no Google cookies / heavy Maps request) loads until the user has
    accepted cookies via the consent banner. Until then it shows a lightweight placeholder with a
    plain "View on Google Maps" link (a normal link, no embedded tracking).
  - Once consent is given the iframe loads with loading="lazy" (kept off the critical path; the
    island itself hydrates client:visible).
  - Location is a PLACEHOLDER (Benin City) until the precise office address is confirmed.
*/
import { useEffect, useState } from 'react';
import { hasConsent, onConsent } from '../lib/consent';

interface Props {
  query: string;
  label: string;
}

export default function ConsentMap({ query, label }: Props) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasConsent());
    return onConsent((v) => setConsented(v === 'accepted'));
  }, []);

  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const linkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  if (!consented) {
    return (
      <div class="nx-map nx-map--placeholder">
        <p class="nx-map__msg">
          The map loads once you accept cookies. You can also open the location directly:
        </p>
        <a class="nx-map__link" href={linkUrl} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      </div>
    );
  }

  return (
    <div class="nx-map">
      <iframe
        class="nx-map__frame"
        src={embedUrl}
        title={label}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </div>
  );
}
