import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { Navigate, Outlet } from "react-router";
import { setCredentials } from "@/feature/auth/index";
import { useGetCurrentUserQuery } from "@/feature/auth/index";

export const ProtectRoutes = () => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, data } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setCredentials({ ...data.data }));
    }
  }, [isLoading, data, dispatch]);

  if (isError && !data) return <Navigate to="/login" replace />;

  return <Outlet />;
};
