import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

import { afterEach } from "vitest";
import { server } from "@/test/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
