import { Building2, Users, TrendingUp, Target, DollarSign, Globe, ArrowUp } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import type { User } from "@/types";

interface Props { user: User }

const divisions = [
  { name: "North America", revenue: 4.2, goals: 94, teams: 12, performance: 92 },
  { name: "Europe", revenue: 2.8, goals: 87, teams: 8, performance: 88 },
  { name: "Asia Pacific", revenue: 3.1, goals: 91, teams: 10, performance: 85 },
  { name: "Latin America", revenue: 1.4, goals: 78, teams: 5, performance: 79 },
];

const revenueData = [
  { month: "Jan", actual: 8.2, target: 9.0 }, { month: "Feb", actual: 8.8, target: 9.0 },
  { month: "Mar", actual: 9.4, target: 9.5 }, { month: "Apr", actual: 10.2, target: 10.0 },
  { month: "May", actual: 10.8, target: 10.5 }, { month: "Jun", actual: 11.5, target: 11.0 },
];

const subscriptionMix = [
  { name: "Enterprise", value: 45, color: "#3b82f6" },
  { name: "Team", value: 35, color: "#8b5cf6" },
  { name: "Individual", value: 20, color: "#10b981" },
];

export default function EnterpriseOverview({ user }: Props) {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-rose-600 to-pink-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-200 text-sm">Enterprise Dashboard</p>
            <h2 className="font-display text-2xl font-bold">{user.organization || "Global Dynamics Inc."}</h2>
            <p className="text-rose-200 text-sm mt-1">35 teams · 4 regions · 2,400 employees</p>
          </div>
          <div className="hidden sm:flex gap-4">
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">$11.5M</p>
              <p className="text-rose-200 text-xs">Revenue (Jun)</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">88%</p>
              <p className="text-rose-200 text-xs">KPI Score</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Total Revenue (Q2)", value: "$11.5M", change: "+24%", color: "bg-rose-50 text-rose-600" },
          { icon: Users, label: "Total Employees", value: "2,400", change: "+120 YTD", color: "bg-blue-50 text-blue-600" },
          { icon: Target, label: "Enterprise Goals", value: "340", change: "280 active", color: "bg-purple-50 text-purple-600" },
          { icon: Globe, label: "Active Regions", value: "4", change: "Expanding", color: "bg-emerald-50 text-emerald-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-display font-bold text-slate-900">{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
              <p className="text-emerald-600 text-xs mt-1 font-medium flex items-center gap-1">
                <ArrowUp className="w-3 h-3" />{s.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-slate-900">Revenue vs Target</h3>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500" /><span className="text-slate-500">Actual</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-300" /><span className="text-slate-500">Target</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="entGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip formatter={(v) => `$${v}M`} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="actual" stroke="#f43f5e" strokeWidth={2} fill="url(#entGrad)" name="Actual" />
              <Line type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-4">Subscription Mix</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={subscriptionMix} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                {subscriptionMix.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {subscriptionMix.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Division Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-5">Regional Division Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-header text-left pb-3">Division</th>
                <th className="table-header text-left pb-3">Revenue</th>
                <th className="table-header text-left pb-3">Goal Completion</th>
                <th className="table-header text-left pb-3">Teams</th>
                <th className="table-header text-left pb-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((d) => (
                <tr key={d.name} className="table-row">
                  <td className="table-cell font-medium text-slate-800">{d.name}</td>
                  <td className="table-cell text-slate-800 font-semibold">${d.revenue}M</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-20 progress-bar">
                        <div className="progress-fill" style={{ width: `${d.goals}%` }} />
                      </div>
                      <span className="text-xs font-medium">{d.goals}%</span>
                    </div>
                  </td>
                  <td className="table-cell text-slate-600">{d.teams} teams</td>
                  <td className="table-cell">
                    <span className={`badge text-xs ${d.performance >= 90 ? "badge-green" : d.performance >= 80 ? "badge-blue" : "badge-yellow"}`}>
                      {d.performance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
