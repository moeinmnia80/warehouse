import { Table, TBody } from "@/shared/index";
import { TableHeaderRow, useGetShippingQuery } from "@/feature/shipping/index";

export const ShippingTable = () => {
  const { data } = useGetShippingQuery();
  console.log(data);
  return (
    <div className="">
      <Table>
        <TableHeaderRow />
        <TBody></TBody>
      </Table>
    </div>
  );
};
