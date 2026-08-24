import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth, useRequireAuth } from "@/feature/auth";

import {
  Form,
  Label,
  Button,
  Caption,
  Password,
  FormItem,
  BackgroundPattern,
  resetPasswordSchema,
  type ResetPasswordData,
  Spinner,
} from "@/shared/index";
import { useAppSelector } from "@/store/redux/store";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const email = useAppSelector((state) => state.auth.email);
  const navigate = useNavigate();

  const { resetPassword, isResetting } = useAuth();

  const { isAuthenticated } = useRequireAuth("/login", email);
  if (!isAuthenticated) return;

  const onSubmit = async (data: ResetPasswordData) => {
    if (!email) return;
    const result = await resetPassword({
      email: email,
      newPassword: data.password,
    });

    if (result.success) {
      navigate("/login", { replace: true });
    }
  };
  return (
    <section className="relative flex-center w-full h-dvh ">
      <div className="form-box animate-slide-up text-tx-primary">
        <h2 className="heading-2">Reset Password</h2>
        <p className="text-md text-tx-placeholder text-center mt-4">
          Set a new password for your Markist account.
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
            {isResetting ? (
              <Spinner className="size-3 text-tx-primary" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Form>
      </div>
      <BackgroundPattern />
    </section>
  );
};

export default ResetPasswordPage;
