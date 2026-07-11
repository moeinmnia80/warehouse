import NotFoundPage from "@/pages/404";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import { Navigate, Route, Routes } from "react-router";
import MySuite from "@/feature/suite/components/MySuite";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ForgetPasswordPage from "@/pages/ForgetPasswordPage";
import ShippingHistory from "@/feature/shipping/components/ShippingHistory";
import ProtectRoutes from "./feature/auth/components/ProtectRoutes";

function RouterWrapper() {
  return (
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
  );
}

export default RouterWrapper;
