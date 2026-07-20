import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterCredentials {
  fullName: string;
  username: string;
  email: string;
  password: string;
}
export interface User {
  id: string;
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
export interface GetMe {
  status: "success" | "fail";
  message: string;
  data: {
    fullName: string;
    email: string;
    role: "admin" | "manager";
    gender: null | "male" | "female";
    id: string;
  };
}

export interface AuthState {
  status: "loading" | "authenticated" | "unauthenticated";
  user: User | null;
}
export interface ErrorResponse {
  data: {
    error: { code: string; message: string };
    status: "fail" | "success";
  };
  status: string;
}

export type AuthResult =
  | { success: true }
  | { success: false; error: FetchBaseQueryError | SerializedError | string };
// useAuth
export interface UseAuthReturn {
  user: User | null;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isRegistering: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<AuthResult>;
}
