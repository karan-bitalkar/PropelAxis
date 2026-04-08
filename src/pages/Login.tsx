import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Target, Eye, EyeOff, ArrowLeft, User, Users, Award, BookOpen, Building2, Shield } from "lucide-react";
import { login, getDashboardRoute } from "@/lib/auth";
import { DEMO_ACCOUNTS } from "@/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  User, Users, Award, BookOpen, Building2, Shield,
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function fillDemo(e: string, p: string) {
    setEmail(e);
    setPassword(p);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password);
    setLoading(false);
    if (result.success && result.user) {
      navigate(getDashboardRoute(result.user.role));
    } else {
      setError(result.error || "Login failed.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex">
      {/* Left — Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-display font-bold text-xl">
              Propel<span className="text-green-400">Axis</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slate-400">Sign in to access your performance dashboard.</p>
          </div>

          {/* Demo Accounts */}
          <div className="mb-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = iconMap[acc.icon] || User;
                return (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => fillDemo(acc.email, acc.password)}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-xl border border-white/10 hover:border-green-500/40 transition-all text-left group",
                      email === acc.email ? "border-green-500/60 bg-green-500/5" : ""
                    )}
                  >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${acc.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-slate-300 text-xs font-medium leading-tight">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0a1628] px-3 text-slate-500">or sign in manually</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label text-slate-300">Email Address</label>
              <input
                type="email"
                className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-green-500"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="label text-slate-300 mb-0">Password</label>
                <Link to="/forgot-password" className="text-green-400 text-xs hover:text-green-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-green-500 pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <p className="text-center text-slate-500 text-sm">
              {"Don't have an account?"}{" "}
              <Link to="/register" className="text-green-400 hover:text-green-300 font-medium">
                Create one free
              </Link>
            </p>
            <Link to="/" className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right — Visual */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {DEMO_ACCOUNTS.slice(0, 4).map((acc) => {
              const Icon = iconMap[acc.icon] || User;
              return (
                <div key={acc.email} className="glass-card p-4 border border-white/10 text-left">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${acc.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white font-semibold text-sm">{acc.label}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-tight">{acc.description}</p>
                </div>
              );
            })}
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            One Platform,<br />Every Role
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            PropelAxis adapts to your role — individual achiever, team leader, coach, or enterprise executive. Your dashboard, your way.
          </p>
        </div>
      </div>
    </div>
  );
}
