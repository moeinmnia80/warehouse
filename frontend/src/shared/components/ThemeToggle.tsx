import { DarkIcon, LightIcon } from "@/assets";
import { Toggle, ToggleButton, ToggleLabel, useTheme } from "@/shared/index";
export const ThemeToggle = () => {
  const { theme, themeToggler } = useTheme();
  return (
    <Toggle className="relative flex w-22 h-11 bg-b-third rounded-full">
      <ToggleButton onClick={themeToggler} className="flex">
        <ToggleLabel
          className={`absolute top-1 left-1 bg-b-muted size-9 rounded-full transition duration-200 ${theme === "dark" ? "translate-x-0" : "translate-x-11"}`}
        />
        <DarkIcon className="z-10 size-11 p-3 fill-st-primary" />
        <LightIcon className="z-10 size-11 p-3 fill-st-primary" />
      </ToggleButton>
    </Toggle>
  );
};
