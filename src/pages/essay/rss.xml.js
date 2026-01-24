import rss from '@astrojs/rss';
import { getPublished } from '../../lib/content';
import { site } from '../../../site.config.mjs';

export async function GET(context) {
  const essays = await getPublished('essay', {
    includeDraft: false,
    orderBy: (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  });

  return rss({
    title: `${site.title} · 随笔`,
    description: '随笔与杂记更新',
    site: context.site,
    items: essays.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.description,
      link: `/essay/${e.data.slug ?? e.id}/`
    }))
  });
}
