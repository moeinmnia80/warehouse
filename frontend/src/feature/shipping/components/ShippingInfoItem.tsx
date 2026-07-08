import InfoIcon from "@/assets/icons/InfoIcon";
import { type ComponentProps } from "react";

const ShippingInfoItem = ({ children, ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <InfoIcon className="size-6 shrink-0 stroke-t-primary mt-0.5 float-left" />
      <p className="text-xl">{children}</p>
    </div>
  );
};

export default ShippingInfoItem;
