import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Layout
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Public Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Solutions from "@/pages/Solutions";
import Pricing from "@/pages/Pricing";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import NotFound from "@/pages/NotFound";

// Dashboard Pages (shared)
import IndividualOverview from "@/pages/dashboard/IndividualOverview";
import TeamOverview from "@/pages/dashboard/TeamOverview";
import CoachOverview from "@/pages/dashboard/CoachOverview";
import EducationalOverview from "@/pages/dashboard/EducationalOverview";
import EnterpriseOverview from "@/pages/dashboard/EnterpriseOverview";
import AdminOverview from "@/pages/dashboard/AdminOverview";
import GoalsPage from "@/pages/dashboard/GoalsPage";
import TasksPage from "@/pages/dashboard/TasksPage";
import KPIsPage from "@/pages/dashboard/KPIsPage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import NotificationsPage from "@/pages/dashboard/NotificationsPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import SubscriptionPage from "@/pages/dashboard/SubscriptionPage";
import TeamGoalsBoard from "@/pages/dashboard/TeamGoalsBoard";
import RoleControlPage from "@/pages/dashboard/RoleControlPage";

import { getUser } from "@/lib/auth";
import { getDashboardRoute } from "@/lib/auth";
import { useScrollTop } from "@/hooks/useScrollTop";

