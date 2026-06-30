import type { ComponentProps, FC } from "react";

const TickIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M16.6666 5L7.49992 14.1667L3.33325 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TickIcon;
