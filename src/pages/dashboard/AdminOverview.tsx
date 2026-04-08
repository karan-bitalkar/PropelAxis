import { useState } from "react";
import { Shield, Users, CreditCard, BarChart3, Trash2, Search, UserCheck, UserX, ArrowUp, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { getInitials, formatDate } from "@/lib/utils";
import DeleteModal from "@/components/modals/DeleteModal";
import { toast } from "sonner";
import { CHART_DATA_MONTHLY } from "@/constants";

const allUsers = [
  { id: "u1", name: "Alex Thompson", email: "teams@propelaxis.com", role: "individual", plan: "Professional", status: "active", joined: "2025-09-01", goals: 5 },
  { id: "u2", name: "Jordan Lee", email: "org@propelaxis.com", role: "team", plan: "Team", status: "active", joined: "2025-10-15", goals: 18 },
  { id: "u3", name: "Dr. Morgan Blake", email: "coach@propelaxis.com", role: "coach", plan: "Coach", status: "active", joined: "2025-08-20", goals: 28 },
  { id: "u4", name: "Prof. Robin Hayes", email: "edu@propelaxis.com", role: "educational", plan: "Education", status: "active", joined: "2025-11-01", goals: 3240 },
  { id: "u5", name: "Casey Williams", email: "enterprise@propelaxis.com", role: "enterprise", plan: "Enterprise", status: "active", joined: "2025-07-10", goals: 340 },
  { id: "u6", name: "Taylor Nguyen", email: "taylor@example.com", role: "individual", plan: "Individual", status: "inactive", joined: "2026-01-05", goals: 2 },
  { id: "u7", name: "Morgan Davis", email: "morgan@corp.com", role: "team", plan: "Team", status: "active", joined: "2026-02-14", goals: 12 },
  { id: "u8", name: "Sam Patel", email: "sam@edu.org", role: "educational", plan: "Education", status: "active", joined: "2026-03-01", goals: 890 },
];

const planColors: Record<string, string> = {
  Professional: "bg-violet-100 text-violet-700",
  Team: "bg-indigo-100 text-indigo-700",
  Coach: "bg-emerald-100 text-emerald-700",
  Education: "bg-amber-100 text-amber-700",
  Enterprise: "bg-rose-100 text-rose-700",
  Individual: "bg-slate-100 text-slate-600",
};

export default function AdminOverview() {
  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState<typeof allUsers[0] | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete() {
    if (!deleteUser) return;
    setUsers(users.filter((u) => u.id !== deleteUser.id));
    toast.success(`User ${deleteUser.name} has been removed.`);
    setDeleteUser(null);
  }

  function toggleStatus(id: string) {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
    toast.success("User status updated.");
  }

  return (
    <div className="p-6 space-y-6">
      {/* Admin Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-950 rounded-2xl p-6 text-white border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-violet-400" />
              <p className="text-slate-400 text-sm font-medium">Admin Control Panel</p>
            </div>
            <h2 className="font-display text-2xl font-bold">Platform Administration</h2>
            <p className="text-slate-400 text-sm mt-1">Manage users, subscriptions, and platform analytics</p>
          </div>
          <div className="hidden sm:flex gap-4">
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-slate-400 text-xs">Total Users</p>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
              <p className="text-slate-400 text-xs">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
        {[
          { id: "overview", label: "Overview" },
          { id: "users", label: "User Management" },
          { id: "subscriptions", label: "Subscriptions" },
          { id: "analytics", label: "Analytics Monitor" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? "border-violet-600 text-violet-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Total Users", value: "50,247", change: "+1,240 this month", color: "bg-violet-50 text-violet-600" },
              { icon: TrendingUp, label: "MRR", value: "$124.5K", change: "+12.4%", color: "bg-emerald-50 text-emerald-600" },
              { icon: CreditCard, label: "Active Subs", value: "2,847", change: "+89 this week", color: "bg-indigo-50 text-indigo-600" },
              { icon: BarChart3, label: "Goals Created", value: "1.2M+", change: "All time", color: "bg-rose-50 text-rose-600" },
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

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-display font-semibold text-slate-900 mb-6">User Growth</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={CHART_DATA_MONTHLY}>
                  <defs>
                    <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="tasks" stroke="#7c3aed" strokeWidth={2} fill="url(#adminGrad)" name="New Users" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-display font-semibold text-slate-900 mb-6">Goals Created Monthly</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={CHART_DATA_MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="goals" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Goals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input-field pl-9" placeholder="Search users by name, email, or role..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="table-header text-left px-6 py-4">User</th>
                    <th className="table-header text-left px-6 py-4">Role</th>
                    <th className="table-header text-left px-6 py-4">Plan</th>
                    <th className="table-header text-left px-6 py-4">Status</th>
                    <th className="table-header text-left px-6 py-4">Joined</th>
                    <th className="table-header text-left px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {getInitials(u.name)}
                          </div>
                          <div>
                            <p className="text-slate-800 font-medium text-sm">{u.name}</p>
                            <p className="text-slate-400 text-xs">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell capitalize text-slate-600">{u.role}</td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${planColors[u.plan] || "bg-slate-100 text-slate-600"}`}>{u.plan}</span>
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${u.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{u.status}</span>
                      </td>
                      <td className="table-cell text-slate-500 text-xs">{formatDate(u.joined)}</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStatus(u.id)}
                            className={`p-1.5 rounded-lg transition-colors ${u.status === "active" ? "hover:bg-amber-50 text-slate-400 hover:text-amber-600" : "hover:bg-emerald-50 text-slate-400 hover:text-emerald-600"}`}
                            title={u.status === "active" ? "Deactivate" : "Activate"}
                          >
                            {u.status === "active" ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => setDeleteUser(u)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { plan: "Individual", count: 28400, revenue: "$255.6K/mo", growth: "+8%", color: "text-violet-600" },
              { plan: "Team", count: 4200, revenue: "$121.8K/mo", growth: "+14%", color: "text-indigo-600" },
              { plan: "Enterprise", count: 247, revenue: "$247K/mo", growth: "+22%", color: "text-rose-600" },
            ].map((s) => (
              <div key={s.plan} className="stat-card">
                <h4 className="font-semibold text-slate-900 text-lg mb-1">{s.plan}</h4>
                <p className={`text-3xl font-display font-bold mb-1 ${s.color}`}>{s.count.toLocaleString()}</p>
                <p className="text-slate-500 text-sm">subscribers</p>
                <p className="text-slate-700 font-semibold text-sm mt-2">{s.revenue}</p>
                <p className="text-emerald-600 text-xs mt-1 font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />{s.growth} MoM
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Monitor Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-display font-semibold text-slate-900 mb-6">Platform Goal Activity</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={CHART_DATA_MONTHLY}>
                  <defs>
                    <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="goals" stroke="#10b981" strokeWidth={2} fill="url(#actGrad)" name="Goals" />
                  <Area type="monotone" dataKey="kpis" stroke="#7c3aed" strokeWidth={2} fill="none" name="KPIs" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-display font-semibold text-slate-900 mb-6">Task Completion Rate</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CHART_DATA_MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} name="Tasks Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={!!deleteUser}
        title="Delete User"
        message={`Are you sure you want to permanently delete "${deleteUser?.name}" (${deleteUser?.email})? All their data will be removed.`}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
