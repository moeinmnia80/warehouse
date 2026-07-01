import { type ComponentProps, type FC } from "react";

const CalculatorIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 15H31.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 9L25.5 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 19.5V16.5C31.5 10.136 31.5 6.95406 29.523 4.97703C27.5459 3 24.364 3 18 3C11.636 3 8.45406 3 6.47703 4.97703C4.5 6.95406 4.5 10.136 4.5 16.5V19.5C4.5 25.864 4.5 29.0459 6.47703 31.023C8.45406 33 11.636 33 18 33C24.364 33 27.5459 33 29.523 31.023C31.5 29.0459 31.5 25.864 31.5 19.5Z"
        stroke="white"
        strokeWidth="2.5"
      />
      <path
        d="M10.5 21H11.2895M17.6053 21H18.3947M24.7105 21H25.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 27H11.2895M17.6053 27H18.3947M24.7105 27H25.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalculatorIcon;
