import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Zap, Users, Building2, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const plans = [
  {
    id: "individual",
    name: "Individual",
    icon: Zap,
    monthlyPrice: 9,
    annualPrice: 7,
    desc: "Perfect for ambitious individuals tracking personal and professional goals.",
    color: "blue",
    popular: false,
    features: [
      "Personal goal dashboard",
      "Up to 10 active goals",
      "5 KPI metrics tracked",
      "Basic analytics charts",
      "Email notifications",
      "Mobile-responsive access",
      "Community support",
      "14-day free trial",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "team",
    name: "Team",
    icon: Users,
    monthlyPrice: 29,
    annualPrice: 23,
    desc: "Built for growing teams that need shared goal visibility and collaboration.",
    color: "blue",
    popular: true,
    features: [
      "Everything in Individual",
      "Up to 25 team members",
      "Unlimited goals",
      "50 KPI metrics tracked",
      "Advanced analytics",
      "Team collaboration tools",
      "Custom notifications",
      "Priority email support",
      "API access",
      "CSV data export",
    ],
    cta: "Start Team Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    monthlyPrice: null,
    annualPrice: null,
    desc: "For large organizations that need advanced security, compliance, and scale.",
    color: "slate",
    popular: false,
    features: [
      "Everything in Team",
      "Unlimited team members",
      "Unlimited KPI tracking",
      "AI-powered recommendations",
      "Custom integrations",
      "Enterprise SSO (SAML)",
      "SCIM user provisioning",
      "Dedicated CSM",
      "SLA guarantee",
      "On-premise deployment option",
      "Custom reporting",
      "White-label option",
    ],
    cta: "Contact Sales",
  },
];

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What happens after my free trial ends?",
    a: "After your 14-day trial, you'll be prompted to choose a plan. You won't be charged automatically — no credit card required to start.",
  },
  {
    q: "Do you offer discounts for non-profits or education?",
    a: "Yes! We offer 50% discounts for registered non-profit organizations and educational institutions. Contact sales@propelaxis.com.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use bank-grade AES-256 encryption, SOC 2 Type II compliance, and regular third-party security audits.",
  },
  {
    q: "Can I export my data?",
    a: "Yes, all plans include data export. Team and Enterprise plans include additional export formats and bulk export capabilities.",
  },
  {
    q: "How does billing work for enterprise?",
    a: "Enterprise pricing is customized based on team size, features, and contract length. Annual contracts receive significant discounts.",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useScrollReveal();

  return (
    <div className="bg-dark-950">
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8">
            <Zap className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Plans That Scale<br />
            <span className="gradient-text">With Your Ambition</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
            Start free. Scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-dark-800 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!annual ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${annual ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Annual
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-dark-900 section-padding -mt-12">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              const price = annual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div
                  key={plan.id}
                  className={`reveal stagger-${i + 1} relative rounded-2xl p-8 flex flex-col ${
                    plan.popular
                      ? "bg-blue-600 border border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02]"
                      : "glass-card border border-white/10 hover:border-blue-500/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-blue-700 text-xs font-bold rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? "bg-white/20" : "bg-blue-500/10"}`}>
                      <Icon className={`w-5 h-5 ${plan.popular ? "text-white" : "text-blue-400"}`} />
                    </div>
                    <h3 className={`font-display font-bold text-xl ${plan.popular ? "text-white" : "text-white"}`}>{plan.name}</h3>
                  </div>
                  <p className={`text-sm mb-6 leading-relaxed ${plan.popular ? "text-blue-100" : "text-slate-400"}`}>{plan.desc}</p>
                  <div className="mb-6">
                    {price !== null ? (
                      <>
                        <span className={`text-5xl font-display font-bold ${plan.popular ? "text-white" : "text-white"}`}>${price}</span>
                        <span className={`text-sm ml-1 ${plan.popular ? "text-blue-100" : "text-slate-400"}`}>/mo</span>
                        {annual && <p className={`text-xs mt-1 ${plan.popular ? "text-blue-200" : "text-slate-500"}`}>Billed annually</p>}
                      </>
                    ) : (
                      <span className={`text-3xl font-display font-bold ${plan.popular ? "text-white" : "text-white"}`}>Custom</span>
                    )}
                  </div>
                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? "text-white" : "text-blue-400"}`} />
                        <span className={plan.popular ? "text-blue-50" : "text-slate-300"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={price === null ? "/contact" : "/register"}
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                      plan.popular
                        ? "bg-white text-blue-700 hover:bg-blue-50"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Compare note */}
          <div className="text-center mt-12 reveal">
            <p className="text-slate-500 text-sm">All plans include a 14-day free trial. No credit card required.</p>
            <p className="text-slate-500 text-sm mt-1">
              Need a custom plan?{" "}
              <Link to="/contact" className="text-blue-400 hover:text-blue-300 font-medium">
                Talk to our sales team
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="bg-dark-950 section-padding">
        <div className="container-max">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Detailed Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto reveal">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-8 text-slate-400 font-medium text-sm">Feature</th>
                  {["Individual", "Team", "Enterprise"].map((p) => (
                    <th key={p} className="text-center py-4 px-6 text-white font-semibold text-sm">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Goal Management", "10 goals", "Unlimited", "Unlimited"],
                  ["Team Members", "1 user", "Up to 25", "Unlimited"],
                  ["KPI Tracking", "5 metrics", "50 metrics", "Unlimited"],
                  ["Analytics Dashboard", "Basic", "Advanced", "Enterprise"],
                  ["Custom Reports", "—", "Standard", "Custom"],
                  ["API Access", "—", "✓", "✓"],
                  ["SSO / SAML", "—", "—", "✓"],
                  ["Dedicated Support", "Community", "Priority Email", "Dedicated CSM"],
                  ["Data Export", "CSV", "CSV + Excel", "All Formats"],
                  ["SLA Guarantee", "—", "99.9%", "Custom SLA"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-4 pr-8 text-slate-400 text-sm">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className="py-4 px-6 text-center text-sm">
                        {cell === "—" ? (
                          <span className="text-slate-600">—</span>
                        ) : cell === "✓" ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-white font-medium">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dark-900 section-padding">
        <div className="container-max max-w-3xl">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
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

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 section-padding">
        <div className="container-max text-center">
          <div className="reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Start Your Free Trial Today</h2>
            <p className="text-blue-100 text-lg mb-8">14 days free. All features included. No credit card required.</p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
