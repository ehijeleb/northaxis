# Northaxis Integrated Services — Build Instructions for Claude Code

**Read this entire file before writing any code.** This is your working spec for building the
Northaxis Integrated Services corporate website. The authoritative source of truth for all
**copy and structure** is *Website Design Brief v2.0* (revised 15 June 2026). Where this file and
the brief disagree, the brief wins on content; flag the conflict instead of guessing.

---

## 0. How to use this file (read carefully)

1. The build is broken into **numbered steps grouped into phases**. Each step ends with a
   `### ⛔ STOP & TEST` block.
2. **After each step, stop.** Do not start the next step. Post a short note saying what you built
   and paste the test instructions, then wait for the user to confirm the tests pass (or report
   issues) before continuing.
3. If anything is ambiguous, or a step needs a piece of content marked CRITICAL/blocked below,
   **ask rather than invent.** Use a clearly labelled placeholder and add the item to
   `/docs/BLOCKED_CONTENT.md` (created in Step 1).
4. Keep a running `/docs/DECISIONS.md` log of any non-obvious choice you make.

### Locked decisions (do not re-litigate)
- **Framework:** Astro with React islands. Astro ships near-zero JS by default; React is used
  **only** where interactivity is genuinely needed (nav/dropdown, mobile menu, form widgets,
  cookie banner). This protects the performance budget.
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`), with the brand palette exposed as CSS custom
  properties so tokens stay central and the output stays tiny. (If the user later prefers vanilla
  CSS modules, that is a fine swap; tokens stay the same.)
- **Forms:** Resend, **email-only**. No database for enquiries in v1. Submissions are validated,
  spam-screened (honeypot + time-trap), and emailed to the Northaxis inbox.
- **Content management:** Git-based. Content lives as Markdown/JSON in Astro **content
  collections**; the client edits via **Sveltia CMS** (a modern, mobile-friendly, Decap-compatible
  editor) at `/admin`. Edits commit to the repo and auto-trigger a Vercel rebuild.
- **Supabase:** **Not used in v1.** Forms are Resend; content is Git. Leave a documented extension
  point only. Do not add Supabase unless the user explicitly asks.
- **Hosting:** Vercel, with the Astro Vercel adapter (server output enabled so form endpoints and
  on-demand revalidation work). HTTPS/SSL is automatic on Vercel.

---

## 1. Design north star (this is how we avoid "AI slop")

The audience is **government procurement officers and senior public-sector decision-makers** in
Edo State and across Nigeria. The register is **calm, credible, locally rooted, with quiet
intellectual weight** on the consultancy layer. It should sit beside international procurement
portals without embarrassment. It is **not** a startup landing page.

**Use these two skills (install in Step 0) and lean on them throughout:**
- `ui-ux-pro-max` for the design system, anti-pattern checks, and the pre-delivery checklist. This
  client maps to its *Trust & Authority* and *Accessible & Ethical* profiles.
- `emilkowalski/skill` for animation and interaction quality. Use it case-by-case, especially to
  review any motion you add.
- Also consult the local `frontend-design` skill for typography and layout discipline.

**Hard "do not" list (AI-slop tells to avoid):**
- No teal-to-purple or rainbow gradient heroes. No "AI purple/pink."
- No glassmorphism, no neumorphism, no floating 3D blobs, no aurora mesh backgrounds.
- No auto-counting stat tickers, no generic "icon in a rounded square" grids used as decoration.
- No giant centred hero with a single vague verb. The hero leads with the **promise**, specifically.
- No emoji as icons. Use a single consistent SVG icon set (Lucide).
- No motion for motion's sake.

**Motion principles (Emil Kowalski):**
- Fast and purposeful. Entrances ease-out; interactive elements use spring-like feel.
- Motion should reinforce hierarchy and meaning, not decorate. The one earned metaphor is the
  **ascending bars** (northward growth) used sparingly, e.g. a subtle staggered rise on the logo
  or hero, once, on first load.
- **Everything** is gated behind `prefers-reduced-motion: reduce`. Provide a static fallback.
- Prefer CSS transitions and the Astro View Transitions API. Reach for `motion/react` only inside
  a React island, and only when CSS cannot express it cleanly. Keep JS off the critical path.

**Structural rule that overrides convenience:** the homepage **leads with the company promise**,
not a list of services. Services sit one level deeper. The brief calls this the single most
important structural decision on the site. Do not violate it.

---

## 2. Brand tokens (use these exact values)

**Colour**
| Token | Hex | Use |
|---|---|---|
| `--color-teal` (primary) | `#0F6E56` | brand, headings accents, CTAs, logo |
| `--color-bg` (warm off-white) | `#F9F9F7` | page backgrounds, section fills |
| `--color-teal-light` (light teal) | `#E1F5EE` | callouts, highlight strips, **consultancy** backgrounds |
| `--color-ink` (near-black) | `#1A1A1A` | body text, primary headings |
| `--color-grey` (mid grey) | `#5F5E5A` | secondary text, captions, metadata |
| `--color-border` (light grey) | `#CCCCCC` | borders, dividers, card outlines |

