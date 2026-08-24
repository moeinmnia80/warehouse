import type { User } from "@/shared";

import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  useForgetPasswordMutation,
  useResendOptMutation,
  useResetPasswordMutation,
  useVerifyOtpCodeMutation,
  type AuthApiError,
} from "@/feature/auth";

import {
  setCredentials,
  type AuthResult,
  useLoginMutation,
  type UseAuthReturn,
  useRegisterMutation,
  type LoginCredentials,
  type RegisterCredentials,
  useLoginWithGoogleMutation,
} from "@/feature/auth/index";

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegistering }] =
    useRegisterMutation();
  const [loginWithGoogleMutation, { isLoading: isLoggingInWithGoogle }] =
    useLoginWithGoogleMutation();
  const [forgetPasswordMutation, { isLoading: isRequestingReset }] =
    useForgetPasswordMutation();
  const [resendOptMutation, { isLoading: isResendOpt }] =
    useResendOptMutation();
  const [verifyOtpCodeMutation, { isLoading: isVerifying }] =
    useVerifyOtpCodeMutation();
  const [resetPasswordMutation, { isLoading: isResetting }] =
    useResetPasswordMutation();

  const runAuthMutation = async (
    mutate: () => Promise<{ data: User }>,
    fallbackMessage: string,
  ): Promise<AuthResult> => {
    try {
      const { data } = await mutate();
      dispatch(setCredentials(data));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: (error as AuthApiError) ?? fallbackMessage,
      };
    }
  };

  const register = (credentials: RegisterCredentials) =>
    runAuthMutation(
      () => registerMutation(credentials).unwrap(),
      "Register error",
    );

  const login = (credentials: LoginCredentials) =>
    runAuthMutation(() => loginMutation(credentials).unwrap(), "Login error");

  const loginWithGoogle = (credentials: { token: string }) =>
    runAuthMutation(
      () => loginWithGoogleMutation(credentials).unwrap(),
      "Login error",
    );

  const forgetPassword = async (credentials: {
    email: string;
  }): Promise<AuthResult> => {
    try {
      await forgetPasswordMutation(credentials).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: (error as AuthApiError) ?? "The password reset request failed.",
      };
    }
  };
  const resendOpt = async (credentials: {
    email: string;
  }): Promise<AuthResult> => {
    try {
      await resendOptMutation(credentials).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: (error as AuthApiError) ?? "failed regenerate opt code.",
      };
    }
  };
  const verifyOtpCode = async (credentials: {
    email: string;
    otpCode: string;
  }): Promise<AuthResult> => {
    try {
      await verifyOtpCodeMutation(credentials).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: (error as AuthApiError) ?? "failed verify opt code.",
      };
    }
  };

  const resetPassword = async (credentials: {
    email: string;
    newPassword: string;
  }): Promise<AuthResult> => {
    try {
      await resetPasswordMutation(credentials).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: (error as AuthApiError) ?? "failed password reset.",
      };
    }
  };
  return {
    user,
    isResetting,
    isLoggingIn,
    isResendOpt,
    isVerifying,
    isRegistering,
    isRequestingReset,
    isLoggingInWithGoogle,
    login,
    register,
    resendOpt,
    verifyOtpCode,
    resetPassword,
    forgetPassword,
    loginWithGoogle,
  };
};
