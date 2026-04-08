import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Play,
  ChevronRight,
  Award,
  Activity,
  Layers,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroImage from "@/assets/hero-dashboard.jpg";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (target / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Operations, Nexus Corp",
    text: "PropelAxis transformed how our organization tracks goals. We've seen a 40% improvement in team-wide goal completion rates.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Thompson",
    role: "Executive Coach",
    text: "As a coach, having real-time visibility into my clients' progress has been game-changing. The coaching plans module is exceptional.",
    rating: 5,
    avatar: "MT",
  },
  {
    name: "Dr. Priya Patel",
    role: "Dean, Westfield University",
    text: "Our faculty and students have embraced PropelAxis completely. Academic goal tracking has never been this intuitive or effective.",
    rating: 5,
    avatar: "PP",
  },
];

const features = [
  { icon: Target, title: "Intelligent Goal Engine", desc: "Set, cascade, and track goals across any organizational layer with AI-assisted suggestions." },
  { icon: TrendingUp, title: "Real-Time KPI Tracking", desc: "Monitor key performance indicators with live dashboards and automated threshold alerts." },
  { icon: BarChart3, title: "Advanced Analytics", desc: "Deep-dive into performance trends with predictive analytics and visual reporting." },
  { icon: Users, title: "Team Collaboration", desc: "Align entire teams around shared goals with transparent progress visibility." },
  { icon: Shield, title: "Role-Based Access", desc: "Granular permissions ensure every stakeholder sees exactly what they need." },
  { icon: Zap, title: "Automated Workflows", desc: "Trigger tasks, notifications, and reports automatically based on goal milestones." },
];

const workflow = [
  { num: "01", title: "Define Your Goals", desc: "Set clear, measurable objectives across individual, team, or enterprise levels." },
  { num: "02", title: "Assign KPIs", desc: "Link performance indicators to each goal for objective progress measurement." },
  { num: "03", title: "Execute Tasks", desc: "Break goals into actionable tasks with ownership and deadlines." },
  { num: "04", title: "Track & Analyze", desc: "Monitor progress in real time and adapt strategy based on insights." },
];

