"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Check your credentials.");
      }

      // Store in localStorage for quick client-side hydration check
      localStorage.setItem("imd_admin_session", "true");

      // Redirect to Admin Dashboard
      router.push("/admin-dashboard");
      setTimeout(() => {
        window.location.href = "/admin-dashboard";
      }, 300);
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername("admin");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0c140f] text-white relative overflow-hidden font-sans">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ff9f43]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#004aab]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="p-6 sm:p-8 flex items-center justify-between relative z-10 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff9f43] to-[#004aab] flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            M
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight block text-white">
              Indian Mushroom Days 2027
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-mono">
              Official Admin Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
        >
          &larr; Back to Website
        </Link>
      </header>

      {/* Main Login Card Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl relative"
        >
          {/* Badge & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff9f43]/20 border border-[#ff9f43]/35 text-xs font-bold text-[#ff9f43] uppercase tracking-wider mb-3.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secretariat Access</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
              Sign in to access lead management, visitor accreditations, and stall allocations.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Username / Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#ff9f43] focus:ring-1 focus:ring-[#ff9f43] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#ff9f43] focus:ring-1 focus:ring-[#ff9f43] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#ff9f43] hover:bg-[#f28822] text-white text-sm font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1.5 text-xs text-[#ff9f43] hover:underline cursor-pointer font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click to auto-fill default admin credentials</span>
            </button>
            <p className="text-[11px] text-gray-400 mt-1">
              Username: <code className="text-gray-200">admin</code> &bull; Password: <code className="text-gray-200">admin123</code>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-gray-400 relative z-10 border-t border-white/5">
        &copy; 2027 Indian Mushroom Days Secretariat. Secure Administrative System.
      </footer>
    </div>
  );
}
