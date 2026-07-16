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
    }),
  }),
});

export const {
  useGetSuiteQuery,
  useSendDataMutation,
  useGetPackageImageQuery,
} = suiteApi;
