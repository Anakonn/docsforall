import type starlight from '@astrojs/starlight';
type StarlightSidebarConfig = NonNullable<Parameters<typeof starlight>[0]['sidebar']>;

export const Sidebar: StarlightSidebarConfig = [
  {
    label: 'Astro Starlight',
    items: [
      { label: '시작하기', slug: 'astro-starlight/getting-started' },
      { label: 'Cloudflare 배포', slug: 'astro-starlight/deploy-cloudflare' },
    ],
  },
];
