import {
  ShippingTab,
  ShippingInfo,
  ShippingTable,
} from "@/feature/shipping/index";

export const ShippingHistory = () => {
  return (
    <div>
      <ShippingInfo />
      <div className="border border-bo-primary rounded-xl mt-10 p-6">
        <ShippingTab />
        <div className="my-6 border-t border-bo-primary"></div>
        <ShippingTable />
      </div>
    </div>
  );
};
