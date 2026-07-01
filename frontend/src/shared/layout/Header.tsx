import { type FC } from "react";
import type { Props } from "../types/types";
import { useShallow } from "zustand/shallow";
import {
  DropDown,
  DropItem,
  DropItemsWrapper,
} from "../components/ui/DropDown";
import { useArea } from "../../store";
import Logo from "../../assets/icons/Logo";
import ToggleButton from "../components/ui/ToggleButton";

const Header: FC<Props> = (props) => {
  const data = useArea(useShallow((state) => state.areas));
  return (
    <>
      <header {...props}>
        <div className="flex items-center gap-2">
          <Logo className="size-7 fill-st-primary" />
          <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
        </div>
        <div className="flex-center gap-3">
          <DropDown className="">
            <DropItemsWrapper
              className="absolute top-full right-0 
              bg-b-primary rounded-md mt-2
              w-80 p-1 border border-bo-primary"
            >
              {data.map((item) => (
                <DropItem
                  key={item.name}
                  area={item}
                  className="flex items-center justify-between 
                  w-full h-10 px-2 gap-2 rounded-md
                  transition duration-200 
                  hover:bg-light"
                />
              ))}
            </DropItemsWrapper>
          </DropDown>
          <ToggleButton />
        </div>
      </header>
    </>
  );
};

export default Header;
