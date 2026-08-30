import { DeliveryIcon } from "@/assets";
import type { ComponentProps } from "react";

export const ShippingRequestHeader = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <DeliveryIcon className="size-8 stroke-tx-primary" />
      <h2 className="md:text-md lg:text-xl xl:text-2xl font-bold">
        Shipping Request
      </h2>
    </div>
  );
};
