import { createClient } from '@supabase/supabase-js'

// Menggunakan variabel privat (tanpa kata PUBLIC_) agar aman di sisi server
const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY

// Nilai cadangan privat agar server build tetap berjalan mulus
const fallbackUrl = "https://gnuxrjwiyiikkyjxgzff.supabase.co"
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdudXhyandpeWlpa2t5anhnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTQyOTQsImV4cCI6MjA5NTE5MDI5NH0.OFjoavfuIebaPiSLSgDyf-rUbfyzfvf9dibRgkmoNDg"

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseKey || fallbackKey
)
