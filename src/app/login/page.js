'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  // Pure Client Mock State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [btnText, setBtnText] = useState('Login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hardcoded Frontend Role-Routing Engine
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    setBtnText('Checking...');

    // Simulate Network Latency
    setTimeout(() => {
      const parsedUser = username.trim().toLowerCase();

      if (parsedUser === 'parent' || parsedUser === 'sarah') {
        router.push('/parent');
      } else if (parsedUser === 'teacher' || parsedUser === 'jenkins') {
        router.push('/teacher');
      } else if (parsedUser === 'principal') {
        router.push('/principal');
      } else {
        // Default Fallback / User Info catch-all
        setErrorMessage('Invalid credentials. Hint: Use "parent", "teacher", or "principal".');
        setIsSubmitting(false);
        setBtnText('Login');
      }
    }, 1200);
  };

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
        
        {/* Subtle Decorative Rainbow Ring Top */}
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
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-100">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 px-1" htmlFor="username">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none text-sm">👤</span>
                <input 
                  id="username"
                  type="text"
                  placeholder="Enter parent, teacher, or principal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
                className={`w-full h-14 text-white font-bold text-sm rounded-full transition active:scale-[0.97] flex items-center justify-center gap-2 shadow-md bg-gradient-to-b from-[#4f9dff] to-[#005fb0] ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
              >
                <span>{btnText}</span>
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
