// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

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
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Astro Starlight',
          items: [
            { label: '시작하기', slug: 'astro-starlight/getting-started' },
            { label: 'Cloudflare 배포', slug: 'astro-starlight/deploy-cloudflare' },
          ],
        },
      ],
    }),
    sitemap(),
  ],

  adapter: cloudflare(),
});
