import { changeTheme, themeCheck } from "../utils/theme";
import type { contextType, Props } from "../types/types";
import { createContext, useEffect, useState, type FC } from "react";

const ThemeContext = createContext({} as contextType);

const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<string>(themeCheck());

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const themeToggler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <ThemeContext value={{ theme, themeToggler }}>{children}</ThemeContext>
  );
};

export { ThemeContext };
export default ThemeProvider;
