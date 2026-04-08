export type UserRole = 
  | "individual" 
  | "team" 
  | "coach" 
  | "educational" 
  | "enterprise" 
  | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
  plan?: string;
  joinedAt?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "completed" | "paused" | "at-risk";
  progress: number;
  deadline: string;
  createdAt: string;
  ownerId: string;
  priority: "low" | "medium" | "high";
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  assignee?: string;
  goalId?: string;
  dueDate: string;
  createdAt: string;
}

export interface KPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
  change: number;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  performance: number;
  status: "active" | "inactive";
  avatar?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billing: "monthly" | "annual";
  features: string[];
  isPopular?: boolean;
}

export interface DemoAccount {
  role: UserRole;
  label: string;
  email: string;
  password: string;
  description: string;
  icon: string;
  color: string;
}
