// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { supabase } from '../lib/supabase';

export const prerender = false; 

export const GET: APIRoute = async () => {
  const { data: listArtikel } = await supabase
    .from('berita')
    .select('slug, created_at')
    .order('created_at', { ascending: false });

  const domainUtama = "https://nusamedia-11t.pages.dev";

  // Perbaikan: Menghilangkan semua tab/spasi di awal baris agar XML murni bersih
  let itemArtikel = '';
  if (listArtikel) {
    itemArtikel = listArtikel.map((art) => {
      const tanggal = art.created_at ? new Date(art.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      // Pastikan slug dipaksa menjadi huruf kecil agar seragam
      const slugBersih = art.slug.toLowerCase(); 
      return `<url><loc>${domainUtama}/berita/${slugBersih}</loc><lastmod>${tanggal}</lastmod><priority>0.8</priority><changefreq>daily</changefreq></url>`;
    }).join('');
  }

  // Teks XML ditaruh tanpa ada spasi atau baris kosong di awal tag <?xml
  const XMLMurni = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://sitemaps.org"><url><loc>${domainUtama}/</loc><priority>1.0</priority><changefreq>hourly</changefreq></url><url><loc>${domainUtama}/syarat/</loc><priority>0.3</priority></url>${itemArtikel}</urlset>`;

  return new Response(XMLMurni, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    },
  });
};
