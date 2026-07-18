// src/components/auth/SignInForm.js
'use client'; // no-op under the pages router; required if this app uses the App Router.

import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '../../../shared/api/supabaseClient';
import { ChangePasswordOverlay } from '../../../components/auth/ChangePasswordOverlay';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState('idle'); // 'idle' | 'submitting' | 'must_change_password'

  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  // --- Load + render the Turnstile widget once -------------------------
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile"]'
    );
    const script = existingScript || document.createElement('script');

    if (!existingScript) {
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current && turnstileWidgetId.current === null) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
          callback: (token) => setCaptchaToken(token),
          'expired-callback': () => setCaptchaToken(null),
          'error-callback': () => setCaptchaToken(null),
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      script.addEventListener('load', renderWidget);
    }

    return () => {
      script.removeEventListener('load', renderWidget);
      if (window.turnstile && turnstileWidgetId.current !== null) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const resetCaptcha = useCallback(() => {
    if (window.turnstile && turnstileWidgetId.current !== null) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
    setCaptchaToken(null);
  }, []);

  // --- Submit pipeline ---------------------------------------------------
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Enter your email and password.');
      return;
    }
    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification.');
      return;
    }

    setStage('submitting');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken, // forwarded to Supabase's rate-limiting layer
        },
      });

      if (authError) throw authError;

      // Read-side note: this still reads must_change_password off
      // user_metadata, which is separate from the write-side fix (the
      // overlay now clears the flag via the Go backend, not user_metadata
      // directly — see ChangePasswordOverlay.js). If the Go backend is the
      // real source of truth for this flag, this check may eventually want
      // to move to a Go endpoint too, for consistency with the clear path.
      // Leaving as user_metadata per the current directive; flag if that
      // should change.
      const mustChangePassword = data.user?.user_metadata?.must_change_password === true;

      if (mustChangePassword) {
        setStage('must_change_password'); // blocks dashboard routing
        return;
      }

      setStage('idle');
      // Navigation to the dashboard is left to the parent app/router.
    } catch (err) {
      setError(err?.message || 'Authentication failed.');
      resetCaptcha();
      setStage('idle');
    }
  };

  if (stage === 'must_change_password') {
    return (
      <ChangePasswordOverlay
        onComplete={() => {
          setStage('idle');
          // TODO: hand off to the real router to proceed to the dashboard —
          // not assumed here.
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSignIn} className="auth-form" noValidate>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Cloudflare Turnstile explicit anchor */}
      <div ref={turnstileRef} className="my-4" />

      {error && (
        <div className="text-red-500" role="alert">
          {error}
        </div>
      )}

      <button type="submit" disabled={stage === 'submitting' || !captchaToken}>
        {stage === 'submitting' ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}