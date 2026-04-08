import { useState, useEffect } from "react";
import {
  Target, TrendingUp, CheckSquare, Flame, BarChart3, ArrowUp, ArrowDown,
  Calendar, Award, Flag, RefreshCw
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { MOCK_GOALS, MOCK_TASKS, CHART_DATA_MONTHLY, PERFORMANCE_DATA, KPI_DISTRIBUTION } from "@/constants";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";

interface Props { user: User }

const COLORS = ["#16a34a", "#4f46e5", "#10b981", "#f59e0b"];

function StatCard({ icon: Icon, label, value, change, positive }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; change?: string; positive?: boolean }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-green-600" />
        </div>
        {change && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
            {positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-slate-500 text-xs">{label}</p>
    </div>
  );
}

export default function IndividualOverview({ user }: Props) {
  const activeGoals = MOCK_GOALS.filter((g) => g.status === "active").length;
  const completedTasks = MOCK_TASKS.filter((t) => t.status === "completed").length;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm mb-1">Good morning,</p>
            <h2 className="font-display text-2xl font-bold">{user.name}</h2>
            <p className="text-green-100 text-sm mt-2">You have {activeGoals} active goals and {MOCK_TASKS.filter((t) => t.status !== "completed").length} pending tasks today.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-center bg-white/15 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">7</p>
              <p className="text-green-100 text-xs">Day Streak</p>
            </div>
            <div className="text-center bg-white/15 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">78%</p>
              <p className="text-green-100 text-xs">Goal Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Flag} label="Active Goals" value={`${activeGoals}`} change="2 new" positive />
        <StatCard icon={CheckSquare} label="Tasks Completed" value={`${completedTasks}`} change="+18%" positive />
        <StatCard icon={TrendingUp} label="KPI Score" value="78%" change="+5.2%" positive />
        <StatCard icon={Flame} label="Current Streak" value="7 days" change="Personal best" positive />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-slate-900">Performance Trend</h3>
              <p className="text-slate-500 text-xs mt-0.5">Last 8 weeks</p>
            </div>
            <span className="badge-green text-xs">+29% improvement</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={PERFORMANCE_DATA}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
              <Area type="monotone" dataKey="performance" stroke="#16a34a" strokeWidth={2} fill="url(#perfGrad)" dot={{ fill: "#16a34a", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* KPI Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">KPI by Category</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={KPI_DISTRIBUTION} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {KPI_DISTRIBUTION.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {KPI_DISTRIBUTION.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="text-slate-900 font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals + Streak */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Goals */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-slate-900">Active Goals</h3>
            <span className="text-green-600 text-sm font-medium cursor-pointer hover:text-green-700">View All</span>
          </div>
          <div className="space-y-4">
            {MOCK_GOALS.filter((g) => g.status === "active").slice(0, 3).map((goal) => (
              <div key={goal.id} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-slate-800 text-sm font-medium truncate">{goal.title}</p>
                    <span className="text-slate-600 text-xs ml-2 flex-shrink-0">{goal.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${goal.progress}%` }} />
                  </div>
                  <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Due {formatDate(goal.deadline)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak & Activity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-green-500" />
            <h3 className="font-display font-semibold text-slate-900">Daily Streak</h3>
          </div>
          <div className="text-center py-4 mb-4">
            <p className="text-5xl font-display font-bold text-green-600">7</p>
            <p className="text-slate-500 text-sm mt-1">days in a row</p>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-center">
                <p className="text-slate-400 text-xs mb-1">{d}</p>
                <div className={`w-full aspect-square rounded-md ${i < 7 ? "bg-gradient-to-br from-green-500 to-indigo-600" : "bg-slate-100"}`} />
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-green-50 border border-green-100">
            <p className="text-green-700 text-xs font-medium text-center">Personal best! Keep it up!</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-5">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { icon: CheckSquare, color: "text-emerald-600 bg-emerald-50", text: "Completed task: Review Q1 performance metrics", time: "2h ago" },
            { icon: Flag, color: "text-green-600 bg-green-50", text: "Updated goal progress: Increase Revenue — 68%", time: "4h ago" },
            { icon: TrendingUp, color: "text-indigo-600 bg-indigo-50", text: "KPI milestone reached: Team Productivity > 85%", time: "Yesterday" },
            { icon: Award, color: "text-amber-600 bg-amber-50", text: "Earned achievement: 7-day consistency streak", time: "Yesterday" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-sm">{item.text}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
