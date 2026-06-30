import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(handler: () => void) => {
  const domeNode = useRef<T | null>(null);
  useEffect(() => {
    const maybeHandler = (e: globalThis.MouseEvent) => {
      if (!domeNode.current?.contains(e.target as HTMLElement)) {
        handler();
      }
    };
    document.addEventListener("mousedown", (event) => maybeHandler(event));
    return () => {
      document.removeEventListener("mousedown", (event) => maybeHandler(event));
    };
  });
  return domeNode;
};

export default useClickOutside;
