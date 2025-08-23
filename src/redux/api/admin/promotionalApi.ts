import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const promotionalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBanner: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/banners",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.getProBanner],
      transformResponse: (res: any) => {
        return buildResponse(res?.data);
      },
    }),
    storeBanner: build.mutation({
      query: (data) => ({
        url: "/admin/banners",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.getProBanner],
    }),
    updateBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/banners/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.getProBanner],
    }),
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/admin/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.getProBanner],
    }),
  }),
});

export const {
  useGetBannerQuery,
  useStoreBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = promotionalApi;
