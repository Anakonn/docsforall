// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { sidebar } from './sidebar';

const site = 'https://docsforall.com';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'My Docs',
      locales: {
        root: {
          label: '한국어',
          lang: 'ko',
        },
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'sitemap',
            href: '/sitemap-index.xml',
          },
        },
        // Add ICO favicon fallback for Safari.
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: '32x32',
          },
        },
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2130210715518535',
            crossorigin: 'anonymous',
          },
        },
      ],
      // social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      logo: {
        light: './src/assets/docsfa-logo.svg',
        dark: './src/assets/docsfa-logo-dark.svg',
        alt: 'Docs for All Logo',
        replacesTitle: true,
      },
      sidebar,
    }),
    sitemap(),
  ],

  adapter: cloudflare(),
});
