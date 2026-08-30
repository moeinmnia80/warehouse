import type { ComponentProps } from "react";
import { cn } from "@/shared";

export const InlineSkeleton = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "size-6 ml-2 inline-block bg-white/10 rounded-sm animate-pulse",
        className,
      )}
      {...props}
    />
  );
};
