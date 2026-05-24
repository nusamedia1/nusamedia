import { createClient } from '@supabase/supabase-js'

// Mengakali sistem dengan menaruh string koneksi asli secara langsung
const supabaseUrl = "https://zmvlvzspjohrewjbtfxc.supabase.co" 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptdmx2enNwam9ocmV3amJ0ZnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTM0MTAsImV4cCI6MjA5NDU4OTQxMH0.PtTVq_b4gLonRpNSbPYKncoXlGVS1lKaADy74dbhuSI" 

export const supabase = createClient(supabaseUrl, supabaseKey)
