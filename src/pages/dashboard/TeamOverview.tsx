import {
  Users, TrendingUp, Target, CheckSquare, BarChart3, ArrowUp, Building2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { MOCK_TEAM, CHART_DATA_MONTHLY } from "@/constants";
import { getInitials } from "@/lib/utils";
import type { User } from "@/types";

interface Props { user: User }

const deptData = [
  { dept: "Engineering", goals: 85, tasks: 92, kpis: 78 },
  { dept: "Product", dept2: "Product", goals: 91, tasks: 88, kpis: 85 },
  { dept: "Sales", goals: 74, tasks: 82, kpis: 71 },
  { dept: "Design", goals: 96, tasks: 94, kpis: 92 },
  { dept: "Analytics", goals: 79, tasks: 85, kpis: 83 },
];

const radarData = [
  { subject: "Goals", A: 85 },
  { subject: "Tasks", A: 91 },
  { subject: "KPIs", A: 78 },
  { subject: "Collaboration", A: 88 },
  { subject: "Performance", A: 82 },
  { subject: "Innovation", A: 74 },
];

export default function TeamOverview({ user }: Props) {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-200 text-sm">Team Dashboard</p>
            <h2 className="font-display text-2xl font-bold">{user.organization || "Your Organization"}</h2>
            <p className="text-purple-200 text-sm mt-1">5 active team members · Q2 2026 in progress</p>
          </div>
          <div className="hidden sm:flex gap-4">
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">{MOCK_TEAM.length}</p>
              <p className="text-purple-200 text-xs">Team Members</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">87%</p>
              <p className="text-purple-200 text-xs">Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Team Size", value: "5", change: "+2 this quarter", positive: true },
          { icon: Target, label: "Team Goals", value: "18", change: "12 active", positive: true },
          { icon: CheckSquare, label: "Tasks Done", value: "234", change: "+42 this week", positive: true },
          { icon: TrendingUp, label: "Team KPI Score", value: "87%", change: "+3.1%", positive: true },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-purple-600" />
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
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">Department Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
              <Bar dataKey="goals" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Goals" />
              <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Tasks" />
              <Bar dataKey="kpis" fill="#10b981" radius={[4, 4, 0, 0]} name="KPIs" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Radar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">Team Strengths</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "#cbd5e1" }} />
              <Radar name="Team" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold text-slate-900">Team Members</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Manage Team</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-header text-left pb-3">Member</th>
                <th className="table-header text-left pb-3">Role</th>
                <th className="table-header text-left pb-3">Department</th>
                <th className="table-header text-left pb-3">Performance</th>
                <th className="table-header text-left pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TEAM.map((member) => (
                <tr key={member.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <p className="text-slate-800 font-medium text-sm">{member.name}</p>
                        <p className="text-slate-400 text-xs">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-slate-600">{member.role}</td>
                  <td className="table-cell">
                    <span className="badge-purple text-xs">{member.department}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-20 progress-bar">
                        <div className="progress-fill" style={{ width: `${member.performance}%` }} />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{member.performance}%</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge text-xs ${member.status === "active" ? "badge-green" : "badge-yellow"}`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Goals Trend */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-6">Team Goal Completion Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={CHART_DATA_MONTHLY}>
            <defs>
              <linearGradient id="teamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
            <Area type="monotone" dataKey="goals" stroke="#8b5cf6" strokeWidth={2} fill="url(#teamGrad)" name="Team Goals" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
