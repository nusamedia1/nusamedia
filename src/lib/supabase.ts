import { createClient } from '@supabase/supabase-js'

// Definisikan langsung kredensial Supabase Anda di sini
const supabaseUrl = "https://gnuxrjwiyiikkyjxgzff.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdudXhyandpeWlpa2t5anhnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTQyOTQsImV4cCI6MjA5NTE5MDI5NH0.OFjoavfuIebaPiSLSgDyf-rUbfyzfvf9dibRgkmoNDg"

// Inisialisasi client yang pasti valid di lokal maupun produksi Cloudflare
export const supabase = createClient(supabaseUrl, supabaseKey)
