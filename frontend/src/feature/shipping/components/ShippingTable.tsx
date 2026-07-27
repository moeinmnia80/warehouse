import { Table, TableEmpty, TableSkeleton, TBody } from "@/shared/index";
import {
  TableDataRow,
  TableHeaderRow,
  useGetShippingQuery,
} from "@/feature/shipping/index";

export const ShippingTable = () => {
  const { data, isLoading } = useGetShippingQuery();

  if (isLoading)
    return (
      <TableSkeleton
        columns={["w-20", "w-20", "w-20", "w-20", "w-20"]}
        rows={1}
      />
    );
  return (
    <Table>
      <TableHeaderRow />
      <TBody>
        {data?.length ? (
          data?.map((item) => (
            <TableDataRow key={item.shipmentId} item={item} />
          ))
        ) : (
          <TableEmpty />
        )}
      </TBody>
    </Table>
  );
};
