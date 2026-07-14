import { Label } from "@/shared/components/ui/Form";
import { CheckBox } from "@/shared/components/ui/CheckBox";
import { Row, Table, TBody, TD, THead } from "@/shared/components/ui/Table";
import { SHIPPING_COLUMNS } from "../constants/column";

export const ShippingTable = () => {
  return (
    <div className="">
      <Table>
        <THead>
          <Row className="hidden md:flex items-center bg-b-table border border-b-none border-bo-primary rounded-t-xl text-t-primary">
            <TD className="min-w-10 p-2">
              <Label>
                <CheckBox className="bg-b-secondary" />
              </Label>
            </TD>
            {SHIPPING_COLUMNS.map((item) => (
              <TD
                className={`flex items-center gap-1 text-md text-current cursor-pointer px-2 ${item.className}`}
                key={item.key}
              >
                {item.name}
              </TD>
            ))}
          </Row>
        </THead>
        <TBody>
          <Row className="flex-center min-h-18 text-md text-t-primary border border-bo-primary border-t-0 rounded-b-xl">
            There is not any data
          </Row>
        </TBody>
      </Table>
    </div>
  );
};
