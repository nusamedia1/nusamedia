import { createClient } from '@supabase/supabase-js'

// Menggunakan import.meta.env khusus untuk sistem Astro
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Nilai cadangan langsung agar server Astro tidak crash saat memuat halaman
export const supabase = createClient(
  supabaseUrl || "https://gnuxrjwiyiikkyjxgzff.supabase.co", 
  supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdudXhyandpeWlpa2t5anhnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTQyOTQsImV4cCI6MjA5NTE5MDI5NH0.OFjoavfuIebaPiSLSgDyf-rUbfyzfvf9dibRgkmoNDg"
)
