import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import client from './src/data/client.json' with { type: 'json' };

// These two constants are patched by the GitHub Actions workflow for GitHub Pages.
// For a custom-domain deploy, leave both empty and set client.domain instead.
const SITE_OVERRIDE = '';
const BASE_PATH = '';

const site = SITE_OVERRIDE || client.domain;
const base = BASE_PATH || undefined;

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const stripped = BASE_PATH && path.startsWith(BASE_PATH)
          ? path.slice(BASE_PATH.length) || '/'
          : path;

        if (stripped === '/' || stripped === '') {
          item.priority = 1.0; item.changefreq = 'weekly';
        } else if (stripped.startsWith('/services/')) {
          item.priority = 0.9; item.changefreq = 'monthly';
        } else if (/^\/service-area\/[^/]+\/?$/.test(stripped)) {
          item.priority = 0.7; item.changefreq = 'monthly';
        } else if (/^\/service-area\/[^/]+\/[^/]+\/?$/.test(stripped)) {
          item.priority = 0.6; item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
