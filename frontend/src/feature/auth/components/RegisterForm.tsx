import { useForm } from "react-hook-form";
import { toast } from "@/store/toast.store";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, type ErrorResponse } from "@/feature/auth/index";
import {
  Form,
  Email,
  Input,
  Label,
  Button,
  Caption,
  Checkbox,
  FormItem,
  Password,
  registerInput,
  registerSchema,
  type RegisterFormData,
} from "@/shared/index";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { register: registerData } = useAuth();
  const onSubmit = async (data: RegisterFormData) => {
    const { fullName, email, password, username } = data;
    const result = await registerData({ fullName, email, password, username });

    if (result?.success) {
      toast.success("Registered successfully");
      navigate("/login", { replace: true });
    } else {
      toast.error(
        (result.error as ErrorResponse).data.error.message || "Register Failed",
      );
    }
  };
  return (
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
          <p className="text-md font-light max-w-60">
            By creating an account, you agree to the{" "}
            <span className="font-bold">Terms & Conditions</span> and our
            <span className="font-bold">Privacy Policy</span>
          </p>
        </Label>
        <Caption className="text-sm text-error px-3 font-light">
          {errors.policy?.message}
        </Caption>
      </FormItem>
      <Button className="btn btn--primary font-bold mt-4 px-2">Sign up</Button>
    </Form>
  );
};
