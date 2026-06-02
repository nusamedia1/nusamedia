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

  let itemArtikel = '';
  if (listArtikel) {
    itemArtikel = listArtikel.map((art) => {
      const tanggal = art.created_at ? new Date(art.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      const slugBersih = art.slug.toLowerCase(); 
      return `<url><loc>${domainUtama}/berita/${slugBersih}</loc><lastmod>${tanggal}</lastmod><priority>0.8</priority><changefreq>daily</changefreq></url>`;
    }).join('');
  }

  // PERBAIKAN: Menggunakan atribut xmlns standar resmi Google (wajib menggunakan schemas/sitemap/0.9)
  const XMLMurni = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://sitemaps.org"><url><loc>${domainUtama}/</loc><priority>1.0</priority><changefreq>hourly</changefreq></url><url><loc>${domainUtama}/syarat/</loc><priority>0.3</priority></url>${itemArtikel}</urlset>`;

  return new Response(XMLMurni, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff', // Memaksa Cloudflare agar tidak mengubah tipe data menjadi text/html
      'Cache-Control': 'public, max-age=3600'
    },
  });
};
