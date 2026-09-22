import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Josh Veit'),
    category: z.enum(["Founder's Path", 'Practice & Self-Care', 'Inspirations', 'News & Updates']),
    tags: z.array(z.string()).default([]),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    pullQuote: z.string().optional(),
    pullQuoteAttr: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
