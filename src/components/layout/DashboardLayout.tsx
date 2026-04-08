import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Target,
  LayoutDashboard,
  Flag,
  CheckSquare,
  BarChart3,
  TrendingUp,
  Bell,
  User,
  Settings,
  Shield,
  Users,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Building2,
  Award,
  GraduationCap,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import type { User as UserType } from "@/types";
import LogoutModal from "@/components/modals/LogoutModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserType;
}

function getSidebarItems(role: string) {
  const base = "/dashboard/" + role;

  if (role === "admin") {
    return [
      { icon: LayoutDashboard, label: "Overview", path: base },
      { icon: Users, label: "User Management", path: `${base}/users` },
      { icon: CreditCard, label: "Subscriptions", path: `${base}/subscriptions` },
      { icon: BarChart3, label: "Analytics Monitor", path: `${base}/analytics` },
      { icon: Shield, label: "Role Control", path: `${base}/roles` },
      { icon: Bell, label: "Notifications", path: `${base}/notifications` },
      { icon: Settings, label: "Settings", path: `${base}/settings` },
    ];
  }

  if (role === "team") {
    return [
      { icon: LayoutDashboard, label: "Overview", path: base },
      { icon: Flag, label: "Goals", path: `${base}/goals` },
      { icon: Users, label: "Team Board", path: `${base}/board` },
      { icon: CheckSquare, label: "Tasks", path: `${base}/tasks` },
      { icon: TrendingUp, label: "KPIs", path: `${base}/kpis` },
      { icon: BarChart3, label: "Analytics", path: `${base}/analytics` },
      { icon: CreditCard, label: "Subscription", path: `${base}/subscription` },
      { icon: Bell, label: "Notifications", path: `${base}/notifications` },
      { icon: User, label: "Profile", path: `${base}/profile` },
      { icon: Settings, label: "Settings", path: `${base}/settings` },
    ];
  }

  return [
    { icon: LayoutDashboard, label: "Overview", path: base },
    { icon: Flag, label: "Goals", path: `${base}/goals` },
    { icon: CheckSquare, label: "Tasks", path: `${base}/tasks` },
    { icon: TrendingUp, label: "KPIs", path: `${base}/kpis` },
    { icon: BarChart3, label: "Analytics", path: `${base}/analytics` },
    { icon: CreditCard, label: "Subscription", path: `${base}/subscription` },
    { icon: Bell, label: "Notifications", path: `${base}/notifications` },
    { icon: User, label: "Profile", path: `${base}/profile` },
    { icon: Settings, label: "Settings", path: `${base}/settings` },
  ];
}

function getRoleIcon(role: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    individual: User,
    team: Users,
    coach: Award,
    educational: GraduationCap,
    enterprise: Building2,
    admin: Shield,
  };
  return map[role] || User;
}

function getRoleLabel(role: string) {
  const map: Record<string, string> = {
    individual: "Individual",
    team: "Team Org",
    coach: "Coach",
    educational: "Education",
    enterprise: "Enterprise",
    admin: "Admin",
  };
  return map[role] || role;
}

function getRoleAccent(role: string): { gradient: string; activeClass: string; badge: string } {
  const map: Record<string, { gradient: string; activeClass: string; badge: string }> = {
    individual: {
      gradient: "from-green-600 to-indigo-600",
      activeClass: "bg-gradient-to-r from-green-600 to-indigo-600 text-white shadow-lg shadow-green-900/30",
      badge: "bg-green-500/20 text-green-300",
    },
    team: {
      gradient: "from-green-600 to-teal-600",
      activeClass: "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-900/30",
      badge: "bg-teal-500/20 text-teal-300",
    },
    coach: {
      gradient: "from-indigo-600 to-blue-600",
      activeClass: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-900/30",
      badge: "bg-indigo-500/20 text-indigo-300",
    },
    educational: {
      gradient: "from-green-500 to-emerald-600",
      activeClass: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-900/30",
      badge: "bg-emerald-500/20 text-emerald-300",
    },
    enterprise: {
      gradient: "from-indigo-600 to-violet-600",
      activeClass: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/30",
      badge: "bg-violet-500/20 text-violet-300",
    },
    admin: {
      gradient: "from-green-700 to-slate-700",
      activeClass: "bg-gradient-to-r from-green-700 to-slate-700 text-white shadow-lg shadow-green-900/40",
      badge: "bg-slate-500/20 text-slate-300",
    },
  };
  return map[role] || map.individual;
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const sidebarItems = getSidebarItems(user.role);
  const RoleIcon = getRoleIcon(user.role);
  const accent = getRoleAccent(user.role);

  const isActive = (path: string) => {
    if (path === `/dashboard/${user.role}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-white/8", collapsed && "justify-center px-0")}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br from-green-500 to-indigo-600">
          <Target className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-white font-display font-bold text-lg tracking-tight">
            Propel<span className="text-green-400">Axis</span>
          </span>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/8">
          <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold", accent.badge)}>
            <RoleIcon className="w-3.5 h-3.5" />
            {getRoleLabel(user.role)} Dashboard
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                  active
                    ? accent.activeClass
                    : "text-slate-400 hover:text-white hover:bg-white/8 cursor-pointer",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 shadow-lg border border-white/10">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-white/8">
        <div className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors mb-1", collapsed && "justify-center px-0")}>
          <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0", accent.gradient)}>
            {getInitials(user.name)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-slate-500 text-xs truncate">{user.email}</p>
            </div>
          )}
        </div>
        <div className="relative group">
          <button
            onClick={() => setShowLogout(true)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm w-full transition-all text-slate-500 hover:text-red-400 hover:bg-red-500/10",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          {collapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 shadow-lg border border-white/10">
              Logout
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-[#0a1628] border-r border-white/5 transition-all duration-300 relative flex-shrink-0",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#0d2818] border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-[#0a1628] flex flex-col animate-slide-in">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-green-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-green-50 text-slate-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-slate-900 font-display font-semibold text-lg">
                {sidebarItems.find((i) => isActive(i.path))?.label || "Dashboard"}
              </h1>
              <p className="text-slate-500 text-xs">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/dashboard/${user.role}/notifications`} className="relative p-2 rounded-xl hover:bg-green-50 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full" />
            </Link>
            <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold", accent.gradient)}>
              {getInitials(user.name)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
      />
    </div>
  );
}
