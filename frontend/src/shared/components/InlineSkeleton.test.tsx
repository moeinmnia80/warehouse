import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { InlineSkeleton } from "@/shared";

describe("inlineSkeleton", () => {
  it("should render the skeleton with default classes", () => {
    render(<InlineSkeleton role="presentation" />);
    const skeletonElement = screen.getByRole("presentation");
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveClass(
      "size-6 ml-2 inline-block bg-white/10 rounded-sm animate-pulse",
    );
  });
});
