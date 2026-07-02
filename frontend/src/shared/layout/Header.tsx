import { type FC } from "react";
import { useArea } from "@/store";
import Logo from "@/assets/icons/Logo";
import { useShallow } from "zustand/shallow";
import TickIcon from "@/assets/icons/TickIcon";
import { checkPath } from "@/shared/utils/utils";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import { Button } from "@/shared/components/ui/Button";
import { Dropdown } from "@/shared/components/ui/DropDown";
import { ToggleButton, ToggleLabel } from "@/shared/components/ui/Toggle";
import type { AreaType, HeaderProps } from "@/shared/types/types";
import { Toggle } from "../components/ui/Toggle";
import DarkIcon from "@/assets/icons/DarkIcon";
import LightIcon from "@/assets/icons/LightIcon";
import { useTheme } from "../hooks/useTheme";

const Header: FC<HeaderProps> = (props) => {
  const { theme, themeToggler } = useTheme();
  const areas = useArea(useShallow((state) => state.areas));
  const setArea = useArea(useShallow((state) => state.setArea));
  const selectedArea = useArea(useShallow((state) => state.selectedArea));

  const isShow = checkPath("/dashboard");

  return (
    <>
      <header {...props}>
        <div className="flex items-center gap-2 animate-scale-in">
          <Logo className="size-7 fill-st-primary" />
          <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
        </div>
        {isShow && (
          <ul className="flex gap-10">
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              My Suit
            </li>
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              Shipping History
            </li>
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              Help
            </li>
            <li className="cursor-pointer text-t-secondary text-lg font-medium">
              Contact Us
            </li>
          </ul>
        )}
        <div className="flex-center gap-4">
          {isShow && (
            <Button className="btn btn--border w-32 h-10">
              Log Out
              <LogoutIcon className="size-4 fill-st-primary ml-1" />
            </Button>
          )}
          <Dropdown
            data={areas}
            value={selectedArea}
            onChange={setArea}
            getKey={(area) => area.name}
            valueClass={` ${isShow ? "bg-b-primary border border-bo-primary" : "bg-b-third"} 
            rounded-full h-11 flex items-center `}
            renderValue={() => (
              <>
                <div className="size-fit p-2">
                  <img
                    className={`size-7 ${isShow ? "object-contain ml-2" : "rounded-full object-cover"}`}
                    src={selectedArea?.src}
                    alt={selectedArea?.name}
                  />
                </div>
                {isShow && (
                  <p className="text-sm font-bold text-t-primary ml-2">
                    {selectedArea.desc}
                  </p>
                )}
              </>
            )}
            itemClass="top-full right-0 w-80 
            bg-b-primary mt-2  p-1 
            border border-bo-primary rounded-md"
            renderItem={(area: AreaType) => (
              <>
                <div className="size-fit">
                  <img
                    className="w-6 h-4 object-contain"
                    src={area.src}
                    alt={area.name}
                  />
                </div>
                <p className="text-md text-t-primary font-semibold">
                  {area.desc}
                </p>
                <TickIcon
                  className={`size-5 ${
                    area.name === area.name ? "stroke-st-primary" : "invisible"
                  }`}
                />
              </>
            )}
          />

          {!isShow ? (
            <Toggle className="relative flex w-22 h-11 bg-b-third rounded-full">
              <ToggleButton onClick={themeToggler} className="flex">
                <ToggleLabel
                  isActive={`${theme === "dark" ? "translate-x-0" : "translate-x-11"}`}
                  className="absolute top-1 left-1 bg-b-muted size-9 rounded-full transition duration-200"
                />
                <DarkIcon className="z-10 size-11 p-3 fill-st-primary" />
                <LightIcon className="z-10 size-11 p-3 fill-st-primary" />
              </ToggleButton>
            </Toggle>
          ) : (
            <>
              <span className="w-px h-8 bg-bo-primary"></span>
              <Button className="flex justify-between w-26 ">
                <div className="text-left">
                  <h3 className="text-xs font-bold text-t-primary">
                    Bryan Adams
                  </h3>
                  <p className="text-xs font-bold  text-t-placeholder">
                    Manager
                  </p>
                </div>
                <ChevronIcon className="size-4 stroke-st-primary" />
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
