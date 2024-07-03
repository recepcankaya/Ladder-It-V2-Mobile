import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_SUPABASE_URL, LOCAL_SUPABASE_ANON_KEY } from "@env";
const SUPABASE_ANON_KEY = LOCAL_SUPABASE_ANON_KEY;
const SUPABASE_URL = LOCAL_SUPABASE_URL;
console.log("supabase", SUPABASE_URL, SUPABASE_ANON_KEY);
const supabase = createClient<DB>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export function createSupabaseClient(accessToken: string) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

export const secretSupabase = createClient(
  "https://gittjeqpqcmmbterylkd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpdHRqZXFwcWNtbWJ0ZXJ5bGtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTIwNDM2NCwiZXhwIjoyMDI0NzgwMzY0fQ.Y5Zp48dzrtSWzatGtTptbYP-fbvhwqTfQHjmBVNRTSg"
);

export default supabase;
