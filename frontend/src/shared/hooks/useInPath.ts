import { useLocation } from "react-router";

export const useInPath = (checkPath: string) => {
  const location = useLocation();
  return location.pathname.startsWith(checkPath);
};
