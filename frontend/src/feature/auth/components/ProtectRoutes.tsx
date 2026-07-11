import { useGetCurrentUserQuery } from "@/feature/auth/services/authApi";
import { Navigate, Outlet } from "react-router";

const ProtectRoutes = () => {
  const { isError } = useGetCurrentUserQuery();

  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectRoutes;
