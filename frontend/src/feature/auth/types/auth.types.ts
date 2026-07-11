// features/auth/types/auth.types.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  fullName: string;
  role: "admin" | "manager";
  gender: "male" | "female" | null;
}

export interface AuthResponse {
  status: "success" | "fail";
  message: string;
  data: {
    fullName: string;
    email: string;
    role: "admin" | "manager";
    gender: null | "male" | "female";
    id: string;
    token: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
