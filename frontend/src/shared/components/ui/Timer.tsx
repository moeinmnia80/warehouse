import { useState, useEffect, type ComponentProps } from "react";

interface OtpTimerProps extends ComponentProps<"span"> {
  time?: number;
  onExpired: () => void;
}

export const Timer = ({ time = 120, onExpired, ...props }: OtpTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpired, time]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return <span {...props}>{`${formattedMinutes}:${formattedSeconds}`}</span>;
};
