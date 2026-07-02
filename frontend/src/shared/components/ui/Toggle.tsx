import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

// ————— Toggle Context ————————————————————————————————————————
/**
 * A button that toggles between on/off state.
 * Must be used inside a <Toggle> provider.
 */
interface ToggleContextValue {
  on: boolean;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ToggleButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "onClick"
> {
  /** set custom dev onClick. */
  onClick?: (on: boolean) => void;
  /** set class when is active. */
  isActive?: string;
}
interface ToggleLabelProps extends ComponentPropsWithoutRef<"span"> {
  /** set class when is active. */
  isActive?: string;
}
// ————— Toggle Context ————————————————————————————————————————
const ToggleContext = createContext({} as ToggleContextValue);

// ————— Toggle Components —————————————————————————————————————
export const Toggle: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  ...props
}) => {
  const [on, setOn] = useState(false);

  return (
    <ToggleContext value={{ on, setOn }}>
      <div {...props}>{children}</div>
    </ToggleContext>
  );
};
// ————— Toggle Button ————————————————————————————————————————
export const ToggleButton: FC<ToggleButtonProps> = ({
  onClick,
  className,
  isActive,
  children,
  ...props
}) => {
  const { on, setOn } = useContext(ToggleContext);
  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setOn((prev) => !prev);
    onClick?.(on);
  };
  return (
    <button
      onClick={(event) => clickHandler(event)}
      className={`${className} ${(on && isActive) || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
// ————— Toggle Label ————————————————————————————————————————
export const ToggleLabel: FC<ToggleLabelProps> = ({
  className,
  isActive,
  children,
  ...props
}) => {
  return (
    <span className={`${className} ${isActive}`} {...props}>
      {children}
    </span>
  );
};
