import { Link } from "react-router";
import { Form, Input } from "../shared/componets/ui/Form";
import { Button } from "../shared/componets/ui/Button";
import { CheckBox } from "../shared/componets/ui/CheckBox";
import Logo from "../assets/icons/Logo";
import GoogleIcon from "../assets/icons/GoogleIcon";
import FacebookIcon from "../assets/icons/FacebookIcon";

const RegisterPage = () => {
  return (
    <section className="relative flex-center w-full min-h-dvh">
      <div
        className="flex flex-col w-full max-w-103 relative z-10 my-12
        bg-b-primary rounded-2xl p-6 border border-bo-primary"
      >
        <Logo className="self-center size-12 fill-st-primary" />
        <h2 className="text-t-primary text-3xl font-semibold text-center mt-4">
          Sign Up Account
        </h2>
        <Form action="" className="">
          <Input
            label="Fullname"
            className="
              h-11 rounded-xl border border-bo-primary
              text-t-placeholder 
              px-3 py-3"
            id="Fullname"
            type="Fullname"
            name="Fullname"
            placeholder="Enter full name"
          />
          <Input
            label="Username"
            className="
              h-11 rounded-xl border border-bo-primary
              text-t-placeholder 
              px-3 py-3"
            id="username"
            type="username"
            name="username"
            placeholder="Enter your username "
          />
          <Input
            label="Email address"
            className="
              h-11 rounded-xl border border-bo-primary
              text-t-placeholder 
              px-3 py-3"
            id="email"
            type="email"
            name="email"
            placeholder="Enter email address"
          />
          <Input
            label="Password"
            className="
              h-11 rounded-xl border border-bo-primary
              text-t-placeholder 
              px-3 py-3"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <div className="flex items-center justify-between mt-2">
            <CheckBox className="" type="checkbox">
              By creating an account, you agree to the Terms & Conditions and
              our Privacy Policy.
            </CheckBox>
            <Link
              to={"/forget-password"}
              className="text-sm font-medium text-t-primary"
            >
              Forget password
            </Link>
          </div>
          <Button
            className="
              bg-t-primary 
              text-b-primary text-xl font-semibold
              rounded-xl mt-4 px-2
             "
          >
            Sign in
          </Button>
        </Form>
        <div className="flex items-center justify-center mt-4">
          <span className="inline-block w-full h-px bg-bo-primary"></span>
          <span className="text-t-primary text-md px-2">or</span>
          <span className="inline-block w-full h-px bg-bo-primary"></span>
        </div>
        <Button
          className="text-t-primary
            flex-center gap-3
            border border-bo-primary
            text-lg font-medium
            rounded-xl mt-4 px-2"
        >
          <GoogleIcon className="size-5" />
          Sign in with Google
        </Button>
        <Button
          className="text-t-primary
            flex-center gap-3
            border border-bo-primary
            text-lg font-medium
            rounded-xl mt-4 px-2"
        >
          <FacebookIcon className="size-5" />
          Sign in with Facebook
        </Button>
        <div className="text-md font-light text-t-placeholder self-center mt-5">
          Don't have an account?
          <Link className="text-md text-t-primary font-bold ml-1" to={"/Login"}>
            Login
          </Link>
        </div>
      </div>
      <div className="login-grid opacity-dyn"></div>
    </section>
  );
};

export default RegisterPage;
