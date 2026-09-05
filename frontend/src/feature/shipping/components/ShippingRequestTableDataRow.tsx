import { ShowIcon } from "@/assets";
import { rowToggle } from "@/feature/shipping";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import { formatCurrency, formatWeight } from "@/feature/suite";
import {
  TD,
  Row,
  Label,
  Checkbox,
  type Package,
  TableSkeleton,
} from "@/shared";

interface ShippingRequestTableDataRowProps {
  data: Package;
  isLoading?: boolean;
}

export const ShippingRequestTableDataRow = ({
  data,
  isLoading = false,
}: ShippingRequestTableDataRowProps) => {
  const dispatch = useAppDispatch();
  const rowChecked = useAppSelector((state) => state.shipping.rowChecked);

  const isChecked = !!rowChecked[data.packageId];

  if (isLoading) {
    return (
      <TableSkeleton
        className="p-6"
        rows={5}
        columns={["w-30", "w-15", "w-15", "w-15", "w-20", "w-20"]}
      />
    );
  }

  return (
    <Row className="overflow-hidden flex flex-col md:flex-center md:flex-row min-h-18 text-sm text-tx-primary border border-bo-primary rounded-xl md:rounded-b-none    md:rounded-t-none md:border-t-0 md:last:rounded-b-xl md:*:py-4 md:*:px-2 mb-4 last:mb-0 md:mb-0 animate-fade-in">
      <TD className="hidden md:flex items-center justify-center min-w-10">
        <Label onClick={(e) => e.stopPropagation()}>
          <Checkbox
            accentClass="stroke-st-primary"
            onClick={() => dispatch(rowToggle(data.packageId))}
            checked={isChecked}
          />
        </Label>
      </TD>
      <TD className="flex items-center text-current flex-2" dataCell="Date">
        <div className="flex-center flex-col md:items-start! w-full">
          <div className="font-bold text-tx-primary">{data.vendor}</div>
          <div className="font-light">{data.barcode}</div>
        </div>
      </TD>
      <TD className="flex items-center text-current flex-1" dataCell="Invoice">
        <span className="flex-center justify-center w-full md:justify-start!">
          {data?.packageId}
        </span>
      </TD>
      <TD className="flex items-center text-current flex-1" dataCell="Type">
        <span className="flex-center justify-center w-full md:justify-start!">
          {formatCurrency(+data.totalValues)}
        </span>
      </TD>
      <TD
        className="flex items-center text-current flex-1 capitalize"
        dataCell="Description"
      >
        <span className="flex-center w-full md:justify-center">
          {formatWeight(+data.weight)}
        </span>
      </TD>
      <TD
        className="flex items-center text-current flex-1 md:justify-center"
        dataCell="Action"
      >
        <span className="flex-center gap-1.5 justify-center w-full">
          view
          <ShowIcon className="size-4 stroke-st-primary" />
        </span>
      </TD>
    </Row>
  );
};
