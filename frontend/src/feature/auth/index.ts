export type {
  User,
  GetMe,
  AuthState,
  AuthResult,
  AuthResponse,
  RegisterType,
  UseAuthReturn,
  ErrorResponse,
  LoginCredentials,
  RegisterCredentials,
} from "@/feature/auth/types/auth.types";
// constants
export { registerInput } from "@/feature/auth/constants/Input.constants";
// services
export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLoginWithGoogleMutation,
} from "@/feature/auth/services/authApi";
// hooks
export { useAuth } from "@/feature/auth/hooks/useAuth";
// store
export { setCredentials, logoutAction } from "@/feature/auth/store/authSlice";
// components
export { LoginForm } from "@/feature/auth/components/LoginForm";
export { RegisterForm } from "@/feature/auth/components/RegisterForm";
export { ProtectRoutes } from "@/feature/auth/components/ProtectRoutes";
export { GoogleLoginButton } from "@/feature/auth/components/GoogleLoginButton";
