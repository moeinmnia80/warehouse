import { useContext } from "react";
import { ThemeContext } from "@/shared/context/context";

export const useTheme = () => useContext(ThemeContext);
