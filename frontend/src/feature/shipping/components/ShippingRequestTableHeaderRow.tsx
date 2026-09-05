import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  NEW_SHIPPING_COLUMNS,
  rowCheckAll,
  rowReset,
} from "@/feature/shipping";
import { Checkbox, Label, Row, TD, THead, type Package } from "@/shared";
import { areAllRowsChecked } from "@/feature/suite";

export const ShippingRequestTableHeaderRow = ({
  data,
}: {
  data: Package[];
}) => {
  const dispatch = useAppDispatch();
  const rowChecked = useAppSelector((state) => state.shipping.rowChecked);
  return (
    <THead>
      <Row className="hidden md:flex items-center bg-b-table border border-b-none border-bo-primary rounded-t-xl text-tx-primary">
        <TD className="min-w-10 p-2">
          <Label className="flex-center" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              accentClass="stroke-st-primary"
              onClick={() =>
                dispatch(
                  areAllRowsChecked(data, rowChecked)
                    ? rowReset()
                    : rowCheckAll(data),
                )
              }
              checked={areAllRowsChecked(data, rowChecked)}
            />
          </Label>
        </TD>
        {NEW_SHIPPING_COLUMNS.map((item) => (
          <TD
            className={`flex items-center gap-1 text-sm text-current cursor-pointer px-2 ${item.className}`}
            key={item.key}
          >
            {item.name}
          </TD>
        ))}
      </Row>
    </THead>
  );
};
