import { changeTheme, themeCheck } from "@/shared/utils/theme.utils";
import type { contextType } from "@/shared/types/types";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ComponentProps,
} from "react";

const ThemeContext = createContext({} as contextType);

const ThemeProvider = ({ children }: ComponentProps<"div">) => {
  const [theme, setTheme] = useState<string>(themeCheck());
  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const themeToggler = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext value={{ theme, themeToggler }}>{children}</ThemeContext>
  );
};

export { ThemeContext };
export default ThemeProvider;
