import { useState } from "react";
import { BookOpen, FileText, HelpCircle, PlayCircle, ChevronDown, ChevronUp, ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const blogs = [
  {
    title: "The Science of Goal Achievement: Why 94% of Goals Fail",
    category: "Performance",
    date: "April 3, 2026",
    read: "8 min read",
    img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop",
    desc: "Deep dive into the behavioral psychology behind goal failure — and the proven system that consistently drives success.",
  },
  {
    title: "OKRs vs KPIs: Which Should Your Team Use?",
    category: "Strategy",
    date: "March 28, 2026",
    read: "6 min read",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    desc: "A comprehensive breakdown of OKRs and KPIs — when to use each, and how to combine them for maximum impact.",
  },
  {
    title: "Building a High-Performance Team Culture in 90 Days",
    category: "Leadership",
    date: "March 15, 2026",
    read: "12 min read",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    desc: "A step-by-step playbook for transforming team performance dynamics through structured goal alignment.",
  },
  {
    title: "How PropelAxis Helped Nexus Corp Increase Revenue 40%",
    category: "Case Study",
    date: "March 5, 2026",
    read: "5 min read",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    desc: "Real results from a Fortune 500 organization that transformed its performance management strategy.",
  },
  {
    title: "The Executive's Guide to Performance Dashboards",
    category: "Analytics",
    date: "Feb 22, 2026",
    read: "10 min read",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    desc: "How C-suite leaders use PropelAxis dashboards to make faster, data-driven strategic decisions.",
  },
  {
    title: "Coach Smarter: Digital Tools Every Mentor Needs in 2026",
    category: "Coaching",
    date: "Feb 10, 2026",
    read: "7 min read",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    desc: "A guide for coaches and mentors on leveraging technology to scale their practice without sacrificing quality.",
  },
];

const faqs = [
  { q: "How do I get started with PropelAxis?", a: "Sign up for a free trial at propelaxis.com. You'll have full access to all features for 14 days, no credit card required. Our onboarding flow guides you through your first goal in under 5 minutes." },
  { q: "Can I import goals from another tool?", a: "Yes, we support CSV import for goals, tasks, and KPIs. We also offer native integrations with Asana, Jira, and ClickUp for seamless migration." },
  { q: "What reporting formats are available?", a: "PropelAxis supports PDF, Excel, CSV, and shareable web link formats. Enterprise plans include custom report branding and automated scheduled delivery." },
  { q: "Is there an API available?", a: "Yes, our REST API with OAuth 2.0 is available on Team and Enterprise plans. Full documentation is available in our developer portal." },
  { q: "How often is data backed up?", a: "All data is backed up in real time with point-in-time recovery available for the last 30 days on Team plans and 365 days on Enterprise plans." },
  { q: "What integrations are available?", a: "We integrate with 50+ tools including Slack, Teams, Jira, Asana, Salesforce, HubSpot, Google Workspace, Microsoft 365, and more." },
];

export default function Resources() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  useScrollReveal();

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-dark-950">
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8">
            <BookOpen className="w-4 h-4" />
            Resources & Knowledge
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Learn. Grow.<br />
            <span className="gradient-text">Perform.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Guides, blog posts, case studies, and documentation to help you get the most from PropelAxis.
          </p>
        </div>
      </section>

      {/* Documentation */}
      <section className="bg-dark-900 section-padding" id="docs">
        <div className="container-max">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Documentation</h2>
            <p className="text-slate-400">Everything you need to set up and master PropelAxis.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: PlayCircle, title: "Getting Started", desc: "Quick setup guide and first goals" },
              { icon: Target, title: "Goal Management", desc: "OKRs, milestones, and templates" },
              { icon: FileText, title: "API Reference", desc: "Full REST API documentation" },
              { icon: HelpCircle, title: "Integrations", desc: "Connect with 50+ tools" },
            ].map((doc, i) => {
              const Icon = doc.icon;
              return (
                <div key={doc.title} className={`reveal stagger-${i + 1} glass-card p-6 border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{doc.title}</h3>
                  <p className="text-slate-400 text-sm">{doc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-dark-950 section-padding" id="blog">
        <div className="container-max">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Latest from the Blog</h2>
            <p className="text-slate-400 mb-8">Insights on performance, leadership, and goal achievement.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((post, i) => (
              <article key={post.title} className={`reveal stagger-${(i % 3) + 1} glass-card border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all card-hover`}>
                <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-blue text-xs">{post.category}</span>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.read}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 leading-snug">{post.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300 transition-colors">
                      Read <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-dark-900 section-padding" id="guides">
        <div className="container-max">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">In-Depth Guides</h2>
            <p className="text-slate-400">Comprehensive resources for every performance challenge.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Ultimate OKR Implementation Guide", pages: "42 pages", level: "Intermediate", color: "blue" },
              { title: "Enterprise Goal Alignment Playbook", pages: "68 pages", level: "Advanced", color: "purple" },
              { title: "Manager's Performance Handbook", pages: "35 pages", level: "Beginner", color: "emerald" },
            ].map((guide, i) => (
              <div key={guide.title} className={`reveal stagger-${i + 1} glass-card p-6 border border-white/10 hover:border-blue-500/30 transition-all`}>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <span className={`badge ${guide.level === "Beginner" ? "badge-green" : guide.level === "Intermediate" ? "badge-blue" : "badge-purple"} mb-3`}>
                  {guide.level}
                </span>
                <h3 className="text-white font-semibold text-lg mb-2">{guide.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{guide.pages} comprehensive guide</p>
                <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300 transition-colors">
                  Download Free <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-dark-950 section-padding" id="roadmap">
        <div className="container-max max-w-3xl">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Product Roadmap</h2>
            <p className="text-slate-400">See what's coming next to PropelAxis.</p>
          </div>
          <div className="space-y-4">
            {[
              { quarter: "Q2 2026", items: ["AI goal recommendations engine", "Native mobile apps (iOS & Android)"], status: "In Progress" },
              { quarter: "Q3 2026", items: ["Predictive KPI forecasting", "Advanced coaching module", "Zapier bidirectional sync"], status: "Planned" },
              { quarter: "Q4 2026", items: ["White-label platform", "Advanced custom integrations", "On-premise deployment"], status: "Future" },
            ].map((phase, i) => (
              <div key={phase.quarter} className={`reveal stagger-${i + 1} glass-card p-6 border border-white/10`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{phase.quarter}</h3>
                  <span className={`badge ${phase.status === "In Progress" ? "badge-blue" : phase.status === "Planned" ? "badge-yellow" : "badge-purple"}`}>
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dark-900 section-padding" id="faq">
        <div className="container-max max-w-3xl">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
