import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Target, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { login, getDashboardRoute } from "@/lib/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "individual", agree: false });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agree) { setError("Please accept the terms of service."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const demoEmails: Record<string, string> = {
      individual: "teams@propelaxis.com",
      team: "org@propelaxis.com",
      coach: "coach@propelaxis.com",
      educational: "edu@propelaxis.com",
      enterprise: "enterprise@propelaxis.com",
    };
    const loginEmail = demoEmails[form.role] || "teams@propelaxis.com";
    const result = login(loginEmail, "123456");
    setLoading(false);
    if (result.success && result.user) {
      navigate(getDashboardRoute(result.user.role));
    } else {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex">
      {/* Left — Visual */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-indigo-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Start Achieving More<br />in 14 Days
          </h2>
          <div className="space-y-4">
            {[
              "Free trial, no credit card required",
              "All features unlocked during trial",
              "Role-specific dashboard from day one",
              "Onboarding call with our success team",
              "Cancel anytime, no questions asked",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "50K+", label: "Users" },
              { value: "2.8K+", label: "Orgs" },
              { value: "4.9/5", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 border border-white/10 text-center">
                <p className="text-white font-display font-bold text-xl">{stat.value}</p>
                <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-display font-bold text-xl">
              Propel<span className="text-green-400">Axis</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-slate-400">Start your 14-day free trial — no credit card required.</p>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label text-slate-300">Full Name *</label>
              <input
                className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-green-500"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label text-slate-300">Email Address *</label>
              <input
                type="email"
                className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-green-500"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label text-slate-300">I am a *</label>
              <select
                className="input-field bg-white/5 border-white/10 text-white focus:border-green-500"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="individual" className="bg-[#0d1f35]">Individual</option>
                <option value="team" className="bg-[#0d1f35]">Team / Organization</option>
                <option value="coach" className="bg-[#0d1f35]">Coach / Mentor</option>
                <option value="educational" className="bg-[#0d1f35]">Educational Institution</option>
                <option value="enterprise" className="bg-[#0d1f35]">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="label text-slate-300">Password *</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-green-500 pr-10"
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-white/20 accent-green-600 cursor-pointer"
              />
              <label htmlFor="agree" className="text-slate-400 text-sm leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link to="/resources#terms" className="text-green-400 hover:text-green-300">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/resources#privacy" className="text-green-400 hover:text-green-300">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <p className="text-center text-slate-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-medium">Sign in</Link>
            </p>
            <Link to="/" className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
