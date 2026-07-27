import { useEffect } from "react";

interface UseClickOutSideProps {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useClickOutside = ({
  dropdownRef,
  setState,
}: UseClickOutSideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
};
