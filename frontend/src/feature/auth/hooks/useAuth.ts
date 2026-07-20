import { useNavigate } from "react-router";
import { removeCookie, setCookie } from "@/shared/index";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";

import {
  logoutAction,
  setCredentials,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  type AuthResult,
  type LoginCredentials,
  type RegisterCredentials,
  type UseAuthReturn,
} from "@/feature/auth/index";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [registerMutation, { isLoading: isRegistering }] =
    useRegisterMutation();

  const navigate = useNavigate();

  const register = async (
    credentials: RegisterCredentials,
  ): Promise<AuthResult> => {
    try {
      const {
        data: { id, email, fullName, gender, token, role },
      } = await registerMutation(credentials).unwrap();

      dispatch(setCredentials({ id, email, fullName, gender, role }));
      setCookie("auth-token", token);

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
        data: { id, email, fullName, gender, token, role },
      } = await loginMutation(credentials).unwrap();

      dispatch(setCredentials({ id, email, fullName, gender, role }));
      setCookie("auth-token", token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          (error as FetchBaseQueryError | SerializedError) ?? "Login error",
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      dispatch(logoutAction());
      removeCookie("auth-token");
      navigate("/login");
    }
  };

  return {
    user,
    isLoggingIn,
    isLoggingOut,
    isRegistering,
    login,
    logout,
    register,
  };
};
