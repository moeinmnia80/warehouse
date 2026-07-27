import { useForm } from "react-hook-form";
import { GoogleLoginButton, useAuth } from "@/feature/auth/index";
import { Link, useNavigate } from "react-router";
import { Logo, FacebookIcon } from "@/assets/index";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Email,
  Label,
  Button,
  Caption,
  Checkbox,
  Password,
  FormItem,
  loginSchema,
  type LoginFormData,
} from "@/shared/index";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (formData: LoginFormData) => {
    const result = await login(formData);

    if (result?.success) {
      navigate("/dashboard");
    }
  };
  return (
    <div className="form-box border border-bo-primary text-tx-primary shadow-xs my-12 animate-slide-up ">
      <Logo className="self-center size-12 fill-st-primary " />
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
            classIcon="size-4 stroke-tx-placeholder"
            className="form__input"
            {...register("password")}
          />
          <Caption className="text-sm text-error px-1 font-light">
            {errors.password?.message}
          </Caption>
        </FormItem>
        <FormItem className="flex-between text-sm">
          <Label className="flex-center gap-1">
            <Checkbox
              className="size-4 bg-b-checkbox border-bo-secondary rounded-sm shrink-0"
              accentClass="stroke-tx-primary"
            />
            Remember for 30 days
          </Label>
          <Link to={"/forget-password"} className="text-right">
            Forget password
          </Link>
        </FormItem>
        <Button className="btn btn--primary font-semibold mt-4 transition-all duration-200 hover:text-t-primary">
          {isLoggingIn ? "Loading" : "Sign in"}
        </Button>
      </Form>
      <div className="flex items-center justify-center mt-4">
        <span className="inline-block w-full h-px bg-bo-primary"></span>
        <span className="text-sm px-2">OR</span>
        <span className="inline-block w-full h-px bg-bo-primary"></span>
      </div>
      <GoogleLoginButton />
      <Button className="btn-secondary gap-3 mt-4 px-2">
        <FacebookIcon className="size-5" />
        Sign in with Facebook
      </Button>
      <div className="text-md font-light text-tx-placeholder self-center mt-5">
        Don't have an account?{" "}
        <Link
          className="text-md text-tx-primary font-bold ml-1"
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};
