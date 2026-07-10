import LoginForm from "@/feature/auth/components/LoginForm";

function LoginPage() {
  return (
    <>
      <section className="relative flex-center w-full min-h-dvh">
        <LoginForm />
        <div className="background-checkered opacity-dyn"></div>
      </section>
    </>
  );
}

export default LoginPage;
