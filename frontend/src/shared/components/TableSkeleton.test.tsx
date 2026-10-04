import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TableSkeleton } from "@/shared";

describe("TableSkeleton Component", () => {
  it("renders the skeleton with default classes", () => {
    const { container } = render(
      <TableSkeleton data-testid="table-skeleton" />,
    );
    const skeletonElement = screen.getByTestId("table-skeleton");

    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement.className).toBe("");

    const rows = container.querySelectorAll("[role=row]");
    expect(rows).toHaveLength(3);

    rows.forEach((row) => {
      expect(row).toHaveClass("h-12");
    });

    const columns = container.querySelectorAll("[role=cell]");
    expect(columns).toHaveLength(24); // 4 rows * 6 columns (THead + TBody)
  });

  it("renders the skeleton with custom props", () => {
    const customColumns = ["w-40", "w-120", "w-100", "w-100", "w-100"];
    const { container } = render(
      <TableSkeleton
        rows={3}
        rowHeight="h-12"
        data-testid="table-skeleton-custom"
        columns={customColumns}
        className="w-full h-6 bg-white/10 rounded-sm animate-pulse"
      />,
    );
    const skeletonElement = screen.getByTestId("table-skeleton-custom");
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveClass(
      "w-full h-6 bg-white/10 rounded-sm animate-pulse",
    );

    const rows = container.querySelectorAll("[role=row]");
    expect(rows).toHaveLength(3);

    const columns = container.querySelectorAll("[role=cell]");
    expect(columns).toHaveLength(customColumns.length * 4); // 4 rows * 5 columns (THead + TBody)
  });
});
