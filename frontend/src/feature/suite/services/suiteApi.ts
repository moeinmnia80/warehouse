import { baseApi } from "@/shared/index";
import type {
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
      invalidatesTags: (_result, _error, { type, id }) => [
        { type: "Suite", id: "LIST" },
        type === "images"
          ? { type: "PackageImages", id }
          : { type: "PackageDocs", id },
      ],
    }),
    getPackageImage: builder.query<
      string,
      { packageId: string; fileName: string }
    >({
      query: ({ packageId, fileName }) => ({
        url: `/my-suite/packages/${packageId}/images/${fileName}`,
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: (blob: Blob) => URL.createObjectURL(blob),
      providesTags: (_result, _err, { packageId, fileName }) => [
        { type: "PackageImages", id: `${packageId}-${fileName}` },
      ],
      transformErrorResponse: async (response) => {
        if (response.data instanceof Blob) {
          try {
            const text = await response.data.text();
            return { status: response.status, data: JSON.parse(text) };
          } catch {
            return { status: response.status, data: "خطای ناشناخته در سرور" };
          }
        }
        return { status: response.status, data: response.data };
      },
      keepUnusedDataFor: 300,
    }),
    getPackageInvoice: builder.query<
      string,
      { packageId: string; fileName: string }
    >({
      query: ({ packageId, fileName }) => ({
        url: `/my-suite/packages/${packageId}/invoice/${fileName}`,
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: (blob: Blob) => URL.createObjectURL(blob),
      providesTags: (_result, _err, { packageId, fileName }) => [
        { type: "PackageDocs", id: `${packageId}-${fileName}` },
      ],
      transformErrorResponse: async (response) => {
        if (response.data instanceof Blob) {
          try {
            const text = await response.data.text();
            return { status: response.status, data: JSON.parse(text) };
          } catch {
            return { status: response.status, data: "خطای ناشناخته در سرور" };
          }
        }
        return { status: response.status, data: response.data };
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
