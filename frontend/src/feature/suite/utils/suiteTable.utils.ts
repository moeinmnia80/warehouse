import type { AppDispatch } from "@/store/redux/store";
import { COLUMNS, type TableRow } from "@/shared/index";
import type { CategoryType } from "@/feature/suite/index";
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

/**
 * Maps a human-readable category status to its corresponding internal
 * short-form key, used for styling/lookup (e.g. CSS classes, icon maps).
 *
 * @param status - The category label to map. One of:
 * `"ready to send"`, `"in review"`, `"action required"`, or `"view all"` (default).
 * @returns The short-form key: `"ready"`, `"review"`, or `"required"`.
 * @throws Throws the string `"view all"` if the status doesn't match any
 * known case (including the actual `"view all"` label itself).
 */
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
  /**
   * Switches the active category tab.
   *
   * @param value - The category tab to switch to.
   * @param e - The triggering click event; propagation is stopped so parent
   * row/table click handlers don't also fire.
   */
  changeTab: (
    category: CategoryType,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    dispatch(changeCategory(category));
  },

  /**
   * Applies a new sort order to the table rows.
   *
   * @param value - The sort key/direction to apply.
   * @param e - The triggering click event; propagation is stopped.
   */
  changeSort: (value: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(rowSort(value));
  },

  /**
   * Expands a row to reveal its detail view.
   *
   * @param packageId - The unique identifier of the row/package to expand.
   */
  expandRow: (rowId: string) => {
    dispatch(rowExpanded(rowId));
  },

  /**
   * Toggles a single row's checked/selected state.
   *
   * @param packageId - The unique identifier of the row/package to toggle.
   * @param e - The triggering change event; propagation is stopped.
   */
  toggleRow: (rowId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(rowToggle(rowId));
  },

  /**
   * Closes the currently open modal.
   */
  closeModal: () => {
    dispatch(closeModal());
  },

  /**
   * Toggles the "select all" state for the table: if every row is currently
   * checked, clears all selections; otherwise selects every row.
   *
   * @param sortedData - The currently visible/sorted rows to select or clear.
   * @param rowChecked - Map of packageId -> checked state for all rows.
   */
  toggleAllRows: (
    data: TableRow[] = [],
    rowChecked: Record<string, boolean>,
  ) => {
    dispatch(
      areAllRowsChecked(data, rowChecked) ? rowReset() : rowCheckAll(data),
    );
  },

  /**
   * Determines which action to take for a row depending on its category:
   * opens the review modal for rows needing action, otherwise just expands
   * the row's detail view.
   *
   * @param packageId - The unique identifier of the row/package.
   * @param category - The row's current category (tab).
   * @param dispatch - The Redux dispatch function.
   */
  resolveRowAction: (rowId: string, category: string) => {
    if (category === "Action Required") {
      dispatch(openModal(rowId));
    } else {
      dispatch(rowExpanded(rowId));
    }
  },
});

/**
 * Checks whether a given column should be rendered for the active tab,
 * based on the column's configured `tabs` whitelist.
 *
 * @param key - The column's key.
 * @param category - The currently active tab/category.
 * @returns The matching column config if visible, otherwise `undefined`.
 */
const isColumnVisibleInTab = (key: string, category: string) =>
  COLUMNS.find((item) => item.key === key && item.tabs.includes(category));

/**
 * Checks whether every row in the given data set is currently checked.
 * Pure predicate — does not dispatch anything.
 *
 * @param sortedData - The currently visible/sorted rows.
 * @param rowChecked - Map of packageId -> checked state for all rows.
 * @returns `true` only if there is at least one row and all rows are checked.
 */
const areAllRowsChecked = (
  sortedData: TableRow[] = [],
  rowChecked: Record<string, boolean>,
): boolean =>
  sortedData.length > 0 && sortedData.every((row) => rowChecked[row.packageId]);

// calculate Suite Summary
interface SuiteSummary {
  itemValues: number;
  totalWeight: number;
  subTotal: number;
}

const SHIPPING_COST = 8;
const TAX_RATE = 0.1;
/**
 * Computes raw numeric totals for the "My Suite" sidebar summary: total item
 * value, total weight, and the subtotal (item value + 10% + flat shipping).
 * Returns plain numbers — formatting (currency symbols, units) is left to
 * the presentation layer via `formatCurrency` / `formatWeight`.
 *
 * @param rows - The rows to summarize.
 * @returns An object with `itemValues`, `totalWeight`, and `subTotal`.
 */
const calculateSuiteSummary = (rows: TableRow[]): SuiteSummary => {
  const itemValues = rows.reduce((sum, row) => sum + Number(row.itemValues), 0);
  const totalWeight = rows.reduce((sum, row) => sum + Number(row.weight), 0);
  const subTotal = itemValues + itemValues * TAX_RATE + SHIPPING_COST;

  return { itemValues, totalWeight, subTotal };
};

/**
 * Formats a numeric value as a display currency string.
 *
 * @param value - The raw numeric amount.
 * @returns The value prefixed with a dollar sign, e.g. `"$ 42"`.
 */
const formatCurrency = (value: number) => `$ ${value}`;

/**
 * Formats a numeric value as a display weight string.
 *
 * @param value - The raw numeric weight.
 * @returns The value suffixed with the weight unit, e.g. `"42 lbs"`.
 */
const formatWeight = (value: number) => `${value} lbs`;

export {
  formatWeight,
  formatCurrency,
  areAllRowsChecked,
  isColumnVisibleInTab,
  calculateSuiteSummary,
};
