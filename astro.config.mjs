import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkCallout from './src/plugins/remark-callout.mjs';
import shikiToolbar from './src/plugins/shiki-toolbar.mjs';
import { site } from './site.config.mjs';

export default defineConfig({
  // Required for RSS generation. Replace with your real domain.
  site: site.url,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallout],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [shikiToolbar()]
    }
  }
});
