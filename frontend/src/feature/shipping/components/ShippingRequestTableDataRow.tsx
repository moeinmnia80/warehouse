import { ShowIcon } from "@/assets";
import {
  Checkbox,
  InlineSkeleton,
  Label,
  Row,
  TD,
  type Package,
} from "@/shared";

import { formatCurrency, formatWeight } from "@/feature/suite";

interface ShippingRequestTableDataRowProps {
  data: Package;
  isLoading: boolean;
}

export const ShippingRequestTableDataRow = ({
  data,
  isLoading,
}: ShippingRequestTableDataRowProps) => {
  console.log(data);

  return (
    <Row className="overflow-hidden flex flex-col md:flex-center md:flex-row min-h-18 text-sm text-tx-primary border border-bo-primary rounded-xl md:rounded-b-none    md:rounded-t-none md:border-t-0 md:last:rounded-b-xl md:*:py-4 md:*:px-2 mb-4 last:mb-0 md:mb-0 animate-fade-in">
      <TD className="hidden md:flex items-center justify-center min-w-10">
        <Label>
          <Checkbox accentClass="stroke-st-primary" />
        </Label>
      </TD>
      <TD className="flex items-center text-current flex-2" dataCell="Date">
        <div className="flex-center flex-col md:items-start! w-full">
          <div className="font-bold text-tx-primary">
            {isLoading ? (
              <InlineSkeleton className="h-4.5 w-10 ml-0" />
            ) : (
              data.vendor
            )}
          </div>
          <div className="font-light">
            {isLoading ? (
              <InlineSkeleton className="h-4 w-29 ml-0" />
            ) : (
              data.barcode
            )}
          </div>
        </div>
      </TD>
      <TD className="flex items-center text-current flex-1" dataCell="Invoice">
        <span className="flex-center justify-center w-full md:justify-start!">
          {isLoading ? (
            <InlineSkeleton className="w-28 h-4 ml-0" />
          ) : (
            data?.packageId
          )}
        </span>
      </TD>
      <TD className="flex items-center text-current flex-1" dataCell="Type">
        <span className="flex-center justify-center w-full md:justify-start!">
          {isLoading ? (
            <InlineSkeleton className="h-4 w-12 ml-0" />
          ) : (
            formatCurrency(+data.totalValues)
          )}
        </span>
      </TD>
      <TD
        className="flex items-center text-current flex-1 capitalize"
        dataCell="Description"
      >
        <span className="flex-center w-full md:justify-center">
          {isLoading ? (
            <InlineSkeleton className="h-4 w-16 ml-0" />
          ) : (
            formatWeight(+data.weight)
          )}
        </span>
      </TD>
      <TD
        className="flex items-center text-current flex-1 md:justify-center"
        dataCell="Action"
      >
        <span
          className={`flex-center gap-1.5 justify-center w-full ${isLoading ? "opacity-25" : ""}`}
        >
          view
          <ShowIcon className="size-4 stroke-st-primary" />
        </span>
      </TD>
    </Row>
  );
};
