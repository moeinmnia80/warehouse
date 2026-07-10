import { CheckBox } from "@/shared/components/ui/CheckBox";
import { Label } from "@/shared/components/ui/Form";
import { Row, Table, TBody, TD, THead } from "@/shared/components/ui/Table";

const ShippingTable = () => {
  return (
    <div className="">
      <Table>
        <THead>
          <Row>
            <TD>
              <Label>
                <CheckBox className="bg-b-secondary" />
              </Label>
            </TD>
          </Row>
        </THead>
        <TBody></TBody>
      </Table>
    </div>
  );
};

export default ShippingTable;
