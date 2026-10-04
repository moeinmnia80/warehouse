import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { toast, useToastStore } from "@/store/toast.store";

describe("useToastStore & toast helpers", () => {
  beforeEach(() => {
    act(() => {
      useToastStore.setState({ toasts: [] });
    });
  });

  it("should have correct initial state", () => {
    const state = useToastStore.getState();
    expect(state.toasts).toEqual([]);
  });

  it("should add a toast to the store with default type and return its id", () => {
    let returnedId: string = "";

    act(() => {
      returnedId = useToastStore.getState().add("Test toast");
    });

    const { toasts } = useToastStore.getState();

    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toEqual(
      expect.objectContaining({
        text: "Test toast",
        type: "info",
      }),
    );
    expect(toasts[0].id).toBe(returnedId);
  });

  it("should remove a toast from the store by id", () => {
    let toastId: string = "";

    act(() => {
      toastId = useToastStore.getState().add("Test toast");
    });

    expect(useToastStore.getState().toasts).toHaveLength(1);

    act(() => {
      useToastStore.getState().remove(toastId);
    });

    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  describe("toast helpers", () => {
    it("should add info toast via toast.info", () => {
      act(() => {
        toast.info("Info message");
      });

      const { toasts } = useToastStore.getState();
      expect(toasts).toHaveLength(1);
      expect(toasts[0]).toEqual(
        expect.objectContaining({ text: "Info message", type: "info" }),
      );
    });

    it("should add error toast via toast.error", () => {
      act(() => {
        toast.error("Error message");
      });

      const { toasts } = useToastStore.getState();
      expect(toasts).toHaveLength(1);
      expect(toasts[0]).toEqual(
        expect.objectContaining({ text: "Error message", type: "error" }),
      );
    });

    it("should add success toast via toast.success", () => {
      act(() => {
        toast.success("Success message");
      });

      const { toasts } = useToastStore.getState();
      expect(toasts).toHaveLength(1);
      expect(toasts[0]).toEqual(
        expect.objectContaining({ text: "Success message", type: "success" }),
      );
    });
  });
});
