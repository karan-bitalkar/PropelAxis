import { Link } from "react-router-dom";
import {
  Target, TrendingUp, BarChart3, Users, Bell, Settings, Shield, Zap,
  CheckCircle, ArrowRight, Activity, CreditCard, BookOpen, Database,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const modules = [
  {
    icon: Target,
    title: "Goal Engine",
    accent: "green",
    features: [
      "OKR-style goal hierarchy (Individual → Team → Organization)",
      "SMART goal templates with guided setup",
      "Goal cascading and alignment visualization",
      "Milestone tracking with sub-goals",
      "AI-powered goal suggestions based on role",
      "Goal timeline and Gantt view",
    ],
    desc: "The most powerful goal-setting framework available. Define objectives at every organizational level and align them with precision.",
  },
  {
    icon: TrendingUp,
    title: "KPI Tracker",
    accent: "indigo",
    features: [
      "Real-time KPI dashboards with live data",
      "Custom metric definitions and formulas",
      "Automated threshold alerts and notifications",
      "Multi-period comparison (week/month/quarter/year)",
      "KPI to goal linkage visualization",
      "CSV import for bulk KPI setup",
    ],
    desc: "Track every metric that matters. Link KPIs directly to goals and receive automatic alerts before performance drops.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    accent: "green",
    features: [
      "Performance trend charts and forecasting",
      "Individual, team, and organization reports",
      "Cohort analysis and benchmarking",
      "Goal completion rate breakdowns",
      "Executive summary dashboards",
      "Exportable reports (PDF, Excel, CSV)",
    ],
    desc: "Transform raw performance data into strategic intelligence. Every chart is interactive, filterable, and exportable.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    accent: "indigo",
    features: [
      "Shared goal workspaces for teams",
      "Role-based access control (RBAC)",
      "Team goal alignment matrix",
      "Cross-team dependency management",
      "Collaborative task boards",
      "Team performance leaderboards",
    ],
    desc: "Unify your entire team around shared objectives. Everyone knows their contribution and how it impacts the bigger picture.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    accent: "green",
    features: [
      "Customizable alert triggers for goals and KPIs",
      "Digest emails (daily, weekly, monthly)",
      "Milestone achievement celebrations",
      "At-risk goal early warnings",
      "Team mention notifications",
      "Mobile push notification support",
    ],
    desc: "Stay ahead of every performance shift. Notifications that inform, not overwhelm — fully configurable by each user.",
  },
  {
    icon: CreditCard,
    title: "Subscription Management",
    accent: "indigo",
    features: [
      "Plan selection and self-serve upgrades",
      "Usage metering and seat management",
      "Billing history and invoice downloads",
      "Annual/monthly billing toggle",
      "Team license management",
      "Enterprise custom billing",
    ],
    desc: "Fully self-serve subscription management. Scale up, scale down, or switch plans as your needs evolve.",
  },
  {
    icon: BookOpen,
    title: "Reporting Engine",
    accent: "green",
    features: [
      "Scheduled automated report generation",
      "Custom report builder with drag-and-drop",
      "Stakeholder sharing with view-only links",
      "Template library (15+ report formats)",
      "Data visualization types (bars, lines, pies)",
      "White-label reports for enterprise",
    ],
    desc: "Professional-grade reporting for every audience. From board-level summaries to granular operational breakdowns.",
  },
  {
    icon: Database,
    title: "Integrations",
    accent: "indigo",
    features: [
      "REST API with OAuth 2.0 authentication",
      "Zapier and Make (Integromat) connectors",
      "Slack, Teams, and Discord notifications",
      "Google Workspace and Microsoft 365",
      "Jira, Asana, and ClickUp task sync",
      "Salesforce and HubSpot CRM integration",
    ],
    desc: "Connect PropelAxis to the tools you already use. A robust integration ecosystem that fits into any stack.",
  },
];

export default function Features() {
  useScrollReveal();

  return (
    <div className="bg-[#0a1628]">
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-green-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-500/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="section-tag mb-8 mx-auto" style={{ width: "fit-content" }}>
            <Zap className="w-4 h-4" />
            Full Feature Set
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Everything You Need to
            <br />
            <span className="gradient-text">Perform at Your Best</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            8 powerful modules. Hundreds of features. One unified platform designed to elevate performance at every level.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-base py-4 px-8">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary inline-flex items-center gap-2 text-base py-4 px-8">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Modules Overview strip */}
      <section className="bg-[#0d1f35] py-10 border-y border-white/5">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <a key={m.title} href={`#module-${i}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-green-500/10 border border-white/8 hover:border-green-500/30 text-slate-400 hover:text-green-400 text-sm font-medium transition-all duration-200">
                  <Icon className="w-4 h-4" />
                  {m.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Modules */}
      {modules.map((mod, idx) => {
        const Icon = mod.icon;
        const isEven = idx % 2 === 0;
        const isGreen = mod.accent === "green";
        return (
          <section key={mod.title} id={`module-${idx}`} className={isEven ? "bg-[#0a1628] section-padding" : "bg-[#0d1f35] section-padding"}>
            <div className="container-max">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>
                {/* Text side */}
                <div className={isEven ? "reveal-left" : "reveal-right"}>
                  <div className="section-tag mb-6" style={{ width: "fit-content" }}>
                    <Icon className="w-4 h-4" />
                    Module {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                    {mod.title}
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">{mod.desc}</p>
                  <ul className="space-y-3">
                    {mod.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-slate-300 text-sm">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isGreen ? "text-green-500" : "text-indigo-400"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual side */}
                <div className={isEven ? "reveal-right" : "reveal-left"}>
                  <div className={`glass-card p-10 border h-72 flex flex-col items-center justify-center gap-6 rounded-2xl relative overflow-hidden ${isGreen ? "border-green-500/20 bg-green-500/5" : "border-indigo-500/20 bg-indigo-500/5"}`}>
                    {/* Background glow */}
                    <div className={`absolute inset-0 rounded-2xl blur-3xl opacity-20 ${isGreen ? "bg-green-500" : "bg-indigo-500"}`} />
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${isGreen ? "bg-gradient-to-br from-green-600 to-green-700" : "bg-gradient-to-br from-indigo-600 to-indigo-700"}`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="relative text-center">
                      <p className={`font-display font-bold text-xl mb-1 ${isGreen ? "gradient-text" : "text-indigo-300"}`}>{mod.title}</p>
                      <p className="text-slate-500 text-sm">{mod.features.length} powerful capabilities</p>
                    </div>
                    {/* Decorative dots */}
                    <div className="absolute bottom-4 right-4 flex gap-1.5">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full opacity-40 ${isGreen ? "bg-green-400" : "bg-indigo-400"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Stats Banner */}
      <section className="bg-[#0d1f35] py-16 border-y border-white/5">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "8", label: "Core Modules" },
              { value: "100+", label: "Features" },
              { value: "50K+", label: "Active Users" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((s, i) => (
              <div key={s.label} className={`reveal stagger-${i + 1}`}>
                <p className="font-display text-4xl font-bold gradient-text mb-1">{s.value}</p>
                <p className="text-slate-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-indigo-600 section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-40 translate-y-40 blur-3xl" />
        <div className="container-max text-center relative z-10">
          <div className="reveal">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Start Using All Features Today</h2>
            <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto">14-day free trial. No credit card required. Cancel anytime.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 bg-white text-green-700 font-bold py-4 px-8 rounded-xl hover:bg-green-50 transition-colors">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
