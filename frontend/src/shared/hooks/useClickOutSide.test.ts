import { renderHook } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { useClickOutside } from "@/shared";

describe("useClickOutside", () => {
  let insideElement: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    insideElement = document.createElement("div");
    insideElement.setAttribute("data-testid", "inside");
    document.body.appendChild(insideElement);

    outsideElement = document.createElement("div");
    outsideElement.setAttribute("data-testid", "outside");
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    document.body.removeChild(insideElement);
    document.body.removeChild(outsideElement);
  });

  it("should call setState(false) when clicked outside the domNode", async () => {
    const user = userEvent.setup();
    const setState = vi.fn();
    const domNode = { current: insideElement };

    renderHook(() => useClickOutside({ domNode, setState }));

    await user.click(outsideElement);

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(false);
  });

  it("should NOT call setState when clicked inside the domNode", async () => {
    const user = userEvent.setup();
    const setState = vi.fn();
    const domNode = { current: insideElement };

    renderHook(() => useClickOutside({ domNode, setState }));

    await user.click(insideElement);

    expect(setState).not.toHaveBeenCalled();
  });

  it("should NOT call setState if domNode.current is null", async () => {
    const user = userEvent.setup();
    const setState = vi.fn();
    const domNode = { current: null };

    renderHook(() => useClickOutside({ domNode, setState }));

    await user.click(outsideElement);

    expect(setState).not.toHaveBeenCalled();
  });

  it("should remove event listener on unmount", async () => {
    const user = userEvent.setup();
    const setState = vi.fn();
    const domNode = { current: insideElement };

    const { unmount } = renderHook(() =>
      useClickOutside({ domNode, setState }),
    );

    unmount();

    await user.click(outsideElement);

    expect(setState).not.toHaveBeenCalled();
  });
});
