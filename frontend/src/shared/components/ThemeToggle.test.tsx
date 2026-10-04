import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { describe, expect, it, vi, beforeEach } from "vitest";

import { ThemeProvider, ThemeToggle } from "@/shared";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false, // false = light preference
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("ThemeToggle Component", () => {
  it("renders the toggle button with correct classes and icons", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const skeletonElement = screen.getByTestId("theme-toggle");
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveClass(
      "relative flex w-22 h-11 bg-b-secondary rounded-full",
    );

    const toggleButton = screen.getByRole("switch", { name: /dark mode/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass("flex");

    const toggleLabel = screen.getByTestId("toggle-label");
    expect(toggleLabel).toBeInTheDocument();
  });

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders correctly and handles toggle click", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByRole("switch", { name: /dark mode/i });
    const toggleLabel = screen.getByTestId("toggle-label");

    expect(toggleButton).toHaveAttribute("aria-checked", "false");
    expect(toggleLabel).toHaveClass("translate-x-11");

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-checked", "true");
    expect(toggleLabel).toHaveClass("translate-x-0");
  });
});
