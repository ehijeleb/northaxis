/*
  Central site + navigation config. Single source of truth for routes and labels, reused by the
  Header (Step 3) and Footer (Step 4). Labels are reproduced from the Brief (§4, page 6–7) and the
  build instructions §4 — do not paraphrase nav labels.
*/

export interface NavItem {
  label: string;
  href: string;
  /** Service-line submenu under "What we do". */
  children?: NavItem[];
}

/** The three consolidated service lines (Brief: Procurement / ICT / Energy). */
export const SERVICE_LINES: NavItem[] = [
  { label: 'Procurement, supply chain & logistics', href: '/what-we-do/procurement' },
  { label: 'ICT services', href: '/what-we-do/ict' },
  { label: 'Energy & sustainability', href: '/what-we-do/energy' },
];

/**
 * Consultancy is cross-cutting, not a fourth service line. In the dropdown it sits AFTER a
 * deliberate divider (Brief design note, page 7). Top-level route so it can be pitched
 * independently when the opportunity arises.
 */
export const CONSULTANCY: NavItem = { label: 'Consultancy', href: '/consultancy' };

/** Level-1 navigation (Brief §4.1). */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'What we do', href: '/what-we-do', children: [...SERVICE_LINES, CONSULTANCY] },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Header CTA — visible on every page, links to Contact. */
export const HEADER_CTA: NavItem = { label: 'Get in touch', href: '/contact' };

/** Confirmed contact details (Brief). Email/address/LinkedIn are placeholders — see BLOCKED_CONTENT.md. */
export const SITE = {
  name: 'Northaxis Integrated Services Limited',
  shortName: 'Northaxis',
  location: 'Benin City, Edo State, Nigeria',
  whatsappNumber: '+234 706 248 4221',
  whatsappUrl: 'https://wa.me/2347062484221',
  /** Prefilled WhatsApp message (my own copy, no em dashes). */
  whatsappMessage: 'Hello Northaxis, I would like to enquire about your services.',
  emailPlaceholder: 'info@northaxisintegrated.com',
  /** PLACEHOLDER — real office address is a CRITICAL blocked item. */
  addressPlaceholder: 'Benin City, Edo State, Nigeria',
  /** PLACEHOLDER — mandatory footer LinkedIn link; real company URL is blocked. */
  linkedinUrlPlaceholder: 'https://www.linkedin.com/',
} as const;

/** Full WhatsApp click-to-chat URL with the prefilled message. */
export const WHATSAPP_CHAT_URL = `${SITE.whatsappUrl}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

/** Mark the active route for aria-current. Exact match, plus section match for nested service pages. */
export function isActive(href: string, pathname: string): boolean {
  const norm = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);
  const a = norm(href);
  const b = norm(pathname);
  if (a === '/') return b === '/';
  return b === a || b.startsWith(a + '/');
}
