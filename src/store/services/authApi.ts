import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignUpFormData, UserRole } from '@/types/auth';
import { readAuthSession } from '@/lib/auth-storage';

export interface BackendUser {
  _id: string;
  name?: string;
  email?: string;
  role?: 'SENDER' | 'TRAVELER' | string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  data?: {
    user?: BackendUser;
  };
  message?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
      baseUrl:
        process.env.NEXT_PUBLIC_API_URL ||
        'https://centric-backend-im3l.onrender.com/api/v1',
      prepareHeaders: (headers) => {
        const token = readAuthSession()?.token ?? null;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    register: builder.mutation<AuthResponse, SignUpFormData & { role: UserRole }>({
      query: ({ fullName, email, password, role, phone }) => ({
        url: '/auth/register',
        method: 'POST',
        body: {
          name: fullName,
          email,
          password,
          role: role.toUpperCase(),
          phone,
        },
      }),
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
