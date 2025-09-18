import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// In local dev, avoid crashing the app if env vars are missing.
// Provide a no-op client that returns empty data so UI can still render.
let supabase;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env for live data. Falling back to empty datasets.",
  );

  const mockResponse = { data: [], error: null };
  supabase = {
    from() {
      return {
        select() {
          return {
            async order() {
              return mockResponse;
            },
          };
        },
      };
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };