import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { Button } from "@/shared/components/ui/Button";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import { registerInput } from "@/shared/constants/inputs";
import {
  Caption,
  Checkbox,
  Email,
  Form,
  FormItem,
  Input,
  Label,
  Password,
} from "@/shared/components/ui/Form";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "@/shared/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("register", data);
  };

  return (
    <section className="relative flex-center w-full min-h-dvh">
      <div className="form-box my-12 animate-slide-up">
        <Logo className="self-center size-12 fill-st-primary" />
        <h2 className="heading-2">Register Account</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {registerInput.map((input) => (
            <FormItem className="flex flex-col gap-2" key={input.id}>
              <Label className="form__label font-medium">{input.label}</Label>
              <Input
                className="form__input"
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                autoComplete={input.autoComplete}
                {...register(`${input.name}`)}
                name={input.name}
              />
              <Caption className="text-sm text-error px-3 font-light">
                {errors[input.name]?.message}
              </Caption>
            </FormItem>
          ))}
          <FormItem className="flex flex-col gap-2">
            <Label className="form__label font-medium" htmlFor="email">
              Email
            </Label>
            <Email className="form__input" {...register("email")} />
            <Caption className="text-sm text-error px-3 font-light">
              {errors.email?.message}
            </Caption>
          </FormItem>
          <FormItem className="flex flex-col gap-2">
            <Label className="form__label font-medium" htmlFor="password">
              Password
            </Label>
            <Password
              className="form__input"
              variant="password"
              classIcon="size-4 stroke-t-placeholder"
              {...register("password")}
            />
            <Caption className="text-sm text-error px-3 font-light">
              {errors.password?.message}
            </Caption>
          </FormItem>
          <FormItem className="flex items-center gap-1">
            <Label className="form__label flex items-center gap-1">
              <Checkbox
                className="size-4 bg-b-checkbox border-bo-secondary rounded-sm shrink-0"
                accentClass="stroke-t-primary"
                {...register("policy", {
                  required: "You must accept the policy",
                })}
                name="policy"
              />
              <p className="text-xs font-light max-w-60">
                By creating an account, you agree to the{" "}
                <span className="font-bold">Terms & Conditions</span> and our
                <span className="font-bold">Privacy Policy</span>
              </p>
            </Label>
            <Caption className="text-sm text-error px-3 font-light">
              {errors.policy?.message}
            </Caption>
          </FormItem>
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
          Don't have an account?
          <Link className="text-md text-t-primary font-bold ml-1" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
      <div className="background-checkered opacity-dyn"></div>
    </section>
  );
};

export default RegisterPage;
