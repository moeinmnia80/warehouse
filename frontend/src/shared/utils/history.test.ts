import { type NavigateFunction } from "react-router";

import { describe, expect, it } from "vitest";

import { backToPrevPage } from "@/shared";

describe("back to previous page", () => {
  it("should call navigate with -1 to go back", () => {
    const mockNavigate = vi.fn() as unknown as NavigateFunction;

    backToPrevPage(mockNavigate);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
