import DarkIcon from "@/assets/icons/DarkIcon";
import LightIcon from "@/assets/icons/LightIcon";
import { useTheme } from "@/shared/hooks/useTheme";
import { useState } from "react";

function ToggleButton() {
  const { theme, themeToggler } = useTheme();
  const [status, setStatus] = useState(theme);

  const changeTheme = () => {
    themeToggler();
    setStatus(theme === "dark" ? "light" : "dark");
  };
  return (
    <>
      <div
        onClick={() => changeTheme()}
        className="relative flex w-22 h-11
       bg-b-secondary rounded-full"
      >
        <span
          className={`absolute left-1 top-1 
          inline-block h-9 aspect-square transition duration-300
          bg-b-primary rounded-full ${status === "dark" ? "translate-x-11" : "translate-x-0"}`}
        ></span>
        <LightIcon className="z-10 size-11 p-3 fill-st-primary" />
        <DarkIcon className="z-10 size-11 p-3.5 fill-st-primary" />
      </div>
    </>
  );
}

export default ToggleButton;
