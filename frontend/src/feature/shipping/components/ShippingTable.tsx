import { Table, TableSkeleton, TBody } from "@/shared/index";
import {
  TableDataRow,
  TableHeaderRow,
  useGetShippingQuery,
} from "@/feature/shipping/index";
import { Suspense } from "react";

export const ShippingTable = () => {
  const { data } = useGetShippingQuery();

  return (
    <div className="">
      <Table>
        <TableHeaderRow />
        <TBody>
          <Suspense
            fallback={
              <TableSkeleton
                columns={["w-10", "w-20", "w-20", "w-20"]}
                rows={3}
              />
            }
          >
            {data?.data.map((item) => (
              <TableDataRow key={item.shipmentId} item={item} />
            ))}
          </Suspense>
        </TBody>
      </Table>
    </div>
  );
};
