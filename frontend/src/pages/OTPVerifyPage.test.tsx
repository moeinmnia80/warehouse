import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";

import { describe, expect, it } from "vitest";

import LoginPage from "@/pages/LoginPage";
import { setEmail } from "@/feature/auth";
import { store } from "@/store/redux/store";
import OTPVerifyPage from "@/pages/OTPVerifyPage";

const AppProvider = (initialRoute = "/") => {
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    </Provider>
  );
};

describe("OTPVerifyPage Component", () => {
  afterEach(() => act(() => store.dispatch(setEmail({ email: "" }))));
  it("should return null/render nothing if user is not authenticated", () => {
    const router = createMemoryRouter(
      [
        { path: "/verify-otp", element: <OTPVerifyPage /> },
        { path: "/login", element: <LoginPage /> },
      ],
      { initialEntries: ["/verify-otp"] },
    );

    render(
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </Provider>,
    );

    const loginHeadingElement = screen.getByRole("heading", {
      level: 2,
      name: /login account/i,
    });
    expect(loginHeadingElement).toBeInTheDocument();
  });

  it("should render UI elements properly when user is authenticated", () => {
    act(() => {
      store.dispatch(setEmail({ email: "test@example.com" }));
    });

    render(<OTPVerifyPage />, { wrapper: AppProvider("/") });

    const element = screen.getByRole("heading", {
      level: 2,
      name: /verify your email/i,
    });

    expect(element).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("should expired timer after 120 seconds", async () => {
    vi.useFakeTimers();

    act(() => {
      store.dispatch(setEmail({ email: "test@example.com" }));
    });

    render(<OTPVerifyPage />, { wrapper: AppProvider("/") });

    expect(screen.getByText("02:00")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(120000);
    });

    expect(screen.getByText("00:00")).toBeInTheDocument();

    vi.useRealTimers();
  });
  it("should update isExpired state when click on resend otp", async () => {
    vi.useFakeTimers();

    act(() => {
      store.dispatch(setEmail({ email: "test@example.com" }));
    });

    render(<OTPVerifyPage />, { wrapper: AppProvider("/") });

    act(() => {
      vi.advanceTimersByTime(120000);
    });

    expect(screen.getByText("00:00")).toBeInTheDocument();

    const resetTimerBtn = screen.getByRole("button", { name: /reset timer/i });

    fireEvent.click(resetTimerBtn);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(screen.getByText("02:00")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("should back to previous page when click on go back button", async () => {
    act(() => {
      store.dispatch(setEmail({ email: "test@example.com" }));
    });

    const router = createMemoryRouter(
      [
        { path: "/login", element: <LoginPage /> },
        { path: "/verify-otp", element: <OTPVerifyPage /> },
      ],
      {
        initialEntries: ["/login", "/verify-otp"],
        initialIndex: 1,
      },
    );

    render(
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </Provider>,
    );

    expect(router.state.location.pathname).toBe("/verify-otp");

    const backToPrevBtn = screen.getByRole("button", {
      name: /go back/i,
    });

    await act(async () => {
      fireEvent.click(backToPrevBtn);
    });

    expect(router.state.location.pathname).toBe("/login");
  });
  it("should allow resetting timer up to 3 times and ignore subsequent clicks", async () => {
    vi.useFakeTimers();

    act(() => {
      store.dispatch(setEmail({ email: "test@example.com" }));
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/verify-otp"]}>
          <OTPVerifyPage />
        </MemoryRouter>
      </Provider>,
    );

    act(() => {
      vi.advanceTimersByTime(120000);
    });

    expect(screen.getByText("00:00")).toBeInTheDocument();

    const resetTimerBtn = screen.getByRole("button", { name: /reset timer/i });

    fireEvent.click(resetTimerBtn);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(screen.getByText("02:00")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(120000);
    });

    fireEvent.click(resetTimerBtn);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(screen.getByText("02:00")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(120000);
    });

    fireEvent.click(resetTimerBtn);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(screen.getByText("02:00")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(120000);
    });

    fireEvent.click(resetTimerBtn);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(screen.getByText("00:00")).toBeInTheDocument();

    vi.useRealTimers();
  });
});
