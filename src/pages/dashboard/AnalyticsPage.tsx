import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { CHART_DATA_MONTHLY, PERFORMANCE_DATA, KPI_DISTRIBUTION } from "@/constants";
import { TrendingUp, BarChart3, Users, Target } from "lucide-react";

const COLORS = ["#16a34a", "#4f46e5", "#10b981", "#f59e0b"];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900">Analytics Dashboard</h2>
        <p className="text-slate-500 text-sm">Performance insights and trend analysis</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: "Goals Completed", value: "24", change: "+8 this month", color: "text-green-600 bg-green-50" },
          { icon: TrendingUp, label: "Avg. KPI Score", value: "78%", change: "+5.2% vs last month", color: "text-emerald-600 bg-emerald-50" },
          { icon: BarChart3, label: "Tasks Finished", value: "142", change: "+18 this week", color: "text-indigo-600 bg-indigo-50" },
          { icon: Users, label: "Active Streak", value: "7 days", change: "Personal best", color: "text-teal-600 bg-teal-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-display font-bold text-slate-900">{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
              <p className="text-emerald-600 text-xs mt-1 font-medium">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Goals & Tasks Monthly */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-slate-900">Goals & Tasks Over Time</h3>
            <p className="text-slate-500 text-xs mt-0.5">Monthly performance — full year view</p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-600" /><span className="text-slate-600">Goals</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-indigo-600" /><span className="text-slate-600">Tasks</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={CHART_DATA_MONTHLY}>
            <defs>
              <linearGradient id="goalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="taskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
            <Area type="monotone" dataKey="goals" stroke="#16a34a" strokeWidth={2} fill="url(#goalGrad)" name="Goals" />
            <Area type="monotone" dataKey="tasks" stroke="#4f46e5" strokeWidth={2} fill="url(#taskGrad)" name="Tasks" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">Weekly Performance Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
              <Line type="monotone" dataKey="performance" stroke="#16a34a" strokeWidth={2.5} dot={{ fill: "#16a34a", r: 4 }} activeDot={{ r: 6 }} name="Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* KPI Distribution Pie */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">KPI Category Distribution</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={KPI_DISTRIBUTION} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
                  {KPI_DISTRIBUTION.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {KPI_DISTRIBUTION.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-slate-600 text-sm">{item.name}</span>
                  </div>
                  <span className="text-slate-900 font-semibold text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly KPI counts */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-6">KPI Achievement by Month</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={CHART_DATA_MONTHLY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
            <Bar dataKey="kpis" fill="#16a34a" radius={[4, 4, 0, 0]} name="KPIs Met" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
