import { baseApi } from "@/shared/index";
import type { SuiteResponse } from "@/feature/suite/index";

export const suiteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuite: builder.query<SuiteResponse, void>({
      query: () => "/my-suite",
    }),
  }),
});

export const { useGetSuiteQuery } = suiteApi;
