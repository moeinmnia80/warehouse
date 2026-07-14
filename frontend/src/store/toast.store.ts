import { create } from "zustand";
import type { ToastState } from "@/shared";

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (text, type = "info") => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, text, type }], // push -> end of queue
    }));
    // if (duration) setTimeout(() => get().remove(id), duration);
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
  info: (text: string) => useToastStore.getState().add(text, "info"),
  error: (text: string) => useToastStore.getState().add(text, "error"),
  success: (text: string) => useToastStore.getState().add(text, "success"),
};