**Logo bars (ascending bars)**
- Bar 1 short: `#B4B2A9` · Bar 2 medium: `#2C2C2A` · Bar 3 tall body: `#0F6E56` + cap `#5DCAA5`
- Dark-background variant: white bars, teal cap.

**Typography**
- Headings + body: **Inter** (variable), self-hosted via `@fontsource-variable/inter` (no
  render-blocking Google Fonts request; matters on 3G). Bold for H1/H2, medium for H3 and card
  titles. Body regular, **min 16px desktop / 15px mobile**.
- Consultancy pull quotes and advisory intros: a **light serif** for intellectual register. Use
  **Source Serif 4** (light/regular), self-hosted via Fontsource. Use it sparingly, only in
  consultancy contexts.
- No decorative, script, or condensed fonts.

**Imagery:** African/Nigerian contexts, people-inclusive (teams, meetings, not just machinery).
All images are placeholders until the client supplies real photography; mark each in
`BLOCKED_CONTENT.md`. Serve WebP/AVIF via Astro's `<Image>`.

---

## 3. Content rules

- **Approved final copy = reproduce verbatim, em dashes included.** This applies to the homepage
  copy (Brief Section 6) and all three service pages plus consultancy (Brief Sections 7 and 8). Do
  not paraphrase, "improve," or de-em-dash it. The brief PDF must be available to you in the
  project; treat Sections 6, 7, 8 as the literal text to place.
