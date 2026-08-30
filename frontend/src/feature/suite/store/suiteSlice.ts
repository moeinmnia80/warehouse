import type { CategoryType, SuiteTableState } from "@/feature/suite/index";
import type { Package } from "@/shared";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: SuiteTableState = {
  rowChecked: {},
  rowExpanded: {},
  sort: { key: null, type: "asc" },
  category: "view all",
  modal: { open: false, packageId: null },
};

const suiteSlice = createSlice({
  name: "suiteSlice",
  initialState: initialState,
  reducers: {
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

    changeCategory: (state, action: PayloadAction<CategoryType>) => {
      state.rowExpanded = {};
      state.category = action.payload;
    },

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
    openModal: (state, action: PayloadAction<string | null>) => {
      state.modal = { open: !state.modal.open, packageId: action.payload };
    },
    closeModal: (state) => {
      state.modal = { open: false, packageId: null };
    },
  },
});

export default suiteSlice.reducer;
export const {
  rowSort,
  rowReset,
  rowToggle,
  openModal,
  closeModal,
  rowExpanded,
  rowCheckAll,
  changeCategory,
} = suiteSlice.actions;
