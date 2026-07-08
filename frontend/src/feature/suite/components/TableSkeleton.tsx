interface TableSkeletonProps {
  columns?: number[]; // widths in px or tailwind scale units, e.g. [40, 120, 100, 100, 100, 80]
  rows?: number; // how many skeleton rows to render
  rowHeight?: string; // tailwind height class, e.g. "h-18"
}

const TableSkeleton = ({
  columns = [40, 120, 100, 100, 100, 80],
  rows = 3,
  rowHeight = "h-18",
}: TableSkeletonProps) => {
  return (
    <div className="p-5">
      <div className="border border-bo-primary rounded-xl overflow-hidden">
        {/* header row */}
        <div className="flex-between h-11 bg-b-table border-b border-bo-primary px-5">
          {columns.map((width, i) => (
            <div
              key={`head-${i}`}
              className={`h-4 w-${width} bg-b-muted rounded-full animate-pulse-slow opacity-20`}
            />
          ))}
        </div>

        {/* body rows */}
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
                className={`h-4 w-${width} bg-b-muted rounded-full animate-pulse-slow opacity-20`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
