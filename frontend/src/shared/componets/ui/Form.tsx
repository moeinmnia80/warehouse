import { useState, type ComponentProps, type FC } from "react";
import type { InputType } from "@/shared/types/types";
import ShowIcon from "@/assets/icons/ShowIcon.tsx";
import HiddenIcon from "@/assets/icons/HiddenIcon";

export const Form: FC<ComponentProps<"form">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <>
      <form className={`flex flex-col gap-4 mt-6 ${className}`} {...props}>
        {children}
      </form>
    </>
  );
};

export const Input: FC<InputType> = ({ label, className, type, ...props }) => {
  const [isShow, setIsShow] = useState(false);

  const isPassword = () =>
    isShow ? (type === "password" ? true : false) : false;

  return (
    <>
      <label className=" flex flex-col gap-2" htmlFor={props.name}>
        <span className="text-md font-medium text-t-primary">{label}</span>
        <div className="relative flex flex-1 w-full">
          <input
            className={`w-full ${className}`}
            type={isPassword() ? "text" : type}
            {...props}
          />

          {isPassword() ? (
            <HiddenIcon
              onClick={() => setIsShow((prev) => !prev)}
              className="size-4 absolute top-1/2 -translate-y-1/2 right-3 
                  transition duration-200
                  stroke-bo-primary hover:stroke-st-primary"
            />
          ) : (
            props.name === "password" && (
              <ShowIcon
                onClick={() => setIsShow((prev) => !prev)}
                className="size-4 absolute top-1/2 -translate-y-1/2 right-3 
                  transition duration-200
                  stroke-bo-primary hover:stroke-st-primary"
              />
            )
          )}
        </div>
      </label>
    </>
  );
};
