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

      // Alamat asli NewsAPI lengkap dengan kategori berita bisnis/tren Indonesia
      const urlAsli = `https://newsapi.org{NEWS_API_KEY}`;

      // 2. Tembak melalui proksi allorigins dengan format parameter yang benar (?url=)
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

      // 3. Tarik semua judul lama di database agar tidak duplikat
      const { data: listBeritaAda } = await supabase.from('berita').select('judul');
      const setJudulAda = new Set(listBeritaAda?.map(b => b.judul) || []);
      const dataAkanDimasukkan = [];

      // 4. Olah data struktur artikel NewsAPI ke format tabel Anda
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
          gambar_url: artikel.urlToImage || "https://unsplash.com", // Gambar cadangan elegan jika kosong
          id_video_youtube: "dQw4w9WgXcQ", 
          status: "Terbit", 
          is_utama: false
        });
      }

      // 5. Masukkan data sekaligus jika ada artikel baru
      if (dataAkanDimasukkan.length > 0) {
        const { error: insertError } = await supabase.from('berita').insert(dataAkanDimasukkan);
        if (insertError) throw new Error(insertError.message);
      }

      return Response.json({
        sukses: true,
        pesan: `Robot NewsAPI berhasil! Menambahkan ${dataAkanDimasukkan.length} berita baru lewat proksi.`
      });

    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }),
};
