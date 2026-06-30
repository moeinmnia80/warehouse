import TickIcon from "@/assets/icons/TickIcon";
import type { ComponentProps, FC } from "react";

export const CheckBox: FC<ComponentProps<"input">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <>
      <label className="flex items-center gap-1.5 " htmlFor={props.name}>
        <input className="peer w-0 hidden" {...props} />
        <span
          className={`peer-checked:*:inline-block 
            flex items-center justify-center
            size-3 bg-b-gray-lighter  
            border border-bo-secondary rounded-sm
            ${className}`}
        >
          <TickIcon className="size-3 stroke-st-primary hidden" />
        </span>
        <span className="text-xs font-medium text-t-primary max-w-50">
          {children}
        </span>
      </label>
    </>
  );
};
