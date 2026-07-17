import { baseApi } from "@/shared/index";
import type {
  MutationDataType,
  SuiteResponse,
  UploadResponse,
} from "@/feature/suite/index";

export const suiteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuite: builder.query<SuiteResponse, void>({
      query: () => "/my-suite",
    }),
    sendData: builder.mutation<UploadResponse, MutationDataType>({
      query: ({ credentials, type, id }) => ({
        url: `/my-suite/packages/${id}/${type}`,
        method: "POST",
        body: credentials,
      }),
    }),
    getPackageImage: builder.query<
      Blob,
      { packageId: string; fileName: string }
    >({
      query: ({ packageId, fileName }) => ({
        url: `/my-suite/packages/${packageId}/images/${fileName}`,
        responseHandler: (response) => response.blob(),
      }),
      transformErrorResponse: async (response) => {
        try {
          const text = await (response.data as Blob).text();
          return { status: response.status, data: JSON.parse(text) };
        } catch {
          return { status: response.status, data: null };
        }
      },
      keepUnusedDataFor: 300,
    }),
    getPackageInvoice: builder.query<
      Blob,
      { packageId: string; fileName: string }
    >({
      query: ({ packageId, fileName }) => ({
        url: `/my-suite/packages/${packageId}/invoice/${fileName}`,
        responseHandler: (response) => response.blob(),
      }),
      transformErrorResponse: async (response) => {
        try {
          const text = await (response.data as Blob).text();
          return { status: response.status, data: JSON.parse(text) };
        } catch {
          return { status: response.status, data: null };
        }
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetSuiteQuery,
  useSendDataMutation,
  useGetPackageImageQuery,
  useGetPackageInvoiceQuery,
} = suiteApi;
