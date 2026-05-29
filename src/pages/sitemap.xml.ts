// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { supabase } from '../lib/supabase';

// PENTING: Karena kita menarik data dinamis dari Supabase setiap waktu, 
// pastikan sitemap dirender di server secara real-time (prerender = false).
export const prerender = false; 

export const GET: APIRoute = async () => {
  // 1. PERBAIKAN: Ambil kolom 'slug' dari Supabase, bukan lagi 'id'
  const { data: listArtikel } = await supabase
    .from('berita')
    .select('slug, created_at') // <-- Mengubah 'id' menjadi 'slug'
    .order('created_at', { ascending: false });

  // Sesuaikan domain utama Anda (Ganti vercel.app ke pages.dev jika menggunakan Cloudflare)
  const domainUtama = "https://nusaonline.pages.dev";

  // 2. Susun dokumen XML
  const XMLMurni = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://sitemaps.org">
  <!-- Halaman Utama Website -->
  <url>
    <loc>${domainUtama}/</loc>
    <priority>1.0</priority>
    <changefreq>hourly</changefreq>
  </url>
  <url>
    <loc>${domainUtama}/syarat/</loc>
    <priority>0.3</priority>
  </url>

  <!-- Sinkronisasi Daftar Artikel Berita Otomatis -->
  ${listArtikel ? listArtikel.map((art) => `  <url>
    <loc>${domainUtama}/berita/${art.slug}</loc> <!-- 2. PERBAIKAN: Gunakan art.slug bukan art.id -->
    <lastmod>${art.created_at ? new Date(art.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>`).join('\n') : ''}
</urlset>`.trim();

  // 3. Kembalikan respons objek Response dengan Content-Type XML
  return new Response(XMLMurni, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600' // Tambahan opsional: Cache sitemap selama 1 jam agar hemat kuota database
    },
  });
};
