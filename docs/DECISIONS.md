# Decisions log

Running log of non-obvious choices. Newest first.

---

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
