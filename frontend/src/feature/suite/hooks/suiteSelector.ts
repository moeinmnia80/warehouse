import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store"; // adjust path
import type { TableRow } from "@/shared/types/types";

const selectData = (state: RootState) => state.suite.data;
const selectCategory = (state: RootState) => state.suite.category;
const selectSort = (state: RootState) => state.suite.sort;

// 1. filter by category
export const selectFilteredData = createSelector(
  [selectData, selectCategory],
  (data, category) =>
    category === "View All"
      ? data
      : data.filter((item) => item.status.label === category),
);

// 2. sort the filtered result
export const selectSortedData = createSelector(
  [selectFilteredData, selectSort],
  (filteredData, sort) => {
    if (!sort.key) return filteredData;
    const key = sort.key as keyof TableRow;
    const arr = [...filteredData];

    arr.sort((a, b) => {
      let av: string | number = a[key] as string;
      let bv: string | number = b[key] as string;

      if (key === "itemValues") {
        av = parseFloat((av as string).replace(/[^0-9.]/g, ""));
        bv = parseFloat((bv as string).replace(/[^0-9.]/g, ""));
      } else if (key === "packageId") {
        av = Number((av as string).split("-").pop());
        bv = Number((bv as string).split("-").pop());
      } else if (key === "weight") {
        av = parseFloat(av as string);
        bv = parseFloat(bv as string);
      } else if (key === "dataReceived") {
        av = new Date(av as string).getTime();
        bv = new Date(bv as string).getTime();
      } else if (key === "vendor") {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      } else {
        return 0;
      }

      if (av < bv) return sort.type === "asc" ? -1 : 1;
      if (av > bv) return sort.type === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  },
);
