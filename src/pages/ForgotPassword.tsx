import { useState } from "react";
import { Link } from "react-router-dom";
import { Target, ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-display font-bold text-xl">
              Propel<span className="text-green-400">Axis</span>
            </span>
          </Link>
        </div>

        <div className="glass-card border border-white/10 p-8">
          {sent ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-slate-400 text-sm mb-6">
                We've sent password reset instructions to <strong className="text-white">{email}</strong>. Please check your inbox and spam folder.
              </p>
              <Link to="/login" className="btn-primary block text-center py-3 hover:opacity-90">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 mx-auto mb-6 border border-green-500/20">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <h1 className="font-display text-2xl font-bold text-white text-center mb-2">Reset Password</h1>
              <p className="text-slate-400 text-sm text-center mb-8">
                Enter your email and we'll send you instructions to reset your password.
              </p>

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
                <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Send Reset Link"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
