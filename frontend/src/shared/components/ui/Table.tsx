import { createContext, type ComponentPropsWithoutRef } from "react";
import { Checkbox, Label } from "./Form";

// ------------------------------------------------------------
//1-————— Table ———————————————————————————————————————————————
// ------------------------------------------------------------
const TableContext = createContext({});

export const Table = ({
  children,
  className,

  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <TableContext value={{}}>
      <div className="overflow-auto max-h-125 ">
        <div className={`"min-w-max" ${className ? className : ""}`} {...props}>
          {children}
        </div>
      </div>
    </TableContext>
  );
};

// ------------------------------------------------------------
//2-————— Table Header ————————————————————————————————————————
// ------------------------------------------------------------
export const THead = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
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
}: ComponentPropsWithoutRef<"div">) => {
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
interface TableRow extends ComponentPropsWithoutRef<"div"> {
  name: string | undefined;
}
export const Row = ({ children, name, ...props }: TableRow) => {
  if (!name) return;
  return (
    <div {...props}>
      <TD className="min-w-10 shrink-0 py-4 px-3">
        <Label className="flex-center gap-2">
          <Checkbox
            accentClass="stroke-st-primary"
            name={name}
            onChange={() => {}}
          />
        </Label>
      </TD>
      {children}
    </div>
  );
};

// ------------------------------------------------------------
//5-————— Table Data  —————————————————————————————————————————
// ------------------------------------------------------------
export const TD = ({ children, ...props }: ComponentPropsWithoutRef<"div">) => {
  return <div {...props}>{children}</div>;
};
