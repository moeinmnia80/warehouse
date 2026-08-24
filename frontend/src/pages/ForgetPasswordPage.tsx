import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { setEmail, useAuth } from "@/feature/auth";
import { useAppDispatch } from "@/store/redux/store";

import {
  Form,
  Label,
  Email,
  Button,
  Caption,
  backToPrevPage,
  BackgroundPattern,
  forgetPasswordSchema,
  type ForgetPasswordData,
  Spinner,
} from "@/shared/index";

const ForgetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { forgetPassword, isRequestingReset } = useAuth();

  async function onSubmit(data: ForgetPasswordData) {
    const result = await forgetPassword({ email: data.email });
    if (result.success) {
      dispatch(setEmail({ email: data.email }));
      navigate("/verify-otp", { replace: true });
    }
  }

  return (
    <div className="relative flex-center w-full h-dvh ">
      <div className="form-box animate-slide-up text-tx-primary">
        <h2 className="heading-2">Forget Your Password</h2>
        <p className="text-md text-tx-placeholder text-center mt-4">
          Enter your email address below and we’ll send you password reset
          instructions.
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label className="form__label flex flex-col gap-2">
            Email address
            <Email className="form__input" {...register("email")} />
            <Caption className="text-sm text-error px-3 font-light">
              {errors.email?.message}
            </Caption>
          </Label>
          <Button
            disabled={!isValid || !isDirty || isRequestingReset}
            className="btn btn--primary font-semibold px-2 disabled:opacity-25 disabled:cursor-default"
          >
            {isRequestingReset ? (
              <Spinner className="size-6 text-b-primary" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Form>
        <button
          type="button"
          className="text-md font-bold mt-6"
          onClick={() => backToPrevPage(navigate)}
        >
          Go Back
        </button>
      </div>
      <BackgroundPattern />
    </div>
  );
};

export default ForgetPasswordPage;
