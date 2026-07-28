import { type TableRow } from "@/shared/index";
import type { AppDispatch } from "@/store/redux/store";
import { SUITE_TABLE_HEADER_COLUMNS } from "@/feature/suite";
import type { CategoryType, SuiteSummary } from "@/feature/suite/index";
import {
  rowSort,
  rowReset,
  openModal,
  rowToggle,
  closeModal,
  rowCheckAll,
  rowExpanded,
  changeCategory,
} from "@/feature/suite/store/suiteSlice";

export const checkCategoryStatus = (status: CategoryType) => {
  switch (status.toLocaleLowerCase()) {
    case "ready to send":
      return "ready";
    case "in review":
      return "review";
    case "action required":
      return "required";
    default:
      throw "view all";
  }
};
export const createRowActions = (dispatch: AppDispatch) => ({
  changeTab: (
    category: CategoryType,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    dispatch(changeCategory(category));
  },

  changeSort: (value: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(rowSort(value));
  },

  expandRow: (rowId: string) => {
    dispatch(rowExpanded(rowId));
  },

  toggleRow: (rowId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(rowToggle(rowId));
  },

  closeModal: () => {
    dispatch(closeModal());
  },

  toggleAllRows: (
    data: TableRow[] = [],
    rowChecked: Record<string, boolean>,
  ) => {
    dispatch(
      areAllRowsChecked(data, rowChecked) ? rowReset() : rowCheckAll(data),
    );
  },

  resolveRowAction: (rowId: string, category: string) => {
    if (category === "action required") {
      dispatch(openModal(rowId));
    } else {
      dispatch(rowExpanded(rowId));
    }
  },
});

const isColumnVisibleInTab = (key: string, category: string) =>
  SUITE_TABLE_HEADER_COLUMNS.find(
    (item) => item.key === key && item.tabs.includes(category),
  );

const areAllRowsChecked = (
  sortedData: TableRow[] = [],
  rowChecked: Record<string, boolean>,
): boolean =>
  sortedData.length > 0 && sortedData.every((row) => rowChecked[row.packageId]);

const SHIPPING_COST = 8;
const TAX_RATE = 0.1;

const calculateSuiteSummary = (rows: TableRow[]): SuiteSummary => {
  const itemValues = +rows
    .reduce((sum, row) => sum + Number(row.itemValues), 0)
    .toFixed(2);
  const totalWeight = +rows
    .reduce((sum, row) => sum + Number(row.weight), 0)
    .toFixed(2);
  const subTotal = +(
    itemValues +
    itemValues * TAX_RATE +
    SHIPPING_COST
  ).toFixed(2);

  return { itemValues, totalWeight, subTotal };
};

const formatCurrency = (value: number) => `$ ${value}`;
const formatWeight = (value: number) => `${value} lbs`;

export {
  formatWeight,
  formatCurrency,
  areAllRowsChecked,
  isColumnVisibleInTab,
  calculateSuiteSummary,
};
