import useClickOutside from "@/shared/hooks/useClickOutside";
import {
  useRef,
  useState,
  useContext,
  createContext,
  useLayoutEffect,
  type ComponentProps,
} from "react";

type Side = "top" | "bottom";
type Align = "left" | "right";

interface DropdownContextType {
  on: boolean;
  handleToggler: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  side: Side;
  align: Align;
  setPlacement: (side: Side, align: Align) => void;
}

const DropDownContext = createContext({} as DropdownContextType);
//--------------------------------------------------------------
//1-————— Dropdown ————————————————————————————————————————————
//--------------------------------------------------------------

export const Dropdown = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  const [on, setOn] = useState(false);
  const [side, setSide] = useState<Side>("bottom");
  const [align, setAlign] = useState<Align>("left");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const domNode = useRef<HTMLDivElement>(null);

  useClickOutside({ dropdownRef: domNode, setState: setOn });

  const handleToggler = () => setOn((prev) => !prev);
  const setPlacement = (nextSide: Side, nextAlign: Align) => {
    setSide(nextSide);
    setAlign(nextAlign);
  };

  return (
    <DropDownContext
      value={{ on, handleToggler, triggerRef, side, align, setPlacement }}
    >
      <div
        className={`relative ${className ? className : ""}`}
        {...props}
        ref={domNode}
      >
        {children}
      </div>
    </DropDownContext>
  );
};
//----------------------------------------------------------------
//2-————— Dropdown Button ————————————————————————————————————————
//----------------------------------------------------------------
interface DropdownButtonProps extends Omit<
  ComponentProps<"button">,
  "onClick"
> {
  onClick?: (on?: boolean) => void;
}

export const DropdownButton = ({
  onClick,
  children,
  ...props
}: DropdownButtonProps) => {
  const { on, handleToggler, triggerRef } = useContext(DropDownContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleToggler();
    onClick?.(on);
  };

  return (
    <button ref={triggerRef} {...props} onClick={handleClick}>
      {children}
    </button>
  );
};
//----------------------------------------------------------------
//3-————— Dropdown Content ———————————————————————————————————————
//----------------------------------------------------------------

const EDGE_PADDING = 8;

export const DropdownContent = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  const { on, triggerRef, side, align, setPlacement } =
    useContext(DropDownContext);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!on || !contentRef.current || !triggerRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const content = contentRef.current.getBoundingClientRect();

    const { innerWidth, innerHeight } = window;

    const spaceBelow = innerHeight - trigger.bottom;
    const spaceAbove = trigger.top;
    const nextSide: Side =
      spaceBelow < content.height + EDGE_PADDING && spaceAbove > spaceBelow
        ? "top"
        : "bottom";

    const spaceRight = innerWidth - trigger.left;
    const nextAlign: Align =
      spaceRight < content.width + EDGE_PADDING ? "right" : "left";

    if (nextSide !== side || nextAlign !== align) {
      setPlacement(nextSide, nextAlign);
    }
  }, [on]);

  if (!on) return null;

  const positionStyle = `absolute 
      ${side === "bottom" ? "top-full" : "bottom-full"}
      ${align === "left" ? "left-0" : "right-0"}`;

  return (
    <div
      ref={contentRef}
      data-side={side}
      data-align={align}
      className={`${positionStyle} ${className ? className : ""} z-50`}
      {...props}
    >
      {children}
    </div>
  );
};
//----------------------------------------------------------------
//4-————— Dropdown Label ————————————————————————————————————————
//----------------------------------------------------------------
export const DropdownLabel = ({
  children,
  ...props
}: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};
//-------------------------------------------------------------
//5-————— Dropdown Item ————————————————————————————————————————
//-------------------------------------------------------------
interface DropdownItemProps extends Omit<ComponentProps<"div">, "onClick"> {
  /* custom handleClick with on (open/close:boolean) value */
  onClick?: (on?: boolean) => void;
  /* when item selected */
  isActive?: string;
}
export const DropdownItem = ({
  className,
  onClick,
  isActive,
  children,
  ...props
}: DropdownItemProps) => {
  const { on, handleToggler } = useContext(DropDownContext);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    handleToggler();
    onClick?.(on);
  };
  return (
    <div
      className={`transition duration-200 cursor-pointer ${className} ${isActive}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};
//----------------------------------------------------------------
//6-————— Dropdown Separator —————————————————————————————————————
//----------------------------------------------------------------

export const DropdownSeparator = ({
  children,
  ...props
}: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};
