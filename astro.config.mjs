import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind()],
  // Tambahkan baris di bawah ini untuk memperbaiki error biner Node.js fs
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  }
});
