import type { ComponentProps } from "react";

export const Button = ({
  className,
  children,
  type,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button className={`btn ${className}`} type={type} {...props}>
      {children}
    </button>
  );
};
