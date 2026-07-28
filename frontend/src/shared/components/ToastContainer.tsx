import { Toaster } from "@/shared/index";
import { useToastStore } from "@/store/toast.store";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-20 shadow-2xs">
      {toasts.map((t) => (
        <Toaster key={t.id} {...t} />
      ))}
    </div>
  );
};
