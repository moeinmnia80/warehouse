import { Row, Table, TBody } from "@/shared/index";
import { TableHeaderRow, TableRowData } from "@/feature/shipping/index";

export const ShippingTable = () => {
  return (
    <div className="">
      <Table>
        <TableHeaderRow />
        <TBody>
          <Row className="flex-center min-h-18 text-md text-t-primary border border-bo-primary border-t-0 rounded-b-xl">
            <TableRowData />
            There is not any data
          </Row>
        </TBody>
      </Table>
    </div>
  );
};
