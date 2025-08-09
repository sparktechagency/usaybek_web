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
    RelatedVideos: build.query({
      query: (id: string) => ({
        url: `/get-related-video/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.relatedVideos],
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
    }),
  }),
});

export const {
  useHomeVideosQuery,
  usePromoVideosQuery,
  useCategoriesQuery,
  useRelatedVideosQuery,
} = videosApi;
