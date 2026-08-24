import { ChevronIcon } from "@/assets/index";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import { TD, Row, THead, Label, Checkbox, type Package } from "@/shared/index";

import {
  createRowActions,
  areAllRowsChecked,
  isColumnVisibleInTab,
  SUITE_TABLE_HEADER_COLUMNS,
} from "@/feature/suite";

interface TableHeaderRowProps {
  sortedData: Package[] | undefined;
}

export const TableHeaderRow = ({ sortedData }: TableHeaderRowProps) => {
  const dispatch = useAppDispatch();
  const rowActions = createRowActions(dispatch);
  const sort = useAppSelector((state) => state.suite.sort);
  const category = useAppSelector((state) => state.suite.category);
  const rowChecked = useAppSelector((state) => state.suite.rowChecked);

  return (
    <THead>
      <Row className="hidden md:flex items-center bg-b-table border border-b-none border-bo-primary rounded-t-xl **:whitespace-nowrap **:text-sm! text-tx-primary">
        <TD className="min-w-10 py-4 px-3">
          <Label onClick={(e) => e.stopPropagation()}>
            <Checkbox
              accentClass="stroke-st-primary"
              onChange={() => rowActions.toggleAllRows(sortedData, rowChecked)}
              checked={areAllRowsChecked(sortedData, rowChecked)}
            />
          </Label>
        </TD>

        {SUITE_TABLE_HEADER_COLUMNS.map((item) => (
          <TD
            key={item.key}
            onClick={(e) => rowActions.changeSort(item.key, e)}
            className={`flex items-center gap-1 text-current cursor-pointer px-2 ${isColumnVisibleInTab(item.key, category) ? "" : "hidden"} ${item.className}`}
          >
            {item.name}
            {item.sortable && (
              <ChevronIcon
                className={`size-3 fill-tx-secondary ${sort.key === item.key ? (sort.type === "asc" ? "" : "rotate-180") : "-rotate-90"} transition duration-200`}
              />
            )}
          </TD>
        ))}
      </Row>
    </THead>
  );
};
