import { Link } from "react-router-dom";
import { Home, Target } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-violet-500/20">
          <Target className="w-10 h-10 text-violet-400" />
        </div>
        <h1 className="font-display text-8xl font-bold text-slate-700 mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/home" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