// Public Layout wrapper
function PublicLayout({ children }: { children: React.ReactNode }) {
  useScrollTop();
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

// Dashboard inner route wrapper that passes user
function DashboardInner({ children }: { children: (user: ReturnType<typeof getUser>) => React.ReactNode }) {
  const user = getUser();
  if (!user) return null;
  return <>{children(user)}</>;
}

export default function App() {
  const user = getUser();

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <Routes>
        {/* Root — landing page */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />

        {/* Redirect /home → / for backward compatibility */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Public pages */}
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
        <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Auth pages */}
        <Route path="/login" element={user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Individual Dashboard */}
        <Route path="/dashboard/individual" element={<ProtectedRoute role="individual"><DashboardInner>{(u) => <IndividualOverview user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/individual/goals" element={<ProtectedRoute role="individual"><GoalsPage /></ProtectedRoute>} />
        <Route path="/dashboard/individual/tasks" element={<ProtectedRoute role="individual"><TasksPage /></ProtectedRoute>} />
        <Route path="/dashboard/individual/kpis" element={<ProtectedRoute role="individual"><KPIsPage /></ProtectedRoute>} />
        <Route path="/dashboard/individual/analytics" element={<ProtectedRoute role="individual"><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/dashboard/individual/notifications" element={<ProtectedRoute role="individual"><NotificationsPage /></ProtectedRoute>} />
        <Route path="/dashboard/individual/profile" element={<ProtectedRoute role="individual"><DashboardInner>{(u) => <ProfilePage user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/individual/settings" element={<ProtectedRoute role="individual"><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/individual/subscription" element={<ProtectedRoute role="individual"><DashboardInner>{(u) => <SubscriptionPage user={u!} />}</DashboardInner></ProtectedRoute>} />

        {/* Team Dashboard */}
        <Route path="/dashboard/team" element={<ProtectedRoute role="team"><DashboardInner>{(u) => <TeamOverview user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/team/goals" element={<ProtectedRoute role="team"><GoalsPage /></ProtectedRoute>} />
        <Route path="/dashboard/team/tasks" element={<ProtectedRoute role="team"><TasksPage /></ProtectedRoute>} />
        <Route path="/dashboard/team/kpis" element={<ProtectedRoute role="team"><KPIsPage /></ProtectedRoute>} />
        <Route path="/dashboard/team/analytics" element={<ProtectedRoute role="team"><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/dashboard/team/notifications" element={<ProtectedRoute role="team"><NotificationsPage /></ProtectedRoute>} />
        <Route path="/dashboard/team/profile" element={<ProtectedRoute role="team"><DashboardInner>{(u) => <ProfilePage user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/team/settings" element={<ProtectedRoute role="team"><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/team/subscription" element={<ProtectedRoute role="team"><DashboardInner>{(u) => <SubscriptionPage user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/team/board" element={<ProtectedRoute role="team"><TeamGoalsBoard /></ProtectedRoute>} />

        {/* Coach Dashboard */}
        <Route path="/dashboard/coach" element={<ProtectedRoute role="coach"><DashboardInner>{(u) => <CoachOverview user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/coach/goals" element={<ProtectedRoute role="coach"><GoalsPage /></ProtectedRoute>} />
        <Route path="/dashboard/coach/tasks" element={<ProtectedRoute role="coach"><TasksPage /></ProtectedRoute>} />
        <Route path="/dashboard/coach/kpis" element={<ProtectedRoute role="coach"><KPIsPage /></ProtectedRoute>} />
        <Route path="/dashboard/coach/analytics" element={<ProtectedRoute role="coach"><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/dashboard/coach/notifications" element={<ProtectedRoute role="coach"><NotificationsPage /></ProtectedRoute>} />
        <Route path="/dashboard/coach/profile" element={<ProtectedRoute role="coach"><DashboardInner>{(u) => <ProfilePage user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/coach/settings" element={<ProtectedRoute role="coach"><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/coach/subscription" element={<ProtectedRoute role="coach"><DashboardInner>{(u) => <SubscriptionPage user={u!} />}</DashboardInner></ProtectedRoute>} />

        {/* Educational Dashboard */}
        <Route path="/dashboard/educational" element={<ProtectedRoute role="educational"><DashboardInner>{(u) => <EducationalOverview user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/educational/goals" element={<ProtectedRoute role="educational"><GoalsPage /></ProtectedRoute>} />
        <Route path="/dashboard/educational/tasks" element={<ProtectedRoute role="educational"><TasksPage /></ProtectedRoute>} />
        <Route path="/dashboard/educational/kpis" element={<ProtectedRoute role="educational"><KPIsPage /></ProtectedRoute>} />
        <Route path="/dashboard/educational/analytics" element={<ProtectedRoute role="educational"><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/dashboard/educational/notifications" element={<ProtectedRoute role="educational"><NotificationsPage /></ProtectedRoute>} />
        <Route path="/dashboard/educational/profile" element={<ProtectedRoute role="educational"><DashboardInner>{(u) => <ProfilePage user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/educational/settings" element={<ProtectedRoute role="educational"><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/educational/subscription" element={<ProtectedRoute role="educational"><DashboardInner>{(u) => <SubscriptionPage user={u!} />}</DashboardInner></ProtectedRoute>} />

        {/* Enterprise Dashboard */}
        <Route path="/dashboard/enterprise" element={<ProtectedRoute role="enterprise"><DashboardInner>{(u) => <EnterpriseOverview user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/goals" element={<ProtectedRoute role="enterprise"><GoalsPage /></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/tasks" element={<ProtectedRoute role="enterprise"><TasksPage /></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/kpis" element={<ProtectedRoute role="enterprise"><KPIsPage /></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/analytics" element={<ProtectedRoute role="enterprise"><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/notifications" element={<ProtectedRoute role="enterprise"><NotificationsPage /></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/profile" element={<ProtectedRoute role="enterprise"><DashboardInner>{(u) => <ProfilePage user={u!} />}</DashboardInner></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/settings" element={<ProtectedRoute role="enterprise"><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/enterprise/subscription" element={<ProtectedRoute role="enterprise"><DashboardInner>{(u) => <SubscriptionPage user={u!} />}</DashboardInner></ProtectedRoute>} />

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={<ProtectedRoute role="admin"><AdminOverview /></ProtectedRoute>} />
        <Route path="/dashboard/admin/users" element={<ProtectedRoute role="admin"><AdminOverview /></ProtectedRoute>} />
        <Route path="/dashboard/admin/subscriptions" element={<ProtectedRoute role="admin"><AdminOverview /></ProtectedRoute>} />
        <Route path="/dashboard/admin/analytics" element={<ProtectedRoute role="admin"><AdminOverview /></ProtectedRoute>} />
        <Route path="/dashboard/admin/roles" element={<ProtectedRoute role="admin"><RoleControlPage /></ProtectedRoute>} />
        <Route path="/dashboard/admin/notifications" element={<ProtectedRoute role="admin"><NotificationsPage /></ProtectedRoute>} />
        <Route path="/dashboard/admin/settings" element={<ProtectedRoute role="admin"><SettingsPage /></ProtectedRoute>} />

        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
