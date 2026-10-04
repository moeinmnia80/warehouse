import { createContext, useContext } from "react";

import type { contextType } from "@/shared";

const ThemeContext = createContext<contextType | null>(null);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeContext, useTheme };
