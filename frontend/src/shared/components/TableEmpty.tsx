import { cn, type TableEmptyProps } from "@/shared";

export const TableEmpty = ({
  title = "No data yet",
  description = "There's nothing here right now.",
  icon,
  action,
  className = "",
}: TableEmptyProps) => {
  return (
    <div
      className={cn(
        "flex-center flex-col gap-3 h-42 text-center text-tx-primary border border-bo-primary rounded-xl md:rounded-t-none",
        className,
      )}
    >
      {icon && <div className="text-tx-secondary">{icon}</div>}
      <div className="flex flex-col gap-1">
        <span className="text-md font-medium">{title}</span>
        {description && (
          <span className="text-sm text-tx-secondary">{description}</span>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
};
