import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid', // 💡 Diubah ke hybrid untuk membongkar bug compiler Vite
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
