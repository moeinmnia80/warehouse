import { useNavigate } from "react-router";
import { removeCookie, setCookie } from "@/shared/index";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";

import {
  logoutAction,
  setCredentials,
  useLoginMutation,
  useLogoutMutation,
  type LoginCredentials,
} from "@/feature/auth/index";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
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
      removeCookie("auth-token");
      navigate("login");
    }
  };

  return {
    user,
    status,
    isLoggingIn,
    isLoggingOut,
    login,
    logout,
  };
};
