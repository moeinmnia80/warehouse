import ShippingInfoItem from "./ShippingInfoItem";

const ShippingInfo = () => {
  return (
    <div className="flex flex-col gap-4 h-fit">
      <ShippingInfoItem className="flex gap-3 w-full bg-b-primary border border-primary rounded-xl p-5 text-t-primary font-medium">
        <span>
          View your completed shipments, transactions and orders here. Ship
          requests still in process can be found in your
        </span>
        <span className="w-fit h-fit text-blue-600 underline ml-0.5">
          Queue
        </span>
        .
      </ShippingInfoItem>
      <ShippingInfoItem className="flex gap-3 w-full bg-b-primary border border-primary rounded-xl p-5 text-t-primary font-medium">
        <span>
          You may need to update the billing information on your account. Please
          select the Account Settings tab above, then
          <span className="w-fit h-fit text-blue-600 underline mx-0.5">
            My Billing Information
          </span>
          , then enter your updated billing information. Please contact Customer
          Service if you require further assistance
        </span>
      </ShippingInfoItem>
      <ShippingInfoItem className="flex gap-3 w-full bg-b-primary border border-primary rounded-xl p-5 text-t-primary font-medium">
        <span>
          You currently have an unpaid balance of $2,520.00. Please
          <span className="w-fit h-fit text-blue-600 underline mx-0.5">
            Pay Your Balance
          </span>
          to avoid delays in shipments and orders. Please allow 30 minutes for
          your account data to be updated.
        </span>
      </ShippingInfoItem>
    </div>
  );
};

export default ShippingInfo;
