import { MemoryRouter, useLocation } from "react-router";
import { renderHook, act } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import { usePaginationParams } from "@/shared";

const createWrapper = (initialEntries = ["/"]) => {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};

describe("usePaginationParams", () => {
  it("should return defaultPage (1) when no query param exists", () => {
    const { result } = renderHook(() => usePaginationParams(), {
      wrapper: createWrapper(["/dashboard/my-suite"]),
    });

    expect(result.current.page).toBe(1);
  });

  it("should return parsed page number when valid query param exists", () => {
    const { result } = renderHook(() => usePaginationParams(), {
      wrapper: createWrapper(["/dashboard/my-suite?page=3"]),
    });

    expect(result.current.page).toBe(3);
  });

  it("should fallback to defaultPage when query param is invalid (string, zero, or negative)", () => {
    const { result: res1 } = renderHook(() => usePaginationParams(1), {
      wrapper: createWrapper(["/dashboard/my-suite?page=abc"]),
    });
    expect(res1.current.page).toBe(1);

    const { result: res2 } = renderHook(() => usePaginationParams(1), {
      wrapper: createWrapper(["/dashboard/my-suite?page=-5"]),
    });
    expect(res2.current.page).toBe(1);

    const { result: res3 } = renderHook(() => usePaginationParams(1), {
      wrapper: createWrapper(["/dashboard/my-suite?page=0"]),
    });
    expect(res3.current.page).toBe(1);
  });

  it("should respect custom defaultPage and paramKey", () => {
    const { result } = renderHook(() => usePaginationParams(5, "p"), {
      wrapper: createWrapper(["/dashboard/my-suite?p=12"]),
    });

    expect(result.current.page).toBe(12);
  });

  it("should update URL searchParams when setPage is called", () => {
    const { result } = renderHook(
      () => {
        const pagination = usePaginationParams();
        const location = useLocation();
        return { ...pagination, location };
      },
      { wrapper: createWrapper(["/products?page=1"]) },
    );

    expect(result.current.page).toBe(1);

    act(() => {
      result.current.setPage(4);
    });

    expect(result.current.page).toBe(4);
    expect(result.current.location.search).toBe("?page=4");
  });
});
