import { HistoryIcon } from "@/assets";
import { type ComponentProps } from "react";

export const ShippingHeader = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <HistoryIcon className="size-8 stroke-tx-primary" />
      <h2 className="md:text-md lg:text-xl xl:text-2xl font-bold">
        Shipping History
      </h2>
    </div>
  );
};
