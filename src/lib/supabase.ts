import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://pghzvtneghteglbxlrti.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_jAoaXLzGFI80zNyMtIZWHw_OobGiFee';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
