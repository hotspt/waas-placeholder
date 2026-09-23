import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import client from './src/data/client.json' with { type: 'json' };

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
        const p = new URL(item.url).pathname;
        const s = BASE_PATH && p.startsWith(BASE_PATH) ? p.slice(BASE_PATH.length) || '/' : p;
        if (s === '/' || s === '') { item.priority = 1.0; item.changefreq = 'weekly'; }
        else if (s.startsWith('/services/')) { item.priority = 0.9; item.changefreq = 'monthly'; }
        else if (/^\/service-area\/[^/]+\/?$/.test(s)) { item.priority = 0.7; item.changefreq = 'monthly'; }
        else if (/^\/service-area\/[^/]+\/[^/]+\/?$/.test(s)) { item.priority = 0.6; item.changefreq = 'monthly'; }
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
