import { Link } from "react-router-dom";
import { Target, Users, Globe, Heart, Lightbulb, TrendingUp, Award, ArrowRight, CheckCircle, Calendar, Zap, Shield, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  { icon: Target, title: "Outcome Focus", desc: "We measure success by the outcomes our users achieve, not just the features we ship." },
  { icon: Heart, title: "Human-Centered Design", desc: "Every decision starts with empathy for the people who will use our platform daily." },
  { icon: Shield, title: "Trust & Transparency", desc: "We are open about how we operate, how we handle data, and how we make decisions." },
  { icon: Lightbulb, title: "Continuous Innovation", desc: "We relentlessly pursue better ways to help people achieve their goals." },
  { icon: Users, title: "Collective Growth", desc: "Our users' success is our success. We grow together through shared achievement." },
  { icon: Globe, title: "Global Impact", desc: "Performance excellence has no borders. We build for teams worldwide." },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "PropelAxis was born from a simple insight: most goal-setting tools focus on tracking, not achieving." },
  { year: "2021", title: "First 1,000 Users", desc: "Launched publicly and crossed 1,000 active users within the first 6 months." },
  { year: "2022", title: "Series A Funding", desc: "Raised $12M Series A to accelerate product development and team growth." },
  { year: "2023", title: "Enterprise Launch", desc: "Introduced enterprise-grade features and signed our first Fortune 500 client." },
  { year: "2024", title: "Global Expansion", desc: "Expanded to 40+ countries with multi-language support and regional data centers." },
  { year: "2025", title: "50K+ Users", desc: "Crossed 50,000 active users and 2,800+ organizations on the platform." },
];

export default function About() {
  useScrollReveal();

  return (
    <div className="bg-[#0a1628]">
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="section-tag mb-8 mx-auto" style={{ width: "fit-content" }}>
            <Target className="w-4 h-4" />
            About PropelAxis
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            We Exist to
            <br />
            <span className="gradient-text">Accelerate Achievement</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">
            PropelAxis was built on a fundamental belief: every individual and organization has the capacity for extraordinary performance — they just need the right system to unlock it.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#0d1f35] section-padding" id="mission">
        <div className="container-max grid lg:grid-cols-2 gap-12">
          <div className="reveal-left glass-card p-8 border border-white/10 hover:border-green-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-green-50/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              To democratize high-performance goal management — giving every individual, team, coach, and organization the tools previously available only to the world's largest enterprises.
            </p>
          </div>
          <div className="reveal-right glass-card p-8 border border-green-500/20 bg-green-500/5 hover:border-green-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              A world where every person and organization operates at their highest potential — where ambition meets systematic execution, and extraordinary outcomes become the norm.
            </p>
          </div>
        </div>
      </section>

      {/* Company Journey */}
      <section className="bg-[#0a1628] section-padding">
        <div className="container-max">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-6 mx-auto" style={{ width: "fit-content" }}>
              <Calendar className="w-4 h-4" />
              Our Journey
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              From Idea to <span className="gradient-text">Global Platform</span>
            </h2>
            <p className="text-slate-400 text-lg">From a small team with a big idea to a platform trusted worldwide.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 via-green-500/20 to-transparent hidden lg:block" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className={`reveal stagger-${(i % 4) + 1} flex flex-col lg:flex-row gap-8 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="lg:w-1/2 text-right">
                    {i % 2 === 0 && (
                      <>
                        <span className="gradient-text-dark font-display font-bold text-3xl">{m.year}</span>
                        <h3 className="text-white font-semibold text-xl mt-1">{m.title}</h3>
                        <p className="text-slate-400 text-sm mt-2">{m.desc}</p>
                      </>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30 z-10">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="lg:w-1/2">
                    {i % 2 === 1 && (
                      <>
                        <span className="gradient-text-dark font-display font-bold text-3xl">{m.year}</span>
                        <h3 className="text-white font-semibold text-xl mt-1">{m.title}</h3>
                        <p className="text-slate-400 text-sm mt-2">{m.desc}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Growth Philosophy */}
      <section className="bg-[#0d1f35] section-padding">
        <div className="container-max grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <div className="section-tag mb-6" style={{ width: "fit-content" }}>
              <TrendingUp className="w-4 h-4" />
              Growth Philosophy
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-6">
              Performance is a System,<br />
              <span className="gradient-text">Not an Event</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              We believe that high performance isn't a talent you're born with — it's a system you build. PropelAxis provides the scaffolding for that system: clear goals, measurable milestones, consistent feedback loops, and adaptive execution.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our platform is designed around behavioral science principles — habit formation, progress momentum, and social accountability — to ensure that the goals you set don't just sit in a dashboard, but actually drive daily behavior.
            </p>
          </div>
          <div className="reveal-right grid grid-cols-2 gap-4">
            {[
              { icon: Zap, value: "3x", label: "Faster Goal Completion" },
              { icon: Award, value: "94%", label: "User Satisfaction Score" },
              { icon: Users, value: "40+", label: "Countries Served" },
              { icon: Star, value: "4.9/5", label: "Average Rating" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="glass-card p-6 border border-white/10 text-center hover:border-green-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-green-50/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-3xl font-display font-bold text-white mb-1">{s.value}</p>
                  <p className="text-slate-400 text-xs">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value System */}
      <section className="bg-[#0a1628] section-padding">
        <div className="container-max">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-6 mx-auto" style={{ width: "fit-content" }}>
              <Shield className="w-4 h-4" />
              Core Values
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Our Value System</h2>
            <p className="text-slate-400 text-lg">The principles that guide every decision we make.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={`reveal stagger-${(i % 3) + 1} glass-card p-6 border border-white/10 hover:border-green-500/30 group transition-all duration-300`}>
                  <div className="w-12 h-12 rounded-xl bg-green-50/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Execution Model */}
      <section className="bg-[#0d1f35] section-padding" id="partners">
        <div className="container-max">
          <div className="text-center mb-12 reveal">
            <div className="section-tag mb-6 mx-auto" style={{ width: "fit-content" }}>
              <Lightbulb className="w-4 h-4" />
              How We Operate
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Our Operating Model</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our internal execution model mirrors the principles we teach — radical transparency, outcome-focus, and continuous improvement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Product-Led Growth", desc: "Our product is our best salesperson. We build features so compelling they sell themselves through word of mouth." },
              { title: "Customer-First Culture", desc: "Every team member talks to customers weekly. Real insight drives every roadmap decision." },
              { title: "Iterative Excellence", desc: "We ship fast, learn faster, and continuously refine. Perfection is a destination, not a prerequisite to launch." },
            ].map((item, i) => (
              <div key={item.title} className={`reveal stagger-${i + 1} glass-card p-6 border border-white/10 hover:border-indigo-500/30 group transition-all duration-300`}>
                <div className="w-10 h-10 rounded-xl bg-green-50/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Roadmap CTA */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-indigo-600 section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-40 translate-y-40 blur-3xl" />
        <div className="container-max text-center relative z-10">
          <div className="reveal">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">What's Next for PropelAxis</h2>
            <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto">
              AI-powered goal coaching, predictive analytics, deeper integrations, and a marketplace of performance frameworks — all coming in 2026.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/resources#roadmap" className="inline-flex items-center gap-2 bg-white text-green-700 font-bold py-4 px-8 rounded-xl hover:bg-green-50 transition-colors">
                View Our Roadmap
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
