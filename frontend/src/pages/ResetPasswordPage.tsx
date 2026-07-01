import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../shared/components/ui/Button";
import { Form, Input } from "../shared/components/ui/Form";
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "../shared/schema/auth.schema";

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
  }
  return (
    <section className="relative flex-center w-full h-dvh ">
      <div className="form-box">
        <h2 className="heading-2">Reset Password</h2>
        <p className="text-md text-t-placeholder text-center mt-4">
          Create a new password for task hub account by filling out the form
          below
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="New Password"
            className="form__input"
            id="password"
            type="password"
            placeholder="Create new password"
            {...register("password")}
            name="password"
          />

          {errors.password && (
            <p className="text-sm text-error px-3 font-light">
              {errors.password?.message}
            </p>
          )}
          <Input
            label="Repeat Password"
            className="form__input"
            id="confirmPassword"
            type="password"
            placeholder="Re enter new password"
            name="confirmPassword"
          />
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
