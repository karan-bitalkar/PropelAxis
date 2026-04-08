import { useState } from "react";
import {
  Shield, Search, ChevronDown, Check, X, UserCheck, AlertTriangle,
  Users, User, Award, GraduationCap, Building2, Key, Lock, Eye, Edit2, Trash2
} from "lucide-react";
import { getInitials, formatDate } from "@/lib/utils";
import { toast } from "sonner";

type RoleId = "individual" | "team" | "coach" | "educational" | "enterprise" | "admin";

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: RoleId;
  plan: string;
  status: "active" | "inactive";
  joined: string;
  lastActive: string;
  selected?: boolean;
}

const ROLES: { id: RoleId; label: string; icon: React.ComponentType<{ className?: string }>; color: string; desc: string }[] = [
  { id: "individual", label: "Individual", icon: User, color: "bg-violet-100 text-violet-700", desc: "Personal goal management" },
  { id: "team", label: "Team", icon: Users, color: "bg-indigo-100 text-indigo-700", desc: "Team collaboration" },
  { id: "coach", label: "Coach", icon: Award, color: "bg-emerald-100 text-emerald-700", desc: "Client coaching access" },
  { id: "educational", label: "Educational", icon: GraduationCap, color: "bg-amber-100 text-amber-700", desc: "Academic institutions" },
  { id: "enterprise", label: "Enterprise", icon: Building2, color: "bg-rose-100 text-rose-700", desc: "Large scale access" },
  { id: "admin", label: "Admin", icon: Shield, color: "bg-slate-200 text-slate-700", desc: "Full platform control" },
];

const PERMISSIONS: { key: string; label: string; roles: RoleId[] }[] = [
  { key: "view_own_goals", label: "View Own Goals", roles: ["individual", "team", "coach", "educational", "enterprise", "admin"] },
  { key: "create_goals", label: "Create Goals", roles: ["individual", "team", "coach", "educational", "enterprise", "admin"] },
  { key: "view_team_goals", label: "View Team Goals", roles: ["team", "coach", "educational", "enterprise", "admin"] },
  { key: "manage_team", label: "Manage Team Members", roles: ["team", "enterprise", "admin"] },
  { key: "view_analytics", label: "View Analytics", roles: ["team", "coach", "educational", "enterprise", "admin"] },
  { key: "export_data", label: "Export Data", roles: ["team", "enterprise", "admin"] },
  { key: "api_access", label: "API Access", roles: ["enterprise", "admin"] },
  { key: "manage_subscriptions", label: "Manage Subscriptions", roles: ["admin"] },
  { key: "manage_users", label: "Manage All Users", roles: ["admin"] },
  { key: "role_assignment", label: "Assign User Roles", roles: ["admin"] },
  { key: "platform_settings", label: "Platform Settings", roles: ["admin"] },
  { key: "view_audit_logs", label: "View Audit Logs", roles: ["enterprise", "admin"] },
];

const INITIAL_USERS: ManagedUser[] = [
  { id: "u1", name: "Alex Thompson", email: "teams@propelaxis.com", role: "individual", plan: "Individual", status: "active", joined: "2025-09-01", lastActive: "Today" },
  { id: "u2", name: "Jordan Lee", email: "org@propelaxis.com", role: "team", plan: "Team", status: "active", joined: "2025-10-15", lastActive: "2h ago" },
  { id: "u3", name: "Dr. Morgan Blake", email: "coach@propelaxis.com", role: "coach", plan: "Coach", status: "active", joined: "2025-08-20", lastActive: "Yesterday" },
  { id: "u4", name: "Prof. Robin Hayes", email: "edu@propelaxis.com", role: "educational", plan: "Education", status: "active", joined: "2025-11-01", lastActive: "3h ago" },
  { id: "u5", name: "Casey Williams", email: "enterprise@propelaxis.com", role: "enterprise", plan: "Enterprise", status: "active", joined: "2025-07-10", lastActive: "Today" },
  { id: "u6", name: "Taylor Nguyen", email: "taylor@example.com", role: "individual", plan: "Individual", status: "inactive", joined: "2026-01-05", lastActive: "1 week ago" },
  { id: "u7", name: "Morgan Davis", email: "morgan@corp.com", role: "team", plan: "Team", status: "active", joined: "2026-02-14", lastActive: "Today" },
  { id: "u8", name: "Sam Patel", email: "sam@edu.org", role: "educational", plan: "Education", status: "active", joined: "2026-03-01", lastActive: "5h ago" },
];

