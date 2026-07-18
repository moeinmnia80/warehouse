import { LoginForm } from "@/feature/auth/index";
import { BackgroundPattern } from "@/shared";

function LoginPage() {
  return (
    <>
      <section className="relative flex-center w-full min-h-dvh">
        <LoginForm />
        <BackgroundPattern />
      </section>
    </>
  );
}

export default LoginPage;
