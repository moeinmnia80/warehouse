import { baseApi } from "@/shared/index";
import type { ShippingResponse, ShippingRow } from "@/feature/shipping";

export const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShipping: builder.query<ShippingRow[], void>({
      query: () => "/shipping",
      transformResponse: (response: ShippingResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              { type: "Shipping" as const, id: "LIST" },
              ...result.flatMap((shipment) => [
                {
                  type: "Shipping" as const,
                  id: shipment.shipmentId,
                },
                ...shipment.packages.map((pkg) => ({
                  type: "Package" as const,
                  id: pkg.packageId,
                })),
              ]),
            ]
          : [{ type: "Shipping", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetShippingQuery } = shippingApi;
