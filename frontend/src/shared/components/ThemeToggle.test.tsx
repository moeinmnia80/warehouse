import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { describe, expect, it, beforeEach, vi } from "vitest";

import {
  themeCheck,
  ThemeProvider,
  ThemeToggle,
  ToggleButton,
  ToggleLabel,
} from "@/shared";
import { mockMatchMedia } from "@/test/mockMatchMedia";
import { DarkIcon, LightIcon } from "@/assets";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the toggle button with correct classes and icons", async () => {
    mockMatchMedia(true);
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

    const toggleLabel = screen.getByTestId("toggle-label");
    expect(toggleLabel).toBeInTheDocument();
  });

  it("should handle theme toggle click correctly from dark to light", async () => {
    localStorage.setItem("theme", "dark");
    mockMatchMedia(true);

    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByRole("switch", { name: /dark mode/i });
    const toggleLabel = screen.getByTestId("toggle-label");

    expect(toggleButton).toHaveAttribute("aria-checked", "false");
    expect(toggleLabel).toHaveClass("translate-x-0");

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-checked", "true");
    expect(toggleLabel).toHaveClass("translate-x-11");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("should fallback to matchMedia when localStorage is empty", () => {
    mockMatchMedia(false);

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByRole("switch", { name: /dark mode/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should return "light" when window is undefined', () => {
    vi.stubGlobal("window", undefined);

    const result = themeCheck();
    expect(result).toBe("light");
  });

  it("should toggle theme back and forth (dark -> light -> dark)", async () => {
    localStorage.setItem("theme", "dark");
    mockMatchMedia(true);

    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByRole("switch", { name: /dark mode/i });

    await user.click(toggleButton);
    expect(localStorage.getItem("theme")).toBe("light");

    await user.click(toggleButton);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("should throw error when Toggle is used outside of ToggleProvider", () => {
    localStorage.setItem("theme", "dark");
    mockMatchMedia(true);

    const theme = localStorage.getItem("theme");

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      render(
        <ToggleButton
          onClick={() => vi.fn()}
          aria-label="dark mode"
          className="flex"
        >
          <ToggleLabel
            className={`absolute top-1 left-1 bg-b-muted size-9 rounded-full transition duration-200 ${
              theme === "dark" ? "translate-x-0" : "translate-x-11"
            }`}
          />
          <DarkIcon className="z-10 size-11 p-3 fill-st-primary" />
          <LightIcon className="z-10 size-11 p-3 fill-st-primary" />
        </ToggleButton>,
      ),
    ).toThrow(
      "Toggle sub-components must be rendered within a Toggle provider",
    );

    consoleSpy.mockRestore();
  });
});
