// src/shared/api/supabaseClient.js
//
// Single Supabase client instance shared across all dashboards in the
// Next.js app. Everything else (client.js, SignInForm.js,
// ChangePasswordOverlay.js) imports `supabase` from here.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail loudly at startup instead of shipping a client that 401s/403s on
  // every request. Set these in each dashboard's .env(.local).
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Set these before starting the app.'
  );
}

const isBrowser = typeof window !== 'undefined';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Guard these against SSR/RSC execution, where there's no browser
    // storage to persist a session into or a URL fragment to detect a
    // token from.
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser,
  },
});