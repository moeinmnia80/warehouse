import type { AppDispatch } from "@/store";
import { COLUMNS, type TableRow } from "@/shared/index";
import type { CategoryType } from "@/feature/suite/index";
import {
  closeModal,
  openModal,
  rowCheckAll,
  rowReset,
} from "../store/suiteSlice";
import {
  changeCategory,
  rowExpanded,
  rowSort,
  rowToggle,
} from "@/feature/suite/store/suiteSlice";

/* 
    check status for give correct class to status tag 
*/
export const checkStatus = (status: string) => {
  switch (status) {
    case "ready to send":
      return "ready";
    case "in review":
      return "review";
    case "action required":
      return "required";

    default:
      throw "unknown status";
  }
};
/*------------------------------------*/
/*------------ Table Data ------------*/
/*------------------------------------*/
// filter data based on category (tabs) - my suite table
export const handleTabChange = (
  value: CategoryType,
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  dispatch: AppDispatch,
) => {
  e.stopPropagation();
  dispatch(changeCategory(value));
};
// handle sort
export const handleSortChange = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  value: string,
  dispatch: AppDispatch,
) => {
  e.stopPropagation();
  dispatch(rowSort(value));
};
// show each row data
export const handleRowExpand = (id: string, dispatch: AppDispatch) => {
  dispatch(rowExpanded(id));
};
/* 
  row toggle for close/open details 
*/
export const handleRowToggle = (
  e: React.ChangeEvent<HTMLInputElement>,
  id: string,
  dispatch: AppDispatch,
) => {
  e.stopPropagation();
  dispatch(rowToggle(id));
};

// for different action in action required tab
const handleAction = (id: string, category: string, dispatch: AppDispatch) => {
  if (category === "Action Required") {
    dispatch(openModal(id));
  } else {
    handleRowExpand(id, dispatch);
  }
};
// check visibility table body td based on header table
const isVisible = (key: string, category: string) =>
  COLUMNS.find((item) => item.key === key && item.tabs.includes(category));
// modal close handler
const handleCloseModal = (dispatch: AppDispatch) => {
  dispatch(closeModal());
};

// const someChecked =
//   sortedData.some((r) => rowChecked[r.packageId]) && !allChecked;
// all row is checked
const allChecked = (
  sortedData: TableRow[] | undefined,
  rowChecked: Record<string, boolean>,
) =>
  sortedData &&
  sortedData.length > 0 &&
  sortedData.every((r) => rowChecked[r.packageId]);

const toggleAll = (
  dispatch: AppDispatch,
  sortedData: TableRow[] | undefined,
  rowChecked: Record<string, boolean>,
) => {
  if (!sortedData) return;
  const result = allChecked(sortedData, rowChecked);

  if (result) {
    dispatch(rowReset());
  } else {
    // you'll want a proper rowCheckAll action here, see below
    dispatch(rowCheckAll(sortedData));
  }
};

// use in my suite side bar
const calculateData = (sortedData: TableRow[]) => {
  // item values
  let itemValues: string | number = sortedData.reduce(
    (acc, cur) => acc + +cur.itemValues,
    0,
  );
  // total weight
  let totalWeight: string | number = sortedData.reduce(
    (acc, cur) => acc + +cur.weight,
    0,
  );
  // sub total = 10% + shipping cost
  let subTotal: string | number = itemValues + itemValues * 0.1 + 8;
  subTotal = "$ " + subTotal;
  //combine
  itemValues = "$ " + itemValues;
  totalWeight = totalWeight + "  Ibs";

  return { itemValues, totalWeight, subTotal };
};

export {
  toggleAll,
  allChecked,
  isVisible,
  handleCloseModal,
  handleAction,
  calculateData,
};
