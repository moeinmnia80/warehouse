import { CheckBox, Label, Row, TD, type TableRow } from "@/shared";
import type { ComponentProps } from "react";

interface TableRowData extends ComponentProps<"div"> {
  data: TableRow;
}

export const TableRowData = ({ data }: TableRowData) => {
  const date = new Date(data.dataReceived);

  return (
    <>
      <Row className="flex items-center min-h-18 text-md text-t-primary border border-bo-primary border-t-0 last:rounded-b-xl *:py-4 *:px-2">
        <TD className="flex-center min-w-10">
          <Label>
            <CheckBox />
          </Label>
        </TD>
        <TD className="text-t-primary flex-1">{date.toLocaleDateString()}</TD>
        <TD className="text-t-primary flex-1">nothing</TD>
        <TD className="text-t-primary flex-1">Other</TD>
        <TD className="text-t-primary flex-2">this shipping ...</TD>
        <TD className="flex text-t-primary flex-1 justify-center">100</TD>
        <TD className="flex text-t-primary flex-1 justify-center">view</TD>
      </Row>
    </>
  );
};
