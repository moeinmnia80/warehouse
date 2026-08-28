import type { ComponentProps } from "react";
import { Row, Table, TD, THead } from "@/shared";
interface TableSkeletonProps extends ComponentProps<"div"> {
  rows?: number;
  columns?: string[];
  rowHeight?: string;
}

export const TableSkeleton = ({
  columns = ["w-40", "w-120", "w-100", "w-100", "w-100", "w-80"],
  rows = 3,
  rowHeight = "h-12",
  ...props
}: TableSkeletonProps) => {
  return (
    <div {...props}>
      <Table className="border border-bo-primary rounded-xl overflow-hidden">
        <THead className="flex-between gap-1 h-11 bg-b-table border-b border-bo-primary px-5">
          {columns.map((width, i) => (
            <TD
              key={`head-${i}`}
              className={`h-4 ${width} bg-b-muted rounded-sm animate-pulse-slow opacity-20`}
            />
          ))}
        </THead>

        {Array.from({ length: rows }).map((_, rowIdx) => (
          <Row
            key={`row-${rowIdx}`}
            className={`flex-between gap-1 min-h-16 ${rowHeight} px-5 ${
              rowIdx !== rows - 1 ? "border-b border-bo-primary" : ""
            }`}
          >
            {columns.map((width, colIdx) => (
              <TD
                key={`cell-${rowIdx}-${colIdx}`}
                className={`h-4 ${width} bg-b-muted rounded-sm animate-pulse-slow opacity-20`}
              />
            ))}
          </Row>
        ))}
      </Table>
    </div>
  );
};
