import { useGetCurrentUserQuery } from "@/feature/auth/services/authApi";
import { Navigate, Outlet } from "react-router";

const ProtectRoutes = () => {
  const { data, isError } = useGetCurrentUserQuery();

  if (isError || !data) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectRoutes;