export default function Home() {
  useScrollReveal();

  return (
    <div className="bg-[#0a1628]">
      {/* Section 1 — Hero */}
      <section className="hero-gradient min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-8">
                <Zap className="w-4 h-4" />
                Performance Management Reimagined
              </div>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                Propel Your
                <br />
                <span className="gradient-text">Performance</span>
                <br />
                Forward
              </h1>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                The complete goal-driven performance platform for individuals, teams, coaches, and enterprises. Set ambitious goals, track KPIs, and achieve extraordinary outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base py-4 px-8">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/features" className="btn-secondary flex items-center justify-center gap-2 text-base py-4 px-8">
                  <Play className="w-4 h-4" />
                  See How It Works
                </Link>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-white">
                    <AnimatedCounter target={50} suffix="K+" />
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Active Users</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-white">
                    <AnimatedCounter target={94} suffix="%" />
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Goal Achievement Rate</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-white">
                    <AnimatedCounter target={2800} suffix="+" />
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Organizations</p>
                </div>
              </div>
            </div>

            {/* Right — Dashboard preview */}
            <div className="animate-fade-in-right relative">
              <div className="relative animate-float">
                <div className="glass-card p-2 shadow-2xl shadow-green-500/10 border border-white/10 overflow-hidden rounded-2xl">
                  <img
                    src={heroImage}
                    alt="PropelAxis Dashboard"
                    className="w-full rounded-xl object-cover"
                    style={{ maxHeight: "420px" }}
                  />
                </div>
                {/* Floating cards */}
                <div className="absolute -left-6 top-1/4 glass-card p-4 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">+24.8%</p>
                      <p className="text-slate-400 text-xs">KPI Growth</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 bottom-1/3 glass-card p-4 animate-float" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">12 Goals</p>
                      <p className="text-slate-400 text-xs">On Track</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Platform Overview */}
      <section className="bg-[#0d1f35] section-padding">
        <div className="container-max">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-6 mx-auto" style={{ width: "fit-content" }}>
              <Layers className="w-4 h-4" />
              Platform Overview
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              One Platform. Every Performance Need.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              PropelAxis unifies goal management, KPI tracking, and performance analytics into a single, cohesive platform built for modern teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`reveal stagger-${(i % 3) + 1} glass-card p-6 border border-white/10 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-indigo-500/10 flex items-center justify-center mb-5 group-hover:from-green-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                  <div className="flex items-center gap-2 mt-4 text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 — Why PropelAxis */}
      <section className="bg-[#0a1628] section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="section-tag mb-6" style={{ width: "fit-content" }}>
                <Award className="w-4 h-4" />
                Why PropelAxis
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Built for Exceptional
                <br />
                <span className="gradient-text">Execution</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Most goal tools track what you did. PropelAxis accelerates what you will do — with intelligent alerts, coaching prompts, and performance momentum systems.
              </p>
              <div className="space-y-4">
                {[
                  "Role-specific dashboards for every stakeholder",
                  "Real-time KPI alerts before goals go off track",
                  "AI-powered goal recommendations and insights",
                  "Enterprise-grade security and compliance",
                  "Seamless onboarding in under 15 minutes",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    </div>
                    <p className="text-slate-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/features" className="btn-primary inline-flex items-center gap-2">
                  Explore All Features
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="reveal-right grid grid-cols-2 gap-4">
              {[
                { label: "Goal Completion", value: "94%", icon: Target },
                { label: "Avg. Revenue Growth", value: "+31%", icon: TrendingUp },
                { label: "Time Saved Weekly", value: "4.2h", icon: Zap },
                { label: "Team Alignment", value: "89%", icon: Users },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card p-6 border border-white/10 text-center hover:border-green-500/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-indigo-500/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-slate-400 text-xs">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Stats */}
      <section className="bg-[#0d1f35] section-padding">
        <div className="container-max">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Results That Speak Volumes
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Organizations using PropelAxis consistently outperform industry benchmarks across every measurable dimension.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 50000, suffix: "+", label: "Active Users", sub: "Across 40+ countries" },
              { value: 2800, suffix: "+", label: "Organizations", sub: "From startups to Fortune 500" },
              { value: 1200000, suffix: "+", label: "Goals Achieved", sub: "And counting" },
              { value: 98, suffix: "%", label: "Uptime SLA", sub: "Enterprise reliability" },
            ].map((item, i) => (
              <div key={item.label} className={`reveal stagger-${i + 1} text-center glass-card p-8 border border-white/10 hover:border-green-500/30 transition-all duration-300`}>
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  <AnimatedCounter target={item.value} suffix={item.suffix} />
                </p>
                <p className="text-green-400 font-semibold mb-1">{item.label}</p>
                <p className="text-slate-500 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Goal Execution Workflow */}
      <section className="bg-[#0a1628] section-padding">
        <div className="container-max">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-6 mx-auto" style={{ width: "fit-content" }}>
              <Activity className="w-4 h-4" />
              How It Works
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              From Goal to Achievement
            </h2>
            <p className="text-slate-400 text-lg">A proven 4-step execution framework built into every workflow.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
            {workflow.map((step, i) => (
              <div key={step.num} className={`reveal stagger-${i + 1} text-center`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                  <span className="text-white font-display font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Testimonials */}
      <section className="bg-[#0d1f35] section-padding">
        <div className="container-max">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Leaders Worldwide
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`reveal stagger-${i + 1} glass-card p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300`}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-green-400 fill-green-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Pricing Preview */}
      <section className="bg-[#0a1628] section-padding">
        <div className="container-max">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Plans that scale with your ambitions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Individual", price: "$9", period: "/mo", popular: false, features: ["Personal goal tracking", "Up to 10 goals", "Basic analytics", "Email support"] },
              { name: "Team", price: "$29", period: "/mo", popular: true, features: ["Everything in Individual", "Up to 25 team members", "Advanced analytics", "Team collaboration", "Priority support"] },
              { name: "Enterprise", price: "Custom", period: "", popular: false, features: ["Unlimited users", "Custom integrations", "Dedicated CSM", "SLA guarantee", "On-premise option"] },
            ].map((plan, i) => (
              <div key={plan.name} className={`reveal stagger-${i + 1} relative glass-card p-6 border transition-all duration-300 ${plan.popular ? "border-green-500/50 bg-green-500/5 shadow-lg shadow-green-500/10" : "border-white/10 hover:border-green-500/20"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-green-600 to-indigo-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <h3 className="text-white font-display font-bold text-xl mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? "btn-primary" : "border border-white/20 text-white hover:bg-white/5"}`}>
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-green-400 hover:text-green-300 text-sm font-medium inline-flex items-center gap-1">
              View full pricing details <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8 — CTA */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-indigo-700 section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-40 translate-y-40 blur-3xl" />
        </div>
        <div className="container-max text-center relative z-10">
          <div className="reveal">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Propel
              <br />
              Your Performance?
            </h2>
            <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto">
              Join 50,000+ professionals and organizations already achieving more with PropelAxis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="bg-white text-green-700 font-bold py-4 px-8 rounded-xl hover:bg-green-50 transition-colors inline-flex items-center gap-2 text-base">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="border-2 border-white/30 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors text-base">
                Talk to Sales
              </Link>
            </div>
            <p className="text-green-200 text-sm mt-6">No credit card required. 14-day free trial included.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
