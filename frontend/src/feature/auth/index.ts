export type {
  GetMe,
  AuthState,
  AuthResult,
  OPTResponse,
  AuthApiError,
  AuthResponse,
  RegisterType,
  UseAuthReturn,
  ErrorResponse,
  LoginCredentials,
  OtpInputGroupProps,
  RegisterCredentials,
  ForgetPasswordCredentials,
} from "@/feature/auth/types/auth.types";
// constants
export { registerInput } from "@/feature/auth/constants/input";
// services
export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useResendOptMutation,
  useGetCurrentUserQuery,
  useVerifyOtpCodeMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
  useLoginWithGoogleMutation,
} from "@/feature/auth/services/authApi";
// hooks
export { useAuth } from "@/feature/auth/hooks/useAuth";
export { useRequireAuth } from "@/feature/auth/hooks/useReqiureAuth";
// store
export {
  setEmail,
  logoutAction,
  setCredentials,
} from "@/feature/auth/store/authSlice";
// components
export { LoginForm } from "@/feature/auth/components/LoginForm";
export { VerifyForm } from "@/feature/auth/components/VerifyForm";
export { RegisterForm } from "@/feature/auth/components/RegisterForm";
export { OtpInputGroup } from "@/feature/auth/components/OtpInputGroup";
export { ProtectRoutes } from "@/feature/auth/components/ProtectRoutes";
export { GoogleLoginButton } from "@/feature/auth/components/GoogleLoginButton";
