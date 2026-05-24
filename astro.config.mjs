import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// Konfigurasi Terkunci Nusa Media - Migrasi Cloudflare Runtime 2026
export default defineConfig({
  output: 'hybrid', 
  adapter: cloudflare({
    // Menggunakan pemrosesan gambar internal Cloudflare agar tidak bentrok dengan Sharp
    imageService: 'compile' 
  }),
  integrations: [tailwind({
    // 🔥 PERBAIKAN MUTLAK: Memberitahu Astro agar tidak menyuntikkan gaya Tailwind bawaan kosong, 
    // melainkan dipaksa menggunakan aturan dari file global.css milik Anda.
    applyBaseStyles: false 
  })],
});