- **Copy you generate yourself** (microcopy, alt text, meta descriptions, privacy policy, any
  message in the client's voice): **avoid em dashes.** Use commas, colons, or full stops.
- **CRITICAL blocked items** (use marked placeholders, log them): finalised vector logo, confirmed
  hex palette (use Section 2 above as confirmed unless told otherwise), directors' full names +
  titles, office address, professional email (placeholder `info@northaxisintegrated.com`), domain
  (placeholder `northaxisintegrated.com`, unconfirmed).
- **Confirmed:** phone / WhatsApp `+234 706 248 4221` → `https://wa.me/2347062484221`.
- **High-priority blocked:** year of establishment, directors' photos + bios, company photography,
  at least one case study per service line.

---

## 4. Site map (11 pages)

`Home · About us · What we do (hub) · Procurement, supply chain & logistics · ICT services ·
Energy & sustainability · Consultancy · Projects/Case studies · Sectors · Contact · Privacy policy`

- **Top nav:** Home | What we do | Sectors | Projects | About | Contact
- **"What we do" dropdown:** Procurement, supply chain & logistics | ICT services | Energy &
  sustainability | *(subtle horizontal divider)* | Consultancy
- **Header CTA:** "Get in touch" → Contact, visible on every page.
- The divider before Consultancy is deliberate: it signals consultancy spans all three lines, it
  is not a fourth service. Render it as a subtle horizontal rule inside the dropdown.
- The three service pages share **one template**.

---

# BUILD STEPS

Work top to bottom. Stop after every step.

---

## PHASE A — Foundation

### Step 0 — Install skills + generate the design system
**Goal:** get the design intelligence in place before writing UI.
**Do:**
- Confirm Node.js LTS and Python 3.x are available (`uipro` needs Python).
- Install ui-ux-pro-max: `npm install -g uipro-cli` then, inside the project once it exists in
  Step 1, `uipro init --ai claude`. (If the project folder is not created yet, do this at the end
  of Step 1.)
- Install Emil Kowalski's skill: `npx skills add emilkowalski/skill`.
- Run the design-system generator for this client and persist it, e.g.
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "government procurement consulting B2G trust authority" --design-system --persist -p "Northaxis"`.
- Reconcile the generated system with the **locked brand tokens in Section 2** (our palette and
  fonts win where they differ; keep the generator's anti-pattern list and checklist).

**⛔ STOP & TEST**
- User confirms both skills are installed (`.claude/skills/ui-ux-pro-max/` exists; emilkowalski
  skill present).
- User reviews `design-system/MASTER.md` and confirms it reflects the Section 2 tokens and the
  anti-slop direction in Section 1.

---

### Step 1 — Scaffold the project
**Goal:** a deployable Astro shell with tokens, fonts, and reset in place.
**Do:**
- Create an Astro project (TypeScript). Add integrations: `@astrojs/react`, `@astrojs/tailwind`
  (Tailwind v4), `@astrojs/sitemap`, `@astrojs/vercel` (server output).
- Self-host fonts: `@fontsource-variable/inter` and `@fontsource/source-serif-4`.
- Create `src/styles/tokens.css`: define all Section 2 colours as CSS custom properties; wire them
  into Tailwind v4 `@theme`. Set base font sizes (16/15px), line-height, and a global
  `@media (prefers-reduced-motion: reduce)` rule that disables non-essential animation.
- Create a base layout `src/layouts/Base.astro` (html lang="en", skip-link, `<slot/>`, meta slots).
- Create `/docs/BLOCKED_CONTENT.md` and `/docs/DECISIONS.md`.
- Create a throwaway `/__tokens` test page rendering swatches of every colour and both fonts.
- Initialise git; deploy to Vercel (preview).
- Run the `uipro init --ai claude` install here if not done in Step 0.

**⛔ STOP & TEST**
- `npm run dev` serves locally with no errors.
- `/__tokens` shows all six brand colours correct and Inter + Source Serif rendering.
- The Vercel preview URL loads over HTTPS.
- `BLOCKED_CONTENT.md` and `DECISIONS.md` exist.

---

## PHASE B — Global shell and primitives

### Step 2 — Logo component (ascending bars)
**Goal:** the approved mark, both variants, as inline SVG.
**Do:**
- Build `Logo.astro` (or a React island only if you animate it): three ascending bars
  (`#B4B2A9`, `#2C2C2A`, `#0F6E56` with `#5DCAA5` cap) and wordmark **NORTHAXIS /
  INTEGRATED SERVICES LIMITED** in bold caps to the right.
- Provide a `variant="light|dark"` prop. Dark variant: white bars, teal cap.
- Optional: one subtle staggered rise on first load, gated by reduced-motion. Static otherwise.

**⛔ STOP & TEST**
- Render both variants on `/__tokens`. Bars and cap colours exact; wordmark legible at 24px height
  on mobile. With reduced-motion on, no animation plays.

---

### Step 3 — Header + primary nav + "What we do" dropdown
**Goal:** mobile-first, accessible navigation with the cross-cutting consultancy cue.
**Do:**
- Build `Header.astro` with a React island for the dropdown and mobile menu.
- Desktop nav: Home | What we do | Sectors | Projects | About | Contact, plus a "Get in touch"
  CTA button (teal) on the right, sticky, visible on all pages.
- "What we do" dropdown lists the three service lines, then a **subtle `<hr>` divider**, then
  Consultancy. Keyboard accessible (arrow keys, Esc to close, focus trap), `aria-expanded`,
  `aria-current` on the active route. Motion: quick ease-out reveal, reduced-motion safe.
- Mobile: hamburger to a full-height panel; the same divider logic applies.

**⛔ STOP & TEST**
- On a 375px viewport: hamburger opens/closes, all links reachable, CTA visible.
- On desktop: dropdown opens on hover and on keyboard focus; the divider sits between Energy &
  sustainability and Consultancy.
- Tab through the whole header with a keyboard only; focus is always visible. Esc closes the menu.

---

### Step 4 — Footer + global furniture (WhatsApp, cookie consent)
**Goal:** the persistent page chrome.
**Do:**
- `Footer.astro`: nav columns, **mandatory LinkedIn link** (placeholder URL, logged as blocked),
  contact block (phone confirmed; email/address placeholders), copyright, link to Privacy policy.
- Floating WhatsApp button on all pages: anchor to `https://wa.me/2347062484221` with a prefilled
  message, accessible label, hidden in print, subtle one-time entrance (reduced-motion safe).
- Cookie consent banner (small React island, **no heavy library**): privacy-first default, no
  non-essential cookies/scripts until consent. Store choice in `localStorage`. GA4 and Google Maps
  must **not** load before consent (wired in later steps).

**⛔ STOP & TEST**
- Footer renders on the test page; LinkedIn link present (placeholder flagged in BLOCKED_CONTENT).
- WhatsApp button floats on mobile and desktop, opens a chat to the confirmed number.
- Cookie banner appears on first visit, dismisses, and does not reappear after accept/reject.

---

### Step 5 — UI primitives + component gallery
**Goal:** a small, consistent kit so every page reads as one firm.
**Do:** build `Button`, `Card`, `Section`, `Pill`/`Tag`, `PullQuote` (serif, consultancy),
`CtaBand`, `StepList`, and form field components (`TextField`, `TextArea`, `Select`, `FormStatus`).
Lucide icons only. Document them on a `/__gallery` page.

**⛔ STOP & TEST**
- `/__gallery` shows every primitive in default/hover/focus/disabled states.
- Hover and focus transitions are 150–300ms, smooth, reduced-motion safe. Contrast ≥ 4.5:1.

---

## PHASE C — Homepage (flagship deliverable)

> Reproduce **Brief Section 6 copy verbatim**, em dashes included. Build mobile-first.

### Step 6 — Hero (promise-led)
**Do:** eyebrow `Benin City · Nigeria · Est. [year — client to confirm]`; H1 **"Building the
infrastructure Nigeria needs — one integrated solution at a time"**; the verbatim sub-headline;
primary CTA "View our services →" (to What we do) and secondary "Get in touch →" (to Contact);
full-width background image placeholder (Nigerian infrastructure/advisory). Lead with the promise,
not services.

**⛔ STOP & TEST**
- H1 is the promise, verbatim. Both CTAs route correctly. On 375px the hero is legible with no
  layout shift; background image has a defined aspect ratio (no CLS).

---

### Step 7 — Credibility strip + company promise
**Do:** four credibility cards verbatim (CAC / 3 / Edo / B2G). Then the company-promise quote and
the verbatim body paragraph beneath it.

**⛔ STOP & TEST**
- All four cards present and verbatim. Promise block uses the serif for the quote. Reads as calm
  and credible, not flashy.

---

### Step 8 — Services grid + Why Northaxis + Sectors + CTA band
**Do:** four-item responsive grid: three service cards plus the **Consultancy** card, each with an
icon, title, 2-line verbatim description, and "Learn more →". Visually cue that Consultancy is
cross-cutting (e.g. light-teal `#E1F5EE` background or a divider), not a fourth service. Then the
four "Why Northaxis" differentiators (verbatim), the sectors pill strip (verbatim), and the
homepage CTA band with "Start a conversation →" and "Download capability statement →" (PDF
placeholder, logged as blocked).

**⛔ STOP & TEST**
- Grid is 1-col mobile, multi-col desktop. Consultancy card is visually distinguished as
  cross-cutting. Sector pills wrap cleanly on mobile. Capability-statement link is a flagged
  placeholder.
- **Run Lighthouse (mobile) on the homepage. Record the score in DECISIONS.md.** Note any
  >100KB JS or render-blocking issues to fix in Phase G.

---

## PHASE D — Service page template

### Step 9 — Build the shared template using Line 1 (Procurement)
**Goal:** one reusable template, proven on real copy. Reproduce **Brief Section 7.1 verbatim**.
**Do:** a single `ServicePage` template driven by data, with sections in this order: hero
(breadcrumb, headline, sub-headline, two CTAs); section-intro **pull quote** (serif) + body; core
capabilities (four cards); equipment categories (six tiles, Line 1 only); delivery process (step
list); **Consultancy services** section sitting immediately above the CTA band (this is how the
advisory layer surfaces per line); sectors served; case-studies placeholder (flagged); a
**service-specific enquiry form** (wired in Phase E); CTA band.

**⛔ STOP & TEST**
- Line 1 page matches Section 7.1 verbatim, in order. Consultancy section sits directly above the
  CTA band. Fully responsive; pull quote uses serif. Enquiry form is present (non-functional until
  Phase E is fine; say so).

---

### Step 10 — Generate Line 2 (ICT) and Line 3 (Energy) from the template
**Do:** instantiate the same template with **Brief Sections 7.2 and 7.3 verbatim**. ICT and Energy
have four delivery steps (not five) and no equipment-categories tile block; keep the template
flexible. Each gets its own service-specific enquiry form.

**⛔ STOP & TEST**
- All three service pages are visually consistent and read as one firm. Each page's copy matches
  its brief section verbatim. Breadcrumbs and section ordering correct on each.

---

## PHASE E — Remaining pages

### Step 11 — Consultancy overview page
**Do:** reproduce **Brief Section 8 verbatim**: headline, sub-headline, three advisory-area cards,
"Who we work with," and the engagement-approach block (Diagnostic review / Advisory retainer /
Programme advisory). Light-teal accents for the advisory register. Include the consultancy enquiry
form. Reachable from the dropdown after the divider.

**⛔ STOP & TEST**
- Page present and verbatim; positioned as cross-line advisory, not a fourth service.

---

### Step 12 — "What we do" hub page
**Do:** brief description of all three lines with the consultancy layer explained, linking to each
service page and to the consultancy page.

**⛔ STOP & TEST**
- Hub links to all three services + consultancy; copy is consistent with the core promise.

---

### Step 13 — About us
**Do:** history, mission, values, directors' bios (placeholder, flagged), CAC/RC trust signal
(placeholder), team photos (placeholder). Directors and bios pull from the `team` content
collection (built in Phase F) so they are client-editable.

**⛔ STOP & TEST**
- Page renders with clearly marked placeholders for every blocked item; all logged in
  BLOCKED_CONTENT.md.

---

### Step 14 — Sectors page
**Do:** a grid of sectors served (State government MDAs, Federal agencies, Health, Education,
Infrastructure & civil works, Oil & gas, Development finance, Private sector), each with
Northaxis's role in that sector.

**⛔ STOP & TEST**
- Grid is responsive and self-identification is obvious to a procurement reader.

---

### Step 15 — Projects / Case studies
**Do:** project cards (client type, service line, scope, outcome) sourced from the `projects`
content collection (Phase F). Design a graceful empty/low-content state (the client has no case
studies yet); never show a broken or empty grid.

**⛔ STOP & TEST**
- With zero entries the page shows a dignified placeholder. Adding a sample entry renders a card.

---

### Step 16 — Contact page
**Do:** general contact form (Phase E forms), phone (confirmed), email (placeholder), WhatsApp
link, office address (placeholder), and a **Google Maps embed**. The map must be **consent-gated
and lazy-loaded** (prefer a lazy iframe or a static-map image with a "view on Google Maps" link to
avoid heavy Maps JS on 3G).

**⛔ STOP & TEST**
- Form renders; phone/WhatsApp correct; address is a flagged placeholder. Map does not load until
  cookie consent is given, then loads lazily.

---

### Step 17 — Privacy policy
**Do:** generate a standard GDPR-aware privacy policy template for client review (cookies, forms,
analytics, contact). Your own prose, **no em dashes**. Mark it "template for client/legal review."

**⛔ STOP & TEST**
- Page exists, linked from the footer, clearly labelled as a review template.

---

## PHASE F — Forms (Resend) and CMS (self-management)

### Step 18 — Resend, email-only forms
**Do:** an Astro server endpoint that validates input, runs a honeypot + submit-time trap, and
sends via Resend to the Northaxis inbox. One general form (Contact) and one service-specific
enquiry form per service page + consultancy (carry the service name in the payload/subject).
Success and error states are accessible and reduced-motion safe. Put the API key in a Vercel env
var; never commit it. Use the placeholder recipient until the professional email exists (flagged).

**⛔ STOP & TEST**
- Submit each form in test mode; a correctly-formatted email arrives (or Resend test log shows it).
- Submitting empty/invalid input shows inline accessible errors. The honeypot blocks an obvious bot
  submission. No secrets in the repo.

---

### Step 19 — Content collections + Sveltia CMS at /admin
**Do:** define content collections (`projects`, `team`, and a `site` singleton for editable contact
details). Migrate any hardcoded projects/bios/contact into collections. Add Sveltia CMS config at
`/admin` with GitHub backend auth; edits commit to the repo and trigger a Vercel rebuild. Write a
one-page `/docs/CLIENT_EDITING_GUIDE.md` in plain language (no em dashes).

**⛔ STOP & TEST**
- From `/admin`, the user (acting as the client, ideally on a phone) logs in, **adds a case study**
  and **a team member**, publishes, and within a couple of minutes the live preview rebuilds and
  shows them. Contact details edited in the `site` singleton update the Contact page and footer.

---

## PHASE G — SEO, performance, analytics, launch

### Step 20 — SEO foundations
**Do:** unique meta title + description per page (your prose, no em dashes); Open Graph/Twitter
tags; Schema.org **Organisation** markup (name, address, contact, the three service lines);
`@astrojs/sitemap` XML sitemap; `robots.txt`. Target keyword clusters: Northaxis Integrated
Services; procurement company Edo State; ICT services Benin City; energy supply Nigeria;
procurement consultancy Nigeria. Use these naturally, do not stuff.

**⛔ STOP & TEST**
- Every page has a unique title/description (spot-check 4 pages). Organisation JSON-LD validates in
  Google's Rich Results Test. `/sitemap-index.xml` lists all 11 pages.

---

### Step 21 — GA4 + Search Console (consent-gated)
**Do:** GA4 loads **only after** cookie consent. Add the Search Console verification method. Document
the GA4 measurement ID and Search Console steps in DECISIONS.md (the user supplies the real IDs).

**⛔ STOP & TEST**
- With consent declined, no GA4 network request fires. With consent accepted, GA4 loads and
  registers a pageview. Search Console verification tag/file is present.

---

### Step 22 — Image pipeline + performance pass
**Do:** convert all imagery to Astro `<Image>` with WebP/AVIF and responsive `srcset`; lazy-load
below-the-fold; set explicit dimensions to kill CLS; audit and trim JS (islands only where needed);
defer non-critical work. Target: **PageSpeed mobile 80+**, **< 3s on a 3G-equivalent throttle**.

**⛔ STOP & TEST**
- Lighthouse mobile (or PageSpeed Insights) scores 80+ on Home and one service page; record both.
- Chrome DevTools "Slow 3G" throttle: homepage is usable in under ~3s. CLS is near zero.

---

### Step 23 — Accessibility + cross-device QA (pre-delivery checklist)
**Do:** run the `ui-ux-pro-max` pre-delivery checklist and fix failures. Verify: keyboard nav
everywhere, visible focus, 4.5:1 contrast, `prefers-reduced-motion` honoured site-wide, no emoji
icons, `cursor-pointer` on clickables, responsive at 375/768/1024/1440. Have the Emil Kowalski
skill review any animations.

**⛔ STOP & TEST**
- User walks the homepage and one service page with keyboard only and with reduced-motion on; no
  blockers. Checklist items all pass; list any waivers in DECISIONS.md.

---

### Step 24 — Production launch
**Do:** promote to production on Vercel; confirm HTTPS/SSL; attach the custom domain (placeholder
until confirmed); submit the sitemap in Search Console; verify the WhatsApp button, all forms, and
the cookie banner in production. Final smoke test of all 11 pages.

**⛔ STOP & TEST**
- Production URL is live over HTTPS. All 11 pages load. Forms send. WhatsApp works. Sitemap
  submitted. Update BLOCKED_CONTENT.md with everything still outstanding before public promotion
  (logo vector, directors, address, pro email, domain, case studies, capability PDF, LinkedIn URL).

---

## Appendix — Blocked content manifest (seed `/docs/BLOCKED_CONTENT.md`)

**CRITICAL (blocks launch):** vector logo · directors' full names + titles · office address ·
professional email (`info@northaxisintegrated.com` placeholder) · domain
(`northaxisintegrated.com`, confirm availability).
**High:** year of establishment · directors' photos + bios · company photography · ≥1 case study
per service line.
**Medium/low:** CAC certificate / RC number · LinkedIn page URL · capability-statement PDF · other
social handles.
**Confirmed:** phone / WhatsApp `+234 706 248 4221`.

## Appendix — Out of scope (do not build)
Capability-statement PDF design · social setup/management · e-commerce/payments · custom web-app
development · ongoing SEO beyond initial setup · the removed real estate & general trade line ·
Supabase (v1).
