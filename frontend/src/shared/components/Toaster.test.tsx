import { render, act, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { ToastContainer } from "@/shared";
import { toast, useToastStore } from "@/store/toast.store";

describe("Toaster component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.setState({ toasts: [] });
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should render the Toaster with default props", () => {
    render(<ToastContainer />);

    act(() => {
      toast.info("test default type");
    });

    expect(useToastStore.getState().toasts.length).toBe(1);
    expect(screen.getByText("test default type")).toBeInTheDocument();
  });
  it("should render the Toaster with custom props", () => {
    render(<ToastContainer />);

    act(() => {
      toast.error("test error type");
      toast.success("test success type");
    });

    expect(useToastStore.getState().toasts.length).toBe(2);
    expect(screen.getByText("test error type")).toBeInTheDocument();
    expect(screen.getByText("test success type")).toBeInTheDocument();
  });

  it("should have opacity-0 / leave class when leave timer is finished", () => {
    render(<ToastContainer />);

    act(() => {
      toast.info("Auto dismiss test");
    });

    const toasterElement = screen.getByTestId("toaster");
    expect(toasterElement).not.toHaveClass("opacity-0");

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(toasterElement).toHaveClass("opacity-0");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByTestId("toaster")).not.toBeInTheDocument();
  });
});
