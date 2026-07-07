import { useEffect } from "react";

export const useOverflow = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    // cleanup: always restore on close or unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
};
