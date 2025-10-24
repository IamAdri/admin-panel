import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ydghorluedeqhuwnokqn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZ2hvcmx1ZWRlcWh1d25va3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NjAxOTMsImV4cCI6MjA2NjMzNjE5M30.eeR-MGRRZivlr7KJD2KT1RxgJqzl7UY46SXcoxlrMHU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
