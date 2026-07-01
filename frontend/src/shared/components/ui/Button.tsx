import type { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = ({
  className,
  children,
  type,
  ...props
}) => {
  return (
    <button className={`btn ${className}`} type={type} {...props}>
      {children}
    </button>
  );
};
