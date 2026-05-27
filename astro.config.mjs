// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 1. Ubah output ke "server" agar fitur hitungan pembaca (views) & SSR berjalan real-time
  output: 'server',
  
  // 2. Pasang adapter resmi Cloudflare agar Astro mengenali runtime Cloudflare Pages
  adapter: cloudflare({
    imageService: 'cloudflare'
  })
});