function RoleBadge({ role }: { role: RoleId }) {
  const r = ROLES.find((r) => r.id === role);
  if (!r) return null;
  const Icon = r.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${r.color}`}>
      <Icon className="w-3 h-3" />
      {r.label}
    </span>
  );
}

function RoleDropdown({ current, onSelect }: { current: RoleId; onSelect: (role: RoleId) => void }) {
  const [open, setOpen] = useState(false);
  const currentRole = ROLES.find((r) => r.id === current);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-violet-300 bg-white text-sm transition-colors"
      >
        <RoleBadge role={current} />
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-20 w-56 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = role.id === current;
            return (
              <button
                key={role.id}
                onClick={() => { onSelect(role.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left ${isSelected ? "bg-violet-50" : ""}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${role.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-medium">{role.label}</p>
                  <p className="text-slate-400 text-xs">{role.desc}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-violet-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function RoleControlPage() {
  const [users, setUsers] = useState<ManagedUser[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "matrix" | "audit">("users");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmChange, setConfirmChange] = useState<{ userId: string; newRole: RoleId; userName: string } | null>(null);
  const [bulkRole, setBulkRole] = useState<RoleId>("individual");
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.includes(search.toLowerCase())
  );

  function requestRoleChange(userId: string, newRole: RoleId) {
    const user = users.find((u) => u.id === userId);
    if (!user || user.role === newRole) return;
    setConfirmChange({ userId, newRole, userName: user.name });
  }

  function confirmRoleChange() {
    if (!confirmChange) return;
    setUsers(users.map((u) => u.id === confirmChange.userId ? { ...u, role: confirmChange.newRole } : u));
    toast.success(`Role updated: ${confirmChange.userName} is now ${confirmChange.newRole}`);
    setConfirmChange(null);
  }

  function handleBulkRoleChange() {
    setUsers(users.map((u) => selectedIds.includes(u.id) ? { ...u, role: bulkRole } : u));
    toast.success(`Bulk role change applied to ${selectedIds.length} user(s)`);
    setSelectedIds([]);
    setShowBulkConfirm(false);
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function selectAll() {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((u) => u.id));
    }
  }

  const tabs = [
    { id: "users", label: "User Roles", icon: Users },
    { id: "matrix", label: "Permission Matrix", icon: Key },
    { id: "audit", label: "Role Changes", icon: Shield },
  ] as const;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900">Role Control Center</h2>
        <p className="text-slate-500 text-sm">Manage user roles, permissions, and access levels across the platform</p>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const count = users.filter((u) => u.role === role.id).length;
          return (
            <div key={role.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2 ${role.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-display font-bold text-slate-900">{count}</p>
              <p className="text-slate-500 text-xs mt-0.5">{role.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-violet-600 text-violet-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* User Roles Tab */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 text-sm"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 p-2 bg-violet-50 rounded-xl border border-violet-200">
                <span className="text-violet-700 text-sm font-medium">{selectedIds.length} selected</span>
                <select
                  value={bulkRole}
                  onChange={(e) => setBulkRole(e.target.value as RoleId)}
                  className="px-2 py-1 text-xs rounded-lg border border-violet-200 focus:outline-none bg-white"
                >
                  {ROLES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
                <button
                  onClick={() => setShowBulkConfirm(true)}
                  className="px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Apply
                </button>
                <button onClick={() => setSelectedIds([])} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3.5 text-left w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filtered.length && filtered.length > 0}
                        onChange={selectAll}
                        className="w-4 h-4 rounded accent-violet-600 cursor-pointer"
                      />
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Role</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Assign Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${selectedIds.includes(u.id) ? "bg-violet-50/50" : ""}`}>
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(u.id)}
                          onChange={() => toggleSelect(u.id)}
                          className="w-4 h-4 rounded accent-violet-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {getInitials(u.name)}
                          </div>
                          <div>
                            <p className="text-slate-800 font-semibold text-sm">{u.name}</p>
                            <p className="text-slate-400 text-xs">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${u.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-sm">{u.lastActive}</td>
                      <td className="px-5 py-4">
                        <RoleDropdown
                          current={u.role}
                          onSelect={(newRole) => requestRoleChange(u.id, newRole)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Permission Matrix Tab */}
      {activeTab === "matrix" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[200px]">Permission</th>
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    return (
                      <th key={r.id} className="px-4 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${r.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px]">{r.label}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((perm, i) => (
                  <tr key={perm.key} className={`border-b border-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-3 text-slate-700 text-sm font-medium">{perm.label}</td>
                    {ROLES.map((role) => (
                      <td key={role.id} className="px-4 py-3 text-center">
                        {perm.roles.includes(role.id) ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                            <X className="w-3 h-3 text-slate-300" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audit Tab */}
      {activeTab === "audit" && (
        <div className="space-y-3">
          {[
            { user: "Dr. Morgan Blake", from: "individual", to: "coach", by: "Admin", time: "Apr 8, 2026 at 14:32" },
            { user: "Jordan Lee", from: "individual", to: "team", by: "Admin", time: "Apr 7, 2026 at 10:15" },
            { user: "Prof. Robin Hayes", from: "team", to: "educational", by: "Admin", time: "Apr 6, 2026 at 09:00" },
            { user: "Casey Williams", from: "team", to: "enterprise", by: "Admin", time: "Mar 28, 2026 at 16:45" },
            { user: "Taylor Nguyen", from: "coach", to: "individual", by: "Admin", time: "Mar 20, 2026 at 11:30" },
          ].map((log, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{log.user}</span>
                    <span className="text-slate-400 text-xs">role changed</span>
                    <RoleBadge role={log.from as RoleId} />
                    <span className="text-slate-400 text-xs">→</span>
                    <RoleBadge role={log.to as RoleId} />
                  </div>
                  <p className="text-xs text-slate-400">By {log.by} · {log.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Role Change Confirmation Modal */}
      {confirmChange && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900">Confirm Role Change</h3>
                <p className="text-slate-500 text-sm">This action will take effect immediately.</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 mb-5">
              <p className="text-slate-700 text-sm">
                Changing <strong>{confirmChange.userName}</strong> from{" "}
                <RoleBadge role={users.find((u) => u.id === confirmChange.userId)?.role || "individual"} />{" "}
                to{" "}
                <RoleBadge role={confirmChange.newRole} />
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Their dashboard access and permissions will be updated immediately.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmChange(null)} className="px-4 py-2.5 text-slate-600 font-medium text-sm rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={confirmRoleChange} className="px-5 py-2.5 bg-violet-600 text-white font-semibold text-sm rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Role Change Confirmation */}
      {showBulkConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900">Bulk Role Change</h3>
                <p className="text-slate-500 text-sm">This will affect {selectedIds.length} user(s).</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-5">
              You are about to change the role of <strong>{selectedIds.length} selected user(s)</strong> to{" "}
              <strong>{ROLES.find((r) => r.id === bulkRole)?.label}</strong>. This cannot be undone automatically.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowBulkConfirm(false)} className="px-4 py-2.5 text-slate-600 font-medium text-sm rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleBulkRoleChange} className="px-5 py-2.5 bg-rose-600 text-white font-semibold text-sm rounded-xl hover:bg-rose-700 transition-colors flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Apply Bulk Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
