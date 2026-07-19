// src/components/auth/SignInForm.js
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '../../../shared/api/supabaseClient';
import { ChangePasswordOverlay } from '../../../components/auth/ChangePasswordOverlay';

export function SignInForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState('idle'); // 'idle' | 'submitting' | 'must_change_password'

  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

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

  /**
   * Normalizes incoming phone inputs to match standard E.164 expected format.
   * - Strips all non-digit characters out.
   * - Assumes a 10-digit number without an explicit country code prefix is local (+91).
   * - Restores the leading '+' symbol to comply with strict Supabase requirements.
   */
  const normalizePhone = (raw) => {
    const cleaned = raw.replace(/\D/g, ''); 
    if (!cleaned) return '';
    
    const standardDigits = cleaned.length === 10 ? `91${cleaned}` : cleaned;
    return `+${standardDigits}`;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!phone || !password) {
      setError('Enter your phone number and password.');
      return;
    }
    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification.');
      return;
    }

    setStage('submitting');

    try {
      const normalized = normalizePhone(phone);
      if (!normalized) {
        throw new Error('Please enter a valid phone number.');
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        phone: normalized,
        password,
        options: {
          captchaToken,
        },
      });

      if (authError) throw authError;

      const mustChangePassword = data.user?.user_metadata?.must_change_password === true;

      if (mustChangePassword) {
        setStage('must_change_password');
        return;
      }

      setStage('idle');
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
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSignIn} className="auth-form" noValidate>
      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91XXXXXXXXXX"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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