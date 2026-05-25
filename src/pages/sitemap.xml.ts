// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { supabase } from '../lib/supabase';

export const prerender = true;

export const GET: APIRoute = async () => {
  // 1. Ambil data dari database Supabase
  const { data: listArtikel } = await supabase
    .from('berita')
    .select('id, created_at')
    .order('created_at', { ascending: false });

  const domainUtama = "https://nusa-media.vercel.app";

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
    <loc>${domainUtama}/berita/${art.id}</loc>
    <lastmod>${art.created_at ? new Date(art.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>`).join('\n') : ''}
</urlset>`.trim();

  // 3. Kembalikan respons objek Response dengan Content-Type XML
  return new Response(XMLMurni, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
