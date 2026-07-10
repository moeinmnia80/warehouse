// features/auth/types/auth.types.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  // id: number;
  email: string;
  fullName: string;
  // role: "admin" | "manager" | "operator" | "viewer";
}

export interface AuthResponse {
  data: { email: string; fullName: string };
  message: string;
  status: "success" | "fail";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
