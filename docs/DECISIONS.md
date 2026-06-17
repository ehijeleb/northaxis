# Decisions log

Running log of non-obvious choices. Newest first.

---

## Step 9 — Service-page template (Line 1, Procurement)

- **One data-driven template** `components/service/ServicePage.astro` fed by `src/data/services.ts`.
  `equipment` is optional (Line 1 only); `delivery` is variable-length (5 steps here, 4 for ICT/Energy
  in Step 10). Copy is VERBATIM (Brief §7.1).
- **Section order resolves a brief inconsistency.** The brief's detailed §7.1 lists Consultancy
  before Sectors/Case studies, but BOTH the brief's §7 intro AND the build instructions state the
  "Consultancy services" section sits *immediately above the CTA band*. Honoured that stated intent:
  Hero → intro → capabilities → equipment → delivery → sectors → case studies → **Consultancy →
  CTA band** → enquiry form. The enquiry form is the final conversion section; the CTA band's
  "Submit a project enquiry" and the hero's "Discuss your requirement" anchor to `#enquiry`.
- **Capability cards** split the verbatim body into a lead sentence + a bolded "Services:" line
  (words unchanged) for readability.
- **Case studies = dignified dashed-border placeholder** (my copy, no em dashes); flagged blocked.
- **Enquiry form is static UI** (Phase F wires the Resend endpoint + honeypot/time-trap). Carries a
  hidden `service` field = the line label.
- Hero reuses the dark placeholder treatment (shorter than the homepage hero) with a breadcrumb.

## Step 8 — Homepage services / why / sectors / CTA

- **Copy verbatim from Brief §6.4–6.7** (service cards, differentiators, sectors pills, CTA band).
  Em dashes preserved. Section headings ("What we do", "Why Northaxis", "Sectors we serve") and the
  services lead-in are my own structural copy (no em dashes).
- **Consultancy is the 4th card in the grid but visually cross-cutting** (light-teal `#E1F5EE`
  background via Card `variant="consultancy"`, white icon chip) — per §6.4 / build instructions.
  Grid: 1-col mobile → 2-col → 4-col desktop.
- **Capability statement** links to placeholder `/northaxis-capability-statement.pdf` (blocked; will
  404 until the client supplies the PDF).
- **Lighthouse (mobile, local production build, simulated throttling): Performance = 100.**
  FCP 1.2s · LCP 1.2s · TBT 0ms · CLS 0.015 · Speed Index 1.5s. No render-blocking resources
  (fonts self-hosted, CSS in `<head>`). Re-run on the deployed Vercel URL at Step 22/24 for a
  real-network number.
- **JS payload to revisit at Step 22:** total ~203KB raw / ~65KB gzip, dominated by the React
  runtime (`client.js` 186KB raw / 58.5KB gzip) pulled in by the Nav (`client:load`) and
  CookieConsent (`client:idle`) islands. Over the 100KB-raw note threshold; TBT is still 0ms so it
  is not hurting interactivity, but options for Phase G: lighter/no-framework nav toggle, or trim
  islands. Per-page Astro JS is tiny (Nav 6KB, consent 1.8KB).

## Step 6 — Homepage hero

- **Copy is verbatim from Brief §6.1** (headline + sub-headline, em dashes preserved). Do not edit.
- **Hero background is a placeholder** (deep ink brand treatment + subtle foot vignette for legibility
  + faint ascending-bars motif). Deliberately NOT a multi-hue gradient (anti-slop). Replace with real
  Nigerian infrastructure/advisory photography (blocked: company photography). Keeps a fixed
  `min-height` so swapping in an `<Image>` later causes no CLS.
- **Eyebrow year is a visible `[year]` placeholder** (year of establishment is blocked).
- Promise-led + left-aligned (honours the structural law: hero leads with the promise, not services).
- CTAs use the Button `arrow` icon rather than a literal "→" glyph: "View our services" -> /what-we-do,
  "Get in touch" -> /contact.

## Step 5 — UI primitives + gallery

- **Primitive styles live in a global `src/styles/primitives.css` (class-based), not Astro scoped
  styles.** This lets the same classes (`.nx-btn`, `.nx-field`, ...) be reused by the React form
  islands in Phase F, which Astro scoped styles cannot reach. Astro components are thin wrappers
  that apply the classes.
