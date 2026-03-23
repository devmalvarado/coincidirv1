import { defineConfig } from 'astro/config';

// Salida estática: Hostinger, Cloudflare Pages, etc.
export default defineConfig({
  output: 'static',
  site: 'https://www.coincidir.social',
});
