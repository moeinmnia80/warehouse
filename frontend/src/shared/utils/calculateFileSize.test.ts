import { describe, expect, it } from "vitest";

import { calculateFileSize } from "@/shared";

describe("calculate file size", () => {
  it("should calculate size in KB correctly when size is less than 1 MB", () => {
    const result = calculateFileSize(2048);
    expect(result).toBe("2.00 Kb");
  });

  it("should calculate size in MB correctly when size is greater than or equal to 1 MB", () => {
    const result = calculateFileSize(1024 * 1024 * 5);
    expect(result).toBe("5.00 Mb");
  });

  it("should respect custom decimal places", () => {
    const result = calculateFileSize(1500, 1);
    expect(result).toBe("1.5 Kb");
  });
  it("should handle zero size correctly", () => {
    const result = calculateFileSize(0);
    expect(result).toBe("0.00 Kb");
  });
});

describe("Guard Clauses / Error Handling", () => {
  it("should throw an error if size is negative", () => {
    // because give error define like func
    const result = () => calculateFileSize(-100);
    expect(result).toThrow(
      "Invalid file size: size must be a non-negative number.",
    );
  });

  it("should throw an error if size is not a number (NaN)", () => {
    const result = () => calculateFileSize(NaN);
    expect(result).toThrow(
      "Invalid file size: size must be a non-negative number.",
    );
  });

  it("should throw an error if decimal is negative", () => {
    const result = () => calculateFileSize(1024, -1);
    expect(result).toThrow(
      "Invalid decimal: decimal must be a non-negative number.",
    );
  });
});
