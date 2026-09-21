import { type Middleware } from "@reduxjs/toolkit";
import { setRequestPackage } from "@/feature/shipping";

export const savePackageToSessionMiddleware: Middleware =
  () => (next) => (action) => {
    const result = next(action);

    if (setRequestPackage.match(action)) {
      try {
        sessionStorage.setItem(
          "request_packages",
          JSON.stringify(action.payload),
        );
      } catch (error) {
        console.error("err when save data in sessionStorage:", error);
      }
    }

    return result;
  };
