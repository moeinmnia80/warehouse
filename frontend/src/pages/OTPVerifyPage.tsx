import { useState } from "react";
import { useNavigate } from "react-router";

import { useAppSelector } from "@/store/redux/store";
import { useRequireAuth, VerifyForm } from "@/feature/auth";
import { backToPrevPage, BackgroundPattern, Timer } from "@/shared";

function OTPVerifyPage() {
  const [timerKey, setTimerKey] = useState(1);
  const [isExpired, setIsExpired] = useState(false);

  const email = useAppSelector((state) => state.auth.email);

  const navigate = useNavigate();

  const { isAuthenticated } = useRequireAuth("/login", email);
  if (!isAuthenticated) return;

  const handleResetTimer = () => {
    if (timerKey < 3) {
      setIsExpired(false);
      setTimerKey((prev) => prev + 1);
    }
  };

  return (
    <div className="relative flex-center w-full min-h-dvh">
      <div className="form-box animate-slide-up text-tx-primary">
        <h2 className="heading-2 tracking-tight">Verify Your Email</h2>
        <p className="text-md font-light text-tx-placeholder text-center mt-4">
          We sent a 6 digit code to
          <span className="text-tx-primary font-bold px-1">{email}</span>
          Enter it below to continue.
        </p>
        <Timer
          key={timerKey}
          time={120}
          onExpired={() => setIsExpired(true)}
          className="flex-center w-16 h-6 bg-b-secondary self-center font-bold text-sm text-tx-primary border border-bo-primary rounded-lg mt-2"
        />
        <VerifyForm
          email={email}
          isExpired={isExpired}
          resetTimer={handleResetTimer}
          changeExpireStatus={() => setIsExpired(false)}
        />
        <button
          type="button"
          className="w-full text-md font-bold mt-6 "
          onClick={() => backToPrevPage(navigate)}
        >
          Go Back
        </button>
      </div>
      <BackgroundPattern />
    </div>
  );
}
export default OTPVerifyPage;
