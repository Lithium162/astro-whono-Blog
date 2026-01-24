import rss from '@astrojs/rss';
import { getPublished } from '../lib/content';
import { site } from '../../site.config.mjs';

export async function GET(context) {
  const posts = await getPublished('posts', { includeDraft: false });
  const essays = await getPublished('essay', { includeDraft: false });

  const merged = [
    ...posts.map((entry) => ({ type: 'posts', entry })),
    ...essays.map((entry) => ({ type: 'essay', entry }))
  ].sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: merged.map(({ type, entry }) => {
      const slug = entry.data.slug ?? entry.id;
      return {
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.description,
        link: type === 'posts' ? `/posts/${slug}/` : `/essay/${slug}/`
      };
    })
  });
}
