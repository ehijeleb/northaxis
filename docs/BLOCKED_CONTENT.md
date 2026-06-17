# Blocked content manifest

Every item here uses a clearly marked placeholder in the build until the client supplies the real
asset. Nothing in the **CRITICAL** list may go to public production. Update at every step that hits
a placeholder; reconcile at Step 24.

Legend: ☐ outstanding · ☑ supplied

---

## CRITICAL (blocks public launch)
- ☑ **Website Design Brief v2.0 PDF** — supplied as `document_pdf.pdf` (29 pp, revised 15 June 2026).
  Authoritative verbatim copy source for homepage (Sec 6) and service/consultancy pages (Sec 7–8).
- ☐ Finalised **vector logo** (currently rendered as inline SVG approximation from Section 2 colours).
- ☐ Directors' **full names + titles**.
- ☐ **Office address**.
- ☐ **Professional email** — placeholder `info@northaxisintegrated.com`.
- ☐ **Domain** — placeholder `northaxisintegrated.com` (availability unconfirmed; set as Astro `site`).

## High priority
- ☐ **Year of establishment** (hero eyebrow currently `Est. [year — client to confirm]`).
- ☐ Directors' **photos + bios**.
- ☐ **Company photography** (all imagery is placeholder; African/Nigerian, people-inclusive).
- ☐ At least **one case study per service line** (Procurement, ICT, Energy).

## Medium / low
- ☐ **CAC certificate / RC number** (trust signal on About).
- ☐ **LinkedIn page URL** (mandatory footer link — placeholder for now).
- ☐ **Capability-statement PDF** (homepage CTA "Download capability statement").
- ☐ Other **social handles**.

## Confirmed (do not treat as blocked)
- ☑ Phone / WhatsApp: **+234 706 248 4221** → `https://wa.me/2347062484221`.
- ☑ Brand palette: Section 2 hex values (treated as confirmed unless told otherwise).

---

### Log
- 2026-06-17 (Step 1): seeded from instructions Appendix. Flagged missing brief PDF as a CRITICAL
  blocker for content steps. `site` domain + pro email set as placeholders in config.
