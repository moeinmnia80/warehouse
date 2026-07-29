import { useAppSelector } from "@/store/redux/store";
import { Table, TableEmpty, TableSkeleton, TBody } from "@/shared/index";
import {
  TableDataRow,
  TableHeaderRow,
  useGetShippingQuery,
  useSearchFilter,
} from "@/feature/shipping/index";

export const ShippingTable = () => {
  const { data, isLoading } = useGetShippingQuery();
  const search = useAppSelector((state) => state.shipping.search);
  const dateFilter = useAppSelector((state) => state.shipping.dateFilter);
  const filteredData = useSearchFilter({ data, search, dateFilter });

  if (isLoading) {
    return (
      <TableSkeleton
        columns={["w-20", "w-20", "w-20", "w-20", "w-20"]}
        rows={1}
      />
    );
  }

  return (
    <Table>
      <TableHeaderRow />
      <TBody>
        {filteredData?.length ? (
          filteredData.map((item) => (
            <TableDataRow key={item.shipmentId} item={item} />
          ))
        ) : (
          <TableEmpty className="h-18" />
        )}
      </TBody>
    </Table>
  );
};
