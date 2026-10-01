import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qaibequvikysdxwgmyqw.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaWJlcXV2aWt5c2R4d2dteXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MzY0MzIsImV4cCI6MjEwNjQxMjQzMn0.Kly2_evTNlcZhRAHcDTYL3hSiS60oHMzFuEPC7E4Kag";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
