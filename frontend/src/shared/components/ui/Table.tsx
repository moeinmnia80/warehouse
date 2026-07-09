import { type ComponentProps } from "react";

// ------------------------------------------------------------
//1-————— Table ———————————————————————————————————————————————
// ------------------------------------------------------------
export const Table = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className="md:overflow-auto md:max-h-auto ">
      <div className={`md:min-w-max ${className ? className : ""}`} {...props}>
        {children}
      </div>
    </div>
  );
};

// ------------------------------------------------------------
//2-————— Table Header ————————————————————————————————————————
// ------------------------------------------------------------
export const THead = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={`md:min-w-max md:sticky md:top-0 md:z-10 ${className ? className : ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ------------------------------------------------------------
//3-————— Table Body ——————————————————————————————————————————
// ------------------------------------------------------------
export const TBody = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={`md:min-w-max md:flex md:flex-col ${className ? className : ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ------------------------------------------------------------
//4-————— Table Row  ——————————————————————————————————————————
// ------------------------------------------------------------

export const Row = ({ children, ...props }: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};

// ------------------------------------------------------------
//5-————— Table Data  —————————————————————————————————————————
// ------------------------------------------------------------
interface TDProps extends ComponentProps<"div"> {
  dataCell?: string;
}
export const TD = ({ children, dataCell, ...props }: TDProps) => {
  return (
    <div data-cell={dataCell} {...props}>
      {children}
    </div>
  );
};
// ------------------------------------------------------------
//6-————— Table Row Content  ——————————————————————————————————
// ------------------------------------------------------------
export const RowContent = ({ children, ...props }: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};
// ------------------------------------------------------------
//7-————— Table Row Section  ——————————————————————————————————
// ------------------------------------------------------------
export const RowContentSection = ({
  children,
  ...props
}: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};
