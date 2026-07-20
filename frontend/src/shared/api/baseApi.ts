import { getCookie } from "@/shared/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("auth-token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  tagTypes: [
    "Auth",
    "Suite",
    "Package",
    "Shipping",
    "PackageDocs",
    "PackageImages",
  ],
  endpoints: () => ({}),
});
