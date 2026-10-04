import { renderHook, act } from "@testing-library/react";

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";

import { useScrolled } from "@/shared";

describe("useScrolled hook", () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement("div");

    // Default synchronous mock for requestAnimationFrame
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(
      (cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      },
    );

    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should NOT add 'is-scrolled' class when scrollY is below threshold", () => {
    const { result } = renderHook(() => useScrolled<HTMLDivElement>(10));
    (result.current as React.RefObject<HTMLDivElement>).current = element;

    act(() => {
      window.scrollY = 5;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(element.classList.contains("is-scrolled")).toBe(false);
  });

  test("should add 'is-scrolled' class when scrollY is above threshold", () => {
    const { result } = renderHook(() => useScrolled<HTMLDivElement>(10));
    (result.current as React.RefObject<HTMLDivElement>).current = element;

    act(() => {
      window.scrollY = 15;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(element.classList.contains("is-scrolled")).toBe(true);
  });

  test("should remove 'is-scrolled' class when scrolling back below threshold", () => {
    const { result } = renderHook(() => useScrolled<HTMLDivElement>(10));
    (result.current as React.RefObject<HTMLDivElement>).current = element;

    act(() => {
      window.scrollY = 20;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(element.classList.contains("is-scrolled")).toBe(true);

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(element.classList.contains("is-scrolled")).toBe(false);
  });

  test("should respect custom threshold values", () => {
    const { result } = renderHook(() => useScrolled<HTMLDivElement>(50));
    (result.current as React.RefObject<HTMLDivElement>).current = element;

    act(() => {
      window.scrollY = 30;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(element.classList.contains("is-scrolled")).toBe(false);

    act(() => {
      window.scrollY = 60;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(element.classList.contains("is-scrolled")).toBe(true);
  });

  test("should handle scroll events gracefully when ref.current is null", () => {
    // ref.current is left unattached (null)
    renderHook(() => useScrolled<HTMLDivElement>(10));

    expect(() => {
      act(() => {
        window.scrollY = 20;
        window.dispatchEvent(new Event("scroll"));
      });
    }).not.toThrow();
  });

  test("should ignore scroll events while a frame is already ticking (tickingRef.current = true)", () => {
    let rafCallback: FrameRequestCallback | null = null;

    // Custom rAF mock to manually delay the animation frame callback
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(
      (cb: FrameRequestCallback) => {
        rafCallback = cb;
        return 1;
      },
    );

    const { result } = renderHook(() => useScrolled<HTMLDivElement>(10));
    (result.current as React.RefObject<HTMLDivElement>).current = element;

    act(() => {
      window.scrollY = 20;
      // First scroll event triggers rAF and sets tickingRef.current = true
      window.dispatchEvent(new Event("scroll"));
    });

    // Second scroll event while frame is still pending (tests the `if (tickingRef.current) return;` branch)
    act(() => {
      window.scrollY = 30;
      window.dispatchEvent(new Event("scroll"));
    });

    // Execute the queued rAF callback
    act(() => {
      if (rafCallback) rafCallback(0);
    });

    expect(element.classList.contains("is-scrolled")).toBe(true);
  });

  test("should remove the scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useScrolled<HTMLDivElement>());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });
});
