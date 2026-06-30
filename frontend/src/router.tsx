import { Route, Routes } from "react-router";
import HomePage from "@/shared/pages/HomePage";
import LoginPage from "@/shared/pages/LoginPage";
import ForgetPasswordPage from "@/shared/pages/ForgetPasswordPage";
import RegisterPage from "./shared/pages/RegisterPage";

function RouterWrapper() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default RouterWrapper;
