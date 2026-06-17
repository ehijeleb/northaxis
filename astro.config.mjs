// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// NOTE: `site` is the placeholder domain (unconfirmed). Logged in docs/BLOCKED_CONTENT.md.
// Output is `static` by default; content pages prerender for the performance budget. Form
// endpoints (Phase F, Step 18) opt into on-demand rendering per-route with `export const
// prerender = false`. The Vercel adapter supports this hybrid model. See docs/DECISIONS.md.
export default defineConfig({
  site: 'https://northaxisintegrated.com',
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
