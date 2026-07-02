import type { ComponentProps, FC } from "react";
import TickIcon from "@/assets/icons/TickIcon";

export const CheckBox: FC<
  { labelClass?: string } & ComponentProps<"input">
> = ({ className, labelClass, children, ...props }) => {
  return (
    <>
      <label
        className="flex items-center gap-1.5 cursor-pointer"
        htmlFor={props.name}
      >
        <input className="peer w-0 hidden" type="checkbox" {...props} />
        <span
          className={`peer-checked:*:inline-block 
            flex items-center justify-center
            size-4 bg-b-checkbox  
            border border-bo-secondary rounded-sm
            ${className}`}
        >
          <TickIcon className="size-4 stroke-st-primary hidden" />
        </span>
        <span
          className={`text-xs font-light text-t-primary max-w-55 ${labelClass}`}
        >
          {children}
        </span>
      </label>
    </>
  );
};
