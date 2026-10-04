import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { TableEmpty } from "@/shared";

describe("TableEmpty", () => {
  it("should render with default title and description", () => {
    render(<TableEmpty />);

    expect(screen.getByText("No data yet")).toBeInTheDocument();
    expect(
      screen.getByText("There's nothing here right now."),
    ).toBeInTheDocument();
  });

  it("should render custom title and description", () => {
    render(
      <TableEmpty title="Custom Title" description="Custom Description" />,
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("should not render description when provided as empty or falsy", () => {
    render(<TableEmpty description="" />);

    expect(
      screen.queryByText("There's nothing here right now."),
    ).not.toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(<TableEmpty icon={<svg data-testid="empty-icon" />} />);

    expect(screen.getByTestId("empty-icon")).toBeInTheDocument();
  });

  it("should render action button/element when provided", () => {
    render(
      <TableEmpty
        action={<button data-testid="add-button">Add Item</button>}
      />,
    );

    const button = screen.getByTestId("add-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Add Item");
  });

  it("should merge custom className correctly", () => {
    const { container } = render(<TableEmpty className="my-custom-class" />);

    const rootElement = container.firstChild;
    expect(rootElement).toHaveClass("my-custom-class");
    expect(rootElement).toHaveClass("flex-center");
  });
});
