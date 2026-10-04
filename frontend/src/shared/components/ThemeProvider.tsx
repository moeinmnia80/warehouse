import { useEffect, useState, type ComponentProps } from "react";

import { changeTheme, themeCheck, ThemeContext } from "@/shared";

export const ThemeProvider = ({ children }: ComponentProps<"div">) => {
  const [theme, setTheme] = useState<string>(themeCheck);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const themeToggler = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const value = { theme, themeToggler };

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
