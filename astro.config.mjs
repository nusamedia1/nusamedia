import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server', // 💡 Ubah ke server agar Astro membangun file _worker.js tunggal
  adapter: cloudflare(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  integrations: [tailwind({
    applyBaseStyles: false 
  })],
});
