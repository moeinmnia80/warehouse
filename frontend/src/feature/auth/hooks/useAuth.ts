import type { User } from "@/shared";

import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import { useForgetPasswordMutation, type AuthApiError } from "@/feature/auth";

import {
  setCredentials,
  type AuthResult,
  useLoginMutation,
  type UseAuthReturn,
  useRegisterMutation,
  type LoginCredentials,
  type RegisterCredentials,
  useLoginWithGoogleMutation,
  type ForgetPasswordCredentials,
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

  const forgetPassword = (credentials: ForgetPasswordCredentials) =>
    runAuthMutation(
      () => forgetPasswordMutation(credentials).unwrap(),
      "The password reset request failed.",
    );

  return {
    user,
    isLoggingIn,
    isRegistering,
    isRequestingReset,
    isLoggingInWithGoogle,
    login,
    register,
    forgetPassword,
    loginWithGoogle,
  };
};
