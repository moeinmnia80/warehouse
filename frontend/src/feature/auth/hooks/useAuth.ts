// features/auth/hooks/useAuth.ts

import { useAppDispatch, useAppSelector } from "@/store";
import {
  logoutAction,
  setCredentials,
  useLoginMutation,
  useLogoutMutation,
  type LoginCredentials,
} from "@/feature/auth/index";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const login = async (credentials: LoginCredentials) => {
    try {
      const {
        data: { email, fullName },
      } = await loginMutation(credentials).unwrap();

      dispatch(setCredentials({ email, fullName }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error || "Login error",
      };
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logoutAction());
    }
  };

  return {
    user,
    isAuthenticated,
    isLoggingIn,
    isLoggingOut,
    login,
    logout,
  };
};
