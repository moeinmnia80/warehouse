import { useContext } from "react";
import { ThemeContext } from "@/shared/context/context";

/* 
    instead of each times import useContext and ThemeContext we use this way
    shorthand - reusable - DRY - clean code
*/
export const useTheme = () => useContext(ThemeContext);
