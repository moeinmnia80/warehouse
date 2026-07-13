import { changeTheme, themeCheck } from "@/shared/utils/theme.utils";
import type { contextType } from "@/shared/types/types";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ComponentProps,
} from "react";
/* 
  use context for change theme in project as state management 
  (more like system distributed) 
*/
const ThemeContext = createContext({} as contextType);
/* 
  in react 18+ we never use FC because is verbosity for no real gain 
  also we should never use .Provider in parent context element
*/

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
