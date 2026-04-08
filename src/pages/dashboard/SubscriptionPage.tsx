import { useState } from "react";
import { CreditCard, Zap, Users, Building2, Check, ArrowUp, TrendingUp, Calendar, Download, ChevronRight, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/types";

interface Props { user: User }

const plans = [
  {
    id: "individual",
    name: "Individual",
    icon: Zap,
    price: 9,
    color: "from-violet-500 to-purple-600",
    lightColor: "bg-violet-50 text-violet-600",
    borderColor: "border-violet-200",
    features: ["10 active goals", "5 KPIs tracked", "Basic analytics", "Email support"],
    limits: { goals: 10, members: 1, kpis: 5 },
  },
  {
    id: "professional",
    name: "Professional",
    icon: TrendingUp,
    price: 29,
    color: "from-indigo-500 to-indigo-700",
    lightColor: "bg-indigo-50 text-indigo-600",
    borderColor: "border-indigo-300",
    popular: true,
    features: ["Unlimited goals", "50 KPIs tracked", "Advanced analytics", "API access", "Priority support"],
    limits: { goals: 999, members: 5, kpis: 50 },
  },
  {
    id: "team",
    name: "Team",
    icon: Users,
    price: 79,
    color: "from-rose-500 to-pink-600",
    lightColor: "bg-rose-50 text-rose-600",
    borderColor: "border-rose-200",
    features: ["25 team members", "Unlimited goals", "Unlimited KPIs", "Team analytics", "Dedicated support"],
    limits: { goals: 999, members: 25, kpis: 999 },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: null,
    color: "from-slate-700 to-slate-900",
    lightColor: "bg-slate-100 text-slate-700",
    borderColor: "border-slate-300",
    features: ["Unlimited everything", "Custom integrations", "SSO / SAML", "SLA guarantee", "White-label option"],
    limits: { goals: 999, members: 999, kpis: 999 },
  },
];

const billingHistory = [
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$29.00", status: "paid", period: "Apr 2026" },
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$29.00", status: "paid", period: "Mar 2026" },
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$29.00", status: "paid", period: "Feb 2026" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$29.00", status: "paid", period: "Jan 2026" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$29.00", status: "paid", period: "Dec 2025" },
];

function UsageMeter({ label, current, max, color }: { label: string; current: number; max: number; color: string }) {
  const pct = max === 999 ? Math.min(Math.round((current / 100) * 100), 100) : Math.round((current / max) * 100);
  const isHigh = pct >= 80;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className={`font-semibold ${isHigh ? "text-rose-600" : "text-slate-800"}`}>
          {current} {max === 999 ? "" : `/ ${max}`}
        </span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isHigh ? "bg-rose-500" : color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {isHigh && (
        <p className="text-xs text-rose-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Approaching limit — consider upgrading
        </p>
      )}
    </div>
  );
}

export default function SubscriptionPage({ user }: Props) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const currentPlan = plans[1]; // Professional as default

  function handleUpgrade(planId: string) {
    setSelectedPlan(planId);
    toast.success(`Plan changed to ${plans.find((p) => p.id === planId)?.name}! Your new billing cycle starts today.`);
    setShowUpgrade(false);
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900">Subscription & Billing</h2>
        <p className="text-slate-500 text-sm">Manage your plan, usage, and payment information</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-indigo-200 text-sm font-medium mb-1">Current Plan</p>
              <h3 className="font-display text-3xl font-bold">{currentPlan.name}</h3>
              <p className="text-indigo-200 mt-1">$29.00 / month · Billed monthly</p>
              <p className="text-indigo-300 text-sm mt-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Next renewal: May 1, 2026
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-center bg-white/10 rounded-xl px-4 py-3">
                <p className="text-2xl font-bold">5</p>
                <p className="text-indigo-200 text-xs">Goals Used</p>
              </div>
              <div className="text-center bg-white/10 rounded-xl px-4 py-3">
                <p className="text-2xl font-bold">12</p>
                <p className="text-indigo-200 text-xs">KPIs Tracked</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowUpgrade(true)}
              className="px-5 py-2.5 bg-white text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Upgrade Plan
            </button>
            <button className="px-5 py-2.5 bg-white/10 text-white border border-white/20 font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors">
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {/* Usage Meters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-6">Usage Overview</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <UsageMeter label="Active Goals" current={5} max={currentPlan.limits.goals} color="bg-gradient-to-r from-violet-500 to-indigo-500" />
          <UsageMeter label="Team Members" current={1} max={currentPlan.limits.members} color="bg-gradient-to-r from-indigo-500 to-blue-500" />
          <UsageMeter label="KPIs Tracked" current={12} max={currentPlan.limits.kpis} color="bg-gradient-to-r from-emerald-500 to-teal-500" />
        </div>
        <div className="grid sm:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-100">
          {[
            { label: "Goals Created (All time)", value: "24" },
            { label: "Tasks Completed", value: "142" },
            { label: "Data Storage Used", value: "1.2 GB / 10 GB" },
          ].map((m) => (
            <div key={m.label} className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-display font-bold text-slate-900">{m.value}</p>
              <p className="text-slate-500 text-xs mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold text-slate-900">Payment Method</h3>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
            Update <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="w-12 h-8 bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-slate-800 font-medium text-sm">Visa ending in •••• 4242</p>
            <p className="text-slate-400 text-xs">Expires 12/2027</p>
          </div>
          <span className="ml-auto px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Default</span>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold text-slate-900">Billing History</h3>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
            <Download className="w-4 h-4" /> Export All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice</th>
                <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Period</th>
                <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-slate-700 text-sm font-medium">{inv.id}</td>
                  <td className="py-4 text-slate-600 text-sm">{inv.period}</td>
                  <td className="py-4 text-slate-500 text-sm">{inv.date}</td>
                  <td className="py-4 text-slate-800 font-semibold text-sm">{inv.amount}</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full capitalize">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-indigo-600 hover:text-indigo-700 text-xs font-medium flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel */}
      <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-rose-800 text-sm">Cancel Subscription</h4>
            <p className="text-rose-600 text-xs mt-1">Your data will be retained for 30 days. You can reactivate anytime.</p>
          </div>
          <button
            onClick={() => toast.error("Please contact support@propelaxis.com to cancel your subscription.")}
            className="px-4 py-2 border border-rose-300 text-rose-600 text-sm font-semibold rounded-xl hover:bg-rose-100 transition-colors"
          >
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-slate-900">Choose Your Plan</h3>
                <button onClick={() => setShowUpgrade(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isCurrent = plan.id === currentPlan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`relative rounded-2xl p-5 border-2 cursor-pointer transition-all ${
                        isCurrent ? "border-indigo-400 bg-indigo-50" : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                      }`}
                      onClick={() => !isCurrent && handleUpgrade(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                          Popular
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                          Current
                        </div>
                      )}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-display font-bold text-slate-900 mb-1">{plan.name}</h4>
                      <div className="mb-4">
                        {plan.price ? (
                          <><span className="text-2xl font-bold text-slate-900">${plan.price}</span><span className="text-slate-400 text-xs">/mo</span></>
                        ) : (
                          <span className="text-xl font-bold text-slate-900">Custom</span>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      {!isCurrent && (
                        <button className="w-full mt-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                          {plan.price ? "Switch Plan" : "Contact Sales"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
