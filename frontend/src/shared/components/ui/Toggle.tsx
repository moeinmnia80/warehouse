import {
  useState,
  useContext,
  createContext,
  type ComponentProps,
  type ComponentPropsWithoutRef,
} from "react";
//---------------------------------------------------------------
//1-————— Toggle Context ————————————————————————————————————————
//---------------------------------------------------------------

/**
 * A button that toggles between on/off state.
 * Must be used inside a <Toggle> provider.
 */
interface ToggleContextValue {
  on: boolean;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
}

//---------------------------------------------------------------
// ————— Toggle Context —————————————————————————————————————————
//---------------------------------------------------------------
const ToggleContext = createContext({} as ToggleContextValue);
//---------------------------------------------------------------
//2-————— Toggle Components —————————————————————————————————————
//---------------------------------------------------------------

export const Toggle = ({ children, ...props }: ComponentProps<"div">) => {
  const [on, setOn] = useState(false);

  return (
    <ToggleContext value={{ on, setOn }}>
      <div {...props}>{children}</div>
    </ToggleContext>
  );
};
//---------------------------------------------------------------
//3-————— Toggle Button —————————————————————————————————————————
//---------------------------------------------------------------
interface ToggleButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "onClick"
> {
  /** set custom dev onClick. */
  onClick?: () => void;
}

export const ToggleButton = ({
  onClick,
  className,
  children,
  ...props
}: ToggleButtonProps) => {
  const { setOn } = useContext(ToggleContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOn((prev) => !prev);
    onClick?.();
  };
  return (
    <button onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
};
// ------------------------------------------------------------
//4-————— Toggle Label ————————————————————————————————————————
// ------------------------------------------------------------
export const ToggleLabel = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"span">) => {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
};
