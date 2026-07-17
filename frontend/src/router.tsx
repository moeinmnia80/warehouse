import { Loading } from "@/shared";
import { lazy, Suspense } from "react";
import { MySuite } from "@/feature/suite/index";
import { ProtectRoutes } from "@/feature/auth/index";
import { Navigate, Route, Routes } from "react-router";
import { ShippingHistory } from "@/feature/shipping/index";

// Lazy-loaded — each becomes its own chunk, fetched only when visited
const NotFoundPage = lazy(() => import("@/pages/404"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const ForgetPasswordPage = lazy(() => import("@/pages/ForgetPasswordPage"));

function RouterWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forget-password" element={<ForgetPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route element={<ProtectRoutes />}>
          <Route path="dashboard" element={<DashboardPage />}>
            <Route index element={<Navigate to="my-suite" replace />} />
            <Route path="my-suite" element={<MySuite />} />
            <Route path="shipping" element={<ShippingHistory />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default RouterWrapper;
