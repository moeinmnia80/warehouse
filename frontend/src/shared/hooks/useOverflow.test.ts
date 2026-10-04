import { renderHook } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { useOverflow } from "@/shared";

describe("useOverflow", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("should set body overflow to hidden when active (isOpen = true)", () => {
    renderHook(() => useOverflow(true));

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should not set body overflow to hidden when inactive (isOpen = false)", () => {
    renderHook(() => useOverflow(false));

    expect(document.body.style.overflow).toBe("");
  });

  it("should reset body overflow when unmounted", () => {
    const { unmount } = renderHook(() => useOverflow(true));

    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("should update overflow when isOpen prop changes dynamically", () => {
    const { rerender } = renderHook(({ isOpen }) => useOverflow(isOpen), {
      initialProps: { isOpen: true },
    });

    expect(document.body.style.overflow).toBe("hidden");
    rerender({ isOpen: false });
    expect(document.body.style.overflow).toBe("");
  });
});
