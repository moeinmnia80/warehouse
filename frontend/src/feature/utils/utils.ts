import { RAW_DATA } from "@/shared/constants/table";
import type { ReducerProps } from "@/shared/hooks/useTable";

//
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
// for tab items count
const required = RAW_DATA.filter(
  (item) => item.status.label === "Action Required",
);
const review = RAW_DATA.filter((item) => item.status.label === "In Review");
const ready = RAW_DATA.filter((item) => item.status.label === "Ready to Send");
//
export const tabStatus = [
  RAW_DATA.length,
  required.length,
  review.length,
  ready.length,
];
/* Table Data */
// filter data based on status
export const handleTabChange = (
  value: string,
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  dispatch: React.ActionDispatch<[action: ReducerProps]>,
) => {
  e.stopPropagation();
  dispatch({ type: "ROW_CATEGORY", payload: value });
};
// handle sort
export const handleSortChange = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  value: string,
  dispatch: React.ActionDispatch<[action: ReducerProps]>,
) => {
  e.stopPropagation();
  dispatch({ type: "ROW_SORT", payload: value });
};
// show each row data
export const handleRowExpand = (
  id: string,
  dispatch: React.ActionDispatch<[action: ReducerProps]>,
) => {
  dispatch({ type: "ROW_EXPANDED", payload: id });
};
// row checked
export const handleRowToggle = (
  e: React.ChangeEvent<HTMLInputElement>,
  id: string,
  dispatch: React.ActionDispatch<[action: ReducerProps]>,
) => {
  e.stopPropagation();
  dispatch({ type: "ROW_TOGGLE", payload: id });
};
