import type { User } from "@/shared";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface LoginCredentials {
  email: string;
  password: string;
  googleToken?: string;
}
export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
export interface ForgetPasswordCredentials {
  email: string;
}
export interface GetMe {
  status: "success" | "fail";
  message: string;
  data: User;
}
export interface AuthState {
  status: "loading" | "authenticated" | "unauthenticated";
  email: string | null;
  user: User | null;
}
export interface AuthResponse {
  status: "success" | "fail";
  message: string;
  data: User & { otpCode?: string };
}
export interface ErrorResponse {
  data: {
    error: { code: string; message: string };
    status: "fail" | "success";
  };
  status: string;
}
export interface RegisterType {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  name: "firstName" | "lastName" | "username" | "email" | "password";
}
export type AuthResult =
  | { success: true }
  | { success: true; otpCode: string }
  | { success: false; error: FetchBaseQueryError | SerializedError | string };
export interface UseAuthReturn {
  user: User | null;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isRequestingReset: boolean;
  isLoggingInWithGoogle: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  register: (credentials: RegisterCredentials) => Promise<AuthResult>;
  forgetPassword: (
    credentials: ForgetPasswordCredentials,
  ) => Promise<AuthResult>;
  loginWithGoogle: (credentials: { token: string }) => Promise<AuthResult>;
}

export type AuthApiError = FetchBaseQueryError | SerializedError;
