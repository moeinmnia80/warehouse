import { cn } from "@/shared";
import { InfoIcon } from "@/assets";
import type { ComponentProps } from "react";

export const SidebarDetails = ({
  children,
  className,
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex gap-3 border border-bo-primary rounded-xl p-5",
        className,
      )}
    >
      <InfoIcon className="size-5 shrink-0 stroke-tx-placeholder" />
      <span className="text-tx-placeholder text-sm">{children}</span>
    </div>
  );
};
