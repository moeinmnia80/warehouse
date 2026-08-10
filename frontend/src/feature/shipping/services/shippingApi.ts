import { baseApi } from "@/shared/index";
import type {
  ShippingRow,
  ShippingResponse,
  UserPaymentResponse,
  PaymentMethodsPayload,
} from "@/feature/shipping";
import { toast } from "@/store/toast.store";
import type { UserAddressPayload, UserAddressResponse } from "../types/types";

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
    getUserPaymentMethods: builder.query<PaymentMethodsPayload[], void>({
      query: () => "/user/payment",
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          toast.error(`${error}`);
        }
      },
      transformResponse: (response: UserPaymentResponse) => response.data,
      providesTags: (result) =>
        result
          ? result.map((pm) => ({ type: "PaymentMethods", id: pm.id }))
          : [{ type: "PaymentMethods", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),
    getUserAddress: builder.query<UserAddressPayload[], void>({
      query: () => "/user/address",
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          toast.error(`${error}`);
        }
      },
      transformResponse: (response: UserAddressResponse) => response.data,
      providesTags: [{ type: "UserAddress", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetShippingQuery,
  useGetUserAddressQuery,
  useGetUserPaymentMethodsQuery,
} = shippingApi;
