import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { describe, expect, it, beforeEach, vi } from "vitest";

import { ThemeProvider, useTheme } from "@/shared";
import { mockMatchMedia } from "@/test/mockMatchMedia";

const TestComponent = () => {
  const { theme, themeToggler } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={themeToggler} data-testid="toggle-btn">
        Toggle
      </button>
    </div>
  );
};

describe("ThemeProvider & useTheme Integration", () => {
  beforeEach(() => {
    localStorage.clear();
    mockMatchMedia(true);
  });

  it("should return default value when used without Provider", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const element = screen.getByTestId("current-theme");
    expect(element).toHaveTextContent("dark");
  });

  it("should provide custom values when wrapped in ThemeContext.Provider", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    localStorage.setItem("theme", "dark");

    await user.click(screen.getByTestId("toggle-btn"));
    localStorage.setItem("theme", "light");

    const element = screen.getByTestId("current-theme");
    expect(element).toHaveTextContent("light");
  });

  it("should throw error when useTheme is used outside of ThemeProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );

    consoleSpy.mockRestore();
  });
});
