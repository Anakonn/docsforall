import type { StarlightUserConfig } from '@astrojs/starlight/types';
import { astroStarlightSidebar } from './astro-starlight';
import { geminiCliSidebar } from './gemini-cli';

export const sidebar = [
  ...astroStarlightSidebar,
  ...geminiCliSidebar,
] satisfies StarlightUserConfig['sidebar'];
