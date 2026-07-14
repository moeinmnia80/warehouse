import { SHIPPING_COLUMNS } from "@/feature/shipping/index";
import { CheckBox, TD, THead, Label, Row } from "@/shared/index";

export const TableHeaderRow = () => {
  return (
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
  );
};
