import { act } from "@testing-library/react";

import { describe, expect, it, beforeEach } from "vitest";

import { areas } from "@/shared";
import { useAreaStore } from "@/store/area.store";

describe("useAreaStore", () => {
  beforeEach(() => {
    localStorage.clear();

    act(() => {
      useAreaStore.setState({
        selectedArea: areas[0],
      });
    });
  });

  it("should have correct initial state", () => {
    const state = useAreaStore.getState();

    expect(state.selectedArea).toEqual(areas[0]);
  });

  it("should update selectedArea when setArea is called", () => {
    act(() => {
      useAreaStore.getState().setArea(areas[1]);
    });

    const updatedState = useAreaStore.getState();
    expect(updatedState.selectedArea).toEqual(areas[1]);
  });

  it("should persist selectedArea into localStorage under 'dropdown' key", () => {
    act(() => {
      useAreaStore.getState().setArea(areas[1]);
    });

    const storedData = localStorage.getItem("dropdown");
    expect(storedData).not.toBeNull();

    const parsedData = JSON.parse(storedData!);

    expect(parsedData).toEqual({
      state: {
        selectedArea: areas[1],
      },
      version: 0,
    });
  });
});
