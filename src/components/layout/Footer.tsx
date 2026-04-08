import { Link } from "react-router-dom";
import { Target, Twitter, Linkedin, Github, Youtube, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Our Mission", path: "/about#mission" },
    { label: "Careers", path: "/about#careers" },
    { label: "Press", path: "/about#press" },
    { label: "Partners", path: "/about#partners" },
  ],
  Product: [
    { label: "Features", path: "/features" },
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
    { label: "Changelog", path: "/resources#changelog" },
    { label: "Roadmap", path: "/resources#roadmap" },
  ],
  Resources: [
    { label: "Documentation", path: "/resources#docs" },
    { label: "Blog", path: "/resources#blog" },
    { label: "Guides", path: "/resources#guides" },
    { label: "Case Studies", path: "/resources#cases" },
    { label: "FAQ", path: "/resources#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", path: "/resources#privacy" },
    { label: "Terms of Service", path: "/resources#terms" },
    { label: "Cookie Policy", path: "/resources#cookies" },
    { label: "GDPR", path: "/resources#gdpr" },
    { label: "Security", path: "/resources#security" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-slate-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-display font-bold text-xl">
                Propel<span className="text-green-400">Axis</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Empowering individuals, teams, and enterprises to set ambitious goals, track KPIs, and achieve extraordinary results through intelligent performance management.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-600 hover:border-green-500 transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-700 hover:border-green-600 transition-all duration-200">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-500 transition-all duration-200">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="lg:col-span-1">
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link hover:text-green-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact & Newsletter */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>hello@propelaxis.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>+1 (888) 776-7352</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>100 Innovation Drive, San Francisco, CA 94105</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Get the latest insights on performance management and goal-setting strategies.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
              />
              <button className="btn-primary text-sm py-3 px-5 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} PropelAxis Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/resources#privacy" className="footer-link text-xs hover:text-green-400">Privacy</Link>
            <Link to="/resources#terms" className="footer-link text-xs hover:text-green-400">Terms</Link>
            <Link to="/resources#cookies" className="footer-link text-xs hover:text-green-400">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
