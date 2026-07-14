import { Toaster } from "@/shared/index";
import { useToastStore } from "@/store/toast.store";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-2 right-2 flex flex-col gap-2 z-20 shadow-2xs">
      {toasts.map((t) => (
        <Toaster key={t.id} {...t} />
      ))}
    </div>
  );
};
