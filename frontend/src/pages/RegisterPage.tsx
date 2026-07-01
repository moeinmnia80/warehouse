import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { Button } from "@/shared/components/ui/Button";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import { registerInput } from "@/shared/constants/inputs";
import { Form, Input } from "@/shared/components/ui/Form";
import { CheckBox } from "@/shared/components/ui/CheckBox";
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
      <div className="form-box my-12">
        <Logo className="self-center size-12 fill-st-primary" />
        <h2 className="heading-2">Register Account</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {registerInput.map((input) => (
            <div key={input.name}>
              <Input
                label={input.label}
                className="form__input"
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                autoComplete={input.autoComplete}
                {...register(`${input.name}`)}
                name={input.name}
              />
              <p className="text-sm text-error px-3 font-light mt-3">
                {errors[input.name]?.message}
              </p>
            </div>
          ))}
          <CheckBox
            type="checkbox"
            id="policy"
            {...register("policy", {
              required: "You must accept the policy",
            })}
            name="policy"
          >
            By creating an account, you agree to the{" "}
            <span className="font-bold">Terms & Conditions</span> and our
            <span className="font-bold">Privacy Policy</span>.
          </CheckBox>
          <p className="text-sm text-error px-3 font-light">
            {errors.policy?.message}
          </p>
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
