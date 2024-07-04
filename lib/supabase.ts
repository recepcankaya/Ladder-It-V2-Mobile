import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOCAL_SUPABASE_ANON_KEY, LOCAL_SUPABASE_URL} from '@env'

const supabase = createClient<DB>(
  LOCAL_SUPABASE_URL!,
  LOCAL_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;
