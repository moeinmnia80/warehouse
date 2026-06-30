import { useArea } from "@/store";
import { useShallow } from "zustand/shallow";
import { type ComponentProps, type FC } from "react";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import type { DropItemType } from "@/shared/types/types";
import TickIcon from "@/assets/icons/TickIcon";

export const DropDown: FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  const data = useArea(useShallow((state) => state.selectedArea));
  const setIsOpen = useArea(useShallow((state) => state.setIsOpen));

  return (
    <>
      <div
        className={`flex w-22 h-11 bg-b-secondary rounded-full cursor-pointer
        relative z-20 ${className}`}
        onClick={() => setIsOpen()}
        {...props}
      >
        <div className="size-11 p-1 rounded-full overflow-hidden">
          <img
            className="size-9 object-cover circle"
            src={data?.src}
            alt={data?.name}
          />
        </div>
        <ChevronIcon className="size-11 p-3 fill-st-primary" />
        {children}
      </div>
    </>
  );
};
export const DropItem: FC<DropItemType> = ({ area, ...props }) => {
  const selectedArea = useArea(useShallow((state) => state.selectedArea));
  const setIsOpen = useArea(useShallow((state) => state.setIsOpen));
  const setArea = useArea(useShallow((state) => state.setArea));

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setArea(area);
    setIsOpen();
  };

  return (
    <>
      <div onClick={(e) => clickHandler(e)} {...props}>
        <div className="size-fit">
          <img
            className="w-6 h-4 object-contain"
            src={area?.src}
            alt={area?.name}
          />
        </div>
        <p className="text-sm text-t-primary font-semibold">{area?.desc}</p>
        <TickIcon
          className={`size-5 ${
            selectedArea.name === area.name ? "stroke-500-base" : "invisible"
          }`}
        />
      </div>
    </>
  );
};
export const DropItemsWrapper: FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  const isOpen = useArea(useShallow((state) => state.isOpen));

  return (
    <div
      className={`${isOpen ? "flex flex-col" : "hidden"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default DropItemsWrapper;
