import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Package } from "@/shared";

import {
  type DateRange,
  type SortState,
  type DatePreset,
  type ShippingState,
  getRangeFromPreset,
  loadInitialState,
} from "@/feature/shipping";

const initialState: ShippingState = {
  search: "",
  sort: { key: null, type: "asc" },
  modal: false,
  rowChecked: {},
  dateFilter: {
    preset: null,
    range: getRangeFromPreset(null),
  },
  requestPackages: loadInitialState("request_packages", []),
};

const shippingSlice = createSlice({
  name: "shippingSlice",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },

    setDatePreset: (state, action: PayloadAction<DatePreset>) => {
      state.dateFilter.preset = action.payload;
      state.dateFilter.range = getRangeFromPreset(action.payload);
    },

    setCustomDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateFilter.preset = "custom";
      state.dateFilter.range = action.payload;
    },

    setRequestPackage: (state, action: PayloadAction<Package[]>) => {
      state.requestPackages = action.payload;
    },

    rowReset: (state) => {
      state.rowChecked = {};
    },

    rowToggle: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.rowChecked = { ...state.rowChecked, [id]: !state.rowChecked[id] };
    },

    rowCheckAll: (state, action: PayloadAction<Package[]>) => {
      const checked: Record<string, boolean> = {};
      action.payload.forEach((item) => {
        checked[item.packageId] = true;
      });
      state.rowChecked = checked;
    },

    modalToggler: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },

    resetDateFilter: (state) => {
      state.dateFilter = initialState.dateFilter;
    },
  },
});

export default shippingSlice.reducer;
export const {
  setSort,
  rowReset,
  rowToggle,
  setSearch,
  rowCheckAll,
  modalToggler,
  setDatePreset,
  resetDateFilter,
  setRequestPackage,
  setCustomDateRange,
} = shippingSlice.actions;
