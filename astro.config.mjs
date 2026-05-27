import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 💡 SOLUSI FINAL: Mengubah ke static agar Vite sukses membuat folder dist
  output: 'static', 
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
