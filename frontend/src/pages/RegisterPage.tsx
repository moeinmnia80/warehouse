import { BackgroundPattern, Button } from "@/shared";
import { Link } from "react-router";
import { RegisterForm } from "@/feature/auth";
import { Logo, GoogleIcon, FacebookIcon } from "@/assets/index";

const RegisterPage = () => {
  return (
    <section className="relative flex-center w-full min-h-dvh">
      <div className="form-box my-12 animate-slide-up text-tx-primary">
        <Logo className="self-center size-12 fill-st-primary" />
        <h2 className="heading-2">Register Account</h2>
        <RegisterForm />
        <div className="flex items-center justify-center mt-4">
          <span className="inline-block w-full h-px bg-bo-primary"></span>
          <span className="text-xs px-2">OR</span>
          <span className="inline-block w-full h-px bg-bo-primary"></span>
        </div>
        <Button className="btn-secondary gap-3 mt-4 px-2">
          <GoogleIcon className="size-5" />
          Sign in with Google
        </Button>
        <Button className="btn-secondary gap-3 mt-4 px-2">
          <FacebookIcon className="size-5" />
          Sign in with Facebook
        </Button>
        <div className="text-md font-light text-tx-placeholder self-center mt-5">
          Don't have an account?
          <Link
            className="text-md text-tx-primary font-bold ml-1"
            to={"/login"}
          >
            Login
          </Link>
        </div>
      </div>
      <BackgroundPattern />
    </section>
  );
};

export default RegisterPage;
