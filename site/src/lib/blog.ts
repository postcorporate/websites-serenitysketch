import { getCollection, type CollectionEntry } from 'astro:content';

export const BLOG_CATEGORIES = [
  "Founder's Path",
  'Practice & Self-Care',
  'Inspirations',
  'News & Updates',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const SLUG_BY_CATEGORY: Record<BlogCategory, string> = {
  "Founder's Path": 'founders-path',
  'Practice & Self-Care': 'practice-self-care',
  Inspirations: 'inspirations',
  'News & Updates': 'news-updates',
};

export const CATEGORY_LEADS: Record<BlogCategory, string> = {
  "Founder's Path":
    'Personal notes on leaving finance, learning to pause, and building Serenity Sketch.',
  'Practice & Self-Care':
    'Why the practice works: letting go, self-care, and painting with water.',
  Inspirations:
    'Games, films, books, and traditions that shaped the work.',
  'News & Updates':
    'Launches, milestones, and what is new in Serenity Sketch.',
};

/** Non-draft posts in production; drafts included in `astro dev`. Newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft || import.meta.env.DEV);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function categorySlug(category: string): string {
  return SLUG_BY_CATEGORY[category as BlogCategory] ?? slugify(category);
}

export function categoryHref(category: string): string {
  return `/blog/category/${categorySlug(category)}`;
}

export function formatBlogDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function studioHref(slug: string): string {
  const url = new URL('https://coppercoin.nl');
  url.searchParams.set('utm_source', 'blog');
  url.searchParams.set('utm_medium', 'content');
  url.searchParams.set('utm_campaign', 'sersk-launch');
  url.searchParams.set('utm_content', slug);
  return url.toString();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
