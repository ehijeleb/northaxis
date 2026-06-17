# Decisions log

Running log of non-obvious choices. Newest first.

---

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
