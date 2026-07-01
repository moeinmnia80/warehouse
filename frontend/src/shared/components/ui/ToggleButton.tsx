import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import LightIcon from "../../../assets/icons/LightIcon";
import DarkIcon from "../../../assets/icons/DarkIcon";

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
       bg-b-third rounded-full"
      >
        <span
          className={`absolute left-1 top-1 
          inline-block h-9 aspect-square transition duration-300
          bg-b-muted rounded-full ${status === "dark" ? "translate-x-11" : "translate-x-0"}`}
        ></span>
        <LightIcon className="z-10 size-11 p-3 fill-st-primary" />
        <DarkIcon className="z-10 size-11 p-3.5 fill-st-primary" />
      </div>
    </>
  );
}

export default ToggleButton;
