import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "@/lib/auth";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const user = getUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return (
    <DashboardLayout user={user}>
      {children}
    </DashboardLayout>
  );
}
