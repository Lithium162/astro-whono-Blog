import rss from '@astrojs/rss';
import { getPublished } from '../../lib/content';
import { site } from '../../../site.config.mjs';

export async function GET(context) {
  const posts = await getPublished('posts', {
    includeDraft: false,
    orderBy: (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  });

  return rss({
    title: `${site.title} · 文章归档`,
    description: '长文更新',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.data.slug ?? post.id}/`
    }))
  });
}