- **Lucide via `lucide-astro` (inline SVG, zero client JS).** Import WITHOUT the `.astro` extension
  (`import ArrowRight from 'lucide-astro/ArrowRight'`) — the package's `exports` map (`"./*" ->
  "./dist/*.astro"`) appends it; adding `.astro` double-appends and fails to resolve.
- **`:global(svg)` does NOT work in a plain global CSS file** (it's an Astro/CSS-modules construct;
  Lightning CSS drops the rule). Use plain descendant selectors (`.nx-btn svg`) instead.
- **Throwaway gallery at `/dev/gallery`** (same `/dev/*` namespace as tokens; delete before launch).
- Components: Button (primary/secondary/ghost x sm/md/lg, link-or-button, arrow, on-dark, disabled),
  Card (default/hover/consultancy/link), Section, Pill, PullQuote (serif), CtaBand (teal/ink),
  StepList, TextField/TextArea/Select/FormStatus (label assoc, aria-describedby, aria-invalid,
  role=status/alert). Error red `#b3261e` (~5.9:1 on white).

## Step 4 — Footer + global furniture

- **Consent is the gate for all non-essential scripts.** `src/lib/consent.ts` stores the choice in
  `localStorage` (`nx-consent` = accepted|rejected) and broadcasts a `nx:consent` CustomEvent.
  GA4 (Step 21) and Google Maps (Step 16) must call `hasConsent()` / `onConsent()` before loading.
  Nothing non-essential runs until the user accepts. Banner hydrates `client:idle` (not critical).

- **WhatsApp FAB hidden while the consent banner is open.** Both are bottom-anchored fixed
  elements; rather than fragile lift math (banner height varies), the FAB is `display:none` while
  `body.nx-consent-open` is set, and returns the instant the user decides. Pure Astro + CSS button,
  hidden in print, one-time entrance, reduced-motion safe.

- **Footer is dark (ink `#1A1A1A`) with the dark logo variant** — gives weight and clean separation;
  contrast checked (white / white-alpha on near-black). Full logo lockup lives here and at >=480px
  in the header. Copyright year via build-time `new Date().getFullYear()`.

- **LinkedIn is mandatory in the footer (Brief §9.1)** — placeholder URL `https://www.linkedin.com/`,
  flagged in BLOCKED_CONTENT. Email + address shown with "to be confirmed" hints.

## Step 3 — Header + nav

- **Routes defined** (central `src/config/site.ts`, reused by header + footer): `/` · `/what-we-do`
  · `/what-we-do/procurement` · `/what-we-do/ict` · `/what-we-do/energy` · `/consultancy` (top-level
  — cross-cutting, "pitched independently when the opportunity arises") · `/sectors` · `/projects` ·
  `/about` · `/contact` · `/privacy`. Service pages nest under `/what-we-do/` so the section
  highlights correctly.

- **Nav is one React island hydrated `client:load`.** Nav is critical interactive UI (mobile
  hamburger is the primary mobile nav), so it hydrates on load rather than `client:idle`. Links are
  SSR'd plain anchors, so they work without JS; only the dropdown/drawer toggles need hydration.
  Cost: the React runtime (~61KB gzip) loads site-wide. Revisit at the Step 22 performance pass if
  the budget is tight (options: `client:idle`, or a no-framework toggle).

- **Disclosure pattern, not ARIA menu.** "What we do" is a real link to the hub `/what-we-do` plus a
  separate chevron `<button aria-expanded aria-controls>` toggling a list of links. This is the
  accessible site-nav pattern (vs. application `role="menu"`), works without JS, and supports
  arrow-key navigation + Esc. Brief's deliberate divider sits between the 3 service lines and
  Consultancy in both the desktop dropdown and the mobile accordion.

- **Header rendered globally in `Base.astro`** (overridable via the `header` slot) so the CTA is on
  every page per the brief.

- **Brief miscount noted:** Brief §4.1 says "five items" but lists six (Home | What we do | Sectors
  | Projects | About | Contact). Followed the explicit six-item list (labels are authoritative).

## Step 1 — Scaffold

- **Tailwind v4 via `@tailwindcss/vite`, not `@astrojs/tailwind`.** The instructions name
  `@astrojs/tailwind`, but that integration is **Tailwind v3 only**. The locked decision is Tailwind
  **v4** (CSS-first `@theme`), and the supported way to use v4 with Astro is the official
  `@tailwindcss/vite` plugin plus `@import "tailwindcss"` in CSS. This satisfies the locked decision;
  the package name in the instructions is the only deviation. Tokens live in `src/styles/tokens.css`.

- **Output mode: `static` (default) + Vercel adapter, not blanket `server`.** The instructions say
  "server output enabled so form endpoints work," but making *every* page SSR conflicts with the
  heavily-emphasised performance budget (PageSpeed 80+, <3s on 3G). Astro's adapter supports a hybrid
  model: content pages prerender (fast, static) and only the form endpoints (Phase F, Step 18) opt
  into on-demand rendering via `export const prerender = false`. This delivers both "forms work" and
  the performance budget. Revisit if on-demand revalidation of content pages is later required.

- **Astro 5 (LTS), not Astro 6.** Astro 6.4.7 installed first but its new rolldown-based Vite is
  incompatible with `@tailwindcss/vite` 4.3.x (build error: `Missing field tsconfigPaths`). Astro 6
  is brand new and the Tailwind plugin hasn't caught up. Downgraded the core line to **Astro `^5`**
  with `@astrojs/react@^4`, `@astrojs/vercel@^8`, `@astrojs/sitemap@^3` — the proven, stable combo
  for Tailwind v4 + React 19. Build is green. Revisit Astro 6 once the plugin ecosystem supports it.

- **React 19 / Tailwind 4.3.** Latest stable.

- **Versions / fonts.** Inter via `@fontsource-variable/inter` (family `Inter Variable`); Source
  Serif 4 via `@fontsource/source-serif-4` (family `Source Serif 4`, static — per instructions).
  Both imported in `Base.astro` so there is no render-blocking Google Fonts request.

- **`site` = `https://northaxisintegrated.com`** (placeholder, unconfirmed domain) so `@astrojs/sitemap`
  can generate absolute URLs. Swap when the real domain is confirmed. Logged in BLOCKED_CONTENT.

- **Dev/throwaway pages live under `/dev/*`, not `/__tokens`.** Astro reserves the underscore (`_`)
  prefix for private files and **excludes them from routing**, so a literal `/__tokens` URL is
  impossible. Throwaway check pages use the `src/pages/dev/` namespace (`/dev/tokens`, later
  `/dev/gallery`). Delete the whole `src/pages/dev/` folder before launch.

- **`npm audit`:** 7 high-severity advisories reported at install, all transitive dev-tooling. Not
  addressing with `--force` (breaking). Will review before launch (Step 24).
