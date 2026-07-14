import { create } from "zustand";
import { persist } from "zustand/middleware";
import flag1 from "@/assets/images/flag-1.png";
import { type AreaType, type DataState } from "@/shared";

const initialArea: AreaType = {
  name: "US",
  desc: "Manage my packages from the US",
  src: flag1,
  lang: "EN",
};
export const useAreaStore = create<DataState>()(
  persist(
    (set) => ({
      selectedArea: initialArea,
      setArea: (data: AreaType) => set({ selectedArea: data }),
    }),
    {
      name: "dropdown",
      // just selectedArea save in loc-s
      partialize: (state) => ({ selectedArea: state.selectedArea }),
    },
  ),
);
