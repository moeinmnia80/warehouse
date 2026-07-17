import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Label,
  Button,
  Caption,
  Password,
  FormItem,
  resetPasswordSchema,
  type ResetPasswordData,
} from "@/shared/index";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });
  function onSubmit(data: ResetPasswordData) {
    console.log(data);
    console.log(errors);
  }
  return (
    <section className="relative flex-center w-full h-dvh ">
      <div className="form-box animate-slide-up text-tx-primary">
        <h2 className="heading-2">Reset Password</h2>
        <p className="text-md text-tx-placeholder text-center mt-4">
          Create a new password for task hub account by filling out the form
          below
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormItem className="flex flex-col gap-2">
            <Label className="form__label">Password</Label>
            <Password
              variant="password"
              className="form__input"
              classIcon="size-4 stroke-st-primary"
              {...register("password")}
            />
            <Caption className="text-sm text-error px-3 font-light">
              {errors.password?.message}
            </Caption>
          </FormItem>
          <FormItem className="flex flex-col gap-2">
            <Label className="form__label">Confirm Password</Label>
            <Password
              variant="confirmPassword"
              className="form__input"
              classIcon="size-4 stroke-st-primary"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            <Caption className="text-sm text-error px-3 font-light">
              {errors.confirmPassword?.message}
            </Caption>
          </FormItem>
          <Button className="btn btn--primary font-semibold px-2">
            Reset Password
          </Button>
        </Form>
      </div>
      <div className="background-checkered opacity-dyn"></div>
    </section>
  );
};

export default ResetPasswordPage;
