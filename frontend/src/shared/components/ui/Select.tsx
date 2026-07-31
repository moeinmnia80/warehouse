import { ChevronDown } from "lucide-react";
import { cn, useClickOutside } from "@/shared";
import {
  useRef,
  useState,
  useContext,
  createContext,
  type ComponentProps,
} from "react";

interface SelectContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string | number | null;
  setSelectedValue: React.Dispatch<
    React.SetStateAction<string | number | null>
  >;
  defaultValue: string | number;
}

interface SelectProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  defaultValue: string | number;
}

const SelectContext = createContext({} as SelectContextProps);

export const Select = ({
  children,
  className,
  defaultValue = "select",
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || null);

  const domeNodeRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({ dropdownRef: domeNodeRef, setState: setIsOpen });

  return (
    <SelectContext
      value={{
        isOpen,
        setIsOpen,
        selectedValue,
        setSelectedValue,
        defaultValue,
      }}
    >
      <div ref={domeNodeRef} className={cn("relative", className)} {...props}>
        {children}
      </div>
    </SelectContext>
  );
};

export const SelectButton = ({
  onClick,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { isOpen, setIsOpen, selectedValue, setSelectedValue, defaultValue } =
    useContext(SelectContext);

  const openSelectMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(e);
    setIsOpen((prev) => !prev);
  };

  const resetSelectValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setSelectedValue(defaultValue);
  };

  return (
    <div
      onClick={openSelectMenu}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      <span className="animate-fade-in">{selectedValue}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={resetSelectValue}
          className={cn(
            "transition duration-200 delay-75",
            `${
              selectedValue !== defaultValue
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
  onClick?: (value: string | number) => void;
}

export const SelectItems = ({
  onClick,
  children,
  ...props
}: SelectItemsProps) => {
  const { setSelectedValue, setIsOpen } = useContext(SelectContext);

  const selectOptionClickHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const value = (e.target as HTMLLIElement).value;

    setSelectedValue(value);
    setIsOpen((prev) => !prev);

    onClick?.(value);
  };
  return (
    <li onClick={selectOptionClickHandler} {...props}>
      {children}
    </li>
  );
};
