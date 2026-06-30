import { create } from "zustand";
import { persist } from "zustand/middleware";
import { areas } from "./shared/constants/areas";
// import { configureStore } from "@reduxjs/toolkit";
import type { AreaType, DataState } from "./shared/types/types";

const initial: AreaType = {
  name: "US",
  desc: "Manage my packages from the US",
  src: "./src/assets/images/flag-1.png",
};

export const useArea = create<DataState>()(
  persist(
    (set) => ({
      isOpen: false,
      areas: areas,
      selectedArea: initial,
      setArea: (data: AreaType) => set({ selectedArea: data }),
      setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "dropdown",
      // just selectedArea save in loc-s
      partialize: (state) => ({ selectedArea: state.selectedArea }),
    },
  ),
);

// RTK
// export const store = configureStore({
//   reducer: {},
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });
