import { create } from "zustand";
import { persist } from "zustand/middleware";
import flag1 from "@/assets/images/flag-1.png";
import { authApi } from "@/feature/auth/index";
import { areas } from "./shared/constants/areas";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/feature/auth/store/authSlice";
import suiteReducer from "@/feature/suite/store/suiteSlice";
import type { AreaType, DataState } from "./shared/types/types";
import shippingReducer from "@/feature/shipping/store/shippingSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

type ToastType = "error" | "success" | "info";

export interface ToastItem {
  id: string;
  text: string;
  type: ToastType;
}

interface ToastState {
  toasts: ToastItem[];
  add: (text: string, type?: ToastType) => string;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (text, type = "info") => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, text, type }], // push -> end of queue
    }));
    return id;
  },
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id), // "shift" out by id
    })),
}));

// Plain functions so you can call toast.error(...) anywhere,
// even outside React components (axios interceptors, utils, etc).
export const toast = {
  error: (text: string) => useToastStore.getState().add(text, "error"),
  success: (text: string) => useToastStore.getState().add(text, "success"),
  info: (text: string) => useToastStore.getState().add(text, "info"),
};
// initialState
const initialArea: AreaType = {
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

// RTK - store
export const store = configureStore({
  reducer: {
    suite: suiteReducer,
    shipping: shippingReducer,
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
