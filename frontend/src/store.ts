import { create } from "zustand";
import { persist } from "zustand/middleware";
import flag1 from "@/assets/images/flag-1.png";
import { areas } from "./shared/constants/areas";
import { configureStore } from "@reduxjs/toolkit";
import type { AreaType, DataState } from "./shared/types/types";
import suiteReducer from "@/feature/suite/store/suiteSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
// initialState
const initial: AreaType = {
  name: "US",
  desc: "Manage my packages from the US",
  src: flag1,
  lang: "EN",
};
// store
export const useArea = create<DataState>()(
  persist(
    (set) => ({
      areas: areas,
      selectedArea: initial,
      setArea: (data: AreaType) => set({ selectedArea: data }),
    }),
    {
      name: "dropdown",
      // just selectedArea save in loc-s
      partialize: (state) => ({ selectedArea: state.selectedArea }),
    },
  ),
);

// RTK - store
export const store = configureStore({
  reducer: {
    suite: suiteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
