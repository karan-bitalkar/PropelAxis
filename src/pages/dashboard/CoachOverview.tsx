import { Award, Users, Target, TrendingUp, ArrowUp, Star, MessageSquare, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { getInitials } from "@/lib/utils";
import type { User } from "@/types";

interface Props { user: User }

const clients = [
  { name: "Rachel Park", goal: "Executive Leadership Development", progress: 78, sessions: 12, nextSession: "Apr 10, 2026", status: "on-track" },
  { name: "Daniel Osei", goal: "Revenue Growth Strategy", progress: 62, sessions: 8, nextSession: "Apr 9, 2026", status: "needs-support" },
  { name: "Mei Lin", goal: "Work-Life Integration", progress: 91, sessions: 15, nextSession: "Apr 12, 2026", status: "exceeding" },
  { name: "Carlos Vega", goal: "Team Building Skills", progress: 45, sessions: 5, nextSession: "Apr 11, 2026", status: "early" },
  { name: "Amara Diallo", goal: "Confidence & Public Speaking", progress: 83, sessions: 10, nextSession: "Apr 14, 2026", status: "on-track" },
];

const sessionData = [
  { week: "W1", sessions: 3 }, { week: "W2", sessions: 5 }, { week: "W3", sessions: 4 },
  { week: "W4", sessions: 6 }, { week: "W5", sessions: 5 }, { week: "W6", sessions: 7 },
  { week: "W7", sessions: 6 }, { week: "W8", sessions: 8 },
];

const statusMap: Record<string, { label: string; cls: string }> = {
  "on-track": { label: "On Track", cls: "badge-blue" },
  "needs-support": { label: "Needs Support", cls: "badge-yellow" },
  "exceeding": { label: "Exceeding", cls: "badge-green" },
  "early": { label: "Early Stage", cls: "badge-purple" },
};

export default function CoachOverview({ user }: Props) {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-200 text-sm">Coach Dashboard</p>
            <h2 className="font-display text-2xl font-bold">{user.name}</h2>
            <p className="text-emerald-200 text-sm mt-1">5 active clients · 44 sessions completed this quarter</p>
          </div>
          <div className="hidden sm:flex gap-4">
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">5</p>
              <p className="text-emerald-200 text-xs">Active Clients</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-emerald-200 text-xs">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Active Clients", value: "5", color: "bg-emerald-50 text-emerald-600" },
          { icon: Award, label: "Sessions (Q2)", value: "44", color: "bg-blue-50 text-blue-600" },
          { icon: Target, label: "Client Goals", value: "28", color: "bg-purple-50 text-purple-600" },
          { icon: Star, label: "Avg Rating", value: "4.9", color: "bg-amber-50 text-amber-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-display font-bold text-slate-900">{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">Weekly Sessions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sessionData}>
              <defs>
                <linearGradient id="coachGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
              <Area type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} fill="url(#coachGrad)" name="Sessions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-4">Client Progress Overview</h3>
          <div className="space-y-4">
            {clients.slice(0, 4).map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {getInitials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-slate-800 text-sm font-medium truncate">{c.name}</p>
                    <span className="text-xs font-semibold text-slate-700 ml-2">{c.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold text-slate-900">Client Coaching Plans</h3>
          <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">Add Client</button>
        </div>
        <div className="space-y-4">
          {clients.map((c) => {
            const st = statusMap[c.status];
            return (
              <div key={c.name} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {getInitials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-slate-800 font-semibold text-sm">{c.name}</p>
                    <span className={`badge text-xs ${st.cls}`}>{st.label}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">{c.goal}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />{c.sessions} sessions
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />Next: {c.nextSession}
                    </span>
                    <div className="flex-1 max-w-24">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{c.progress}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
