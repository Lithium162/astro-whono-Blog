const rawSiteUrl = (process.env.SITE_URL ?? '').trim();
const siteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/+$/, '') : '';
const hasSiteUrl = siteUrl.length > 0;
const fallbackSiteUrl = 'https://example.invalid';

if (!hasSiteUrl && process.env.NODE_ENV === 'production') {
  console.warn(
    '[astro-whono] SITE_URL is not set. RSS will use example.invalid; canonical/og will be relative.'
  );
}

export const site = {
  url: hasSiteUrl ? siteUrl : fallbackSiteUrl,
  title: 'Astro Themes by Whono',
  brandTitle: 'Whono',
  author: 'Whono',
  description: '一个 Astro 主题的展示站：轻量、可维护、可复用。'
};

export const PAGE_SIZE_POSTS = 12;
export const PAGE_SIZE_ESSAY = 12;

export { hasSiteUrl, siteUrl };
