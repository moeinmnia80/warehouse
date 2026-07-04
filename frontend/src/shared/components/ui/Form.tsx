import TickIcon from "@/assets/icons/TickIcon";
import HiddenIcon from "@/assets/icons/HiddenIcon";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import { useState, type ComponentProps } from "react";

// ------------------------------------------------------------
//1-————— Form ————————————————————————————————————————————————
// ------------------------------------------------------------
export const Form = ({
  className,
  children,
  ...props
}: ComponentProps<"form">) => {
  return (
    <>
      <form className={`flex flex-col gap-4 mt-6 ${className}`} {...props}>
        {children}
      </form>
    </>
  );
};
// ------------------------------------------------------------
//2-————— Form item ———————————————————————————————————————————
// ------------------------------------------------------------
export const FormItem = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <>
      <div className={`relative ${className}`} {...props}>
        {children}
      </div>
    </>
  );
};
// ------------------------------------------------------------
//3-————— Label ———————————————————————————————————————————————
// ------------------------------------------------------------
export const Label = ({ children, ...props }: ComponentProps<"label">) => {
  return <label {...props}>{children}</label>;
};
// ------------------------------------------------------------
//4-————— Caption —————————————————————————————————————————————
// ------------------------------------------------------------
export const Caption = ({ children, ...props }: ComponentProps<"p">) => {
  return <p {...props}>{children}</p>;
};
// ------------------------------------------------------------
//5-————— Input ———————————————————————————————————————————————
// ------------------------------------------------------------
export const Input = ({
  className,
  children,
  ...props
}: ComponentProps<"input">) => {
  return (
    <div className="relative">
      <input className={`w-full ${className}`} {...props} />
      {children}
    </div>
  );
};
// ------------------------------------------------------------
//6-————— Checkbox ————————————————————————————————————————————
// ------------------------------------------------------------

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  accentClass: string;
}
export const Checkbox = ({
  className = "size-4 rounded-sm border-gray-300",
  children,
  accentClass = "stroke-gray-300",
  ...props
}: CheckboxProps) => {
  return (
    <>
      <input className="peer w-0 hidden" type="checkbox" {...props} />
      <span
        className={`
        peer-checked:*:inline-block 
        flex items-center justify-center
        border ${className}`}
      >
        <TickIcon className={`hidden ${accentClass}`} />
      </span>
      {children}
    </>
  );
};
// ------------------------------------------------------------
//7-————— Email ———————————————————————————————————————————————
// ------------------------------------------------------------
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
        autoComplete="email"
        {...props}
      />
      {children}
    </div>
  );
};
// ------------------------------------------------------------
//8-————— Password ————————————————————————————————————————————
// ------------------------------------------------------------
interface PasswordProps extends Omit<
  ComponentProps<"input">,
  "name" | "type" | "id" | "onClick"
> {
  onClick?: () => void;
  classIcon?: string;
  variant: "password" | "confirmPassword";
}

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
        className={`w-full ${className}`}
        placeholder={placeholder}
        autoComplete="new-password"
        {...props}
      />
      {children}
      <span onClick={handleClick}>
        {isShow ? (
          <HiddenIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 
            transition duration-150
            ${classIcon ? classIcon : ""}`}
          />
        ) : (
          <ShowIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 
            transition duration-150
            ${classIcon ? classIcon : ""}`}
          />
        )}
      </span>
    </div>
  );
};
// size-4 bg-b-checkbox
// border-bo-secondary rounded-sm
// <span
//   className={` ${labelClass}`}
// >
//   {children}
// </span>
