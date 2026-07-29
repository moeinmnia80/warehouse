import { ShippingAddress, ShippingPaymentMethod } from "@/feature/shipping";

export const ShippingRequestInfo = () => {
  return (
    <div className="text-tx-primary bg-b-primary border border-bo-primary rounded-xl p-6">
      <ShippingPaymentMethod />
      <ShippingAddress />
    </div>
  );
};
