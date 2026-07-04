import { useEffect } from "react";

/* useClickOutSide arguments type */
interface UseClickOutSideProps {
  /* element - event occurred */
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  /* components state management */
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const useClickOutside = ({ dropdownRef, setState }: UseClickOutSideProps) => {
  /* side-effect control - event listener */
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
    // cleanup eventlistener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
};

export default useClickOutside;
