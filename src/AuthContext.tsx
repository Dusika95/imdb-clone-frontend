import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export interface User {
  email: string;
  role: string;
  id: number;
}
export type UserRole = "admin" | "editor" | "moderator" | "user";
export interface AuthContextProps {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  isAuthenticated: false,
  hasRole: () => false,
  login: () => {},
  logout: () => {},
});

export function Auth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("token");
    if (!accessToken) {
      return;
    }

    const decoded = jwtDecode(accessToken);
    if (decoded.exp! <= new Date().getTime() / 1000) {
      return;
    }

    setUser(decoded as User);
    setToken(accessToken);
  }, []);

  function hasRole(role: UserRole): boolean {
    if (!user) {
      return false;
    }

    return user.role == role;
  }

  function logout(): void {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }

  function login(accessToken: string): void {
    const decoded = jwtDecode(accessToken);
    sessionStorage.setItem("user", JSON.stringify(decoded));
    sessionStorage.setItem("token", accessToken);
    setUser(decoded as User);
    setToken(accessToken);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, hasRole, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}
