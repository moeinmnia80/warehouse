import { InfoIcon } from "@/assets/index";
import { useEffect, useState } from "react";
import type { ToastItem } from "@/shared/index";
import { useToastStore } from "@/store/toast.store";

export const Toaster = ({ id, text, type }: ToastItem) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const remove = useToastStore((state) => state.remove);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setIsLeaving(true), 3000); // start exit anim
    const removeTimer = setTimeout(() => remove(id), 3300); // then remove from queue
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, [id, remove]);
  const setStyleType = () =>
    type === "info"
      ? "border-bo-primary"
      : type === "error"
        ? "border-error-125"
        : "border-success-125";

  return (
    <div
      className={`relative flex items-center min-w-90 h-11 bg-b-primary border ${setStyleType()} rounded-lg px-4 transition-all animate-slide-up duration-200 ${
        isLeaving ? " opacity-0" : ""
      }`}
    >
      <InfoIcon className="size-6 stroke-t-primary" strokeWidth={1.5} />
      <p className="text-t-primary text-sm ms-3.5 font-light">{text}</p>
    </div>
  );
};
