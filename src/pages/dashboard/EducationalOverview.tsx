import { GraduationCap, Users, Target, BookOpen, TrendingUp, BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import type { User } from "@/types";

interface Props { user: User }

const departments = [
  { name: "Computer Science", students: 320, goalsCompletion: 78, avgGrade: "A-" },
  { name: "Business Admin", students: 285, goalsCompletion: 82, avgGrade: "B+" },
  { name: "Engineering", students: 410, goalsCompletion: 74, avgGrade: "B+" },
  { name: "Liberal Arts", students: 195, goalsCompletion: 88, avgGrade: "A-" },
  { name: "Sciences", students: 260, goalsCompletion: 71, avgGrade: "B" },
];

const studentProgress = [
  { month: "Sep", passing: 88, atrisk: 12 }, { month: "Oct", passing: 84, atrisk: 16 },
  { month: "Nov", passing: 87, atrisk: 13 }, { month: "Dec", passing: 79, atrisk: 21 },
  { month: "Jan", passing: 91, atrisk: 9 }, { month: "Feb", passing: 89, atrisk: 11 },
  { month: "Mar", passing: 92, atrisk: 8 }, { month: "Apr", passing: 94, atrisk: 6 },
];

const goalTypes = [
  { name: "Academic", value: 45, color: "#3b82f6" },
  { name: "Career", value: 30, color: "#10b981" },
  { name: "Skills", value: 15, color: "#f59e0b" },
  { name: "Personal", value: 10, color: "#8b5cf6" },
];

export default function EducationalOverview({ user }: Props) {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm">Educational Dashboard</p>
            <h2 className="font-display text-2xl font-bold">{user.organization || "Westfield University"}</h2>
            <p className="text-amber-100 text-sm mt-1">1,470 students · 5 departments · Academic Year 2025–2026</p>
          </div>
          <div className="hidden sm:flex gap-4">
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">92%</p>
              <p className="text-amber-200 text-xs">Pass Rate</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">1,470</p>
              <p className="text-amber-200 text-xs">Students</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Students", value: "1,470", color: "bg-amber-50 text-amber-600" },
          { icon: GraduationCap, label: "Graduation Rate", value: "94%", color: "bg-emerald-50 text-emerald-600" },
          { icon: Target, label: "Goals Active", value: "3,240", color: "bg-blue-50 text-blue-600" },
          { icon: BookOpen, label: "Courses Running", value: "128", color: "bg-purple-50 text-purple-600" },
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

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">Student Progress Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={studentProgress}>
              <defs>
                <linearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="passing" stroke="#10b981" strokeWidth={2} fill="url(#passGrad)" name="Passing" />
              <Area type="monotone" dataKey="atrisk" stroke="#f59e0b" strokeWidth={2} fill="none" strokeDasharray="4 4" name="At Risk" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-4">Goal Types</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={goalTypes} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                {goalTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {goalTypes.map((g) => (
              <div key={g.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                  <span className="text-slate-600">{g.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{g.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-5">Department Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-header text-left pb-3">Department</th>
                <th className="table-header text-left pb-3">Students</th>
                <th className="table-header text-left pb-3">Goal Completion</th>
                <th className="table-header text-left pb-3">Avg Grade</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.name} className="table-row">
                  <td className="table-cell font-medium text-slate-800">{d.name}</td>
                  <td className="table-cell text-slate-600">{d.students}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-24 progress-bar">
                        <div className="progress-fill" style={{ width: `${d.goalsCompletion}%` }} />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{d.goalsCompletion}%</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-blue text-xs">{d.avgGrade}</span>
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
