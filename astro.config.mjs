import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid', 
  adapter: cloudflare(), // Biarkan kosong atau default jika tidak ada opsi rute khusus
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop' // Pasang di sini untuk mematikan Sharp secara global
    }
  },
  integrations: [tailwind({
    applyBaseStyles: false 
  })],
});
