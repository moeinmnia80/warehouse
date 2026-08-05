import { ChevronDown } from "lucide-react";
import { cn, useClickOutside } from "@/shared";
import {
  useRef,
  useState,
  useContext,
  createContext,
  type ComponentProps,
} from "react";

export interface SelectOption {
  id: string | number;
  label: string;
  value?: string | number;
}
interface SelectContextProps {
  isOpen: boolean;
  defaultValue: SelectOption;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: SelectOption;
  setSelected: React.Dispatch<React.SetStateAction<SelectOption>>;
}

interface SelectProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  defaultValue: SelectOption;
}

const SelectContext = createContext({} as SelectContextProps);

export const Select = ({
  children,
  className,
  defaultValue,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const domeNodeRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({ dropdownRef: domeNodeRef, setState: setIsOpen });

  return (
    <SelectContext
      value={{
        isOpen,
        setIsOpen,
        selected,
        setSelected,
        defaultValue,
      }}
    >
      <div ref={domeNodeRef} className={cn("relative", className)} {...props}>
        {children}
      </div>
    </SelectContext>
  );
};

interface SelectButtonProps extends Omit<ComponentProps<"div">, "onReset"> {
  onReset?: () => void;
  maxCharShow?: string;
}

export const SelectButton = ({
  onClick,
  onReset,
  className,
  maxCharShow = "max-w-45",
  ...props
}: SelectButtonProps) => {
  const { isOpen, setIsOpen, selected, setSelected, defaultValue } =
    useContext(SelectContext);

  const openSelectMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(e);
    setIsOpen((prev) => !prev);
  };

  const resetSelectValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    onReset?.();
    setSelected(defaultValue);
  };

  return (
    <div
      onClick={openSelectMenu}
      className={cn("cursor-pointer gap-2", className)}
      {...props}
    >
      <div className="flex justify-between w-full animate-fade-in">
        <span
          className={`uppercase overflow-hidden text-ellipsis whitespace-nowrap ${maxCharShow}`}
        >
          {selected!.label}
        </span>
        <span className={selected?.value ? "opacity-50" : "hidden"}>
          {selected?.value}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={resetSelectValue}
          className={cn(
            "transition duration-200 delay-75",
            `${
              selected.id !== defaultValue.id
                ? "block opacity-30 hover:opacity-50"
                : "hidden"
            }`,
          )}
        >
          Reset
        </button>
        <ChevronDown
          className={`size-3 stroke-st-primary transition duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>
    </div>
  );
};

export const SelectContent = ({
  children,
  className,
  ...props
}: ComponentProps<"ul">) => {
  const { isOpen } = useContext(SelectContext);

  return (
    <ul
      className={cn(
        "absolute top-full z-10 transition duration-200",
        `${isOpen ? "flex flex-col" : "hidden"}`,
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

interface SelectItemsProps extends Omit<ComponentProps<"li">, "onClick"> {
  onClick?: (value: SelectOption) => void;
  option: SelectOption;
}

export const SelectItems = ({
  onClick,
  option,
  children,
  ...props
}: SelectItemsProps) => {
  const { selected, setSelected, setIsOpen } = useContext(SelectContext);

  const isNewOption = (option: SelectOption) => selected.id !== option.id;

  const selectOptionClickHandler = () => {
    onClick?.(option);

    if (isNewOption(option)) {
      setSelected(option);
      setIsOpen(false);
    }
  };
  return (
    <li onClick={selectOptionClickHandler} {...props}>
      {children}
    </li>
  );
};
