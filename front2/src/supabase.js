import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://tafjyavfpqrkaxwrprfm.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZmp5YXZmcHFya2F4d3JwcmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTEzNjEsImV4cCI6MjA5MDcyNzM2MX0._mlyvu5tIeCMCefL2OivUBNd5HccD67od5vcPjx-skQ"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)