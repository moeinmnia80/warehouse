import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/store/redux/store";
import { BackgroundPattern, backToPrevPage, Button, Form } from "@/shared";

const CODE_LENGTH = 6;

function OTPVerifyPage() {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const email = useAppSelector((state) => state.auth.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  return (
    <>
      <div className="relative flex-center w-full min-h-dvh">
        <div className="form-box animate-slide-up text-tx-primary">
          <h2 className="heading-2 tracking-tight">Verify Your Code</h2>
          <p className="text-md font-light text-tx-placeholder text-center mt-4">
            We sent a 6 digit code to{" "}
            <span className="text-tx-primary font-bold">{email}</span>. Enter it
            below to continue.
          </p>
          <Form>
            <div className="flex justify-between gap-2 sm:gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={CODE_LENGTH}
                  value={digit}
                  onChange={(e) =>
                    setDigits((prev) => [
                      prev.splice(index + 1, 1, e.target.value),
                    ])
                  }
                  className="w-10 aspect-square rounded-xl border border-bo-primary bg-b-primary text-center text-lg font-semibold text-white outline-none focus:border-bo-primary/50 focus:ring-2 focus:ring-tx-primary/20 transition-all"
                />
              ))}
            </div>
            <Button className="btn btn--primary font-semibold px-2 disabled:opacity-25 disabled:cursor-default mt-2">
              Verify Code
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
    </>
  );
}

export default OTPVerifyPage;
