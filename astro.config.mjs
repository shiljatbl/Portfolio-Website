// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://goranljiljak.com',
  favicon: '/favicon.svg',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sr', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});