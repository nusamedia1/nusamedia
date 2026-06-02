// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { supabase } from '../lib/supabase';

// Wajib false karena mengambil data dinamis dari Supabase secara real-time
export const prerender = false; 

export const GET: APIRoute = async () => {
  // Ambil data slug dan tanggal pembuatan dari tabel berita
  const { data: listArtikel, error } = await supabase
    .from('berita')
    .select('slug, created_at')
    .order('created_at', { ascending: false });

  // Antisipasi jika koneksi Supabase gagal/error agar server tidak crash
  if (error) {
    console.error("Gagal mengambil data untuk sitemap:", error.message);
  }

  const domainUtama = "https://nusamedia-11t.pages.dev";

  // PERBAIKAN: Menggunakan skema URL standar sitemaps.org yang dikenali Google
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
    <loc>${domainUtama}/berita/${art.slug}</loc>
    <lastmod>${art.created_at ? new Date(art.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>`).join('\n') : ''}
</urlset>`.trim();

  // Kembalikan respons objek Response dengan Content-Type XML
  return new Response(XMLMurni, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600' // Menghemat kuota baca database selama 1 jam
    },
  });
};
