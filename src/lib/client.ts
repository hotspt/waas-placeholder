import clientData from '../data/client.json';

export const client = clientData;
export const telHref = `tel:${client.phone.replace(/[^0-9+]/g, '')}`;
export const cityState = `${client.address.city}, ${client.address.state}`;

// Base path on GitHub Pages, empty on custom domain.
export const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

// Prefix a root-relative path with the base path.
export const url = (path: string) => `${base}${path}`;

// Absolute site URL including base, no trailing slash.
const SITE = import.meta.env.SITE || 'http://localhost:4321';
export const siteUrl = new URL(import.meta.env.BASE_URL || '/', SITE)
  .toString()
  .replace(/\/$/, '');
