'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../shared/api/supabaseClient';
import { ChangePasswordOverlay } from '../../components/auth/ChangePasswordOverlay';

export default function LoginPage() {
  const router = useRouter();

  // Core Authentication Component States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [stage, setStage] = useState('idle'); // 'idle' | 'submitting' | 'must_change_password'

  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  // --- Load + render the Cloudflare Turnstile widget dynamically -----------
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

  // --- Parse URL search parameters safely for unlinked accounts ----------
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('error') === 'unlinked_account') {
        setErrorMessage('Your authentication account is valid, but no matching local software record was found.');
      }
    }
  }, []);

  // --- Monitor auth changes for structural RBAC role-routing -------------
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const user = session.user;
        
        // Prevent race conditions from bypassing the forced overlay structure
        if (user?.user_metadata?.must_change_password === true) {
          return;
        }

        try {
          const role = user?.user_metadata?.role || 'parent';
          
          switch (role.toLowerCase()) {
            case 'principal':
              router.push('/principal');
              break;
            case 'teacher':
              router.push('/teacher');
              break;
            case 'parent':
            default:
              router.push('/parent');
              break;
          }
        } catch (err) {
          setErrorMessage('Failed to determine user access configuration.');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // --- Secure Sign In Submit Pipeline ------------------------------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }
    if (!captchaToken) {
      setErrorMessage('Please complete the CAPTCHA verification.');
      return;
    }

    setStage('submitting');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
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
      setErrorMessage(err?.message || 'Authentication failed.');
      resetCaptcha();
      setStage('idle');
    }
  };

  // Intercept view layer if the account relies on a temporary credential setup
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
    <div className="flex items-center justify-center min-h-screen font-sans bg-[#F8FAFF] text-[#111c2c] p-4 relative overflow-x-hidden">
      
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <span className="absolute top-20 left-[10%] text-[120px] text-blue-100 opacity-30 select-none">☁</span>
        <span className="absolute bottom-40 right-[15%] text-[100px] text-yellow-100 opacity-40 select-none">☁</span>
        <span className="absolute top-10 right-10 text-[60px] text-yellow-200 opacity-40 animate-pulse select-none">☀️</span>
      </div>

      {/* --- LOGIN FRAMEWORK SHELL --- */}
      <main className="relative z-10 w-full max-w-md">
        
        {/* Decorative Rainbow Ring Top */}
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-12 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 w-24 h-24 rounded-full border-[8px] border-yellow-200 opacity-40"></div>
            <div className="absolute inset-x-0 bottom-0 w-24 h-24 rounded-full border-[8px] border-blue-200 opacity-50 scale-90"></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,95,176,0.15)] backdrop-blur-sm">
          
          {/* Branding Header */}
          <header className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#005fb0] mb-4 text-2xl font-bold">
              📖
            </div>
            <h1 className="text-2xl font-bold text-[#005fb0] mb-1">Iris World School</h1>
            <p className="text-xs text-gray-400">Welcome back to our learning family</p>
          </header>

          {/* Form Processing */}
          <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
            
            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-100 animate-fadeIn" role="alert">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Email Address Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 px-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none text-sm">👤</span>
                <input 
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={stage === 'submitting'}
                  className="w-full h-14 pl-10 pr-4 bg-gray-50 border-transparent rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#005fb0] transition placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 px-1" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none text-sm">🔒</span>
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={stage === 'submitting'}
                  className="w-full h-14 pl-10 pr-12 bg-gray-50 border-transparent rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#005fb0] transition placeholder:text-gray-300"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-xs font-bold text-gray-400 hover:text-[#005fb0] transition"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Captcha Block Anchor */}
            <div ref={turnstileRef} className="flex justify-center my-2 min-h-[65px]" />

            {/* Options Row */}
            <div className="flex items-center justify-between px-1 text-xs font-medium text-gray-400">
              <label className="flex items-center cursor-pointer select-none group">
                <input type="checkbox" className="rounded border-gray-200 text-[#005fb0] focus:ring-[#005fb0]/20 bg-gray-50 w-4 h-4" />
                <span className="ml-1.5 group-hover:text-gray-600 transition">Remember me</span>
              </label>
              <a className="text-[#005fb0] hover:underline" href="#">Forgot password?</a>
            </div>

            {/* Submit Control */}
            <div className="pt-2">
              <button 
                type="submit"
                disabled={stage === 'submitting' || !captchaToken}
                className={`w-full h-14 text-white font-bold text-sm rounded-full transition active:scale-[0.97] flex items-center justify-center gap-2 shadow-md bg-gradient-to-b from-[#4f9dff] to-[#005fb0] ${(stage === 'submitting' || !captchaToken) ? 'opacity-60 pointer-events-none shadow-none' : ''}`}
              >
                <span>{stage === 'submitting' ? 'Checking...' : 'Login'}</span>
                <span className="text-xs">➔</span>
              </button>
            </div>
          </form>

          {/* Footer Branding Hooks */}
          <footer className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
            <p>Need help? <a className="text-[#005fb0] font-semibold hover:underline" href="#">Contact Administrator</a></p>
            <div className="mt-4 flex justify-center gap-4 text-[9px] font-bold uppercase tracking-wider text-gray-300">
              <span>🛡 Secure Portal</span>
              <span>📄 Privacy Policy</span>
            </div>
          </footer>

        </div>

        <div className="mt-4 text-center opacity-40 text-[10px] font-semibold text-gray-400">
          © 2026 Iris World School Educational Systems
        </div>
      </main>

    </div>
  );
}