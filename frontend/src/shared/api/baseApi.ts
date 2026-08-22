import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
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
    "UserAddress",
    "PackageDocs",
    "PackageImages",
    "PaymentMethods",
  ],
  endpoints: () => ({}),
});
