import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "@/shared/components/ui/Form";
import {
  forgetPasswordSchema,
  type ForgetPasswordData,
} from "../shared/schema/auth.schema";

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
    console.log(data);
  }
  const backToPrevPage = () => {
    navigate(-1);
  };
  return (
    <section className="relative flex-center w-full h-dvh ">
      <div className="form-box">
        <h2 className="heading-2">Forget Your Password</h2>
        <p className="text-md text-t-placeholder text-center mt-4">
          Enter your email address below and we’ll send you password reset
          instructions.
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email address"
            className="form__input"
            id="email"
            type="email"
            placeholder="Enter email address"
            autoComplete="email"
            {...register("email")}
            name="email"
          />
          <p className="text-sm text-error px-3 font-light">
            {errors.email?.message}
          </p>

          <Link
            to="/reset-password"
            className="btn btn--primary font-semibold px-2"
          >
            Reset Password
          </Link>
        </Form>
        <button
          type="button"
          className="text-md text-t-primary font-bold mt-6"
          onClick={() => backToPrevPage()}
        >
          Go Back
        </button>
      </div>
      <div className="background-checkered opacity-dyn"></div>
    </section>
  );
};

export default ForgetPasswordPage;
