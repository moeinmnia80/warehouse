import {
  ShippingRequestTableDataRow,
  ShippingRequestTableHeaderRow,
} from "@/feature/shipping";

export const ShippingRequestsTable = () => {
  return (
    <div className="p-6 text-tx-primary bg-b-primary border border-bo-primary rounded-xl">
      <ShippingRequestTableHeaderRow />
      <ShippingRequestTableDataRow />
    </div>
  );
};
