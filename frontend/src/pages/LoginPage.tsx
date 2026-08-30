import { LoginForm } from "@/feature/auth/index";
import { BackgroundPattern } from "@/shared";

function LoginPage() {
  return (
    <>
      <div className="relative flex-center w-full min-h-dvh">
        <LoginForm />
        <BackgroundPattern />
      </div>
    </>
  );
}

export default LoginPage;
