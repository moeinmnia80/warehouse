import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { Button } from "../componets/ui/Button";
import { Form, Input } from "../componets/ui/Form";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { CheckBox } from "../componets/ui/CheckBox";
import FacebookIcon from "@/assets/icons/FacebookIcon";

function LoginPage() {
  return (
    <>
      <section className="relative flex-center w-full h-dvh">
        <div
          className="flex flex-col w-full max-w-103 relative z-10
        bg-b-primary rounded-2xl p-6 border border-bo-primary"
        >
          <Logo className="self-center size-12 fill-st-primary" />
          <h2 className="text-t-primary text-3xl font-semibold text-center mt-4">
            Login Account
          </h2>
          <Form action="" className="">
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
                Remember for 30 days
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
            <span className="text-md px-2">or</span>
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
            Don't have an account?{" "}
            <Link
              className="text-md text-t-primary font-bold ml-1"
              to={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
        <div className="login-grid opacity-dyn"></div>
      </section>
    </>
  );
}

export default LoginPage;
