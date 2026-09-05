import { baseApi } from "@/shared/index";
import { toast } from "@/store/toast.store";
import type {
  GetMe,
  AuthResponse,
  ErrorResponse,
  LoginCredentials,
  OPTResponse,
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
    resendOpt: builder.mutation<OPTResponse, { email: string }>({
      query: (credentials) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("OPT code successfully regenerated");
        } catch (error) {
          toast.error(
            (error as { error: ErrorResponse }).error.data
              ? (error as { error: ErrorResponse }).error.data.error.message
              : "Failed to regenerate OTP code",
          );
        }
      },
      invalidatesTags: ["Auth"],
    }),
    verifyOtpCode: builder.mutation<
      OPTResponse,
      { email: string; otpCode: string }
    >({
      query: (credentials) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("OPT code successfully verifying");
        } catch (error) {
          toast.error(
            (error as { error: ErrorResponse }).error.data
              ? (error as { error: ErrorResponse }).error.data.error.message
              : "Failed to verify OTP code",
          );
        }
      },
      invalidatesTags: ["Auth"],
    }),

    resetPassword: builder.mutation<
      OPTResponse,
      { email: string; newPassword: string }
    >({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("password successfully reset");
        } catch (error) {
          toast.error(
            (error as { error: ErrorResponse }).error.data
              ? (error as { error: ErrorResponse }).error.data.error.message
              : "Failed to reset password",
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
  useResendOptMutation,
  useGetCurrentUserQuery,
  useVerifyOtpCodeMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
  useLoginWithGoogleMutation,
} = authApi;
