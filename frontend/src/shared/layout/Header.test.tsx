import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import Header from "@/shared/layout/Header";
import { store } from "@/store/redux/store";
import { areas, baseApi, ThemeProvider, type User } from "@/shared";
import { useAreaStore } from "@/store/area.store";
import { mockMatchMedia } from "@/test/mockMatchMedia";
import { logoutAction, setCredentials } from "@/feature/auth";

const createWrapper = (initialRoute = "/") => {
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <ThemeProvider>{children}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

const mockUser: User = {
  id: "1",
  firstName: "John",
  lastName: "emerson",
  email: "john@example.com",
  username: "johnEmerson",
  gender: "male",
  role: "admin",
  provider: "local",
};

describe("Header Component", () => {
  beforeEach(() => {
    mockMatchMedia(false);
    useAreaStore.setState({ selectedArea: areas[0] });
  });

  const renderHeader = (initialRoute = "/") => {
    return render(<Header />, {
      wrapper: createWrapper(initialRoute),
    });
  };

  it("renders public elements and ThemeToggle on home route (/), but hides NavLinks", () => {
    const { container } = renderHeader("/");

    expect(screen.getByText("Markist")).toBeInTheDocument();
    expect(screen.getByTestId("area-selector-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();

    const navElement = container.querySelector("nav");
    expect(navElement).not.toBeInTheDocument();
  });

  it("renders NavLinks on dashboard route (/dashboard), but hides ThemeToggle", () => {
    const { container } = renderHeader("/dashboard");

    expect(screen.getByText("Markist")).toBeInTheDocument();
    expect(screen.getByTestId("area-selector-dropdown")).toBeInTheDocument();

    const navElement = container.querySelector("nav");
    expect(navElement).toBeInTheDocument();
  });

  describe("AreaSelector Component", () => {
    it("should change areaSelected", async () => {
      const user = userEvent.setup();
      renderHeader("/dashboard");

      const trigger = screen.getByTestId("area-dropdown-button");
      await user.click(trigger);

      const dropdownContent = screen.getByTestId("area-dropdown-content");
      expect(dropdownContent.children.length).toBe(areas.length);

      const dropdownItems = screen.getAllByTestId("area-dropdown-item");
      await user.click(dropdownItems[1]);

      const selectedArea = await screen.findByText(areas[1].desc);
      expect(selectedArea).toBeInTheDocument();
    });
  });

  describe("UserMenu Component", () => {
    afterEach(() => {
      act(() => {
        store.dispatch(logoutAction());
        store.dispatch(baseApi.util.resetApiState());
      });
    });

    it("calls handleLogout, resets API state and navigates to /login when clicking Log Out", async () => {
      const user = userEvent.setup();

      act(() => {
        store.dispatch(setCredentials(mockUser));
      });

      const router = createMemoryRouter(
        [
          { path: "/dashboard", element: <Header /> },
          { path: "/login", element: <div>Login Page</div> },
        ],
        { initialEntries: ["/dashboard"] },
      );

      render(
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>,
      );

      const userMenuTrigger = screen.getByTestId("user-dropdown-button");
      await user.click(userMenuTrigger);

      const logoutButton = screen.getByRole("button", {
        name: /logout button/i,
      });
      await user.click(logoutButton);

      expect(router.state.location.pathname).toBe("/login");
    });

    it("renders user information correctly from store when authenticated", () => {
      act(() => {
        store.dispatch(setCredentials(mockUser));
      });

      renderHeader("/dashboard");

      expect(screen.getByText("mr")).toBeInTheDocument();
      expect(screen.getByText(".emerson")).toBeInTheDocument();
      expect(screen.getByText("admin")).toBeInTheDocument();
    });

    it("renders 'mz' when user gender is female", () => {
      const femaleUser: User = { ...mockUser, gender: "female" };

      act(() => {
        store.dispatch(setCredentials(femaleUser));
      });

      renderHeader("/dashboard");

      expect(screen.getByText("mz")).toBeInTheDocument();
    });

    it("executes logout action and clears user state on Log Out click", async () => {
      const user = userEvent.setup();

      act(() => {
        store.dispatch(setCredentials(mockUser));
      });

      renderHeader("/dashboard");

      const dropdownButton = screen.getByTestId("user-dropdown-button");
      await user.click(dropdownButton);

      const logoutButton = screen.getByRole("button", {
        name: /logout button/i,
      });
      await user.click(logoutButton);

      const state = store.getState();
      expect(state.auth.user).toBeNull();
      expect(state.auth.status).toBe("unauthenticated");
    });
  });
});
