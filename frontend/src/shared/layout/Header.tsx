import { type ComponentProps } from "react";
import { useArea } from "@/store";
import Logo from "@/assets/icons/Logo";
import Image from "../components/ui/Image";
import { useTheme } from "../hooks/useTheme";
import { useShallow } from "zustand/shallow";
import TickIcon from "@/assets/icons/TickIcon";
import DarkIcon from "@/assets/icons/DarkIcon";
import LightIcon from "@/assets/icons/LightIcon";
import { checkPath } from "@/shared/utils/utils";
import { Toggle } from "../components/ui/Toggle";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import { Button } from "@/shared/components/ui/Button";
import { ToggleButton, ToggleLabel } from "@/shared/components/ui/Toggle";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
} from "@/shared/components/ui/DropDown";

const Header = (props: ComponentProps<"header">) => {
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
          <ul className="hidden gap-10 lg:flex">
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
          <Dropdown
            className={`hidden w-fit min-w-22 h-11 rounded-full xl:flex items-center justify-center ${isShow ? "bg-b-primary border border-bo-primary" : "bg-b-third"}`}
          >
            <DropdownButton className="w-full flex-between p-2 px-3">
              <Image
                src={selectedArea?.src}
                alt={selectedArea?.name}
                className="w-6 h-4 object-contain"
              />
              {isShow && (
                <p className="text-sm font-bold text-t-primary mx-2">
                  {selectedArea.desc}
                </p>
              )}
              <ChevronIcon className="size-4 fill-st-primary" />
            </DropdownButton>
            <DropdownContent
              className={`flex flex-col gap-1 items-center mt-2 rounded-xl p-1 animate-fade-in ${isShow ? "bg-b-primary border border-bo-primary" : "bg-b-third"}`}
            >
              {areas.map((item) => (
                <DropdownItem
                  onClick={() => setArea(item)}
                  className={`flex-between w-77 h-11 rounded-xl px-2 hover:bg-b-secondary
                  ${selectedArea.name === item.name ? "bg-b-secondary" : ""}`}
                  key={item.name}
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    className="w-6 h-4 object-contain"
                  />
                  <p className="text-md text-t-primary font-semibold">
                    {item.desc}
                  </p>
                  <TickIcon
                    className={`size-5 ${
                      item.name === selectedArea.name
                        ? "stroke-st-primary"
                        : "invisible"
                    }`}
                  />
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          {!isShow ? (
            <Toggle className="relative flex w-22 h-11 bg-b-third rounded-full">
              <ToggleButton onClick={themeToggler} className="flex">
                <ToggleLabel
                  className={`absolute top-1 left-1 bg-b-muted size-9 rounded-full transition duration-200 ${theme === "dark" ? "translate-x-0" : "translate-x-11"}`}
                />
                <DarkIcon className="z-10 size-11 p-3 fill-st-primary" />
                <LightIcon className="z-10 size-11 p-3 fill-st-primary" />
              </ToggleButton>
            </Toggle>
          ) : (
            <>
              <Dropdown>
                <DropdownButton className="flex-between w-18 xl:w-24 shrink-0">
                  <div className="text-left">
                    <h3 className="text-sm xl:text-xs font-bold text-t-primary">
                      Bryan Adams
                    </h3>
                    <p className="text-sm xl:text-xs font-bold  text-t-placeholder">
                      Manager
                    </p>
                  </div>
                  <ChevronIcon className="size-4 fill-st-primary" />
                </DropdownButton>
                <DropdownContent className="bg-b-primary border border-bo-primary rounded-md p-1 mt-2 animate-fade-in">
                  <DropdownItem>
                    <Button className="btn text-sm w-32 h-10 rounded-md transition duration-200 hover:bg-b-secondary ">
                      Log Out
                      <LogoutIcon className="size-4 fill-st-primary ml-2" />
                    </Button>
                  </DropdownItem>
                  <DropdownItem>
                    <Button className="btn text-sm w-32 h-10 rounded-md transition duration-200 hover:bg-b-secondary">
                      Settings
                    </Button>
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
