// src/shared/api/client.js

import axios from 'axios';
import { supabase } from './supabaseClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request interceptor: live session lookup for token freshness -------
//
// Reads the token from supabase.auth.getSession() on every request instead
// of a static localStorage key, so a background token rotation
// (autoRefreshToken) is always reflected. Guarded for SSR: on the server
// there's no browser session to read.
apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.warn('Could not read Supabase session for outgoing request:', error.message);
      }
      const token = data?.session?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // NOTE: on the server (SSR / route handlers / RSC) this interceptor
    // sends the request with no Authorization header unless the caller
    // attaches one explicitly. If any dashboard needs authenticated
    // server-side requests (e.g. via a cookie-based session helper), that's
    // a separate code path — not assumed here, flag it if it's needed.
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response interceptor: distinguish unlinked-account vs RBAC 403 -----
//
// auth.go returns 403 for two different situations that need different
// frontend reactions:
//   1. Unlinked/unknown account: the Supabase session is valid, but there's
//      no matching row in the Go `users` table. This session can never
//      succeed against the backend, so force sign-out + redirect.
//   2. RBAC role mismatch: the user is authenticated and known, just not
//      authorized for this resource. Do NOT sign them out — let the
//      calling UI show an in-place "Unauthorized access" message.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      const detail = error.response.data?.detail || '';

      const isUnlinkedAccount =
        detail.includes('account not found') || detail.includes('unable to verify');

      if (isUnlinkedAccount) {
        if (typeof window !== 'undefined') {
          await supabase.auth.signOut();
          window.location.href = '/login?error=unlinked_account';
        }
      } else {
        // RBAC mismatch: annotate the error so calling code can render an
        // in-place message without re-parsing `detail` itself.
        error.isRbacMismatch = true;
        error.friendlyMessage = 'Unauthorized access.';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;