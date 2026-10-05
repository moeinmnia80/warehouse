import { describe, it, expect, vi, beforeEach } from "vitest";

import type { Package } from "@/shared";
import { setRequestPackage } from "@/feature/shipping";

import { savePackageToSessionMiddleware } from "@/store/middlewares/sessionMiddleware";

const mockPackage: Package = {
  packageId: "pkg_123",
  barcode: "BAR-987654",
  vendor: "Amazon",
  dataReceived: new Date().toISOString(),
  itemValues: 100,
  totalValues: 150,
  weight: 2.5,
  statusLabel: "Received",
  recipient: "Ali",
  address: "Tehran, Iran",
};

describe("savePackageToSessionMiddleware", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it("should pass the action to next and NOT save to sessionStorage for other actions", () => {
    const store = { dispatch: vi.fn(), getState: vi.fn() };
    const next = vi.fn((action) => action);
    const middleware = savePackageToSessionMiddleware(store)(next);

    const randomAction = { type: "OTHER_ACTION", payload: "test" };
    const result = middleware(randomAction);

    expect(next).toHaveBeenCalledWith(randomAction);
    expect(result).toEqual(randomAction);

    expect(sessionStorage.getItem("request_packages")).toBeNull();
  });

  it("should save package to sessionStorage when setRequestPackage action is dispatched", () => {
    const store = { dispatch: vi.fn(), getState: vi.fn() };
    const next = vi.fn((action) => action);
    const middleware = savePackageToSessionMiddleware(store)(next);

    const action = setRequestPackage([mockPackage]);

    const result = middleware(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(result).toEqual(action);

    const storedData = sessionStorage.getItem("request_packages");
    expect(storedData).not.toBeNull();
    expect(JSON.parse(storedData!)).toEqual([mockPackage]);
  });

  it("should handle errors gracefully if sessionStorage throws an error", () => {
    const store = { dispatch: vi.fn(), getState: vi.fn() };
    const next = vi.fn((action) => action);
    const middleware = savePackageToSessionMiddleware(store)(next);

    const spySetItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const action = setRequestPackage([mockPackage]);

    expect(() => middleware(action)).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      "err when save data in sessionStorage:",
      expect.any(Error),
    );

    spySetItem.mockRestore();
    consoleSpy.mockRestore();
  });
});
