"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("teacher@test.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Hardcoded directly to your local backend to completely bypass environment cache bugs
      const response = await fetch("http://65.2.197.151/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }

      const data = await response.json();
      if (data.token || data.success) {
        router.push("/teacher");
      } else {
        setError("Authentication failed.");
      }
    } catch (err) {
      setError(err.message || "Failed to connect to local backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-sm border border-gray-100 mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-blue-50 rounded-full mb-4 text-xl">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Iris World School</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back to our learning family</p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-red-600 bg-red-50 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-sm text-gray-400">✉️</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="teacher@test.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-sm text-gray-400">🔑</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-16 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-xs font-bold text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500/20" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-sm shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Need help? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Administrator</a>
          </p>
        </div>
      </div>
    </div>
  );
}
