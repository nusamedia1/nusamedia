import { createClient } from '@supabase/supabase-js';

// Koneksi otomatis ke basis data Supabase Anda
const supabase = createClient(
  'https://supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptdmx2enNwam9ocmV3amJ0ZnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTM0MTAsImV4cCI6MjA5NDU4OTQxMH0.PtTVq_b4gLonRpNSbPYKncoXlGVS1lKaADy74dbhuSI'
);

async function klaimBeritaOtomatis() {
  console.log("Memulai penarikan berita otomatis... 🌐");
  try {
    // Menarik berita utama dari agensi berita publik terbuka
    const response = await fetch('https://spaceflightnewsapi.net');
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      for (const artikel of data.results) {
        
        // Memasukkan artikel secara instan ke tabel berita Supabase Anda
        const { error } = await supabase
          .from('berita')
          .insert([
            {
              judul: artikel.title,
              ringkasan: artikel.summary || "Berita terbaru seputar perkembangan teknologi dan informasi nusantara global.",
              isi_konten: `${artikel.summary}\n\nSumber asli rilis publik: ${artikel.url}`,
              kategori: "Teknologi",
              gambar_url: artikel.image_url,
              penulis: artikel.news_site || "Nusa Media Bot",
              created_at: new Date()
            }
          ]);

        if (error) {
          console.log(`Gagal menyimpan artikel: ${error.message}`);
        } else {
          console.log(`🎯 Berhasil mengimpor otomatis: ${artikel.title}`);
        }
      }
      console.log("Proses sinkronisasi otomatis selesai!");
    }
  } catch (err) {
    console.error("Gagal menghubungi feed API eksternal:", err);
  }
}

// Jalankan sistem injeksi data
klaimBeritaOtomatis();
