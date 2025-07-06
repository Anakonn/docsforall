import type { StarlightUserConfig } from '@astrojs/starlight/types';

export const astroStarlightSidebar = [
  {
    label: 'Astro Starlight',
    items: [
      { label: '시작하기', slug: 'astro-starlight/getting-started' },
      { label: 'Cloudflare 배포', slug: 'astro-starlight/deploy-cloudflare' },
    ],
  },
] satisfies StarlightUserConfig['sidebar']; 