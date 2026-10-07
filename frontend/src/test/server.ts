import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("*/auth/resend-otp", () => {
    return HttpResponse.json(
      { message: "OTP code successfully regenerated" },
      { status: 200 },
    );
  }),

  //   http.post("*/auth/verify-otp", () => {
  //     return HttpResponse.json(
  //       { message: "OTP code successfully verified" },
  //       { status: 200 },
  //     );
  //   }),
];
export const server = setupServer(...handlers);
