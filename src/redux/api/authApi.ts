import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    signIn: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    otpVarify: build.mutation({
      query: (data) => ({
        url: "/auth/otp-verification",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
    getProfile: build.query({
      query: () => ({
        url: "/profile",
        method: "GET"
      }),
      providesTags: [tagTypes.profile]
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useOtpVarifyMutation,useGetProfileQuery } =
  authApi;
