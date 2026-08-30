import { lazy } from "react";
import { MySuite } from "@/feature/suite/index";
import { Navigate, useRoutes } from "react-router";
import { ProtectRoutes } from "@/feature/auth/index";

const NotFoundPage = lazy(() => import("@/pages/404"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const OTPVerifyPage = lazy(() => import("@/pages/OTPVerifyPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const ForgetPasswordPage = lazy(() => import("@/pages/ForgetPasswordPage"));
const ShippingHistory = lazy(
  () => import("@/feature/shipping/components/ShippingHistory"),
);
const ShippingRequest = lazy(
  () => import("@/feature/shipping/components/ShippingRequest"),
);

const routes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "forget-password", element: <ForgetPasswordPage /> },
  { path: "verify-otp", element: <OTPVerifyPage /> },
  { path: "reset-password", element: <ResetPasswordPage /> },
  {
    element: <ProtectRoutes />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
        children: [
          { index: true, element: <Navigate to="my-suite" replace /> },
          { path: "my-suite", element: <MySuite /> },
          {
            path: "shipping",
            element: <ShippingHistory />,
          },
          { path: "shipping-request", element: <ShippingRequest /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

function RouterWrapper() {
  return useRoutes(routes);
}

export default RouterWrapper;
