import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch } from "@/store/redux/store";
import { useGetCurrentUserQuery, setCredentials } from "@/feature/auth/index";

export const ProtectRoutes = () => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ ...data.data }));
    }
  }, [isSuccess, data, dispatch]);

  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};
