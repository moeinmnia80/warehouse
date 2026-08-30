import { cn } from "@/shared";
import { Children, useState, type ComponentProps, type ReactNode } from "react";

interface SidebarSectionProps extends ComponentProps<"div"> {
  title: string;
  caption?: string;
  value?: ReactNode;
  maxVisibleItems?: number;
}

const DEFAULT_MAX_VISIBLE_ITEMS = 2;

export const SidebarSection = ({
  title,
  caption,
  value = "$0.00",
  maxVisibleItems = DEFAULT_MAX_VISIBLE_ITEMS,
  className,
  children,
}: SidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const items = Children.toArray(children);
  const hasHiddenItems = items.length > maxVisibleItems;
  const visibleItems = isExpanded ? items : items.slice(0, maxVisibleItems);

  return (
    <div
      className={cn(
        "text-sm text-tx-primary border-b border-bo-primary pb-4",
        className,
      )}
    >
      <div className="flex-between font-bold">
        <div className="flex-center gap-1.5">
          <h4 className="capitalize">{title}</h4>
        </div>
        {typeof value === "string" ? <p>{value}</p> : value}
      </div>

      {caption && <p className="mt-1">{caption}</p>}

      {items.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">{visibleItems}</div>
      )}

      {hasHiddenItems && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="mt-2 font-semibold text-tx-secondary hover:underline"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};
