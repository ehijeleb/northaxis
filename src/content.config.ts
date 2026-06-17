// Astro content collections config. The `projects` collection backs the Projects/Case studies page
// and is wired to Sveltia CMS in Phase F (Step 19) so the client can add case studies without a
// developer. `team` and a `site` singleton are added in Step 19.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    clientType: z.string(),
    serviceLine: z.enum([
      'Procurement, supply chain & logistics',
      'ICT services',
      'Energy & sustainability',
      'Consultancy',
    ]),
    location: z.string().optional(),
    /** Free-text date or year, e.g. "2025". Kept as string for easy CMS editing. */
    date: z.string().optional(),
    scope: z.string(),
    outcome: z.string(),
    /** Display order — higher first. */
    order: z.number().default(0),
    /** Drafts are excluded from the live grid. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
