import { useContext } from "react";
import { ThemeContext } from "../context/context";

export const useTheme = () => useContext(ThemeContext);
