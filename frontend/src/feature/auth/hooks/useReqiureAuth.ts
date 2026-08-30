import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useRequireAuth = (redirectTo = "/login", item: string | null) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!item) {
      navigate(redirectTo, { replace: true });
    }
  }, [item, navigate, redirectTo]);

  return { isAuthenticated: Boolean(item) };
};
