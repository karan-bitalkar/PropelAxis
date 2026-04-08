import { useState, useEffect } from "react";
import { getUser, login, logout } from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  function handleLogin(email: string, password: string) {
    const result = login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }

  function handleLogout() {
    logout();
    setUser(null);
  }

  return {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };
}
