import type { TableRow } from "@/shared/index";
import type { CategoryType, TableState } from "@/feature/suite/index";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Table initialState
const initialState: TableState = {
  rowChecked: {},
  rowExpanded: {},
  sort: { key: null, type: "asc" },
  category: "View All",
  modal: { open: false, packageId: null },
};
// Slice
const suiteSlice = createSlice({
  name: "suiteSlice",
  initialState: initialState,
  reducers: {
    // row operations
    // check
    rowToggle: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.rowChecked = { ...state.rowChecked, [id]: !state.rowChecked[id] };
    },
    // check all row
    rowCheckAll: (state, action: PayloadAction<TableRow[]>) => {
      const checked: Record<string, boolean> = {};
      action.payload.forEach((item) => {
        checked[item.packageId] = true;
      });
      state.rowChecked = checked;
    },
    // reset row state
    rowReset: (state) => {
      state.rowChecked = {};
    },
    rowExpanded: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.rowExpanded = {
        ...state.rowExpanded,
        [id]: !state.rowExpanded[id],
      };
    },
    // change category
    changeCategory: (state, action: PayloadAction<CategoryType>) => {
      /* close row when change category */
      state.rowExpanded = {};
      state.category = action.payload;
    },
    // sort data based on key
    rowSort: (state, action: PayloadAction<string>) => {
      if (state.sort.key !== action.payload) {
        state.sort = {
          key: action.payload,
          type: "asc",
        };
      } else if (state.sort.type === "asc") {
        state.sort = {
          key: action.payload,
          type: "desc",
        };
      } else {
        state.sort = {
          key: null,
          type: "asc",
        };
      }
    },
    // Modal Handle
    openModal: (state, action: PayloadAction<string | null>) => {
      state.modal = { open: !state.modal.open, packageId: action.payload };
    },
    closeModal: (state) => {
      state.modal = { open: false, packageId: null };
    },
  },
});

// export for use in store
export default suiteSlice.reducer;
// use in components
export const {
  rowToggle,
  rowCheckAll,
  rowReset,
  rowExpanded,
  changeCategory,
  rowSort,
  closeModal,
  openModal,
} = suiteSlice.actions;
