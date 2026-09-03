import { PlusIcon } from "lucide-react";

import {
  useGetShippingQuery,
  ShippingRequestTableDataRow,
  ShippingRequestTableHeaderRow,
} from "@/feature/shipping";

import { Table, TableEmpty } from "@/shared";

export const ShippingRequestsTable = () => {
  const { packages, isLoading } = useGetShippingQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      packages: (data || []).map((shipment) => shipment.packages || []).flat(),
    }),
  });

  return (
    <div className="p-6 text-tx-primary bg-b-primary border border-bo-primary rounded-xl">
      <section className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-bo-primary pb-6">
        <h3 className="text-center md:text-left text-xl text-tx-primary font-bold">
          Packages in this shipment
        </h3>
        <button className="flex-center gap-1.5 bg-tx-primary text-b-primary capitalize px-5 py-3 rounded-lg">
          <PlusIcon className="size-5 fill-st-primary" />
          <span className="text-md md:text-sm">add more packages</span>
        </button>
      </section>
      <Table className="pt-6">
        <ShippingRequestTableHeaderRow />
        {packages.length ? (
          packages.map((pkg) => (
            <ShippingRequestTableDataRow data={pkg} isLoading={isLoading} />
          ))
        ) : (
          <TableEmpty />
        )}
      </Table>
    </div>
  );
};
