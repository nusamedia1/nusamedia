import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Memberikan nilai cadangan langsung agar tidak memicu error "supabaseUrl is required"
export const supabase = createClient(
  supabaseUrl || "https://gnuxrjwiyiikkyjxgzff.supabase.co", 
  supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdudXhyandpeWlpa2t5anhnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTQyOTQsImV4cCI6MjA5NTE5MDI5NH0.OFjoavfuIebaPiSLSgDyf-rUbfyzfvf9dibRgkmoNDg"
)
