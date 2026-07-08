import { Link, useNavigate } from "react-router";
import Logo from "@/assets/icons/Logo";
import { useForm } from "react-hook-form";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import { Button } from "@/shared/components/ui/Button";
import {
  Caption,
  Checkbox,
  Email,
  Form,
  FormItem,
  Label,
  Password,
} from "@/shared/components/ui/Form";
import { loginSchema, type LoginFormData } from "@/shared/schema/auth.schema";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();
  const handleLogin = () => {
    if (Object.keys(errors).length > 0) return;

    navigate("/dashboard");
  };
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };
  return (
    <>
      <section className="relative flex-center w-full min-h-dvh">
        <div className="form-box my-12 animate-slide-up">
          <Logo className="self-center size-12 fill-st-primary" />
          <h2 className="heading-2">Login Account</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem className="flex flex-col gap-2">
              <Label className="form__label font-medium" htmlFor="email">
                Email address
              </Label>
              <Email className="form__input" {...register("email")} />
              <Caption className="text-sm text-error px-1 font-light">
                {errors.email && errors.email?.message}
              </Caption>
            </FormItem>
            <FormItem className="flex flex-col gap-2">
              <Label className="form__label font-medium" htmlFor="password">
                Password
              </Label>
              <Password
                variant="password"
                classIcon="size-4 stroke-t-placeholder"
                className="form__input"
                {...register("password")}
              />
              <Caption className="text-sm text-error px-1 font-light">
                {errors.password?.message}
              </Caption>
            </FormItem>
            <FormItem className="flex-between">
              <Label className="flex-center gap-1 text-lg font-medium text-t-primary">
                <Checkbox
                  className="size-4 bg-b-checkbox border-bo-secondary rounded-sm shrink-0"
                  accentClass="stroke-t-primary"
                />
                Remember for 30 days
              </Label>
              <Link
                to={"/forget-password"}
                className="text-lg font-medium text-t-primary text-right"
              >
                Forget password
              </Link>
            </FormItem>
            <Button
              onClick={handleLogin}
              className="btn btn--primary font-bold mt-4 px-2 transition-all duration-200 hover:bg-b-muted hover:text-t-primary"
            >
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
              className="text-lg text-t-primary font-bold ml-1"
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
