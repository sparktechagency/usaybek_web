import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data
      }),
    }),
  }),
});

export const {
   useSignUpMutation
} = authApi;
