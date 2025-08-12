import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const videosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    HomeVideos: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/home-video",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.videos],
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
    }),
    PromoVideos: build.query({
      query: () => ({
        url: "/get-promotional-video",
        method: "GET",
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
      providesTags: [tagTypes.promoVideos],
    }),
    Categories: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/categories",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.categories],
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
    }),
    VideosDetails: build.query({
      query: (id: string) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.relatedVideos],
      transformResponse: (response: any) => {
        return response.data
      },
    }),
    RelatedVideos: build.query({
      query: ({ id, params}: { id: string; params?: Record<string, any> }) => ({
        url: `/get-related-video/${id}`,
        method: "GET",
         params,
      }),
      providesTags: [tagTypes.relatedVideos],
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
    }),
     storeReport: build.mutation({
      query: (data) => ({
        url: "/add-report",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useHomeVideosQuery,
  usePromoVideosQuery,
  useCategoriesQuery,
  useRelatedVideosQuery,
  useVideosDetailsQuery,
  useStoreReportMutation
} = videosApi;
