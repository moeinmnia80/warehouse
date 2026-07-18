import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Label,
  Email,
  Button,
  Caption,
  forgetPasswordSchema,
  type ForgetPasswordData,
  BackgroundPattern,
} from "@/shared/index";

const ForgetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const navigate = useNavigate();

  function onSubmit(data: ForgetPasswordData) {
    if (data.email) {
      navigate("/reset-password");
    }
  }

  const backToPrevPage = () => navigate(-1);

  return (
    <section className="relative flex-center w-full h-dvh ">
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
          <Button className="btn btn--primary font-semibold px-2">
            Reset Password
          </Button>
        </Form>
        <button
          type="button"
          className="text-md font-bold mt-6"
          onClick={() => backToPrevPage()}
        >
          Go Back
        </button>
      </div>
      <BackgroundPattern />
    </section>
  );
};

export default ForgetPasswordPage;
