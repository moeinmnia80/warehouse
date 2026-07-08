import InfoIcon from "@/assets/icons/InfoIcon";
import { type ComponentProps } from "react";

const ShippingInfoItem = ({ children, ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <InfoIcon className="size-4 shrink-0 stroke-t-primary" />
      <p className="text-xl">{children}</p>
    </div>
  );
};

export default ShippingInfoItem;
