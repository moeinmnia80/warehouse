import { baseApi } from "@/shared/index";
import { toast } from "@/store/toast.store";
import type {
  GetPackageProps,
  MutationDataType,
  SuitePayload,
  SuiteResponse,
  UploadResponse,
} from "@/feature/suite/index";

export const suiteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuite: builder.query<SuitePayload, void>({
      query: () => "/my-suite",
      transformResponse: (response: SuiteResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              { type: "Suite" as const, id: "LIST" },
              ...result.packages.flatMap((pkg) => [
                { type: "Suite" as const, id: pkg.packageId },
                ...pkg.images.map((img) => ({
                  type: "PackageImages" as const,
                  id: `${pkg.packageId}-${img.name}`,
                })),
                ...pkg.invoices.map((inv) => ({
                  type: "PackageDocs" as const,
                  id: `${pkg.packageId}-${inv.name}`,
                })),
              ]),
            ]
          : [{ type: "Suite", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),
    sendData: builder.mutation<UploadResponse, MutationDataType>({
      query: ({ credentials, type, id }) => ({
        url: `/my-suite/packages/${id}/${type}`,
        method: "POST",
        body: credentials,
      }),
      // notification handler
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("file successfully uploaded");
        } catch (error) {
          toast.error(`${error}`);
        }
      },
      invalidatesTags: (_result, _error, { type, id }) => [
        { type: "Suite", id: "LIST" },
        type === "images"
          ? { type: "PackageImages", id }
          : { type: "PackageDocs", id },
      ],
    }),
    getPackageImage: builder.query<string, GetPackageProps>({
      query: ({ packageId, fileName }) => ({
        url: `/my-suite/packages/${packageId}/images/${fileName}`,
        responseHandler: (response) => response.blob(),
      }),
      // when data received
      transformResponse: (blob: Blob) => URL.createObjectURL(blob),
      // after data received
      providesTags: (_result, _err, { packageId, fileName }) => [
        { type: "PackageImages", id: `${packageId}-${fileName}` },
      ],
      keepUnusedDataFor: 300,
    }),
    getPackageInvoice: builder.query<string, GetPackageProps>({
      query: ({ packageId, fileName }) => ({
        url: `/my-suite/packages/${packageId}/invoice/${fileName}`,
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: (blob: Blob) => URL.createObjectURL(blob),
      providesTags: (_result, _err, { packageId, fileName }) => [
        { type: "PackageDocs", id: `${packageId}-${fileName}` },
      ],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetSuiteQuery,
  useSendDataMutation,
  useGetPackageImageQuery,
  useLazyGetPackageImageQuery,
  useGetPackageInvoiceQuery,
  useLazyGetPackageInvoiceQuery,
} = suiteApi;
