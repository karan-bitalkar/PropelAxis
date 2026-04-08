import type { User, UserRole } from "@/types";

const AUTH_KEY = "propelaxis_auth";

const ACCOUNT_MAP: Record<string, { role: UserRole; name: string; organization?: string; plan?: string }> = {
  "teams@propelaxis.com": { role: "individual", name: "Alex Thompson", plan: "Professional" },
  "org@propelaxis.com": { role: "team", name: "Jordan Lee", organization: "Apex Corp", plan: "Team" },
  "coach@propelaxis.com": { role: "coach", name: "Dr. Morgan Blake", organization: "BlakeCoach", plan: "Coach" },
  "edu@propelaxis.com": { role: "educational", name: "Prof. Robin Hayes", organization: "Westfield University", plan: "Education" },
  "enterprise@propelaxis.com": { role: "enterprise", name: "Casey Williams", organization: "Global Dynamics Inc.", plan: "Enterprise" },
  "admin@propelaxis.com": { role: "admin", name: "Admin User", plan: "Admin" },
};

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const account = ACCOUNT_MAP[email.toLowerCase()];
  if (!account) {
    return { success: false, error: "No account found with this email address." };
  }
  if (password !== "123456") {
    return { success: false, error: "Incorrect password. Please try again." };
  }
  const user: User = {
    id: Math.random().toString(36).slice(2),
    email: email.toLowerCase(),
    name: account.name,
    role: account.role,
    organization: account.organization,
    plan: account.plan,
    joinedAt: "2025-09-01",
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getUser(): User | null {
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}

export function getDashboardRoute(role: UserRole): string {
  const routes: Record<UserRole, string> = {
    individual: "/dashboard/individual",
    team: "/dashboard/team",
    coach: "/dashboard/coach",
    educational: "/dashboard/educational",
    enterprise: "/dashboard/enterprise",
    admin: "/dashboard/admin",
  };
  return routes[role];
}
