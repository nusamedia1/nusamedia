// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";

console.info("Robot NewsAPI Nusa Media dengan Jalur Proksi dimulai");

export default {
  fetch: withSupabase({ auth: ["secret"] }, async (req, ctx) => {
    try {
      // 1. Ambil API Key dari rahasia cloud Supabase
      const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY') ?? '';
      const supabase = ctx.supabase;

      if (!NEWS_API_KEY) {
        throw new Error("Kunci rahasia NEWS_API_KEY belum diatur di dashboard Supabase!");
      }

      // 🔥 PERBAIKAN SINTAKSIS 1: Menggunakan tanda $ pada template literals agar variabel terbaca
      // Menembak berita bisnis terbaru di Indonesia berbahasa Indonesia (id)
      const urlAsli = `https://newsapi.org{sb_publishable_mn4S6SOa-l6ppK8Yf2zTcQ_gok7iUn7}`;

      // 🔥 PERBAIKAN SINTAKSIS 2: Menggunakan tanda $ pada template literals sebelum encodeURIComponent
      const urlProxy = `https://allorigins.win{encodeURIComponent(urlAsli)}`;
      const responProxy = await fetch(urlProxy);
      
      if (!responProxy.ok) {
        throw new Error(`Gagal menghubungi server proksi: ${responProxy.statusText}`);
      }

      const dataProxy = await responProxy.json();
      
      // Mengubah string teks hasil proksi kembali menjadi format JSON data berita asli
      const dataNews = JSON.parse(dataProxy.contents);

      if (!dataNews || dataNews.status === "error") {
        return Response.json({ error: dataNews?.message || "Gagal menembus proksi." }, { status: 400 });
      }

      if (!dataNews.articles || dataNews.articles.length === 0) {
        return Response.json({ pesan: "Tidak ada berita baru disedot." }, { status: 200 });
      }

      // 4. Tarik semua judul lama di database agar tidak duplikat
      const { data: listBeritaAda } = await supabase.from('berita').select('judul');
      const setJudulAda = new Set(listBeritaAda?.map(b => b.judul) || []);
      const dataAkanDimasukkan = [];

      // 5. Olah data struktur artikel NewsAPI ke format tabel Anda
      for (const artikel of dataNews.articles) {
        if (!artikel.title || !artikel.description) continue;
        if (setJudulAda.has(artikel.title)) continue; 

        // Pembuatan slug otomatis ramah SEO mesin pencari Google
        const slug = artikel.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        dataAkanDimasukkan.push({
          kategori: "TREN UTAMA",
          judul: artikel.title,
          slug: slug,
          ringkasan: artikel.description,
          sumber: artikel.source.name || "Nusa Media Regional",
          url_sumber: artikel.url,
          gambar_url: artikel.urlToImage || "https://unsplash.com", 
          id_video_youtube: "dQw4w9WgXcQ", 
          status: "Terbit", 
          is_utama: false
        });
      }

      // 6. Masukkan data sekaligus jika ada artikel baru
      if (dataAkanDimasukkan.length > 0) {
        const { error: insertError } = await supabase.from('berita').insert(dataAkanDimasukkan);
        if (insertError) throw new Error(insertError.message);
      }

      return Response.json({
        sukses: true,
        pesan: `Robot NewsAPI berhasil! Menambahkan ${dataAkanDimasukkan.length} berita baru lewat proksi.`
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return Response.json({ error: errorMessage }, { status: 500 });
    }
  }),
};
