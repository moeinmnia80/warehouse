import {
  useState,
  useContext,
  createContext,
  type ComponentProps,
  type ComponentPropsWithoutRef,
} from "react";

interface ToggleContextValue {
  on: boolean;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleContext = createContext({} as ToggleContextValue);

export const Toggle = ({ children, ...props }: ComponentProps<"div">) => {
  const [on, setOn] = useState(false);

  return (
    <ToggleContext value={{ on, setOn }}>
      <div {...props}>{children}</div>
    </ToggleContext>
  );
};

interface ToggleButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "onClick"
> {
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
