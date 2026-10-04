import { renderHook } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { usePagination } from "@/shared";

const DOTS = "...";

describe("usePagination", () => {
  it("should return all page numbers when totalPages is less than or equal to totalPageNumbers", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 5, currentPage: 1, siblingCount: 1 }),
    );

    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  it("should show right dots when on early pages (left dots hidden)", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, currentPage: 2, siblingCount: 1 }),
    );

    expect(result.current).toEqual([1, 2, 3, 4, 5, DOTS, 10]);
  });

  it("should show left dots when on late pages (right dots hidden)", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, currentPage: 9, siblingCount: 1 }),
    );

    expect(result.current).toEqual([1, DOTS, 6, 7, 8, 9, 10]);
  });

  it("should show both left and right dots when in the middle pages", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, currentPage: 5, siblingCount: 1 }),
    );

    expect(result.current).toEqual([1, DOTS, 4, 5, 6, DOTS, 10]);
  });

  it("should respect custom siblingCount parameter", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, currentPage: 5, siblingCount: 2 }),
    );

    expect(result.current).toEqual([1, DOTS, 3, 4, 5, 6, 7, DOTS, 10]);
  });

  it("should use default siblingCount=1 when omitted", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, currentPage: 1 }),
    );

    expect(result.current).toEqual([1, 2, 3, 4, 5, DOTS, 10]);
  });
});
