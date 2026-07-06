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
    <div className="overflow-auto max-h-225 ">
      <div className={`min-w-max ${className ? className : ""}`} {...props}>
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
      className={`min-w-max sticky top-0 z-10 ${className ? className : ""}`}
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
      className={`min-w-max flex flex-col ${className ? className : ""}`}
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
export const TD = ({ children, ...props }: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
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
