import { create } from "zustand";
import type { ToastState } from "@/shared";

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (text, type = "info") => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, text, type }],
    }));
    return id;
  },
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id), // "shift" out by id
    })),
}));

export const toast = {
  info: (text: string) => useToastStore.getState().add(text, "info"),
  error: (text: string) => useToastStore.getState().add(text, "error"),
  success: (text: string) => useToastStore.getState().add(text, "success"),
};
