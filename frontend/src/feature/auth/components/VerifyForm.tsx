import { useState } from "react";
import { useNavigate } from "react-router";

import { RecallIcon } from "@/assets";
import { Form, Button, Spinner } from "@/shared";
import { OtpInputGroup, useAuth } from "@/feature/auth";

interface VerifyFormProps {
  email: string | null;
  isExpired: boolean;
  resetTimer: () => void;
  changeExpireStatus: () => void;
}

export const VerifyForm = ({
  email,
  isExpired,
  resetTimer,
  changeExpireStatus,
}: VerifyFormProps) => {
  const [digits, setDigits] = useState(Array(6).fill(""));

  const { resendOpt, verifyOtpCode, isResendOpt, isVerifying } = useAuth();
  const navigate = useNavigate();

  const resendOtpCode = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!email) return;

    await resendOpt({ email });

    changeExpireStatus();
    resetTimer();
    setDigits(Array(6).fill(""));
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpCode = digits.join("");

    if (otpCode.length !== 6 || !email || isExpired) {
      return;
    }
    const result = await verifyOtpCode({ email, otpCode });
    if (result.success) {
      navigate("/reset-password", {
        replace: true,
      });
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <OtpInputGroup
        digits={digits}
        onChange={(index, value) => {
          setDigits((prev) => {
            const newDigits = [...prev];
            newDigits[index] = value;
            return newDigits;
          });
        }}
      />
      <div className="flex gap-2 mt-2">
        <Button
          className="btn btn--primary font-semibold px-2 disabled:opacity-25 disabled:cursor-default"
          disabled={!digits.every((digit) => digit) || isExpired}
        >
          {isVerifying ? (
            <Spinner className="size-3 text-tx-primary" />
          ) : (
            "Verify Code"
          )}
        </Button>
        <button
          type="button"
          className="flex-center w-14 text-md font-bold border border-bo-primary rounded-xl disabled:cursor-default disabled:opacity-25"
          onClick={resendOtpCode}
          disabled={isResendOpt || !isExpired}
        >
          {isResendOpt ? (
            <Spinner className="size-3 text-tx-primary" />
          ) : (
            <RecallIcon className="size-5 stroke-st-primary" />
          )}
        </button>
      </div>
    </Form>
  );
};
