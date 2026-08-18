import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignUpFormData, UserProfile, UserRole } from '@/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.centric.africa/v1',
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { user: UserProfile; token: string },
      { email: string; password: string }
    >({
      async queryFn(arg) {
        await new Promise((res) => setTimeout(res, 500));
        return {
          data: {
            user: {
              id: 'user_123',
              fullName: 'Tobi Afolayan',
              email: arg.email,
              role: 'sender',
              isVerified: true,
            },
            token: 'mock-jwt-token-centric',
          },
        };
      },
    }),

    register: builder.mutation<
      { user: UserProfile; token: string },
      SignUpFormData & { role: UserRole }
    >({
      async queryFn(arg) {
        await new Promise((res) => setTimeout(res, 500));
        return {
          data: {
            user: {
              id: 'user_' + Date.now(),
              fullName: arg.fullName,
              email: arg.email,
              role: arg.role,
              isVerified: false,
            },
            token: 'mock-jwt-token-centric',
          },
        };
      },
    }),

    sendOtp: builder.mutation<{ message: string; expiresIn: number }, { phoneNumber: string }>({
      async queryFn() {
        await new Promise((res) => setTimeout(res, 400));
        return {
          data: {
            message: 'OTP sent successfully',
            expiresIn: 165,
          },
        };
      },
    }),

    verifyOtp: builder.mutation<{ success: boolean }, { phoneNumber: string; code: string }>({
      async queryFn() {
        await new Promise((res) => setTimeout(res, 400));
        return {
          data: { success: true },
        };
      },
    }),

    uploadDocument: builder.mutation<{ fileUrl: string }, { file: string; type: string }>({
      async queryFn(arg) {
        await new Promise((res) => setTimeout(res, 500));
        return {
          data: { fileUrl: `https://centric.africa/uploads/${arg.type}_${Date.now()}.png` },
        };
      },
    }),

    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      async queryFn() {
        await new Promise((res) => setTimeout(res, 400));
        return {
          data: { message: 'Password reset link sent to your email.' },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUploadDocumentMutation,
  useForgotPasswordMutation,
} = authApi;
