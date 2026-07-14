import { cn } from "@/shared/index";
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
    <div className="md:overflow-auto md:max-h-auto">
      <div role="table" className={cn("md:min-w-max", className)} {...props}>
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
      role="rowgroup"
      className={cn("md:min-w-max md:sticky md:top-0 md:z-10", className)}
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
      role="rowgroup"
      className={cn("md:min-w-max md:flex md:flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// ------------------------------------------------------------
//4-————— Table Row  ——————————————————————————————————————————
// ------------------------------------------------------------
export const Row = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div role="row" className={cn(className)} {...props}>
      {children}
    </div>
  );
};

// ------------------------------------------------------------
//5-————— Table Data  —————————————————————————————————————————
// ------------------------------------------------------------
interface TDProps extends ComponentProps<"div"> {
  dataCell?: string;
}

export const TD = ({ children, className, dataCell, ...props }: TDProps) => {
  return (
    <div role="cell" data-cell={dataCell} className={cn(className)} {...props}>
      {children}
    </div>
  );
};

// ------------------------------------------------------------
//6-————— Table Row Content  ——————————————————————————————————
// ------------------------------------------------------------
export const RowContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
// ------------------------------------------------------------
//7-————— Table Row Section  ——————————————————————————————————
// ------------------------------------------------------------
export const RowContentSection = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
