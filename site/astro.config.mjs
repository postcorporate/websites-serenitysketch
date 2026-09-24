import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkPullQuote } from './src/lib/remark-pull-quote.mjs';

export default defineConfig({
  site: 'https://serenitysketch.com',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkPullQuote],
  },
});
