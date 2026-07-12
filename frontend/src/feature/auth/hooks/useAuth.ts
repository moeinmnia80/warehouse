import { useAppDispatch, useAppSelector } from "@/store";
import {
  logoutAction,
  setCredentials,
  useLoginMutation,
  useLogoutMutation,
  type LoginCredentials,
} from "@/feature/auth/index";
import { removeCookie, setCookies } from "@/shared/utils/cookie";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    try {
      const {
        data: { email, fullName, gender, token, role },
      } = await loginMutation(credentials).unwrap();

      dispatch(setCredentials({ email, fullName, gender, role }));
      setCookies("auth-token", token);

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
      removeCookie();
      navigate("login");
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
