import { MemoryRouter } from "react-router";
import { renderHook } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { useInPath } from "@/shared";

describe("useInPath", () => {
  it("should return true if the checkPath is in the current pathname", () => {
    const { result } = renderHook(() => useInPath("dashboard"), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/dashboard"]}>{children}</MemoryRouter>
      ),
    });

    expect(result.current).toBe(true);
  });

  it("should return false if the checkPath is not in the current pathname", () => {
    const { result } = renderHook(() => useInPath("dashboard"), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/settings"]}>{children}</MemoryRouter>
      ),
    });

    expect(result.current).toBe(false);
  });
});
