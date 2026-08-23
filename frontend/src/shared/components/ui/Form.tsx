import { cn } from "@/shared";
import { useState, type ComponentProps } from "react";
import { TickIcon, HiddenIcon, ShowIcon } from "@/assets/index";

export const Form = ({
  className,
  children,
  ...props
}: ComponentProps<"form">) => {
  return (
    <>
      <form
        className={cn("flex flex-col gap-4 mt-6", className)}
        {...props}
        noValidate
      >
        {children}
      </form>
    </>
  );
};

export const FormItem = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <>
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </>
  );
};

export const Label = ({ children, ...props }: ComponentProps<"label">) => {
  return <label {...props}>{children}</label>;
};

export const Caption = ({ children, ...props }: ComponentProps<"p">) => {
  return <p {...props}>{children}</p>;
};

export const Input = ({
  className,
  children,
  ...props
}: ComponentProps<"input">) => {
  return (
    <>
      <input className={cn("w-full", className)} {...props} />
      {children}
    </>
  );
};

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  accentClass: string;
}
export const Checkbox = ({
  className,
  children,
  accentClass = "stroke-gray-300",
  ...props
}: CheckboxProps) => {
  return (
    <>
      <input className="peer w-0 hidden" type="checkbox" {...props} />
      <span
        className={cn(
          "peer-checked:*:inline-block flex items-center justify-center border size-4 rounded-sm border-bo-secondary",
          className,
        )}
      >
        <TickIcon className={cn("hidden", accentClass)} />
      </span>
      {children}
    </>
  );
};

interface RadioProps extends Omit<ComponentProps<"input">, "type"> {
  accentClass?: string;
}
export const Radio = ({
  className,
  children,
  accentClass = "bg-primary",
  ...props
}: RadioProps) => {
  return (
    <>
      <input className="peer w-0 hidden" type="radio" {...props} />
      <span
        className={cn(
          "peer-checked:*:inline-block flex items-center justify-center border size-4 rounded-full border-bo-secondary p-0.5",
          className,
        )}
      >
        <span className={cn("hidden size-full rounded-full", accentClass)} />
      </span>
      {children}
    </>
  );
};

type EmailProps = Omit<ComponentProps<"input">, "name" | "type" | "id">;
export const Email = ({
  className,
  placeholder,
  children,
  ...props
}: EmailProps) => {
  return (
    <div className="relative">
      <input
        type="email"
        id="email"
        name="email"
        className={`w-full ${className}`}
        placeholder={placeholder ? placeholder : "Enter email address"}
        autoComplete="email webauthn"
        {...props}
      />
      {children}
    </div>
  );
};

interface PasswordProps extends Omit<
  ComponentProps<"input">,
  "name" | "type" | "id" | "onClick"
> {
  onClick?: () => void;
  classIcon?: string;
  variant: "password" | "confirmPassword";
}

const ICON_BASE =
  "absolute right-3 top-1/2 -translate-y-1/2 transition duration-150";

export const Password = ({
  className,
  classIcon = "size-4",
  variant = "password",
  placeholder = "Enter password",
  onClick,
  children,
  ...props
}: PasswordProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShow((prev) => !prev);
    onClick?.();
  };

  return (
    <div className="relative">
      <input
        type={isShow ? "text" : "password"}
        id={variant}
        name={variant}
        className={cn("w-full", className)}
        placeholder={placeholder}
        autoComplete="new-password webauthn"
        {...props}
      />
      {children}
      <span onClick={handleClick} className="cursor-pointer">
        <HiddenIcon
          className={cn(ICON_BASE, classIcon, isShow ? "block" : "hidden")}
        />
        <ShowIcon
          className={cn(ICON_BASE, classIcon, isShow ? "hidden" : "block")}
        />
      </span>
    </div>
  );
};
