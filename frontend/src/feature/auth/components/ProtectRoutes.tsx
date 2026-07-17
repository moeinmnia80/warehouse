import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch } from "@/store/redux/store";
import { useGetCurrentUserQuery, setCredentials } from "@/feature/auth/index";
import { Loading } from "@/shared/components/ui/Loading";

export const ProtectRoutes = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess, isError } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ ...data.data }));
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading)
    return (
      <>
        <div className="flex-center w-full min-h-dvh">
          <Loading />
        </div>
      </>
    );
  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};
