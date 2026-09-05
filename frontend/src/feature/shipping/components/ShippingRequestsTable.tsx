import { PlusIcon } from "lucide-react";

import { Table, TableEmpty } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";

import {
  modalToggler,
  ShippingRequestModal,
  ShippingRequestTableDataRow,
  ShippingRequestTableHeaderRow,
} from "@/feature/shipping";

export const ShippingRequestsTable = () => {
  const dispatch = useAppDispatch();
  const requestPackages = useAppSelector(
    (state) => state.shipping.requestPackages,
  );

  const handleAddMorePackage = () => {
    dispatch(modalToggler(true));
  };

  return (
    <div className="p-6 text-tx-primary bg-b-primary border border-bo-primary rounded-xl animate-slide-up">
      <section className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-bo-primary pb-6 **:transition-all **:duration-200">
        <h3 className="text-center md:text-left text-xl text-tx-primary font-bold">
          Packages in this shipment
        </h3>
        <button
          type="button"
          onClick={handleAddMorePackage}
          className="flex-center gap-1.5 bg-tx-primary text-b-primary capitalize px-5 py-3 rounded-lg enabled:hover:bg-white/40"
        >
          <PlusIcon className="size-5 fill-st-primary" />
          <span className="text-md md:text-sm">add more packages</span>
        </button>
      </section>
      <Table className="pt-6 overflow-hidden">
        <ShippingRequestTableHeaderRow data={requestPackages} />
        {requestPackages.length ? (
          requestPackages.map((pkg) => (
            <ShippingRequestTableDataRow key={pkg.packageId} data={pkg} />
          ))
        ) : (
          <TableEmpty />
        )}
      </Table>
      <ShippingRequestModal />
    </div>
  );
};
