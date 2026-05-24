import dotenv from 'dotenv';
dotenv.config();

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

console.log("=== ANALISIS KARAKTER API KEY ===");
console.log(`1. Panjang URL: ${url.length} karakter`);
console.log(`2. Panjang API Key: ${key.length} karakter`);
console.log(`3. 3 Huruf Pertama Key: "${key.substring(0, 3)}"`);
console.log(`4. 3 Huruf Terakhir Key: "${key.substring(key.length - 3)}"`);

// Memeriksa spasi gaib
if (key.startsWith(' ') || key.endsWith(' ')) {
  console.log("❌ BAHAYA: Ada spasi tersembunyi di awal atau akhir file .env Anda!");
} else {
  console.log("✔ Tidak ada spasi gaib di ujung-ujung kunci.");
}

// Memeriksa tanda kutip gaib
if (key.startsWith('"') || key.startsWith("'")) {
  console.log("❌ BAHAYA: Hapus tanda kutip di file .env Anda! Tulis langsung tanpa kutip.");
}
