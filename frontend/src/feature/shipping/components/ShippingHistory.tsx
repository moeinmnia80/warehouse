import ShippingInfo from "./ShippingInfo";
import ShippingTab from "./ShippingTab";

const ShippingHistory = () => {
  return (
    <div>
      <ShippingInfo />
      <div className="border border-bo-primary rounded-xl mt-10 p-6">
        <ShippingTab />
      </div>
    </div>
  );
};

export default ShippingHistory;
