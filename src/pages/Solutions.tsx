import { Link } from "react-router-dom";
import { User, Users, Award, BookOpen, Building2, ArrowRight, CheckCircle, Target, TrendingUp, BarChart3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const solutions = [
  {
    icon: User,
    title: "Individual Users",
    subtitle: "Personal Performance Acceleration",
    color: "blue",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    desc: "Take control of your personal and professional development with a system that keeps you accountable, focused, and consistently moving forward.",
    useCases: [
      "Personal goal tracking with daily habit streaks",
      "Career development milestones and timelines",
      "Financial goal planning and progress monitoring",
      "Learning objectives and skill development paths",
    ],
    results: ["Average 3x increase in goal completion", "Save 2+ hours per week on progress reviews"],
  },
  {
    icon: Users,
    title: "Teams & Organizations",
    subtitle: "Collective Performance Management",
    color: "purple",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    desc: "Align every team member around shared organizational objectives. Eliminate silos and drive coordinated execution at scale.",
    useCases: [
      "Department OKR setting and cascading",
      "Cross-team collaboration on shared goals",
      "Employee performance reviews tied to goal data",
      "Real-time team dashboard for managers",
    ],
    results: ["40% improvement in team goal completion", "60% reduction in misaligned priorities"],
  },
  {
    icon: Award,
    title: "Coaches & Mentors",
    subtitle: "Client Progress at a Glance",
    color: "emerald",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    desc: "Manage multiple clients from a single hub. Create custom coaching plans, monitor progress, and provide evidence-based guidance at scale.",
    useCases: [
      "Multi-client progress dashboards",
      "Custom coaching plan templates",
      "Session notes linked to client goals",
      "Automated check-in reminders",
    ],
    results: ["Manage 2x more clients without extra hours", "Measurable client outcomes for testimonials"],
  },
  {
    icon: BookOpen,
    title: "Educational Institutions",
    subtitle: "Academic Goal Excellence",
    color: "amber",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    desc: "Transform academic performance management. Track student progress, departmental goals, and institutional objectives in one unified platform.",
    useCases: [
      "Student learning objective tracking",
      "Faculty department goal alignment",
      "Institutional accreditation milestone management",
      "Academic year performance reporting",
    ],
    results: ["15% average improvement in student outcomes", "Simplified accreditation documentation"],
  },
  {
    icon: Building2,
    title: "Enterprise Clients",
    subtitle: "Scale Without Limits",
    color: "rose",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    desc: "Enterprise-grade performance management for complex organizations. Multi-region, multi-team, and built to handle thousands of concurrent users.",
    useCases: [
      "Multi-business-unit goal hierarchies",
      "Executive dashboard with board-level metrics",
      "Enterprise SSO and SCIM provisioning",
      "Custom SLA with dedicated support",
    ],
    results: ["ROI measured in millions for enterprise clients", "100% compliance with enterprise security standards"],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
};

export default function Solutions() {
  useScrollReveal();

  return (
    <div className="bg-dark-950">
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8">
            <Target className="w-4 h-4" />
            Solutions by Role
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Built for Every<br />
            <span className="gradient-text">Performance Context</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you're an individual tracking personal goals or an enterprise managing thousands of employees, PropelAxis has a purpose-built solution for you.
          </p>
        </div>
      </section>

      {/* Solution Cards */}
      {solutions.map((sol, idx) => {
        const Icon = sol.icon;
        const colors = colorMap[sol.color];
        const isEven = idx % 2 === 0;
        return (
          <section key={sol.title} className={idx % 2 === 0 ? "bg-dark-950 section-padding" : "bg-dark-900 section-padding"}>
            <div className="container-max">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? "" : ""}`}>
                <div className={isEven ? "reveal-left" : "reveal-right"}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-semibold mb-4 ${colors.bg} ${colors.text} ${colors.border}`}>
                    <Icon className="w-4 h-4" />
                    {sol.subtitle}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{sol.title}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-6">{sol.desc}</p>
                  <div className="mb-6">
                    <h4 className="text-white font-semibold text-sm mb-3">Key Use Cases</h4>
                    <ul className="space-y-2">
                      {sol.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}>
                    <h4 className={`${colors.text} font-semibold text-sm mb-2`}>Proven Results</h4>
                    {sol.results.map((r) => (
                      <p key={r} className="text-slate-300 text-xs mb-1">{r}</p>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className={isEven ? "reveal-right" : "reveal-left"}>
                  <div className="relative">
                    <img
                      src={sol.img}
                      alt={sol.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-dark-900/60 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 section-padding">
        <div className="container-max text-center">
          <div className="reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Find Your Solution</h2>
            <p className="text-blue-100 text-lg mb-8">Talk to our team and get a custom demo tailored to your role.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="bg-white text-blue-700 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="border-2 border-white/30 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
