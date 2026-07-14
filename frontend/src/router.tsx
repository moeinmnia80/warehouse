import { lazy, Suspense } from "react";
import { MySuite } from "@/feature/suite/index";
import { ProtectRoutes } from "@/feature/auth/index";
import { Navigate, Route, Routes } from "react-router";
import { ShippingHistory } from "@/feature/shipping/index";

// Lazy-loaded — each becomes its own chunk, fetched only when visited
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgetPasswordPage = lazy(() => import("@/pages/ForgetPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const NotFoundPage = lazy(() => import("@/pages/404"));

function RouterWrapper() {
  return (
    <Suspense fallback={<></>}>
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
