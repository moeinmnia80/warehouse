import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { useForm } from "react-hook-form";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import { Button } from "@/shared/components/ui/Button";
import { Form, Input } from "@/shared/components/ui/Form";
import { CheckBox } from "@/shared/components/ui/CheckBox";
import { loginSchema, type LoginFormData } from "@/shared/schema/auth.schema";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };
  return (
    <>
      <section className="relative flex-center w-full min-h-dvh">
        <div className="form-box my-12">
          <Logo className="self-center size-12 fill-st-primary" />
          <h2 className="heading-2">Login Account</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              className="form__input"
              id="email"
              type="email"
              placeholder="Enter email address"
              autoComplete="email"
              {...register("email")}
              name="email"
            />
            <p className="text-sm text-error px-3 font-light">
              {errors.email?.message}
            </p>
            <Input
              label="Password"
              className="form__input"
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register("password")}
              name="password"
            />
            <p className="text-sm text-error px-3 font-light">
              {errors.password?.message}
            </p>
            <div className="flex items-center justify-between mx-1 mt-2">
              <CheckBox className="" type="checkbox">
                Remember for 30 days
              </CheckBox>
              <Link
                to={"/forget-password"}
                className="text-sm font-medium text-t-primary"
              >
                Forget password
              </Link>
            </div>
            <Button className="btn btn--primary font-semibold mt-4 px-2">
              Sign in
            </Button>
          </Form>
          <div className="flex items-center justify-center mt-4">
            <span className="inline-block w-full h-px bg-bo-primary"></span>
            <span className="text-t-primary text-md px-2">or</span>
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
          <div className="text-md font-light text-t-placeholder self-center mt-5">
            Don't have an account?{" "}
            <Link
              className="text-md text-t-primary font-bold ml-1"
              to={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
        <div className="background-checkered opacity-dyn"></div>
      </section>
    </>
  );
}

export default LoginPage;
