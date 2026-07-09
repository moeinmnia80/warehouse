import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getRangeFromPreset } from "@/feature/shipping/utils/utils";

// ---- Types ----------------------------------------------------

export type DatePreset = "30d" | "60d" | "90d" | "1y" | "custom" | null;
export interface DateRange {
  from: string | null; // ISO string, e.g. "2026-06-08T10:00:00.000Z"
  to: string | null;
}
interface SortState {
  key: string | null;
  type: "asc" | "desc";
}
interface ShippingState {
  search: string;
  sort: SortState;
  dateFilter: {
    preset: DatePreset;
    range: DateRange;
  };
}
// ---- Initial state ---------------
const initialState: ShippingState = {
  search: "",
  sort: { key: null, type: "asc" },
  dateFilter: {
    preset: null,
    range: { from: null, to: null },
  },
};

// create slice for shipping data mutation
const shippingSlice = createSlice({
  name: "shippingSlice",
  initialState,
  reducers: {
    // set search value for filtering
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    // set sort config for table
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },

    // user clicked a preset button ("30d" | "60d" | "90d" | "1y")
    setDatePreset: (state, action: PayloadAction<DatePreset>) => {
      state.dateFilter.preset = action.payload;
      state.dateFilter.range = getRangeFromPreset(action.payload);
    },

    // user picked a manual custom range
    setCustomDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateFilter.preset = "custom";
      state.dateFilter.range = action.payload;
    },

    // clear the date filter entirely
    resetDateFilter: (state) => {
      state.dateFilter = initialState.dateFilter;
    },
  },
});

// export reducer for connect with provider
export default shippingSlice.reducer;
// export actions for use them in project
export const {
  resetDateFilter,
  setCustomDateRange,
  setDatePreset,
  setSearch,
  setSort,
} = shippingSlice.actions;
