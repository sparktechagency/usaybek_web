import { baseApi } from "../baseApi";

export const termsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTerms: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/page",
        method: "GET",
        params: arg,
      }),
    }),
  }),
});

export const {useGetTermsQuery } = termsApi;
