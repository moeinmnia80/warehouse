import { useInPath } from "@/shared";
import {
  ShippingHeader,
  ShippingRequestHeader,
  SuiteHeader,
} from "@/feature/dashboard/index";

export const DashboardHeader = () => {
  return (
    <div className="flex w-full bg-b-primary rounded-2xl p-5 border border-bo-primary shadow-2xs">
      <SuiteHeader
        className={
          useInPath("my-suite")
            ? "flex h-38 md:h-26 animate-slide-down"
            : "hidden"
        }
      />
      <ShippingHeader
        className={
          useInPath("shipping")
            ? "flex items-center gap-5 h-22.5 text-tx-primary animate-slide-down"
            : "hidden"
        }
      />
      <ShippingRequestHeader
        className={
          useInPath("shipping-request")
            ? "flex items-center gap-5 text-tx-primary animate-slide-down"
            : "hidden"
        }
      />
    </div>
  );
};
