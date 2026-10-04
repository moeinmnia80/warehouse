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

const ToggleContext = createContext<ToggleContextValue | null>(null);
const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error(
      "Toggle sub-components must be rendered within a Toggle provider",
    );
  }
  return context;
};

export const Toggle = ({ children, ...props }: ComponentProps<"div">) => {
  const [on, setOn] = useState(false);

  return (
    <ToggleContext value={{ on, setOn }}>
      <div data-testid="theme-toggle" {...props}>
        {children}
      </div>
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
  const { on, setOn } = useToggleContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOn((prev) => !prev);
    onClick?.();
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={className}
      onClick={handleClick}
      {...props}
    >
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
    <span data-testid="toggle-label" className={className} {...props}>
      {children}
    </span>
  );
};
