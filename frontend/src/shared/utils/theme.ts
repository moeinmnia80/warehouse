export const themeCheck = (): string => {
  if (typeof window !== "undefined") {
    if (localStorage.theme) return localStorage.theme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
};

export const changeTheme = (theme: string) => {
  const root = window.document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
};
