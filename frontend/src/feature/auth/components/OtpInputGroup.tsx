import { useRef } from "react";

import type { OtpInputGroupProps } from "@/feature/auth";

export const OtpInputGroup = ({ digits, onChange }: OtpInputGroupProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    if (!sanitizedValue && value !== "") return;

    const lastChar = sanitizedValue.slice(-1);
    onChange(index, lastChar);

    if (lastChar && index < digits.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, digits.length);

    pastedData.split("").forEach((char, index) => {
      onChange(index, char);
    });

    const nextIndex = Math.min(pastedData.length, digits.length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          name={`otp-cell-${index}`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-10 aspect-square rounded-xl border border-bo-primary bg-b-primary text-center text-lg font-semibold text-tx-primary outline-none focus:border-bo-primary/50 focus:ring-2 focus:ring-tx-primary/20 transition-all"
        />
      ))}
    </div>
  );
};
