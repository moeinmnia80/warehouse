import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import { ChevronIcon } from "@/assets/index";
import {
  TD,
  Row,
  THead,
  Label,
  COLUMNS,
  Checkbox,
  type TableRow,
} from "@/shared/index";
import {
  isVisible,
  toggleAll,
  allChecked,
  handleSortChange,
} from "@/feature/suite/index";

interface TableHeaderRowProps {
  sortedData: TableRow[] | undefined;
}

export const TableHeaderRow = ({ sortedData }: TableHeaderRowProps) => {
  const dispatch = useAppDispatch();
  const { category, sort, rowChecked } = useAppSelector((state) => state.suite);

  return (
    <THead>
      <Row className="hidden md:flex items-center bg-b-table border border-b-none border-bo-primary rounded-t-xl **:whitespace-nowrap **:text-sm! text-tx-primary">
        <TD className="min-w-10 py-4 px-3">
          <Label onClick={(e) => e.stopPropagation()}>
            <Checkbox
              accentClass="stroke-st-primary"
              onChange={() => toggleAll(dispatch, sortedData, rowChecked)}
              checked={allChecked(sortedData, rowChecked)}
            />
          </Label>
        </TD>
        {COLUMNS.map((item) => (
          <TD
            key={item.key}
            onClick={(e) => handleSortChange(e, item.key, dispatch)}
            className={`flex items-center gap-1 text-current cursor-pointer px-2 ${isVisible(item.key, category) ? "" : "hidden"} ${item.className}`}
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
