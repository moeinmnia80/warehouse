import {
  ShippingRequestInfo,
  ShippingRequestsTable,
  ShippingRequestSidebar,
} from "@/feature/shipping";

const ShippingRequest = () => {
  return (
    <div className="flex gap-6 w-full">
      <div className="flex flex-col gap-6 w-full flex-3">
        <ShippingRequestInfo />
        <ShippingRequestsTable />
      </div>
      <ShippingRequestSidebar />
    </div>
  );
};

export default ShippingRequest;
