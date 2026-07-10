import InfoIcon from "@/assets/icons/InfoIcon";
import { useEffect, useState } from "react";
import { useToastStore, type ToastItem } from "@/store";

const Toaster = ({ id, text, type }: ToastItem) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const remove = useToastStore((state) => state.remove);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setIsLeaving(true), 2700); // start exit anim
    const removeTimer = setTimeout(() => remove(id), 3000); // then remove from queue
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
      className={`relative flex items-center min-w-85 h-12 bg-b-primary border ${setStyleType()} rounded-lg px-4 transition-all animate-slide-down duration-200 ${
        isLeaving ? " opacity-0" : ""
      }`}
    >
      <InfoIcon className="size-6 stroke-t-primary" strokeWidth={1.5} />
      <p className="text-t-primary text-sm ms-3.5 font-light">{text}</p>
    </div>
  );
};

export default Toaster;
