import type { SerializedError } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";

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
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();

  const [registerMutation, { isLoading: isRegistering }] =
    useRegisterMutation();
  const [loginWithGoogleMutation, { isLoading: isLoggingInWithGoogle }] =
    useLoginWithGoogleMutation();

  const register = async (
    credentials: RegisterCredentials,
  ): Promise<AuthResult> => {
    try {
      const {
        data: { id, email, fullName, gender, role },
      } = await registerMutation(credentials).unwrap();

      dispatch(setCredentials({ id, email, fullName, gender, role }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          (error as FetchBaseQueryError | SerializedError) ?? "Register error",
      };
    }
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      const {
        data: { id, email, fullName, gender, role },
      } = await loginMutation(credentials).unwrap();

      dispatch(setCredentials({ id, email, fullName, gender, role }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          (error as FetchBaseQueryError | SerializedError) ?? "Login error",
      };
    }
  };
  const loginWithGoogle = async (credentials: {
    token: string;
  }): Promise<AuthResult> => {
    try {
      const {
        data: { id, email, role, fullName },
      } = await loginWithGoogleMutation(credentials).unwrap();

      dispatch(setCredentials({ id, email, role, fullName }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          (error as FetchBaseQueryError | SerializedError) ?? "Login error",
      };
    }
  };

  return {
    user,
    isLoggingIn,
    isRegistering,
    isLoggingInWithGoogle,
    login,
    register,
    loginWithGoogle,
  };
};
