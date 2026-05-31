import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://nusamedia-11t.pages.dev',
  integrations: [tailwind()],
  // Tambahkan baris di bawah ini untuk memperbaiki error biner Node.js fs
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  }
});
