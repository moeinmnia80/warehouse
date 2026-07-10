import { useToastStore } from "@/store";
import Toaster from "@/shared/components/Toaster";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-21 left-5 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <Toaster key={t.id} {...t} />
      ))}
    </div>
  );
};

export default ToastContainer;
