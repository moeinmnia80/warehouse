import { type FC } from "react";
import { useArea } from "../../store";
import Logo from "../../assets/icons/Logo";
import { checkPath } from "../utils/utils";
import { useShallow } from "zustand/shallow";
import type { AreaType, HeaderType } from "../types/types";
import { Button } from "../components/ui/Button";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import ToggleButton from "../components/ui/ToggleButton";
import { Dropdown } from "../components/ui/DropDown";
import TickIcon from "../../assets/icons/TickIcon";
import ChevronIcon from "../../assets/icons/ChevronIcon";

const Header: FC<HeaderType> = (props) => {
  const data = useArea(useShallow((state) => state.areas));
  const area = useArea(useShallow((state) => state.selectedArea));
  const setArea = useArea(useShallow((state) => state.setArea));

  const isShow = checkPath("/dashboard");
  return (
    <>
      <header {...props}>
        <div className="flex items-center gap-2">
          <Logo className="size-7 fill-st-primary" />
          <h2 className="text-2xl font-bold text-st-primary">Markist</h2>
        </div>
        <div className="flex-center gap-4">
          {isShow && (
            <Button className="btn btn--border w-32 h-10">
              Log Out
              <LogoutIcon className="size-4 fill-st-primary ml-1" />
            </Button>
          )}
          <Dropdown
            data={data}
            value={area}
            onChange={setArea}
            getKey={(area: AreaType) => area.name}
            valueClass="bg-b-secondary rounded-full h-11 flex items-center"
            renderValue={() => (
              <>
                <div className="size-fit p-1">
                  <img
                    className={`size-9 ${isShow ? "object-contain ml-2" : "rounded-full object-cover"}`}
                    src={area?.src}
                    alt={area?.name}
                  />
                </div>
                {isShow && (
                  <p className="text-sm font-bold text-t-primary ml-2">
                    {area.desc}
                  </p>
                )}
              </>
            )}
            itemClass="w-80 bg-b-primary mt-2  p-1 
            border border-bo-primary rounded-md"
            renderItem={(area: AreaType) => (
              <>
                <div className="size-fit">
                  <img
                    className="w-6 h-4 object-contain"
                    src={area?.src}
                    alt={area?.name}
                  />
                </div>
                <p className="text-sm text-t-primary font-semibold">
                  {area?.desc}
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
            <ToggleButton />
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
