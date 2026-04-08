import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Target } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { getUser } from "@/lib/auth";
import { getDashboardRoute } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a1628]/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-green-500/40 transition-all duration-200">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-display font-bold text-xl tracking-tight">
              Propel<span className="text-green-400">Axis</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "text-green-400 bg-green-500/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate(getDashboardRoute(user.role))}
                className="btn-primary text-sm py-2 px-5"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a1628]/98 backdrop-blur-md border-b border-white/10">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  location.pathname === link.path
                    ? "text-green-400 bg-green-500/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link to="/login" className="block text-center text-white py-3 rounded-xl border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors">
                Login
              </Link>
              <Link to="/register" className="block text-center btn-primary text-sm py-3">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
