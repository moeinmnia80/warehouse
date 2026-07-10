import ShippingTab from "@/feature/shipping/components/ShippingTab";
import ShippingInfo from "@/feature/shipping/components/ShippingInfo";
import ShippingTable from "@/feature/shipping/components/ShippingTable";

const ShippingHistory = () => {
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

export default ShippingHistory;
