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
          console.log(error);

          toast.error(
            (error as { error: ErrorResponse }).error.data
              ? (error as { error: ErrorResponse }).error.data.error.message
              : "Logged in Failed",
          );
        }
      },

      invalidatesTags: ["Auth"],
    }),
    loginWithGoogle: builder.mutation<AuthResponse, { token: string }>({
      query: (credentials) => ({
        url: "/auth/login/google",
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
    forgetPassword: builder.mutation<AuthResponse, { email: string }>({
      query: (credentials) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("user founded successfully");
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
    getCurrentUser: builder.query<GetMe, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useForgetPasswordMutation,
  useLoginWithGoogleMutation,
} = authApi;
