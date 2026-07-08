import type { AppDispatch } from "@/store";
import { COLUMNS } from "@/shared/constants/table";
import { RAW_DATA } from "@/shared/constants/table";
import type { TableRow } from "@/shared/types/types";
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
// count item in tabs
const required = RAW_DATA.filter(
  (item) => item.status.label === "Action Required",
);
const review = RAW_DATA.filter((item) => item.status.label === "In Review");
const ready = RAW_DATA.filter((item) => item.status.label === "Ready to Send");
// export tab counts
const tabStatus = [
  RAW_DATA.length,
  required.length,
  review.length,
  ready.length,
];
/*------------------------------------*/
/*------------ Table Data ------------*/
/*------------------------------------*/
// filter data based on category (tabs) - my suite table
export const handleTabChange = (
  value: string,
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
  sortedData: TableRow[],
  rowChecked: Record<string, boolean>,
) => sortedData.length > 0 && sortedData.every((r) => rowChecked[r.packageId]);

const toggleAll = (
  dispatch: AppDispatch,
  sortedData: TableRow[],
  rowChecked: Record<string, boolean>,
) => {
  const result = allChecked(sortedData, rowChecked);
  console.log(result);

  if (result) {
    dispatch(rowReset());
  } else {
    // you'll want a proper rowCheckAll action here, see below
    dispatch(rowCheckAll(sortedData));
  }
};

export {
  toggleAll,
  allChecked,
  isVisible,
  handleCloseModal,
  handleAction,
  tabStatus,
};
