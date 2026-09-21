import type { ComponentProps } from "react";

export const RemoveIcon = ({ ...props }: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.3499 7.9999C15.3499 3.94061 12.0592 0.649902 7.9999 0.649902C3.94061 0.649902 0.649902 3.94061 0.649902 7.9999C0.649902 12.0592 3.94061 15.3499 7.9999 15.3499C12.0592 15.3499 15.3499 12.0592 15.3499 7.9999Z"
        strokeWidth="1.2"
        strokeMiterlimit="10"
      />
      <path d="M5.5 5.5L10.5 10.5" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10.5 5.5L5.5 10.5" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};
