import { baseApi } from "@/shared/index";
import type { ShippingResponse } from "../types/types";

export const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShipping: builder.query<ShippingResponse, void>({
      query: () => "/shipping",
    }),
  }),
});

export const { useGetShippingQuery } = shippingApi;
