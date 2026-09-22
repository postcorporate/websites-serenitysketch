import { defineConfig } from 'astro/config';
import { remarkPullQuote } from './src/lib/remark-pull-quote.mjs';

export default defineConfig({
  site: 'https://serenitysketch.com',
  outDir: './dist',
  markdown: {
    remarkPlugins: [remarkPullQuote],
  },
});
