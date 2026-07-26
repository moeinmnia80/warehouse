import { baseApi } from "@/shared/index";
import { toast } from "@/store/toast.store";
import type {
  GetMe,
  AuthResponse,
  ErrorResponse,
  LoginCredentials,
} from "@/feature/auth/index";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success("Registered successfully");
        } catch (error) {
          toast.error(
            (error as { error: ErrorResponse }).error.data
              ? (error as { error: ErrorResponse }).error.data.error.message
              : "Register Failed",
          );
        }
      },
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success("Logged in successfully");
        } catch (error) {
          toast.error(
            (error as { error: ErrorResponse }).error.data
              ? (error as { error: ErrorResponse }).error.data.error.message
              : "Logged in Failed",
          );
        }
      },

      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getCurrentUser: builder.query<GetMe, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = authApi;
