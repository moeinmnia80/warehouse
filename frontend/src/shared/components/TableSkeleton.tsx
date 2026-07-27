import type { ComponentProps } from "react";
interface TableSkeletonProps extends ComponentProps<"div"> {
  rows?: number;
  columns?: string[];
  rowHeight?: string;
}

export const TableSkeleton = ({
  columns = ["w-40", "w-120", "w-100", "w-100", "w-100", "w-80"],
  rows = 3,
  rowHeight = "h-18",
  ...props
}: TableSkeletonProps) => {
  return (
    <div {...props}>
      <div className="border border-bo-primary rounded-sm overflow-hidden">
        <div className="flex-between h-11 bg-b-table border-b border-bo-primary px-5">
          {columns.map((width, i) => (
            <div
              key={`head-${i}`}
              className={`h-4 ${width} bg-b-muted rounded-sm animate-pulse-slow opacity-20`}
            />
          ))}
        </div>

        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={`row-${rowIdx}`}
            className={`flex-between ${rowHeight} px-5 ${
              rowIdx !== rows - 1 ? "border-b border-bo-primary" : ""
            }`}
          >
            {columns.map((width, colIdx) => (
              <div
                key={`cell-${rowIdx}-${colIdx}`}
                className={`h-4 ${width} bg-b-muted rounded-sm animate-pulse-slow opacity-20`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
