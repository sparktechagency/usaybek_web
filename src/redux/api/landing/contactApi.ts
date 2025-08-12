import { baseApi } from "../baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContact: build.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
    }),
    storeContact: build.mutation({
        query: (data) => ({
          url: "/send-message",
          method: "POST",
          ContentType: "multipart/form-data",
          data,
        }),
      }),
  }),
});

export const {useGetContactQuery,useStoreContactMutation} = contactApi;
