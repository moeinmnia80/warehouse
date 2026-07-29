import type { ComponentProps } from "react";
import { Checkbox, Label, Row, TD } from "@/shared";
import type { ShippingRow } from "@/feature/shipping";
import { formatCurrency } from "@/feature/suite";
import { ShowIcon } from "@/assets";

interface TableDataRowProps extends ComponentProps<"div"> {
  item: ShippingRow;
}

export const TableDataRow = ({ item }: TableDataRowProps) => {
  const date = new Date(item.timestamps.created_at);

  return (
    <>
      <Row className="overflow-hidden flex flex-col md:flex-center md:flex-row min-h-18 text-sm text-tx-primary border border-bo-primary rounded-xl md:rounded-b-none    md:rounded-t-none md:border-t-0 md:last:rounded-b-xl md:*:py-4 md:*:px-2 mb-4 last:mb-0 md:mb-0 animate-fade-in">
        <TD className="hidden md:flex items-center justify-center min-w-10">
          <Label>
            <Checkbox accentClass="stroke-st-primary" />
          </Label>
        </TD>
        <TD className="flex items-center text-current flex-1" dataCell="Date">
          <span className="flex-center justify-center w-full md:justify-start!">
            {date.toLocaleDateString()}
          </span>
        </TD>
        <TD
          className="flex items-center text-current flex-1"
          dataCell="Invoice"
        >
          <span className="flex-center justify-center w-full md:justify-start!">
            {item.invoice.file ?? "nothing"}
          </span>
        </TD>
        <TD className="flex items-center text-current flex-1" dataCell="Type">
          <span className="flex-center justify-center w-full md:justify-start!">
            {item.invoice.type.toUpperCase()}
          </span>
        </TD>
        <TD
          className="flex items-center text-current flex-2 capitalize"
          dataCell="Description"
        >
          <span className="flex-center justify-center w-full md:justify-start!">
            {item.description}
          </span>
        </TD>
        <TD
          className="flex items-center text-current flex-1 md:justify-center"
          dataCell="Charge"
        >
          <span className="flex-center justify-center w-full">
            {formatCurrency(+item.charge)}
          </span>
        </TD>
        <TD
          className="flex items-center text-current flex-1 md:justify-center"
          dataCell="Action"
        >
          <span className="flex-center gap-1.5 justify-center w-full ">
            view
            <ShowIcon className="size-4 stroke-st-primary" />
          </span>
        </TD>
      </Row>
    </>
  );
};
