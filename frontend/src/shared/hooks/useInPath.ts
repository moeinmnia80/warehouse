import { useLocation } from "react-router";
/**
 @param {string} checkPath - check the parameters for exist
*/
export const useInPath = (checkPath: string) => {
  const location = useLocation();
  return location.pathname.includes(checkPath);
};
